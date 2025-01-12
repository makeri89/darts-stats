type Props = {
  score: number;
  combinations: [string, string, string][];
};

export function CombinationsDisplay({ score, combinations }: Props) {
  return (
    <div className="rounded-lg bg-dart-white p-6 shadow-sm dark:bg-dart-dark-white">
      <h2 className="mb-4 font-display text-3xl text-dart-black dark:text-dart-white">
        {combinations.length} different combinations for score {score}
      </h2>
      <div className="h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-dart-black/5 scrollbar-thumb-dart-green dark:scrollbar-track-dart-white/5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {combinations.map((combo, index) => (
            <div
              key={index}
              className="rounded-lg bg-dart-black/5 p-3 text-dart-black transition-colors hover:bg-dart-black/10 dark:bg-dart-white/5 dark:text-dart-white dark:hover:bg-dart-white/10"
            >
              {combo.join(' + ')}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
