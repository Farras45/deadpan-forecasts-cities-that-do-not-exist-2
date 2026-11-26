// Deadpan forecast for Mirewick, a city that does not exist.
// One line, written verbatim to /output/entry.txt. The forecast is held as
// a single record and rendered by a small formatter; the rendered line is
// checked against the gate's length bound before anything is written.

import { mkdirSync, writeFileSync } from "node:fs";

interface Forecast {
  city: string;
  sky: string;
  tempC: number;
  event: string;
  target: string;
}

const FORECAST: Forecast = {
  city: "Mirewick",
  sky: "clear skies",
  tempC: -4,
  event: "the northern lights have filed a formal noise complaint",
  target: "the streetlamps",
};

function render(f: Forecast): string {
  const temp = f.tempC < 0 ? `minus ${-f.tempC}` : `${f.tempC}`;
  return `Tonight in ${f.city}: ${f.sky}, ${temp}, and ${f.event} against ${f.target}.`;
}

function main(): void {
  const line = render(FORECAST);
  if (line.length < 1 || line.length > 160) {
    throw new Error(`entry is ${line.length} chars, gate allows 1-160`);
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf8");
}

main();
