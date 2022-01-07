import generateReps from "./generateReps.js";
import distributeSts from "./distributeSts.js";
import { expect } from "@jest/globals";

/* 
const starterCount = stdRep * firstPortion;
const centreCount = (altRep + (stdRep * standardSpacing)) *centreRepeatTimes;
const endCount = (stdRep * lastPortion) + altRep;

const totalCount = starterCount + centreCount + endCount;

console.log(starterCount, centreCount, endCount);

console.log('total stitches from instruction data', (starterCount + centreCount + endCount));
*/

function shebang(currentSts, increaseSts) {
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

  return [
    portions,
    stdRep,
    altRep,
    standardSpacing,
    firstPortion,
    lastPortion,
    stdRepRepeats,
    altRepRepeats,
  ];
}

function makeTotal(currentSts, increaseSts) {
  const [
    portions,
    stdRep,
    altRep,
    standardSpacing,
    firstPortion,
    lastPortion,
    ,
    ,
  ] = shebang(currentSts, increaseSts);

  const starterCount = stdRep * firstPortion;
  const centreRepeatTimes =
    (portions - firstPortion - lastPortion - 1) / (standardSpacing + 1);
  const centreCount = (altRep + stdRep * standardSpacing) * centreRepeatTimes;
  const endCount = stdRep * lastPortion + altRep;

  const totalCount = starterCount + centreCount + endCount;

  return totalCount;
}

function totalIncreases(currentSts, increaseSts) {
  const [
    portions,
    stdRep,
    altRep,
    standardSpacing,
    firstPortion,
    lastPortion,
    stdRepRepeats,
    altRepRepeats,
  ] = shebang(currentSts, increaseSts);

  console.log(
    "stdRep",
    stdRep,
    "altRep",
    altRep,
    "standardSpacing",
    standardSpacing,
    "firstPortion",
    firstPortion,
    "lastPortion",
    lastPortion
  );
  return stdRepRepeats + altRepRepeats - 1;


}

test("generateReps returns correct values for portions, stdRep, altRep, altRepRepeats, stdRepRepeats", () => {
  expect(generateReps(100, 20)).toEqual([21, 4, 5, 16, 5]);
});

test("Stitches from the variables that make the instructions string add up to 'current stitches' number", () => {
  expect(makeTotal(100, 20)).toEqual(100);
});

test("Number of M1s add up to the increaseSts variable", () => {
  expect(totalIncreases(100, 20)).toEqual(20);
});
