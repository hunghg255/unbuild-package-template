// sum.ts
// sum.test.ts

import { describe, it, expect } from 'vitest';

export function sum(a: number, b: number): number {
  return a + b;
}

describe('sum', () => {
  it('should add two numbers', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(0, 0)).toBe(0);
    expect(sum(-1, 1)).toBe(0);
  });
});
