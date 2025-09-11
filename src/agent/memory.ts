import { CoreMessage } from 'ai';

export class Memory {
  private history: CoreMessage[] = [];
  private maxSize: number;

  constructor(options: { maxSize?: number } = {}) {
    this.maxSize = options.maxSize || 100;
  }

  add(message: CoreMessage) {
    this.history.push(message);
    if (this.history.length > this.maxSize) {
      this.history.shift();
    }
  }

  get(lastN?: number): CoreMessage[] {
    if (lastN) {
      return this.history.slice(-lastN);
    }
    return this.history;
  }

  clear() {
    this.history = [];
  }
}
