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

  const combs = calculateDartCombinations();

  const filterCombination = (combo: [string, string, string]): boolean => {
    const doubles = combo.filter((d) => d.startsWith('D')).length;
    const trebles = combo.filter((d) => d.startsWith('T')).length;
    const singles = combo.filter((d) => !d.startsWith('D') && !d.startsWith('T')).length;

    if (showOnlyCheckouts && doubles === 0) return false;

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

  const sortedScores = [...data].sort((a, b) => b.combinations - a.combinations);

  const handleFilterChange = (type: keyof DartFiltersType, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: parseInt(value),
    }));
  };

  const filteredCombinations = (score: number) => {
    return combs[score].combinations.filter(filterCombination);
  };

  const value = {
    selectedScore,
    setSelectedScore,
    filters,
    showOnlyCheckouts,
    filteredData: data,
    sortedScores,
    filteredCombinations,
    handleFilterChange,
    setShowOnlyCheckouts,
  };

  return <DartContext.Provider value={value}>{children}</DartContext.Provider>;
}
