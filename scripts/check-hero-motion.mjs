// Exercise the real inline animation without browser automation or private-state
// hooks. The fake canvas records drawing operations; RAF advances only on demand.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";

const heroPath = fileURLToPath(
  new URL("../src/components/Hero.astro", import.meta.url),
);
const source = readFileSync(heroPath, "utf8");
const scripts = [
  ...source.matchAll(/<script\b[^>]*is:inline[^>]*>([\s\S]*?)<\/script>/g),
]
  .map((match) => match[1])
  .filter(
    (script) =>
      script.includes("getElementById('loom')") ||
      script.includes('getElementById("loom")'),
  );
assert.equal(scripts.length, 1, "Expected one hero canvas inline script");

function eventHub() {
  const listeners = new Map();
  return {
    addEventListener(type, callback) {
      if (!listeners.has(type)) listeners.set(type, []);
      listeners.get(type).push(callback);
    },
    dispatch(type, event = {}) {
      for (const callback of listeners.get(type) ?? []) callback(event);
    },
  };
}

function createHero({
  reduced = false,
  hidden = false,
  width = 1200,
  height = 900,
  observer = true,
} = {}) {
  const frames = new Map();
  const observers = [];
  let nextId = 1;
  let draws = 0;
  let now = 1000;
  let firstPoint;
  let lastPoint;
  let drawing;
  const label = { textContent: "Pause animation" };
  const button = {
    ...eventHub(),
    hidden: true,
    dataset: {},
    querySelector(selector) {
      assert.equal(selector, "span");
      return label;
    },
  };
  const hero = {
    dataset: { motion: "paused" },
    querySelector(selector) {
      assert.equal(selector, ".hero-motion");
      return button;
    },
  };
  const context = {
    transform: [],
    clearRect(x, y, w, h) {
      draws++;
      drawing = { bounds: [x, y, w, h], threads: [], packets: [] };
    },
    setTransform(...values) {
      context.transform = values;
    },
    beginPath() {
      firstPoint = undefined;
      lastPoint = undefined;
    },
    moveTo(x, y) {
      firstPoint = [x, y];
      lastPoint = [x, y];
    },
    lineTo(x, y) {
      lastPoint = [x, y];
    },
    createLinearGradient(x0, y0, x1, y1) {
      return {
        bounds: [x0, y0, x1, y1],
        stops: [],
        addColorStop(offset, color) {
          this.stops.push([offset, color]);
        },
      };
    },
    stroke() {
      const style = context.strokeStyle;
      if (style && typeof style === "object") {
        drawing.packets.push({
          center: (style.bounds[0] + style.bounds[2]) / 2,
          signal: style.stops.some(([, color]) => color.includes("232,163,61")),
          first: [...firstPoint],
          last: [...lastPoint],
        });
      } else if (
        style === "rgba(79,184,168,0.13)" ||
        style === "rgba(236,229,216,0.07)"
      ) {
        drawing.threads.push({ first: [...firstPoint], last: [...lastPoint] });
      }
    },
  };
  const canvas = {
    clientWidth: width,
    clientHeight: height,
    width: 0,
    height: 0,
    getContext(type) {
      assert.equal(type, "2d");
      return context;
    },
    closest(selector) {
      assert.equal(selector, ".hero");
      return hero;
    },
  };
  const media = { ...eventHub(), matches: reduced };
  const document = {
    ...eventHub(),
    hidden,
    getElementById(id) {
      assert.equal(id, "loom");
      return canvas;
    },
  };
  const window = {
    ...eventHub(),
    devicePixelRatio: 2,
    matchMedia(query) {
      assert.equal(query, "(prefers-reduced-motion: reduce)");
      return media;
    },
  };
  class IntersectionObserver {
    constructor(callback) {
      this.callback = callback;
      observers.push(this);
    }
    observe(target) {
      assert.equal(target, hero);
    }
  }
  if (observer) window.IntersectionObserver = IntersectionObserver;
  const math = Object.create(Math);
  // Repeatable geometry, without patching or exposing animation internals.
  math.random = () => 0.5;
  runInNewContext(
    scripts[0],
    {
      document,
      window,
      Math: math,
      ...(observer ? { IntersectionObserver } : {}),
      requestAnimationFrame(callback) {
        const id = nextId++;
        frames.set(id, callback);
        return id;
      },
      cancelAnimationFrame(id) {
        frames.delete(id);
      },
    },
    { filename: heroPath, timeout: 1000 },
  );

  return {
    hero,
    button,
    label,
    canvas,
    context,
    get pending() {
      return frames.size;
    },
    get draws() {
      return draws;
    },
    get drawing() {
      return structuredClone(drawing);
    },
    step(milliseconds = 50) {
      now += milliseconds;
      const ready = [...frames.values()];
      frames.clear();
      for (const callback of ready) callback(now);
      return ready.length;
    },
    click() {
      button.dispatch("click");
    },
    visibility(value) {
      document.hidden = value;
      document.dispatch("visibilitychange");
    },
    intersection(value) {
      assert.equal(observers.length, 1, "Expected one hero observer");
      observers[0].callback([{ isIntersecting: value, target: hero }]);
    },
    preference(value) {
      media.matches = value;
      media.dispatch("change", { matches: value });
    },
    resize(w, h) {
      canvas.clientWidth = w;
      canvas.clientHeight = h;
      window.dispatch("resize");
    },
  };
}

