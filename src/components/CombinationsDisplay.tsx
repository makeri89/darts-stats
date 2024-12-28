type Props = {
  score: number;
  combinations: [string, string, string][];
};

export function CombinationsDisplay({ score, combinations }: Props) {
  return (
    <div className="rounded-lg bg-dart-white p-6 shadow-sm">
      <h2 className="mb-4 font-display text-3xl text-dart-black">Combinations for score {score}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {combinations.map((combo, index) => (
          <div
            key={index}
            className="rounded-lg bg-dart-black/5 p-3 text-dart-black transition-colors hover:bg-dart-black/10"
          >
            {combo.join(' + ')}
          </div>
        ))}
      </div>
    </div>
  );
}
