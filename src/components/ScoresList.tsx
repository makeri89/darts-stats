import { ScoreData } from '../types/dart';

type Props = {
  scores: ScoreData[];
  selectedScore: number | null;
  onScoreSelect: (score: number) => void;
};

export function ScoresList({ scores, selectedScore, onScoreSelect }: Props) {
  return (
    <div className="rounded-lg bg-dart-white p-6 shadow-sm">
      <h3 className="mb-4 font-display text-2xl text-dart-black">All Scores</h3>
      <div className="max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-dart-black/5 scrollbar-thumb-dart-green">
        <ul className="space-y-2">
          {scores.map((score, index) => (
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
