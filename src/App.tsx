import { DartFilters } from './components/DartFilters';
import { ScoresChart } from './components/ScoresChart';
import { ScoresList } from './components/ScoresList';
import { CombinationsDisplay } from './components/CombinationsDisplay';
import { useDartContext } from './hooks/useDartContext';

function App() {
  const {
    selectedScore,
    setSelectedScore,
    filters,
    showOnlyCheckouts,
    filteredData,
    sortedScores,
    filteredCombinations,
    handleFilterChange,
    setShowOnlyCheckouts,
    hideZeroScores,
    setHideZeroScores,
  } = useDartContext();

  return (
    <div className="min-h-screen bg-dart-cream font-body">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="mb-2 font-display text-5xl text-dart-black">Darts Score Combinations</h1>
          <p className="font-body text-dart-black/70">
            Explore all possible ways to achieve each score in darts
          </p>
        </header>

        <DartFilters
          filters={filters}
          showOnlyCheckouts={showOnlyCheckouts}
          hideZeroScores={hideZeroScores}
          onFilterChange={handleFilterChange}
          onCheckoutChange={setShowOnlyCheckouts}
          onHideZeroChange={setHideZeroScores}
        />

        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
          <ScoresChart data={filteredData} onBarClick={(data) => setSelectedScore(data.score)} />
          <ScoresList
            scores={sortedScores}
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
