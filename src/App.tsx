import { DartFilters } from './components/DartFilters';
import { ScoresChart } from './components/ScoresChart';
import { ScoresList } from './components/ScoresList';
import { CombinationsDisplay } from './components/CombinationsDisplay';
import { useDartContext } from './hooks/useDartContext';
import { DarkModeToggle } from './components/DarkModeToggle';

function App() {
  const {
    selectedScore,
    setSelectedScore,
    filters,
    showOnlyCheckouts,
    filteredData,
    filteredCombinations,
    handleFilterChange,
    setShowOnlyCheckouts,
    hideZeroScores,
    setHideZeroScores,
    requiredScore,
    setRequiredScore,
    secondDartScore,
    setSecondDartScore,
  } = useDartContext();

  return (
    <div className="dark:bg-dart-dark-cream min-h-screen bg-dart-cream font-body">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 font-display text-5xl text-dart-black dark:text-dart-white">
              Darts Score Combinations
            </h1>
            <p className="font-body text-dart-black/70 dark:text-dart-white/70">
              Explore all possible ways to achieve each score in darts
            </p>
          </div>
          <DarkModeToggle />
        </header>

        <DartFilters
          filters={filters}
          showOnlyCheckouts={showOnlyCheckouts}
          hideZeroScores={hideZeroScores}
          onFilterChange={handleFilterChange}
          onCheckoutChange={setShowOnlyCheckouts}
          onHideZeroChange={setHideZeroScores}
          requiredScore={requiredScore}
          onRequiredScoreChange={setRequiredScore}
          secondDartScore={secondDartScore}
          onSecondDartScoreChange={setSecondDartScore}
        />

        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
          <ScoresChart data={filteredData} onBarClick={(data) => setSelectedScore(data.score)} />
          <ScoresList
            scores={filteredData}
            selectedScore={selectedScore}
            onScoreSelect={setSelectedScore}
          />
        </div>

        {selectedScore !== null && (
          <CombinationsDisplay
            score={selectedScore}
            combinations={filteredCombinations(selectedScore)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
