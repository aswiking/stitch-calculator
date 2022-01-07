import generateReps from "./generateReps.js";
import distributeSts from "./distributeSts.js";

/* 
const starterCount = stdRep * firstPortion;
const centreCount = (altRep + (stdRep * standardSpacing)) *centreRepeatTimes;
const endCount = (stdRep * lastPortion) + altRep;

const totalCount = starterCount + centreCount + endCount;

console.log(starterCount, centreCount, endCount);

console.log('total stitches from instruction data', (starterCount + centreCount + endCount));
*/
test("Stitches from the variables that make the instructions string add up to 'current stitches' number", () => {
  const currentSts = 100;
  const increaseSts = 20;

  let [portions, stdRep, altRep, altRepRepeats, stdRepRepeats] = generateReps(
    currentSts,
    increaseSts
  );

  if (stdRepRepeats < altRepRepeats) {
    // making sure the stdRep is always the one there's more of
    [stdRep, altRep] = [altRep, stdRep];
    [stdRepRepeats, altRepRepeats] = [altRepRepeats, stdRepRepeats];
  }

  let [standardSpacing, firstPortion, lastPortion] = distributeSts(
    stdRepRepeats,
    altRepRepeats
  );

  const starterCount = stdRep * firstPortion;
  const centreRepeatTimes = (portions - firstPortion - lastPortion - 1) / (standardSpacing + 1);
  const centreCount = (altRep + stdRep * standardSpacing) * centreRepeatTimes;
  const endCount = stdRep * lastPortion + altRep;

  const totalCount = starterCount + centreCount + endCount;

  expect(generateReps(100, 20)).toEqual([21, 4, 5, 16, 5]);
});

//[portions, stdRep, altRep, altRepRepeats, stdRepRepeats]
