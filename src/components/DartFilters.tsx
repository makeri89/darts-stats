import { DartFilters as DartFiltersType } from '../types/dart';

interface DartFiltersProps {
  filters: DartFiltersType;
  showOnlyCheckouts: boolean;
  hideZeroScores: boolean;
  onFilterChange: (type: keyof DartFiltersType, value: string) => void;
  onCheckoutChange: (value: boolean) => void;
  onHideZeroChange: (value: boolean) => void;
}

export function DartFilters({
  filters,
  showOnlyCheckouts,
  hideZeroScores,
  onFilterChange,
  onCheckoutChange,
  onHideZeroChange,
}: DartFiltersProps) {
  return (
    <div className="mb-8 rounded-lg bg-dart-white p-6 shadow-sm">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {(['singles', 'doubles', 'trebles'] as const).map((type) => (
            <div key={type} className="flex flex-col">
              <label className="mb-2 capitalize text-dart-black">{type}:</label>
              <select
                value={filters[type]}
                onChange={(e) => onFilterChange(type, e.target.value)}
                className="form-select rounded border-dart-black/20 text-dart-black focus:border-dart-green focus:ring-dart-green"
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

        <div className="grid grid-cols-2 gap-4 border-t border-dart-black/10 pt-4">
          <label className="inline-flex cursor-pointer items-center rounded-lg bg-dart-black/5 px-4 py-2 transition-colors hover:bg-dart-black/10">
            <input
              type="checkbox"
              checked={showOnlyCheckouts}
              onChange={(e) => onCheckoutChange(e.target.checked)}
              className="form-checkbox h-5 w-5 rounded border-dart-black/20 text-dart-green"
            />
            <span className="ml-2 text-dart-black">
              Show only possible checkouts (must end with double)
            </span>
          </label>

          <label className="inline-flex cursor-pointer items-center rounded-lg bg-dart-black/5 px-4 py-2 transition-colors hover:bg-dart-black/10">
            <input
              type="checkbox"
              checked={hideZeroScores}
              onChange={(e) => onHideZeroChange(e.target.checked)}
              className="form-checkbox h-5 w-5 rounded border-dart-black/20 text-dart-green"
            />
            <span className="ml-2 text-dart-black">Hide scores with misses</span>
          </label>
        </div>
      </div>
    </div>
  );
}
