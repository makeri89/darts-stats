import { describe, test, expect } from 'vitest';
import { calculateDartCombinations } from '../../utils';

describe('Dart Combinations', () => {
  test('all combinations for each score are unique', () => {
    const combinations = calculateDartCombinations();

    // Check each score's combinations
    Object.entries(combinations).forEach(([score, { combinations: scoreCombinations }]) => {
      // Convert each combination to a sorted string for comparison
      const normalizedCombos = scoreCombinations.map((combo) => [...combo].sort().join(','));

      // Create a Set to remove duplicates
      const uniqueCombos = new Set(normalizedCombos);

      expect(uniqueCombos.size, `Score ${score} has duplicate combinations`).toBe(
        normalizedCombos.length
      );
    });
  });

  test('has combinations with three of the same score', () => {
    const combinations = calculateDartCombinations();
    const score = 60;
    const expectedCombo = ['20', '20', '20'];

    const scoreCombos = combinations[score].combinations;
    const hasTripleCombo = scoreCombos.some((combo) =>
      combo.every((dart) => dart === expectedCombo[0])
    );

    expect(
      hasTripleCombo,
      `Score ${score} should have combination ${expectedCombo.join(',')}`
    ).toBe(true);
  });
});
