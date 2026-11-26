// Deadpan forecast for Mirewick — a city that does not exist.
// The entry is one line, at most 160 characters, written verbatim to
// /output/entry.txt. This version builds the line with a small fluent
// builder: each method appends one clause, and build() joins them,
// checks the gate's length bound, and returns the finished line.

import { mkdirSync, writeFileSync } from "node:fs";

const GATE_MIN = 1;
const GATE_MAX = 160;

class ForecastLine {
  private clauses: string[] = [];

  tonight(city: string, sky: string, tempC: number): this {
    const temp = tempC < 0 ? `minus ${-tempC}` : String(tempC);
    this.clauses.push(`Tonight in ${city}: ${sky}, ${temp},`);
    return this;
  }

  escalation(event: string): this {
    this.clauses.push(`and ${event}`);
    return this;
  }

  punch(target: string): this {
    this.clauses.push(`against ${target}.`);
    return this;
  }

  build(): string {
    const line = this.clauses.join(" ");
    if (line.length < GATE_MIN || line.length > GATE_MAX) {
      throw new Error(`entry is ${line.length} chars, gate allows 1-160`);
    }
    return line;
  }
}

function main(): void {
  const line = new ForecastLine()
    .tonight("Mirewick", "clear skies", -4)
    .escalation("the northern lights have filed a formal noise complaint")
    .punch("the streetlamps")
    .build();
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf8");
}

main();
