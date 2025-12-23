import { IdStrategy } from "./types";

export class IdGenerator {
  private strategy: IdStrategy;
  private counters: Map<string, number> = new Map();
  public refs: Map<string, string[]> = new Map();

  constructor(strategy: IdStrategy = "sequential") {
    this.strategy = strategy;
  }

  generateId(resourceType: string): string {
    if (this.strategy === "uuid") {
      const id = crypto.randomUUID();
      const refs = this.refs.get(resourceType) || [];
      refs.push(id);
      this.refs.set(resourceType, refs);
      return id;
    }

    // Sequential strategy
    const current = this.counters.get(resourceType) || 0;
    const newCount = current + 1;
    this.counters.set(resourceType, newCount);
    const id = `${resourceType.toLowerCase()}-${newCount}`;
    const refs = this.refs.get(resourceType) || [];
    refs.push(id);
    this.refs.set(resourceType, refs);
    return id;
  }
}