const signalPackets = (scene) =>
  scene.packets.filter((packet) => packet.signal);

test("startup renders the loom and schedules one frame", () => {
  const animation = createHero();
  assert.equal(animation.pending, 1);
  assert.equal(animation.hero.dataset.motion, "running");
  assert.equal(animation.button.hidden, false);
  assert.equal(animation.label.textContent, "Pause animation");
  assert.equal(animation.drawing.threads.length, 14);
  assert.ok(
    signalPackets(animation.drawing).length >= 3,
    "Initial still needs visible packets",
  );
});

test("repeated motion synchronization never multiplies RAF callbacks", () => {
  const animation = createHero();
  for (let iteration = 0; iteration < 40; iteration++) {
    animation.visibility(false);
    animation.intersection(true);
    animation.preference(false);
    assert.equal(
      animation.pending,
      1,
      `Duplicate RAF after event burst ${iteration}`,
    );
    const draws = animation.draws;
    assert.equal(animation.step(), 1);
    assert.equal(animation.draws, draws + 1);
    assert.equal(animation.pending, 1);
  }
});

test("user pause freezes composition and resume does not include paused time", () => {
  const animation = createHero();
  animation.step();
  animation.step();
  const moving = animation.drawing;
  animation.click();
  assert.equal(animation.pending, 0);
  assert.equal(animation.hero.dataset.motion, "paused");
  assert.equal(animation.button.dataset.paused, "true");
  assert.equal(animation.label.textContent, "Play animation");
  assert.deepEqual(animation.drawing, moving);
  assert.equal(
    animation.step(600_000),
    0,
    "Paused time must not schedule drawing",
  );
  animation.click();
  assert.equal(animation.pending, 1);
  assert.equal(animation.button.dataset.paused, "false");
  assert.equal(animation.label.textContent, "Pause animation");
  animation.step();
  assert.deepEqual(
    animation.drawing,
    moving,
    "First resumed frame must preserve position",
  );
  animation.step();
  assert.notDeepEqual(
    animation.drawing,
    moving,
    "Subsequent frames must advance",
  );
});

test("reduced-motion startup renders a still and hides the motion control", () => {
  const animation = createHero({ reduced: true });
  assert.equal(animation.pending, 0);
  assert.equal(animation.hero.dataset.motion, "paused");
  assert.equal(animation.button.hidden, true);
  assert.equal(animation.drawing.threads.length, 14);
  assert.ok(signalPackets(animation.drawing).length >= 3);
  const draws = animation.draws;
  assert.equal(animation.step(), 0);
  assert.equal(animation.draws, draws);
});

