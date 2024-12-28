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

  const sortedScores = useMemo(() => {
    return [...scores].sort((a, b) => {
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
  }, [scores, sortOrder]);

  return (
    <div className="rounded-lg bg-dart-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-display text-xl text-dart-black">Scores</h3>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as typeof sortOrder)}
          className="rounded-md border-dart-black/20 bg-dart-white text-xs text-dart-black focus:border-dart-green focus:ring-dart-green"
        >
          <option value="freq-desc">Most combinations</option>
          <option value="freq-asc">Least combinations</option>
          <option value="score-asc">Score (Low to High)</option>
          <option value="score-desc">Score (High to Low)</option>
        </select>
      </div>
      <div className="max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-dart-black/5 scrollbar-thumb-dart-green">
        <ul className="space-y-2">
          {sortedScores.map((score, index) => (
            <li
              key={index}
              className={`flex cursor-pointer items-center justify-between rounded-lg bg-dart-black/5 p-3 transition-colors hover:bg-dart-black/10 ${
                selectedScore === score.score ? 'bg-dart-red/10 hover:bg-dart-red/20' : ''
              }`}
              onClick={() => onScoreSelect(score.score)}
            >
              <span className="font-display text-lg text-dart-black">{score.score}</span>
              <span className="text-sm text-dart-green">{score.combinations} combinations</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
