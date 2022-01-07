export default function distributeSts(stdRepRepeats, altRepRepeats) {
  const standardSpacing = Math.floor(stdRepRepeats / altRepRepeats);
  const leftOver = stdRepRepeats - altRepRepeats * standardSpacing; // might need to adjust what happens here if equal repeats of reg and alt
  console.log("left over", leftOver);

  const edgeRepeats = standardSpacing + leftOver; // number of repeats of the stdRep left at both ends combined

  const firstPortion = Math.floor(edgeRepeats / 2);

  let lastPortion;

  if (edgeRepeats % 2 !== 0) {
    lastPortion = firstPortion + (edgeRepeats % 2);
  } else {
    lastPortion = firstPortion;
  }

  console.log("left over", leftOver);
  console.log("first and last portions", firstPortion, lastPortion);

  return [standardSpacing, firstPortion, lastPortion ];
};