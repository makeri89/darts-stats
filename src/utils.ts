// Create arrays of possible dart scores
const sectors: number[] = Array.from({ length: 20 }, (_, i) => i + 1);
const singles: string[] = [...sectors, 25].map((i) => i.toString());
const doubles: string[] = singles.map((i) => `D${i}`);
const trebles: string[] = singles.slice(0, singles.length - 1).map((i) => `T${i}`);

// Interface for storing combinations
interface ScoreCombination {
  frequency: number;
  combinations: [string, string, string][];
}

// Function to lookup score value
const scoreLookup = (score: string): number => {
  if (score[0] === 'T') {
    return 3 * parseInt(score.slice(1));
  }
  if (score[0] === 'D') {
    return 2 * parseInt(score.slice(1));
  }
  return parseInt(score);
};

// Function to calculate all possible dart combinations
export const calculateDartCombinations = (): { [key: number]: ScoreCombination } => {
  const allPossible: string[] = ['0', ...singles, ...doubles, ...trebles];
  const n: number = allPossible.length;

  const combs: { [key: number]: ScoreCombination } = {};
  const visits: Set<string> = new Set();

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        const first = allPossible[i];
        const second = allPossible[j];
        const third = allPossible[k];

        const firstScore = scoreLookup(first);
        const secondScore = scoreLookup(second);
        const thirdScore = scoreLookup(third);

        const visit = firstScore + secondScore + thirdScore;
        const v = [first, second, third].sort().join('');

        if (!combs[visit]) {
          combs[visit] = {
            frequency: 0,
            combinations: [],
          };
        }

        if (!visits.has(v)) {
          combs[visit].frequency += 1;
          combs[visit].combinations.push([first, second, third]);
          visits.add(v);
        }
      }
    }
  }

  return combs;
};
