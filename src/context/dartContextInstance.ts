import { createContext } from 'react';
import { DartFilters as DartFiltersType } from '../types/dart';

export interface DartContextType {
  selectedScore: number | null;
  setSelectedScore: (score: number | null) => void;
  filters: DartFiltersType;
  showOnlyCheckouts: boolean;
  filteredData: { score: number; combinations: number }[];
  filteredCombinations: (score: number) => [string, string, string][];
  handleFilterChange: (type: keyof DartFiltersType, value: string) => void;
  setShowOnlyCheckouts: (value: boolean) => void;
  hideZeroScores: boolean;
  setHideZeroScores: (value: boolean) => void;
}

export const DartContext = createContext<DartContextType | undefined>(undefined);
