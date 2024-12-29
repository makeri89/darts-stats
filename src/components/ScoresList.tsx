import { useState, useMemo } from 'react';
import { ScoreData } from '../types/dart';

type Props = {
  scores: ScoreData[];
  selectedScore: number | null;
  onScoreSelect: (score: number) => void;
};

export function ScoresList({ scores, selectedScore, onScoreSelect }: Props) {
  const [sortOrder, setSortOrder] = useState<'score-asc' | 'score-desc' | 'freq-asc' | 'freq-desc'>(
    'freq-desc'
  );
  const [hideZeroCombinations, setHideZeroCombinations] = useState(false);

  const sortedScores = useMemo(() => {
    const filteredScores = hideZeroCombinations
      ? scores.filter((score) => score.combinations > 0)
      : scores;

    return [...filteredScores].sort((a, b) => {
      switch (sortOrder) {
        case 'score-asc':
          return a.score - b.score;
        case 'score-desc':
          return b.score - a.score;
        case 'freq-asc':
          return a.combinations - b.combinations;
        case 'freq-desc':
          return b.combinations - a.combinations;
        default:
          return 0;
      }
    });
  }, [scores, sortOrder, hideZeroCombinations]);

  return (
    <div className="rounded-lg bg-dart-white p-6 shadow-sm dark:bg-dart-dark-white">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-xl text-dart-black dark:text-dart-white">Scores</h3>
        </div>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as typeof sortOrder)}
          className="rounded-md border-dart-black/20 bg-dart-white text-xs text-dart-black focus:border-dart-green focus:ring-dart-green dark:border-dart-white/20 dark:bg-dart-dark-white dark:text-dart-white"
        >
          <option value="freq-desc">Most combinations</option>
          <option value="freq-asc">Least combinations</option>
          <option value="score-asc">Score (Low to High)</option>
          <option value="score-desc">Score (High to Low)</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="flex items-center gap-2 text-xs text-dart-black dark:text-dart-white">
          <input
            type="checkbox"
            checked={hideZeroCombinations}
            onChange={(e) => setHideZeroCombinations(e.target.checked)}
            className="rounded border-dart-black/20 text-dart-green focus:ring-dart-green dark:border-dart-white/20"
          />
          Hide impossible scores
        </label>
      </div>
      <div className="max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-dart-black/5 scrollbar-thumb-dart-green dark:scrollbar-track-dart-white/5">
        <ul className="space-y-2">
          {sortedScores.map((score, index) => (
            <li
              key={index}
              className={`flex cursor-pointer items-center justify-between rounded-lg bg-dart-black/5 p-3 transition-colors hover:bg-dart-black/10 dark:bg-dart-white/5 dark:hover:bg-dart-white/10 ${
                selectedScore === score.score ? 'bg-dart-red/10 hover:bg-dart-red/20' : ''
              }`}
              onClick={() => onScoreSelect(score.score)}
            >
              <span className="font-display text-lg text-dart-black dark:text-dart-white">
                {score.score}
              </span>
              <span className="text-sm text-dart-green dark:font-medium dark:text-dart-dark-green">
                {score.combinations} combinations
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-sm text-dart-black/60 dark:text-dart-white/60">
        Amount of possible scores: {scores.filter((s) => s.combinations > 0).length}
      </p>
    </div>
  );
}