test("live reduced-motion changes stop and restart without losing user pause", () => {
  const animation = createHero();
  animation.step();
  animation.preference(true);
  assert.equal(animation.pending, 0);
  assert.equal(animation.hero.dataset.motion, "paused");
  assert.equal(animation.button.hidden, true);
  animation.preference(false);
  assert.equal(animation.pending, 1);
  assert.equal(animation.button.hidden, false);
  animation.click();
  animation.preference(true);
  animation.preference(false);
  assert.equal(
    animation.pending,
    0,
    "A preference change must not undo explicit pause",
  );
  assert.equal(animation.button.hidden, false);
  assert.equal(animation.label.textContent, "Play animation");
});

test("resizing a paused or reduced-motion canvas redraws its static scene", () => {
  for (const reduced of [false, true]) {
    const animation = createHero({ reduced, width: 1000, height: 900 });
    if (!reduced) animation.click();
    const before = animation.drawing;
    const draws = animation.draws;
    animation.resize(2000, 1200);
    assert.equal(animation.draws, draws + 1);
    assert.equal(animation.pending, 0);
    assert.deepEqual(animation.drawing.bounds, [0, 0, 2000, 1200]);
    assert.equal(animation.drawing.threads.length, 14);
    assert.ok(
      animation.canvas.width > animation.canvas.clientWidth,
      "Retain high-DPI canvas sizing",
    );
    const beforePackets = signalPackets(before);
    const afterPackets = signalPackets(animation.drawing);
    assert.equal(afterPackets.length, beforePackets.length);
    afterPackets.forEach((packet, index) => {
      assert.equal(
        packet.center,
        beforePackets[index].center * 2,
        "Packet progress should scale with resized width",
      );
    });
    assert.notDeepEqual(animation.drawing.threads, before.threads);
  }
});

test("hidden and offscreen gates pause independently and preserve explicit pause", () => {
  const animation = createHero();
  animation.visibility(true);
  assert.equal(animation.pending, 0);
  assert.equal(animation.hero.dataset.motion, "paused");
  animation.intersection(false);
  animation.visibility(false);
  assert.equal(
    animation.pending,
    0,
    "Becoming visible cannot resume an offscreen hero",
  );
  animation.intersection(true);
  assert.equal(animation.pending, 1);
  animation.visibility(true);
  animation.intersection(true);
  assert.equal(
    animation.pending,
    0,
    "Intersection cannot resume a hidden document",
  );
  animation.visibility(false);
  assert.equal(animation.pending, 1);
  animation.click();
  animation.intersection(false);
  animation.intersection(true);
  animation.visibility(true);
  animation.visibility(false);
  assert.equal(
    animation.pending,
    0,
    "Automatic lifecycle events cannot undo user pause",
  );
});

test("hidden startup and browsers without IntersectionObserver retain lifecycle controls", () => {
  const animation = createHero({ hidden: true, observer: false });
  assert.equal(animation.pending, 0);
  assert.equal(animation.hero.dataset.motion, "paused");
  animation.visibility(false);
  assert.equal(animation.pending, 1);
  animation.click();
  assert.equal(animation.pending, 0);
});

test("visible wave packets never share a thread during repeated spawning and exits", () => {
  // Tall spacing makes a packet's visible path unambiguously belong to one
  // horizontal thread, regardless of carrier phase or clipping at the edge.
  const height = 3000;
  const animation = createHero({ width: 1200, height });
  let mostVisible = 0;
  for (let frame = 0; frame < 1200; frame++) {
    assert.equal(animation.step(), 1);
    assert.equal(animation.pending, 1);
    const scene = animation.drawing;
    const packets = signalPackets(scene);
    mostVisible = Math.max(mostVisible, packets.length);
    const rowHeight = height / (scene.threads.length + 1);
    const occupied = packets.map((packet) =>
      Math.round(packet.first[1] / rowHeight),
    );
    assert.ok(occupied.every((row) => row >= 1 && row <= scene.threads.length));
    assert.equal(
      new Set(occupied).size,
      occupied.length,
      `Packets share a thread at frame ${frame}`,
    );
    assert.ok(packets.length <= 6, "Packet population should remain bounded");
  }
  assert.ok(mostVisible > 3, "Simulation must exercise new packet spawning");
});
