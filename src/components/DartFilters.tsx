import { DartFilters as DartFiltersType } from '../types/dart';

interface DartFiltersProps {
  filters: DartFiltersType;
  showOnlyCheckouts: boolean;
  hideZeroScores: boolean;
  onFilterChange: (type: keyof DartFiltersType, value: string) => void;
  onCheckoutChange: (value: boolean) => void;
  onHideZeroChange: (value: boolean) => void;
  requiredScore: string | null;
  onRequiredScoreChange: (value: string | null) => void;
  secondDartScore: string | null;
  onSecondDartScoreChange: (value: string | null) => void;
}

export function DartFilters({
  filters,
  showOnlyCheckouts,
  hideZeroScores,
  onFilterChange,
  onCheckoutChange,
  onHideZeroChange,
  requiredScore,
  onRequiredScoreChange,
  secondDartScore,
  onSecondDartScoreChange,
}: DartFiltersProps) {
  const dartOptions = (
    <>
      <option value="">Any score</option>
      {[...Array(20)].map((_, i) => (
        <option key={i + 1} value={String(i + 1)}>
          {i + 1}
        </option>
      ))}
      <option value="25">25</option>
      {[...Array(20)].map((_, i) => (
        <option key={`D${i + 1}`} value={`D${i + 1}`}>
          D{i + 1}
        </option>
      ))}
      <option value="D25">D25</option>
      {[...Array(20)].map((_, i) => (
        <option key={`T${i + 1}`} value={`T${i + 1}`}>
          T{i + 1}
        </option>
      ))}
    </>
  );

  return (
    <div className="mb-8 rounded-lg bg-dart-white p-6 shadow-sm dark:bg-dart-dark-white">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {(['singles', 'doubles', 'trebles'] as const).map((type) => (
            <div key={type} className="flex flex-col">
              <label className="mb-2 capitalize text-dart-black dark:text-dart-white">
                {type}:
              </label>
              <select
                value={filters[type]}
                onChange={(e) => onFilterChange(type, e.target.value)}
                className="form-select rounded border-dart-black/20 bg-dart-white text-dart-black focus:border-dart-green focus:ring-dart-green dark:border-dart-white/20 dark:bg-dart-dark-white dark:text-dart-white"
              >
                <option value="-1">Any amount</option>
                <option value="0">None</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-dart-black/10 pt-4 dark:border-dart-white/10">
          <label className="inline-flex cursor-pointer items-center rounded-lg bg-dart-black/5 px-4 py-2 transition-colors hover:bg-dart-black/10 dark:bg-dart-white/5 dark:hover:bg-dart-white/10">
            <input
              type="checkbox"
              checked={showOnlyCheckouts}
              onChange={(e) => onCheckoutChange(e.target.checked)}
              className="form-checkbox h-5 w-5 rounded border-dart-black/20 text-dart-green dark:border-dart-white/20"
            />
            <span className="ml-2 text-dart-black dark:text-dart-white">
              Show only possible checkouts (must end with double)
            </span>
          </label>

          <label className="inline-flex cursor-pointer items-center rounded-lg bg-dart-black/5 px-4 py-2 transition-colors hover:bg-dart-black/10 dark:bg-dart-white/5 dark:hover:bg-dart-white/10">
            <input
              type="checkbox"
              checked={hideZeroScores}
              onChange={(e) => onHideZeroChange(e.target.checked)}
              className="form-checkbox h-5 w-5 rounded border-dart-black/20 text-dart-green dark:border-dart-white/20"
            />
            <span className="ml-2 text-dart-black dark:text-dart-white">
              Hide scores with misses
            </span>
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-dart-black/10 pt-4 dark:border-dart-white/10">
          <div className="flex flex-col">
            <label className="mb-2 text-dart-black dark:text-dart-white">First dart hit:</label>
            <select
              value={requiredScore || ''}
              onChange={(e) => onRequiredScoreChange(e.target.value || null)}
              className="form-select rounded border-dart-black/20 bg-dart-white text-dart-black focus:border-dart-green focus:ring-dart-green dark:border-dart-white/20 dark:bg-dart-dark-white dark:text-dart-white"
            >
              {dartOptions}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-dart-black dark:text-dart-white">Second dart hit:</label>
            <select
              value={secondDartScore || ''}
              onChange={(e) => onSecondDartScoreChange(e.target.value || null)}
              className="form-select rounded border-dart-black/20 bg-dart-white text-dart-black focus:border-dart-green focus:ring-dart-green dark:border-dart-white/20 dark:bg-dart-dark-white dark:text-dart-white"
            >
              {dartOptions}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
