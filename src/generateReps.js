export default function generateReps(currentSts, increaseSts) {
  const portions = Number(increaseSts) + 1;

  let stdRep = Math.floor(currentSts / portions);

  let altRep = stdRep + 1;

  let altRepRepeats = currentSts - stdRep * portions;

  let stdRepRepeats = portions - altRepRepeats;

  return [portions, stdRep, altRep, altRepRepeats, stdRepRepeats];
};