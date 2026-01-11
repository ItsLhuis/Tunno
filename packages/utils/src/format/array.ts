/**
 * Shuffles an array randomly using the Fisher-Yates (Knuth) algorithm.
 * Creates a new array with the shuffled elements, leaving the original array unchanged.
 *
 * @template T - The type of elements in the array.
 * @param array - The array to shuffle.
 * @returns A new array with the elements shuffled randomly.
 *
 * @example
 * ```ts
 * const numbers = [1, 2, 3, 4, 5];
 * const shuffledNumbers = shuffleArray(numbers);
 * // shuffledNumbers might be [3, 1, 5, 2, 4] (original `numbers` is unchanged)
 * ```
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
