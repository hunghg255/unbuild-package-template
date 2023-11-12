export function fibonacci(n: number): number {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

export const fibonacci1 = async (n: number): Promise<any> => {
  if (n <= 1) {
    return n;
  }
  return (await fibonacci(n - 1)) + (await fibonacci(n - 2));
};
