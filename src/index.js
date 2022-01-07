import generateReps from "./generateReps.js";
import distributeSts from "./distributeSts.js";

$(document).ready(function () {
  $("form").on("submit", function (event) {
    event.preventDefault();

    console.log(event.target["current-number"].value);
    const selected = $("input[type='radio'][name='radio']:checked").val();
    console.log(selected);

    const currentSts = Number(event.target["current-number"].value);
    const increaseSts = Number(event.target["increase-number"].value);

    /* guard statements*/

    if (currentSts < 4 || currentSts > 1000) {
      $("#validation-message-1").show();
      return;
    } else if (currentSts < increaseSts) {
      console.log(currentSts, increaseSts);
      $("#validation-message-2").show();
      return;
    }

    $(".validation-message").hide(); // re-hides validation messages if reached

    // allow for fringe case of currentSts one less than increaseSts
    let [portions, stdRep, altRep, altRepRepeats, stdRepRepeats] = generateReps(
      currentSts,
      increaseSts
    );
    
    if (stdRepRepeats < altRepRepeats) {
      // making sure the stdRep is always the one there's more of
      [stdRep, altRep] = [altRep, stdRep];
      [stdRepRepeats, altRepRepeats] = [altRepRepeats, stdRepRepeats];
    };
     
    let [ standardSpacing, firstPortion, lastPortion ] = distributeSts(
      stdRepRepeats,
      altRepRepeats
    );

    /* Compile into string */

    console.log(stdRep, altRep, altRepRepeats, stdRepRepeats);
    console.log(
      "total sts are",
      stdRep * stdRepRepeats + altRep * altRepRepeats
    );

    const stdRepStr = `K${stdRep}, M1`;

    let startStr;

    if (firstPortion === 0) {
      startStr = "";
    } else {
      startStr = `* K${stdRep}, M1 * repeat ${firstPortion} times`;
    }

    let centreRepsStr = `K${altRep}, M1`;

    for (let i = 0; i < standardSpacing; i++) {
      centreRepsStr += ", ";
      centreRepsStr += stdRepStr;
    }

    const centreRepeatTimes =
      (portions - firstPortion - lastPortion - 1) / (standardSpacing + 1);

    centreRepsStr = `* ${centreRepsStr} * repeat ${centreRepeatTimes} times`;

    const endStr = `K${altRep}, M1, * K${stdRep}, M1 * repeat ${
      lastPortion - 1
    } times, K${stdRep}`;

    console.log(startStr);
    console.log(centreRepsStr);
    console.log(endStr);

    $("#instructions-content").empty(); // makes sure ul is empty before adding lis
    $("#instructions-content")
      .append(`<li>${startStr}</li>`)
      .append(`<li>${centreRepsStr}</li>`)
      .append(`<li>${endStr}</li>`);
    $(".instructions-and-abbreviations").slideDown();

  });
});
