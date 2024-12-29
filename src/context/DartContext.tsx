import { useState, ReactNode } from 'react';
import { DartFilters as DartFiltersType } from '../types/dart';
import { calculateDartCombinations } from '../utils';
import { DartContext } from './dartContextInstance';

export function DartProvider({ children }: { children: ReactNode }) {
  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [filters, setFilters] = useState<DartFiltersType>({
    doubles: -1,
    singles: -1,
    trebles: -1,
  });
  const [showOnlyCheckouts, setShowOnlyCheckouts] = useState(false);
  const [hideZeroScores, setHideZeroScores] = useState(false);
  const [requiredScore, setRequiredScore] = useState<string | null>(null);
  const [secondDartScore, setSecondDartScore] = useState<string | null>(null);

  const combs = calculateDartCombinations();

  const filterCombination = (combo: [string, string, string]): boolean => {
    const doubles = combo.filter((d) => d.startsWith('D')).length;
    const trebles = combo.filter((d) => d.startsWith('T')).length;
    const singles = combo.filter((d) => !d.startsWith('D') && !d.startsWith('T')).length;

    if (showOnlyCheckouts && doubles === 0) return false;
    if (hideZeroScores && combo.includes('0')) return false;

    if (requiredScore && !combo.includes(requiredScore)) return false;
    if (secondDartScore && !combo.includes(secondDartScore)) return false;

    return (
      (filters.doubles === -1 || doubles === filters.doubles) &&
      (filters.singles === -1 || singles === filters.singles) &&
      (filters.trebles === -1 || trebles === filters.trebles)
    );
  };

  const data = Object.entries(combs).map(([score, { combinations }]) => ({
    score: Number(score),
    combinations: combinations.filter(filterCombination).length,
  }));

  const handleFilterChange = (type: keyof DartFiltersType, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: parseInt(value),
    }));
  };

  const filteredCombinations = (score: number) => {
    const filtered = combs[score].combinations.filter(filterCombination);

    if (requiredScore || secondDartScore) {
      return filtered.map((combo) => {
        const result = [...combo] as [string, string, string];

        if (requiredScore) {
          const index = result.indexOf(requiredScore);
          if (index > 0) {
            [result[0], result[index]] = [result[index], result[0]];
          }
        }

        if (secondDartScore) {
          const index = result.indexOf(secondDartScore);
          if (index !== 1 && index !== -1) {
            [result[1], result[index]] = [result[index], result[1]];
          }
        }

        return result;
      });
    }

    return filtered;
  };

  const value = {
    selectedScore,
    setSelectedScore,
    filters,
    showOnlyCheckouts,
    hideZeroScores,
    filteredData: data,
    filteredCombinations,
    handleFilterChange,
    setShowOnlyCheckouts,
    setHideZeroScores,
    requiredScore,
    setRequiredScore,
    secondDartScore,
    setSecondDartScore,
  };

  return <DartContext.Provider value={value}>{children}</DartContext.Provider>;
}
