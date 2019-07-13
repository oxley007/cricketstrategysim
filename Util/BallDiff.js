const BallDiff = {
  getpartnershipDiff(ball, over) {
    //totalBalls (70 or 11.4 overs)
    let totalBallsOvers = over * 6;
    let totalBalls = totalBallsOvers + ball;
    return [totalBallsOvers, totalBalls];

},

getpartnershipDiffTotal(quotient) {
  let quotientBalls = Math.floor(quotient/6);
  let remainderAvg = quotient % 6;
  return [quotientBalls, remainderAvg];
},

getLegitBall(ball, runEvents) {
  const ballTotal = runEvents.map(acc => {
    console.log(acc);
  if (acc.runsType.includes('NO-BALL') || acc.runsType.includes('WIDE')) {
    console.log('Hit as an extra');
    return ball = 0;
    //dont add a ball
  }
  else if (acc.runsType.includes('deleted')) {
    //ignore.
    console.log('hit as a deleted ball');
    return ball = 0;
  }
  else {
    console.log(ball + 'hit as a legit ball');
    return ball = 1;
    console.log(ball);
  }
});

return [ballTotal];

},

getWicketCount(runEvents) {
  const countWickets = runEvents.filter(wickets => wickets.wicketEvent === true);
  const totalWickets = countWickets.length;
  console.log(totalWickets);

  return [totalWickets];
},


getOverAndBallSeperation(currentPartnership) {
  let ballSumTruncOver = Math.trunc(currentPartnership);
  console.log(ballSumTruncOver);
  let ballSumBall = currentPartnership % 1
  console.log(ballSumBall);
  let ballsumBallRound = Math.round(ballSumBall * 10);
  console.log(ballsumBallRound);
  let ballSumTruncBall = Math.trunc(ballsumBallRound);
  console.log(ballSumTruncBall);
  return [ballSumTruncOver, ballSumTruncBall];

},

getCurrentPartnsership(highestRunsPartnership, runEvents, firstWicketIndex, secondWicketIndex) {
  let sum = a => a.reduce((acc, item) => acc + item);

  console.log(highestRunsPartnership.length);
  if (!highestRunsPartnership.length) {
      console.log('!highestRunsPartnership.length hit');
      highestRunsPartnership.push(0);
    }

  //Calculate the highest partnership in runsType
  //loop through and log index of each wicket:
  runEvents.map((currElement, index) => {
    console.log(currElement.wicketEvent + ' ' + index);
  if (currElement.wicketEvent === true)
    {
      console.log('should only be hit on a wicket.');
      firstWicketIndex++
      let firstWicketFlag = 1
      console.log("The current iteration is: " + index);
      console.log("The current element is: " + currElement.wicketEvent);


      if (firstWicketIndex === 1) {
        console.log('first index is null');
        firstWicketIndex = 0;
        console.log(firstWicketIndex + ' firstWicketIndex');
        secondWicketIndex = index;
        console.log(secondWicketIndex + ' secondWicketIndex');
        firstWicketFlag = 2;
      }
      else {
        console.log('else do this');
        firstWicketIndex = secondWicketIndex;
        console.log(firstWicketIndex  + ' firstWicketIndex');
        secondWicketIndex = index;
        console.log(secondWicketIndex  + ' secondWicketIndex');
      }

      //Need to change the firstWicketFlag to a firstWicketIndex of more than 1.
      if (firstWicketFlag === 2) {
        firstWicketIndex = 2;
      }


    }
  });


  //Current partnership last wicket + length.
  let totalEvents = runEvents.length;
  let currentHighpartnershipValueRuns = sum(runEvents.slice(secondWicketIndex,totalEvents).map(acc => Number(acc.runsValue)));
  let currentHighpartnershipValueExtras = sum(runEvents.slice(secondWicketIndex,totalEvents).map(acc => Number(acc.runExtras)));
  let currentHighpartnershipValue = currentHighpartnershipValueRuns + currentHighpartnershipValueExtras;
  console.log(currentHighpartnershipValue);

  return [currentHighpartnershipValue];
},

getHighestPartnerships(highestRunsPartnership, runEvents, firstWicketIndex, secondWicketIndex) {

  console.log(highestRunsPartnership.length);
  if (!highestRunsPartnership.length) {
      console.log('!highestRunsPartnership.length hit');
      highestRunsPartnership.push(0);
    }

      let sum = a => a.reduce((acc, item) => acc + item);

  //Calculate the highest partnership in runsType
  //loop through and log index of each wicket:
  runEvents.map((currElement, index) => {
    console.log(currElement.wicketEvent + ' ' + index);
  if (currElement.wicketEvent === true)
    {
      console.log('should only be hit on a wicket.');
      firstWicketIndex++
      let firstWicketFlag = 1
      console.log("The current iteration is: " + index);
      console.log("The current element is: " + currElement.wicketEvent);


      if (firstWicketIndex === 1) {
        console.log('first index is null');
        firstWicketIndex = 0;
        console.log(firstWicketIndex + ' firstWicketIndex');
        secondWicketIndex = index;
        console.log(secondWicketIndex + ' secondWicketIndex');
        firstWicketFlag = 2;
      }
      else {
        console.log('else do this');
        firstWicketIndex = secondWicketIndex;
        console.log(firstWicketIndex  + ' firstWicketIndex');
        secondWicketIndex = index;
        console.log(secondWicketIndex  + ' secondWicketIndex');
      }

      let totalHighpartnershipRunValue = sum(runEvents.slice(firstWicketIndex,secondWicketIndex).map(acc => Number(acc.runsValue)));
      let totalHighpartnershipExtraValue = sum(runEvents.slice(firstWicketIndex,secondWicketIndex).map(acc => Number(acc.runExtras)));
      console.log(totalHighpartnershipRunValue);
      console.log(totalHighpartnershipExtraValue);

      //let totalRuns = sum(runEvents.map(acc => Number(acc.runsValue)));
      let totalHighpartnershipValue = totalHighpartnershipRunValue + totalHighpartnershipExtraValue;
      console.log(totalHighpartnershipValue);

      //Need to change the firstWicketFlag to a firstWicketIndex of more than 1.
      if (firstWicketFlag === 2) {
        firstWicketIndex = 2;
      }


      console.log(highestRunsPartnership);
      //runEvents.slice(secondWicketIndex) acc => Number(acc.runsValue)));
      let highRunPartnershipCheck = Math.max.apply(null, highestRunsPartnership);
      if (totalHighpartnershipValue > highRunPartnershipCheck) {
      highestRunsPartnership.push(totalHighpartnershipValue);
      console.log(highestRunsPartnership);
      }
    }
  });

  //then use max to find highest partenership and store in state.
  let highRunPartnership = Math.max.apply(null, highestRunsPartnership);

  return [highRunPartnership];

},

secondMax(arr) {
  console.log(arr);
let max = Math.max.apply(null, arr); // get the max of the array
arr.splice(arr.indexOf(max), 1); // remove max from the array
console.log(arr);
return Math.max.apply(null, arr); // get the 2nd max
}

}

export default BallDiff;

/*
current 4.4
hightest 11.1

current 4*6 = 24 + 4 = 28balls
highest 11*6 = 66 + 1 = 67ball

67 - 28 = 39
39 goes into 6 x times (6 overs)
get the reminader (3 balls)
need to survive 6.3over to get highest partnetship. boom.
*/
