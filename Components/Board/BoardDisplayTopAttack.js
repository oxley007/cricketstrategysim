import React, { Component } from 'react';

import { Container, Footer, Text, Button, Icon, H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, View, PixelRatio, Platform, Dimensions, ImageBackground, Easing } from 'react-native';
import { connect } from "react-redux";

import BoardDisplayStrikeRateTop from './BoardDisplayStrikeRateTop';

import LinearGradient from 'react-native-linear-gradient';
import {Animated} from "react-native";
import {useSpring, animated} from 'react-spring'

import { updateGameRuns } from '../../Reducers/gameRuns';
import { updateOver } from '../../Reducers/over';
import { updateGameCards } from '../../Reducers/gameCards';
import { updatePlayers } from '../../Reducers/players';
import { updateFirstInningsRuns } from '../../Reducers/firstInningsRuns';

import CardBoard from '../../Util/CardBoard.js';
import BallDiff from '../../Util/BallDiff.js';

class BoardDisplayTopAttack extends Component {
  constructor (props) {
  super(props)
  //this.springValue = new Animated.Value(0.3)
  this.animatedValue = new Animated.Value(0)
  this.animatedValueAll = new Animated.Value(0)
  this.animatedValueRuns = new Animated.Value(0)
  this.state = {
      stop: 0,
      ballCount: 0,
  };
  }

  state = {
    gameRunEvents: this.props.gameRuns.gameRunEvents || [],
    eventID: this.props.gameRuns.eventID || 0,
    ball: this.props.ball.ball || 0,
    over: this.props.ball.over || 0,
    cardOne: this.props.gameCards.cardOne || 100,
    cardTwo: this.props.gameCards.cardTwo || 100,
    cardOne: this.props.gameCards.cardOne || 100,
    cardTwo: this.props.gameCards.cardTwo || 100,
    runs: this.props.gameCards.runs || 100,
    wicketEvent: this.props.gameCards.wicketEvent || false,
    players: this.props.players.players || [],
    facingBall: this.props.players.facingBall || 1,
    firstInningsRuns: this.props.firstInningsRuns.firstInningsRuns || 0,
    springValue: new Animated.Value(0.3),
    //yAnimation: new Animated.Value(21),
  };

  handleChange = ( gameRuns, ball, gameCards, players, firstInningsRuns ) => {
    this.setState({ gameRuns });
    this.setState({ ball });
    this.setState({ gameCards });
    this.setState({ players });
    this.setState({ firstInningsRuns });
  };

/*
componentDidMount() {
   this.playAnimation();
 }
 */

componentDidUpdate () {
  this.animateRuns()
}


 componentDidMount () {
  this.animate()
  this.animateAll()
  this.animateRuns()
}

animate () {
  this.animatedValue.setValue(0)
  Animated.timing(
    this.animatedValue,
    {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear
    }
  ).start(() => this.animate())
}

animateAll () {
  this.animatedValueAll.setValue(0)
  Animated.timing(
    this.animatedValueAll,
    {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear
    }
  ).start(() => this.animateAll())
}


animateRuns () {
  this.animatedValueRuns.setValue(0)
  Animated.timing(
    this.animatedValueRuns,
    {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
    }).start(() => this.animateRunsStop())
    //Animated.timing(this.animation).stop()
}

animateRunsStop () {
  this.animatedValueRuns.setValue(1)
  Animated.timing(
  this.animatedValueRuns
).stop();
}


/*
animateRuns () {
  //this.animatedValueRuns.setValue(0)
  Animated.timing(
    this.animatedValueRuns,
    {
      toValue: 1,
    }
  ).start()
}
*/


getDisplayRunsTotal() {

  let gameRunEvents = this.props.gameRuns.gameRunEvents;

  let sum = a => a.reduce((acc, item) => acc + item);
  let totalRuns = sum(gameRunEvents.map(acc => Number(acc.runsValue)));
  console.log(totalRuns);

  //Get total wickets
  let getWicketCount = BallDiff.getWicketCount(gameRunEvents);
  let totalWickets = getWicketCount[0];
  console.log(totalWickets);

  //----------calculate overs
  let over = this.props.ball.over;
  let ball = 0;

  let legitBall = BallDiff.getLegitBall(ball, gameRunEvents);
  let ballTotal = legitBall[0];

  ball = sum(ballTotal.map(acc => Number(acc)));

  let totalBallDiff = BallDiff.getpartnershipDiffTotal(ball);
  let totalOver = totalBallDiff[0];

  let totalBall = totalBallDiff[1];
  //---------- end of calularte overs

  return [totalRuns, totalWickets, totalOver, totalBall]
}

displayRequiredRunRate() {
  let gameRunEvents = this.props.gameRuns.gameRunEvents;
  let sum = a => a.reduce((acc, item) => acc + item);

//----------calculate overs
let ball = 0;

let legitBall = BallDiff.getLegitBall(ball, gameRunEvents);
let ballTotal = legitBall[0];
console.log(ballTotal);

ball = sum(ballTotal.map(acc => Number(acc)));
console.log(ball);

const ballsRemaining = 120 - ball;


//Calculate the total runs to go
let totalRuns = sum(gameRunEvents.map(acc => Number(acc.runsValue)));
console.log(totalRuns);

let runsRequired = this.props.firstInningsRuns.firstInningsRuns - totalRuns;
console.log(runsRequired);

const requiredRunRate = (runsRequired / ballsRemaining) * 6;
console.log(requiredRunRate);

/*workout required run rate:
console.log(numberOverValue);
let runRate = totalRuns / numberOverValue;
console.log(runRate);
*/


  const requiredRunRateOneDecimal = parseFloat(requiredRunRate).toFixed(1);
  return [requiredRunRateOneDecimal];

}

  getScorecard = () => {

    const gameRunEvents = this.props.gameRuns.gameRunEvents;
    const players = this.props.players.players;
    const facingBall = this.props.players.facingBall;
    console.log(facingBall);

    let battingStrikeRate = CardBoard.battingStrikeRate(gameRunEvents, players, facingBall);

    const aceAce = battingStrikeRate[0];
    const twoTwo = battingStrikeRate[1];

    const runRateValue = this.displayRequiredRunRate();
    const runRate = runRateValue[0];
    console.log(runRate);

    const display = this.getDisplayRunsTotal();
    const wickets = display[1];
    console.log(wickets);

    const getPressureScore = CardBoard.getPressureScore(runRate, wickets);
    console.log(getPressureScore[0]);
    const pressureScore = getPressureScore[0];
    console.log(pressureScore);

    const getPressureScorePercentage = CardBoard.getPressureScorePercentage(pressureScore);
    const threeThree = getPressureScorePercentage[0];
    const fourFour = getPressureScorePercentage[1];
    const fiveFive = getPressureScorePercentage[2];

    console.log(threeThree);
    console.log(fourFour);
    console.log(fiveFive);

    const getFormScore = CardBoard.getFormScore(players, facingBall, gameRunEvents);
    console.log(getFormScore);
    const formScoreOne = getFormScore[0];
    const formScoreTwo = getFormScore[1];

    if (facingBall === 1) {
      formScore = formScoreOne;
    }
    else {
      formScore = formScoreTwo;
    }
    console.log(formScore);

    const getFormScoreRuns = CardBoard.getFormScoreRuns(formScore, players, facingBall);
    const sixSix = getFormScoreRuns[0];
    const sevenSeven = getFormScoreRuns[1];
    const batterId = getFormScoreRuns[2];

    console.log(sixSix);
    console.log(sevenSeven);

    console.log(batterId);
    console.log(this.props.aggBoardValue);

    let boardRuns = [];

    if ((this.props.aggBoardValue === 1 && batterId <= 5) || (this.props.aggBoardValue === 4 && batterId <= 5)) {

    boardRuns = [
    {
        id: 1, col: 0, run: " ", header: 1
    },
    {
      id: 2, col: 0, run: "A", header: 1
    },
    {
      id: 3, col: 0, run: "2", header: 1
    },
    {
      id: 4, col: 0, run: "3", header: 1
    },
    {
      id: 5, col: 0, run: "4", header: 1
    },
    {
      id: 6, col: 0, run: "5", header: 1
    },
    {
      id: 7, col: 0, run: "6", header: 1
    },
    {
      id: 8, col: 0, run: "7", header: 1
    },
    {
      id: 9, col: 1, run: "A", header: 1
    },
    {
      id: 10, col: 1, run: aceAce, header: 0
    },
    {
      id: 11, col: 1, run: "3", header: 0
    },
    {
      id: 12, col: 1, run: "4", header: 0
    },
    {
      id: 13, col: 1, run: "W", header: 0
    },
    {
      id: 14, col: 1, run: "2", header: 0
    },
    {
      id: 15, col: 1, run: "1", header: 0
    },
    {
      id: 16, col: 1, run: "6", header: 0
    },
    {
      id: 17, col: 2, run: "2", header: 1
    },
    {
      id: 18, col: 2, run: "1", header: 0
    },
    {
      id: 19, col: 2, run: twoTwo, header: 0
    },
    {
      id: 20, col: 2, run: "2", header: 0
    },
    {
      id: 21, col: 2, run: "0", header: 0
    },
    {
      id: 22, col: 2, run: "1", header: 0
    },
    {
      id: 23, col: 2, run: "4", header: 0
    },
    {
      id: 24, col: 2, run: "0", header: 0
    },
    {
      id: 25, col: 3, run: "3", header: 1
    },
    {
      id: 26, col: 3, run: "4", header: 0
    },
    {
      id: 27, col: 3, run: "W", header: 0
    },
    {
      id: 28, col: 3, run: threeThree, header: 0
    },
    {
      id: 29, col: 3, run: "1", header: 0
    },
    {
      id: 30, col: 3, run: "0", header: 0
    },
    {
      id: 31, col: 3, run: "2", header: 0
    },
    {
      id: 32, col: 3, run: "0", header: 0
    },
    {
      id: 33, col: 4, run: "4", header: 1
    },
    {
      id: 34, col: 4, run: "1", header: 0
    },
    {
      id: 35, col: 4, run: "0", header: 0
    },
    {
      id: 36, col: 4, run: "4", header: 0
    },
    {
      id: 37, col: 4, run: fourFour, header: 0
    },
    {
      id: 38, col: 4, run: "6", header: 0
    },
    {
      id: 39, col: 4, run: "1", header: 0
    },
    {
      id: 40, col: 4, run: "4", header: 0
    },
    {
      id: 41, col: 5, run: "5", header: 1
    },
    {
      id: 42, col: 5, run: "0", header: 0
    },
    {
      id: 43, col: 5, run: "2", header: 0
    },
    {
      id: 44, col: 5, run: "0", header: 0
    },
    {
      id: 45, col: 5, run: "4", header: 0
    },
    {
      id: 46, col: 5, run: fiveFive, header: 0
    },
    {
      id: 47, col: 5, run: "1", header: 0
    },
    {
      id: 48, col: 5, run: "W", header: 0
    },
    {
      id: 49, col: 6, run: "6", header: 1
    },
    {
      id: 50, col: 6, run: "0", header: 0
    },
    {
      id: 51, col: 6, run: "2", header: 0
    },
    {
      id: 52, col: 6, run: "1", header: 0
    },
    {
      id: 53, col: 6, run: "0", header: 0
    },
    {
      id: 54, col: 6, run: "1", header: 0
    },
    {
      id: 55, col: 6, run: sixSix, header: 0
    },
    {
      id: 56, col: 6, run: "1", header: 0
    },
    {
      id: 57, col: 7, run: "7", header: 1
    },
    {
      id: 58, col: 7, run: "1", header: 0
    },
    {
      id: 59, col: 7, run: "0", header: 0
    },
    {
      id: 60, col: 7, run: "4", header: 0
    },
    {
      id: 61, col: 7, run: "0", header: 0
    },
    {
      id: 62, col: 7, run: "6", header: 0
    },
    {
      id: 63, col: 7, run: "W", header: 0
    },
    {
      id: 64, col: 7, run: sevenSeven, header: 0
    },
]
}
else if ((this.props.aggBoardValue === 2 && batterId <= 5) || (this.props.aggBoardValue === 5 && batterId <= 5)) {

boardRuns = [
{
    id: 1, col: 0, run: " ", header: 1
},
{
  id: 2, col: 0, run: "A", header: 1
},
{
  id: 3, col: 0, run: "2", header: 1
},
{
  id: 4, col: 0, run: "3", header: 1
},
{
  id: 5, col: 0, run: "4", header: 1
},
{
  id: 6, col: 0, run: "5", header: 1
},
{
  id: 7, col: 0, run: "6", header: 1
},
{
  id: 8, col: 0, run: "7", header: 1
},
{
  id: 9, col: 1, run: "A", header: 1
},
{
  id: 10, col: 1, run: aceAce, header: 0
},
{
  id: 11, col: 1, run: "3", header: 0
},
{
  id: 12, col: 1, run: "1", header: 0
},
{
  id: 13, col: 1, run: "W", header: 0
},
{
  id: 14, col: 1, run: "2", header: 0
},
{
  id: 15, col: 1, run: "1", header: 0
},
{
  id: 16, col: 1, run: "6", header: 0
},
{
  id: 17, col: 2, run: "2", header: 1
},
{
  id: 18, col: 2, run: "1", header: 0
},
{
  id: 19, col: 2, run: twoTwo, header: 0
},
{
  id: 20, col: 2, run: "2", header: 0
},
{
  id: 21, col: 2, run: "0", header: 0
},
{
  id: 22, col: 2, run: "1", header: 0
},
{
  id: 23, col: 2, run: "4", header: 0
},
{
  id: 24, col: 2, run: "0", header: 0
},
{
  id: 25, col: 3, run: "3", header: 1
},
{
  id: 26, col: 3, run: "4", header: 0
},
{
  id: 27, col: 3, run: "0", header: 0
},
{
  id: 28, col: 3, run: threeThree, header: 0
},
{
  id: 29, col: 3, run: "1", header: 0
},
{
  id: 30, col: 3, run: "0", header: 0
},
{
  id: 31, col: 3, run: "2", header: 0
},
{
  id: 32, col: 3, run: "0", header: 0
},
{
  id: 33, col: 4, run: "4", header: 1
},
{
  id: 34, col: 4, run: "1", header: 0
},
{
  id: 35, col: 4, run: "0", header: 0
},
{
  id: 36, col: 4, run: "1", header: 0
},
{
  id: 37, col: 4, run: fourFour, header: 0
},
{
  id: 38, col: 4, run: "2", header: 0
},
{
  id: 39, col: 4, run: "1", header: 0
},
{
  id: 40, col: 4, run: "4", header: 0
},
{
  id: 41, col: 5, run: "5", header: 1
},
{
  id: 42, col: 5, run: "0", header: 0
},
{
  id: 43, col: 5, run: "2", header: 0
},
{
  id: 44, col: 5, run: "0", header: 0
},
{
  id: 45, col: 5, run: "4", header: 0
},
{
  id: 46, col: 5, run: fiveFive, header: 0
},
{
  id: 47, col: 5, run: "1", header: 0
},
{
  id: 48, col: 5, run: "W", header: 0
},
{
  id: 49, col: 6, run: "6", header: 1
},
{
  id: 50, col: 6, run: "0", header: 0
},
{
  id: 51, col: 6, run: "2", header: 0
},
{
  id: 52, col: 6, run: "1", header: 0
},
{
  id: 53, col: 6, run: "0", header: 0
},
{
  id: 54, col: 6, run: "1", header: 0
},
{
  id: 55, col: 6, run: sixSix, header: 0
},
{
  id: 56, col: 6, run: "1", header: 0
},
{
  id: 57, col: 7, run: "7", header: 1
},
{
  id: 58, col: 7, run: "1", header: 0
},
{
  id: 59, col: 7, run: "0", header: 0
},
{
  id: 60, col: 7, run: "2", header: 0
},
{
  id: 61, col: 7, run: "0", header: 0
},
{
  id: 62, col: 7, run: "6", header: 0
},
{
  id: 63, col: 7, run: "W", header: 0
},
{
  id: 64, col: 7, run: sevenSeven, header: 0
},
]
}
else if ((this.props.aggBoardValue === 3 && batterId <= 5) || (this.props.aggBoardValue === 6 && batterId <= 5)) {

boardRuns = [
{
    id: 1, col: 0, run: " ", header: 1
},
{
  id: 2, col: 0, run: "A", header: 1
},
{
  id: 3, col: 0, run: "2", header: 1
},
{
  id: 4, col: 0, run: "3", header: 1
},
{
  id: 5, col: 0, run: "4", header: 1
},
{
  id: 6, col: 0, run: "5", header: 1
},
{
  id: 7, col: 0, run: "6", header: 1
},
{
  id: 8, col: 0, run: "7", header: 1
},
{
  id: 9, col: 1, run: "A", header: 1
},
{
  id: 10, col: 1, run: aceAce, header: 0
},
{
  id: 11, col: 1, run: "1", header: 0
},
{
  id: 12, col: 1, run: "0", header: 0
},
{
  id: 13, col: 1, run: "0", header: 0
},
{
  id: 14, col: 1, run: "2", header: 0
},
{
  id: 15, col: 1, run: "1", header: 0
},
{
  id: 16, col: 1, run: "6", header: 0
},
{
  id: 17, col: 2, run: "2", header: 1
},
{
  id: 18, col: 2, run: "1", header: 0
},
{
  id: 19, col: 2, run: twoTwo, header: 0
},
{
  id: 20, col: 2, run: "2", header: 0
},
{
  id: 21, col: 2, run: "0", header: 0
},
{
  id: 22, col: 2, run: "1", header: 0
},
{
  id: 23, col: 2, run: "4", header: 0
},
{
  id: 24, col: 2, run: "0", header: 0
},
{
  id: 25, col: 3, run: "3", header: 1
},
{
  id: 26, col: 3, run: "4", header: 0
},
{
  id: 27, col: 3, run: "W", header: 0
},
{
  id: 28, col: 3, run: threeThree, header: 0
},
{
  id: 29, col: 3, run: "1", header: 0
},
{
  id: 30, col: 3, run: "0", header: 0
},
{
  id: 31, col: 3, run: "1", header: 0
},
{
  id: 32, col: 3, run: "0", header: 0
},
{
  id: 33, col: 4, run: "4", header: 1
},
{
  id: 34, col: 4, run: "1", header: 0
},
{
  id: 35, col: 4, run: "0", header: 0
},
{
  id: 36, col: 4, run: "0", header: 0
},
{
  id: 37, col: 4, run: fourFour, header: 0
},
{
  id: 38, col: 4, run: "0", header: 0
},
{
  id: 39, col: 4, run: "1", header: 0
},
{
  id: 40, col: 4, run: "4", header: 0
},
{
  id: 41, col: 5, run: "5", header: 1
},
{
  id: 42, col: 5, run: "0", header: 0
},
{
  id: 43, col: 5, run: "2", header: 0
},
{
  id: 44, col: 5, run: "0", header: 0
},
{
  id: 45, col: 5, run: "4", header: 0
},
{
  id: 46, col: 5, run: fiveFive, header: 0
},
{
  id: 47, col: 5, run: "1", header: 0
},
{
  id: 48, col: 5, run: "0", header: 0
},
{
  id: 49, col: 6, run: "6", header: 1
},
{
  id: 50, col: 6, run: "0", header: 0
},
{
  id: 51, col: 6, run: "1", header: 0
},
{
  id: 52, col: 6, run: "0", header: 0
},
{
  id: 53, col: 6, run: "0", header: 0
},
{
  id: 54, col: 6, run: "1", header: 0
},
{
  id: 55, col: 6, run: sixSix, header: 0
},
{
  id: 56, col: 6, run: "1", header: 0
},
{
  id: 57, col: 7, run: "7", header: 1
},
{
  id: 58, col: 7, run: "1", header: 0
},
{
  id: 59, col: 7, run: "0", header: 0
},
{
  id: 60, col: 7, run: "4", header: 0
},
{
  id: 61, col: 7, run: "0", header: 0
},
{
  id: 62, col: 7, run: "0", header: 0
},
{
  id: 63, col: 7, run: "W", header: 0
},
{
  id: 64, col: 7, run: sevenSeven, header: 0
},
]
}
else if ((this.props.aggBoardValue === 1 && batterId <= 8) || (this.props.aggBoardValue === 4 && batterId <= 8)) {

boardRuns = [
{
    id: 1, col: 0, run: " ", header: 1
},
{
  id: 2, col: 0, run: "A", header: 1
},
{
  id: 3, col: 0, run: "2", header: 1
},
{
  id: 4, col: 0, run: "3", header: 1
},
{
  id: 5, col: 0, run: "4", header: 1
},
{
  id: 6, col: 0, run: "5", header: 1
},
{
  id: 7, col: 0, run: "6", header: 1
},
{
  id: 8, col: 0, run: "7", header: 1
},
{
  id: 9, col: 1, run: "A", header: 1
},
{
  id: 10, col: 1, run: aceAce, header: 0
},
{
  id: 11, col: 1, run: "3", header: 0
},
{
  id: 12, col: 1, run: "4", header: 0
},
{
  id: 13, col: 1, run: "W", header: 0
},
{
  id: 14, col: 1, run: "2", header: 0
},
{
  id: 15, col: 1, run: "1", header: 0
},
{
  id: 16, col: 1, run: "6", header: 0
},
{
  id: 17, col: 2, run: "2", header: 1
},
{
  id: 18, col: 2, run: "1", header: 0
},
{
  id: 19, col: 2, run: twoTwo, header: 0
},
{
  id: 20, col: 2, run: "2", header: 0
},
{
  id: 21, col: 2, run: "0", header: 0
},
{
  id: 22, col: 2, run: "1", header: 0
},
{
  id: 23, col: 2, run: "4", header: 0
},
{
  id: 24, col: 2, run: "0", header: 0
},
{
  id: 25, col: 3, run: "3", header: 1
},
{
  id: 26, col: 3, run: "4", header: 0
},
{
  id: 27, col: 3, run: "W", header: 0
},
{
  id: 28, col: 3, run: threeThree, header: 0
},
{
  id: 29, col: 3, run: "1", header: 0
},
{
  id: 30, col: 3, run: "0", header: 0
},
{
  id: 31, col: 3, run: "2", header: 0
},
{
  id: 32, col: 3, run: "0", header: 0
},
{
  id: 33, col: 4, run: "4", header: 1
},
{
  id: 34, col: 4, run: "1", header: 0
},
{
  id: 35, col: 4, run: "0", header: 0
},
{
  id: 36, col: 4, run: "W", header: 0
},
{
  id: 37, col: 4, run: fourFour, header: 0
},
{
  id: 38, col: 4, run: "6", header: 0
},
{
  id: 39, col: 4, run: "1", header: 0
},
{
  id: 40, col: 4, run: "4", header: 0
},
{
  id: 41, col: 5, run: "5", header: 1
},
{
  id: 42, col: 5, run: "4", header: 0
},
{
  id: 43, col: 5, run: "2", header: 0
},
{
  id: 44, col: 5, run: "6", header: 0
},
{
  id: 45, col: 5, run: "4", header: 0
},
{
  id: 46, col: 5, run: fiveFive, header: 0
},
{
  id: 47, col: 5, run: "1", header: 0
},
{
  id: 48, col: 5, run: "W", header: 0
},
{
  id: 49, col: 6, run: "6", header: 1
},
{
  id: 50, col: 6, run: "0", header: 0
},
{
  id: 51, col: 6, run: "0", header: 0
},
{
  id: 52, col: 6, run: "1", header: 0
},
{
  id: 53, col: 6, run: "W", header: 0
},
{
  id: 54, col: 6, run: "4", header: 0
},
{
  id: 55, col: 6, run: sixSix, header: 0
},
{
  id: 56, col: 6, run: "1", header: 0
},
{
  id: 57, col: 7, run: "7", header: 1
},
{
  id: 58, col: 7, run: "1", header: 0
},
{
  id: 59, col: 7, run: "0", header: 0
},
{
  id: 60, col: 7, run: "4", header: 0
},
{
  id: 61, col: 7, run: "0", header: 0
},
{
  id: 62, col: 7, run: "6", header: 0
},
{
  id: 63, col: 7, run: "W", header: 0
},
{
  id: 64, col: 7, run: sevenSeven, header: 0
},
]
}
else if ((this.props.aggBoardValue === 2 && batterId <= 8) || (this.props.aggBoardValue === 5 && batterId <= 8)) {

boardRuns = [
{
    id: 1, col: 0, run: " ", header: 1
},
{
  id: 2, col: 0, run: "A", header: 1
},
{
  id: 3, col: 0, run: "2", header: 1
},
{
  id: 4, col: 0, run: "3", header: 1
},
{
  id: 5, col: 0, run: "4", header: 1
},
{
  id: 6, col: 0, run: "5", header: 1
},
{
  id: 7, col: 0, run: "6", header: 1
},
{
  id: 8, col: 0, run: "7", header: 1
},
{
  id: 9, col: 1, run: "A", header: 1
},
{
  id: 10, col: 1, run: aceAce, header: 0
},
{
  id: 11, col: 1, run: "1", header: 0
},
{
  id: 12, col: 1, run: "4", header: 0
},
{
  id: 13, col: 1, run: "W", header: 0
},
{
  id: 14, col: 1, run: "2", header: 0
},
{
  id: 15, col: 1, run: "1", header: 0
},
{
  id: 16, col: 1, run: "6", header: 0
},
{
  id: 17, col: 2, run: "2", header: 1
},
{
  id: 18, col: 2, run: "1", header: 0
},
{
  id: 19, col: 2, run: twoTwo, header: 0
},
{
  id: 20, col: 2, run: "2", header: 0
},
{
  id: 21, col: 2, run: "0", header: 0
},
{
  id: 22, col: 2, run: "1", header: 0
},
{
  id: 23, col: 2, run: "0", header: 0
},
{
  id: 24, col: 2, run: "0", header: 0
},
{
  id: 25, col: 3, run: "3", header: 1
},
{
  id: 26, col: 3, run: "0", header: 0
},
{
  id: 27, col: 3, run: "W", header: 0
},
{
  id: 28, col: 3, run: threeThree, header: 0
},
{
  id: 29, col: 3, run: "1", header: 0
},
{
  id: 30, col: 3, run: "0", header: 0
},
{
  id: 31, col: 3, run: "2", header: 0
},
{
  id: 32, col: 3, run: "1", header: 0
},
{
  id: 33, col: 4, run: "4", header: 1
},
{
  id: 34, col: 4, run: "1", header: 0
},
{
  id: 35, col: 4, run: "0", header: 0
},
{
  id: 36, col: 4, run: "1", header: 0
},
{
  id: 37, col: 4, run: fourFour, header: 0
},
{
  id: 38, col: 4, run: "6", header: 0
},
{
  id: 39, col: 4, run: "1", header: 0
},
{
  id: 40, col: 4, run: "4", header: 0
},
{
  id: 41, col: 5, run: "5", header: 1
},
{
  id: 42, col: 5, run: "4", header: 0
},
{
  id: 43, col: 5, run: "2", header: 0
},
{
  id: 44, col: 5, run: "1", header: 0
},
{
  id: 45, col: 5, run: "1", header: 0
},
{
  id: 46, col: 5, run: fiveFive, header: 0
},
{
  id: 47, col: 5, run: "1", header: 0
},
{
  id: 48, col: 5, run: "W", header: 0
},
{
  id: 49, col: 6, run: "6", header: 1
},
{
  id: 50, col: 6, run: "0", header: 0
},
{
  id: 51, col: 6, run: "1", header: 0
},
{
  id: 52, col: 6, run: "1", header: 0
},
{
  id: 53, col: 6, run: "0", header: 0
},
{
  id: 54, col: 6, run: "4", header: 0
},
{
  id: 55, col: 6, run: sixSix, header: 0
},
{
  id: 56, col: 6, run: "1", header: 0
},
{
  id: 57, col: 7, run: "7", header: 1
},
{
  id: 58, col: 7, run: "1", header: 0
},
{
  id: 59, col: 7, run: "0", header: 0
},
{
  id: 60, col: 7, run: "4", header: 0
},
{
  id: 61, col: 7, run: "0", header: 0
},
{
  id: 62, col: 7, run: "6", header: 0
},
{
  id: 63, col: 7, run: "W", header: 0
},
{
  id: 64, col: 7, run: sevenSeven, header: 0
},
]
}
else if ((this.props.aggBoardValue === 3 && batterId <= 8) || (this.props.aggBoardValue === 6 && batterId <= 8)) {

boardRuns = [
{
    id: 1, col: 0, run: " ", header: 1
},
{
  id: 2, col: 0, run: "A", header: 1
},
{
  id: 3, col: 0, run: "2", header: 1
},
{
  id: 4, col: 0, run: "3", header: 1
},
{
  id: 5, col: 0, run: "4", header: 1
},
{
  id: 6, col: 0, run: "5", header: 1
},
{
  id: 7, col: 0, run: "6", header: 1
},
{
  id: 8, col: 0, run: "7", header: 1
},
{
  id: 9, col: 1, run: "A", header: 1
},
{
  id: 10, col: 1, run: aceAce, header: 0
},
{
  id: 11, col: 1, run: "1", header: 0
},
{
  id: 12, col: 1, run: "4", header: 0
},
{
  id: 13, col: 1, run: "W", header: 0
},
{
  id: 14, col: 1, run: "2", header: 0
},
{
  id: 15, col: 1, run: "0", header: 0
},
{
  id: 16, col: 1, run: "1", header: 0
},
{
  id: 17, col: 2, run: "2", header: 1
},
{
  id: 18, col: 2, run: "1", header: 0
},
{
  id: 19, col: 2, run: twoTwo, header: 0
},
{
  id: 20, col: 2, run: "2", header: 0
},
{
  id: 21, col: 2, run: "0", header: 0
},
{
  id: 22, col: 2, run: "1", header: 0
},
{
  id: 23, col: 2, run: "4", header: 0
},
{
  id: 24, col: 2, run: "0", header: 0
},
{
  id: 25, col: 3, run: "3", header: 1
},
{
  id: 26, col: 3, run: "4", header: 0
},
{
  id: 27, col: 3, run: "0", header: 0
},
{
  id: 28, col: 3, run: threeThree, header: 0
},
{
  id: 29, col: 3, run: "1", header: 0
},
{
  id: 30, col: 3, run: "0", header: 0
},
{
  id: 31, col: 3, run: "2", header: 0
},
{
  id: 32, col: 3, run: "0", header: 0
},
{
  id: 33, col: 4, run: "4", header: 1
},
{
  id: 34, col: 4, run: "0", header: 0
},
{
  id: 35, col: 4, run: "0", header: 0
},
{
  id: 36, col: 4, run: "W", header: 0
},
{
  id: 37, col: 4, run: fourFour, header: 0
},
{
  id: 38, col: 4, run: "6", header: 0
},
{
  id: 39, col: 4, run: "0", header: 0
},
{
  id: 40, col: 4, run: "1", header: 0
},
{
  id: 41, col: 5, run: "5", header: 1
},
{
  id: 42, col: 5, run: "4", header: 0
},
{
  id: 43, col: 5, run: "0", header: 0
},
{
  id: 44, col: 5, run: "1", header: 0
},
{
  id: 45, col: 5, run: "1", header: 0
},
{
  id: 46, col: 5, run: fiveFive, header: 0
},
{
  id: 47, col: 5, run: "1", header: 0
},
{
  id: 48, col: 5, run: "0", header: 0
},
{
  id: 49, col: 6, run: "6", header: 1
},
{
  id: 50, col: 6, run: "0", header: 0
},
{
  id: 51, col: 6, run: "1", header: 0
},
{
  id: 52, col: 6, run: "0", header: 0
},
{
  id: 53, col: 6, run: "W", header: 0
},
{
  id: 54, col: 6, run: "2", header: 0
},
{
  id: 55, col: 6, run: sixSix, header: 0
},
{
  id: 56, col: 6, run: "1", header: 0
},
{
  id: 57, col: 7, run: "7", header: 1
},
{
  id: 58, col: 7, run: "1", header: 0
},
{
  id: 59, col: 7, run: "0", header: 0
},
{
  id: 60, col: 7, run: "4", header: 0
},
{
  id: 61, col: 7, run: "0", header: 0
},
{
  id: 62, col: 7, run: "1", header: 0
},
{
  id: 63, col: 7, run: "0", header: 0
},
{
  id: 64, col: 7, run: sevenSeven, header: 0
},
]
}
else if ((this.props.aggBoardValue === 1 && batterId > 8) || (this.props.aggBoardValue === 4 && batterId > 8)) {

boardRuns = [
{
    id: 1, col: 0, run: " ", header: 1
},
{
  id: 2, col: 0, run: "A", header: 1
},
{
  id: 3, col: 0, run: "2", header: 1
},
{
  id: 4, col: 0, run: "3", header: 1
},
{
  id: 5, col: 0, run: "4", header: 1
},
{
  id: 6, col: 0, run: "5", header: 1
},
{
  id: 7, col: 0, run: "6", header: 1
},
{
  id: 8, col: 0, run: "7", header: 1
},
{
  id: 9, col: 1, run: "A", header: 1
},
{
  id: 10, col: 1, run: aceAce, header: 0
},
{
  id: 11, col: 1, run: "3", header: 0
},
{
  id: 12, col: 1, run: "0", header: 0
},
{
  id: 13, col: 1, run: "W", header: 0
},
{
  id: 14, col: 1, run: "2", header: 0
},
{
  id: 15, col: 1, run: "1", header: 0
},
{
  id: 16, col: 1, run: "6", header: 0
},
{
  id: 17, col: 2, run: "2", header: 1
},
{
  id: 18, col: 2, run: "1", header: 0
},
{
  id: 19, col: 2, run: twoTwo, header: 0
},
{
  id: 20, col: 2, run: "2", header: 0
},
{
  id: 21, col: 2, run: "0", header: 0
},
{
  id: 22, col: 2, run: "W", header: 0
},
{
  id: 23, col: 2, run: "4", header: 0
},
{
  id: 24, col: 2, run: "0", header: 0
},
{
  id: 25, col: 3, run: "3", header: 1
},
{
  id: 26, col: 3, run: "4", header: 0
},
{
  id: 27, col: 3, run: "W", header: 0
},
{
  id: 28, col: 3, run: threeThree, header: 0
},
{
  id: 29, col: 3, run: "1", header: 0
},
{
  id: 30, col: 3, run: "0", header: 0
},
{
  id: 31, col: 3, run: "2", header: 0
},
{
  id: 32, col: 3, run: "0", header: 0
},
{
  id: 33, col: 4, run: "4", header: 1
},
{
  id: 34, col: 4, run: "1", header: 0
},
{
  id: 35, col: 4, run: "0", header: 0
},
{
  id: 36, col: 4, run: "W", header: 0
},
{
  id: 37, col: 4, run: fourFour, header: 0
},
{
  id: 38, col: 4, run: "0", header: 0
},
{
  id: 39, col: 4, run: "1", header: 0
},
{
  id: 40, col: 4, run: "4", header: 0
},
{
  id: 41, col: 5, run: "5", header: 1
},
{
  id: 42, col: 5, run: "0", header: 0
},
{
  id: 43, col: 5, run: "2", header: 0
},
{
  id: 44, col: 5, run: "6", header: 0
},
{
  id: 45, col: 5, run: "4", header: 0
},
{
  id: 46, col: 5, run: fiveFive, header: 0
},
{
  id: 47, col: 5, run: "1", header: 0
},
{
  id: 48, col: 5, run: "W", header: 0
},
{
  id: 49, col: 6, run: "6", header: 1
},
{
  id: 50, col: 6, run: "0", header: 0
},
{
  id: 51, col: 6, run: "4", header: 0
},
{
  id: 52, col: 6, run: "1", header: 0
},
{
  id: 53, col: 6, run: "W", header: 0
},
{
  id: 54, col: 6, run: "0", header: 0
},
{
  id: 55, col: 6, run: sixSix, header: 0
},
{
  id: 56, col: 6, run: "1", header: 0
},
{
  id: 57, col: 7, run: "7", header: 1
},
{
  id: 58, col: 7, run: "1", header: 0
},
{
  id: 59, col: 7, run: "0", header: 0
},
{
  id: 60, col: 7, run: "4", header: 0
},
{
  id: 61, col: 7, run: "0", header: 0
},
{
  id: 62, col: 7, run: "6", header: 0
},
{
  id: 63, col: 7, run: "W", header: 0
},
{
  id: 64, col: 7, run: sevenSeven, header: 0
},
]
}
else if ((this.props.aggBoardValue === 2 && batterId > 8) || (this.props.aggBoardValue === 5 && batterId > 8)) {

boardRuns = [
{
    id: 1, col: 0, run: " ", header: 1
},
{
  id: 2, col: 0, run: "A", header: 1
},
{
  id: 3, col: 0, run: "2", header: 1
},
{
  id: 4, col: 0, run: "3", header: 1
},
{
  id: 5, col: 0, run: "4", header: 1
},
{
  id: 6, col: 0, run: "5", header: 1
},
{
  id: 7, col: 0, run: "6", header: 1
},
{
  id: 8, col: 0, run: "7", header: 1
},
{
  id: 9, col: 1, run: "A", header: 1
},
{
  id: 10, col: 1, run: aceAce, header: 0
},
{
  id: 11, col: 1, run: "2", header: 0
},
{
  id: 12, col: 1, run: "0", header: 0
},
{
  id: 13, col: 1, run: "W", header: 0
},
{
  id: 14, col: 1, run: "2", header: 0
},
{
  id: 15, col: 1, run: "1", header: 0
},
{
  id: 16, col: 1, run: "6", header: 0
},
{
  id: 17, col: 2, run: "2", header: 1
},
{
  id: 18, col: 2, run: "1", header: 0
},
{
  id: 19, col: 2, run: twoTwo, header: 0
},
{
  id: 20, col: 2, run: "2", header: 0
},
{
  id: 21, col: 2, run: "0", header: 0
},
{
  id: 22, col: 2, run: "W", header: 0
},
{
  id: 23, col: 2, run: "2", header: 0
},
{
  id: 24, col: 2, run: "0", header: 0
},
{
  id: 25, col: 3, run: "3", header: 1
},
{
  id: 26, col: 3, run: "4", header: 0
},
{
  id: 27, col: 3, run: "W", header: 0
},
{
  id: 28, col: 3, run: threeThree, header: 0
},
{
  id: 29, col: 3, run: "1", header: 0
},
{
  id: 30, col: 3, run: "0", header: 0
},
{
  id: 31, col: 3, run: "2", header: 0
},
{
  id: 32, col: 3, run: "0", header: 0
},
{
  id: 33, col: 4, run: "4", header: 1
},
{
  id: 34, col: 4, run: "1", header: 0
},
{
  id: 35, col: 4, run: "0", header: 0
},
{
  id: 36, col: 4, run: "1", header: 0
},
{
  id: 37, col: 4, run: fourFour, header: 0
},
{
  id: 38, col: 4, run: "0", header: 0
},
{
  id: 39, col: 4, run: "1", header: 0
},
{
  id: 40, col: 4, run: "4", header: 0
},
{
  id: 41, col: 5, run: "5", header: 1
},
{
  id: 42, col: 5, run: "0", header: 0
},
{
  id: 43, col: 5, run: "2", header: 0
},
{
  id: 44, col: 5, run: "6", header: 0
},
{
  id: 45, col: 5, run: "1", header: 0
},
{
  id: 46, col: 5, run: fiveFive, header: 0
},
{
  id: 47, col: 5, run: "1", header: 0
},
{
  id: 48, col: 5, run: "W", header: 0
},
{
  id: 49, col: 6, run: "6", header: 1
},
{
  id: 50, col: 6, run: "0", header: 0
},
{
  id: 51, col: 6, run: "4", header: 0
},
{
  id: 52, col: 6, run: "1", header: 0
},
{
  id: 53, col: 6, run: "1", header: 0
},
{
  id: 54, col: 6, run: "0", header: 0
},
{
  id: 55, col: 6, run: sixSix, header: 0
},
{
  id: 56, col: 6, run: "1", header: 0
},
{
  id: 57, col: 7, run: "7", header: 1
},
{
  id: 58, col: 7, run: "1", header: 0
},
{
  id: 59, col: 7, run: "0", header: 0
},
{
  id: 60, col: 7, run: "4", header: 0
},
{
  id: 61, col: 7, run: "0", header: 0
},
{
  id: 62, col: 7, run: "1", header: 0
},
{
  id: 63, col: 7, run: "W", header: 0
},
{
  id: 64, col: 7, run: sevenSeven, header: 0
},
]
}
else if ((this.props.aggBoardValue === 3 && batterId > 8) || (this.props.aggBoardValue === 6 && batterId > 8)) {

boardRuns = [
{
    id: 1, col: 0, run: " ", header: 1
},
{
  id: 2, col: 0, run: "A", header: 1
},
{
  id: 3, col: 0, run: "2", header: 1
},
{
  id: 4, col: 0, run: "3", header: 1
},
{
  id: 5, col: 0, run: "4", header: 1
},
{
  id: 6, col: 0, run: "5", header: 1
},
{
  id: 7, col: 0, run: "6", header: 1
},
{
  id: 8, col: 0, run: "7", header: 1
},
{
  id: 9, col: 1, run: "A", header: 1
},
{
  id: 10, col: 1, run: aceAce, header: 0
},
{
  id: 11, col: 1, run: "1", header: 0
},
{
  id: 12, col: 1, run: "1", header: 0
},
{
  id: 13, col: 1, run: "W", header: 0
},
{
  id: 14, col: 1, run: "2", header: 0
},
{
  id: 15, col: 1, run: "1", header: 0
},
{
  id: 16, col: 1, run: "1", header: 0
},
{
  id: 17, col: 2, run: "2", header: 1
},
{
  id: 18, col: 2, run: "1", header: 0
},
{
  id: 19, col: 2, run: twoTwo, header: 0
},
{
  id: 20, col: 2, run: "1", header: 0
},
{
  id: 21, col: 2, run: "0", header: 0
},
{
  id: 22, col: 2, run: "0", header: 0
},
{
  id: 23, col: 2, run: "4", header: 0
},
{
  id: 24, col: 2, run: "0", header: 0
},
{
  id: 25, col: 3, run: "3", header: 1
},
{
  id: 26, col: 3, run: "0", header: 0
},
{
  id: 27, col: 3, run: "W", header: 0
},
{
  id: 28, col: 3, run: threeThree, header: 0
},
{
  id: 29, col: 3, run: "1", header: 0
},
{
  id: 30, col: 3, run: "0", header: 0
},
{
  id: 31, col: 3, run: "2", header: 0
},
{
  id: 32, col: 3, run: "0", header: 0
},
{
  id: 33, col: 4, run: "4", header: 1
},
{
  id: 34, col: 4, run: "1", header: 0
},
{
  id: 35, col: 4, run: "0", header: 0
},
{
  id: 36, col: 4, run: "1", header: 0
},
{
  id: 37, col: 4, run: fourFour, header: 0
},
{
  id: 38, col: 4, run: "1", header: 0
},
{
  id: 39, col: 4, run: "0", header: 0
},
{
  id: 40, col: 4, run: "1", header: 0
},
{
  id: 41, col: 5, run: "5", header: 1
},
{
  id: 42, col: 5, run: "1", header: 0
},
{
  id: 43, col: 5, run: "2", header: 0
},
{
  id: 44, col: 5, run: "0", header: 0
},
{
  id: 45, col: 5, run: "1", header: 0
},
{
  id: 46, col: 5, run: fiveFive, header: 0
},
{
  id: 47, col: 5, run: "1", header: 0
},
{
  id: 48, col: 5, run: "0", header: 0
},
{
  id: 49, col: 6, run: "6", header: 1
},
{
  id: 50, col: 6, run: "0", header: 0
},
{
  id: 51, col: 6, run: "0", header: 0
},
{
  id: 52, col: 6, run: "1", header: 0
},
{
  id: 53, col: 6, run: "W", header: 0
},
{
  id: 54, col: 6, run: "2", header: 0
},
{
  id: 55, col: 6, run: sixSix, header: 0
},
{
  id: 56, col: 6, run: "1", header: 0
},
{
  id: 57, col: 7, run: "7", header: 1
},
{
  id: 58, col: 7, run: "1", header: 0
},
{
  id: 59, col: 7, run: "0", header: 0
},
{
  id: 60, col: 7, run: "4", header: 0
},
{
  id: 61, col: 7, run: "0", header: 0
},
{
  id: 62, col: 7, run: "1", header: 0
},
{
  id: 63, col: 7, run: "0", header: 0
},
{
  id: 64, col: 7, run: sevenSeven, header: 0
},
]
}
else {
  boardRuns = [
  {
      id: 1, col: 0, run: " ", header: 1
  },
  {
    id: 2, col: 0, run: "A", header: 1
  },
  {
    id: 3, col: 0, run: "2", header: 1
  },
  {
    id: 4, col: 0, run: "3", header: 1
  },
  {
    id: 5, col: 0, run: "4", header: 1
  },
  {
    id: 6, col: 0, run: "5", header: 1
  },
  {
    id: 7, col: 0, run: "6", header: 1
  },
  {
    id: 8, col: 0, run: "7", header: 1
  },
  {
    id: 9, col: 1, run: "A", header: 1
  },
  {
    id: 10, col: 1, run: aceAce, header: 0
  },
  {
    id: 11, col: 1, run: "3", header: 0
  },
  {
    id: 12, col: 1, run: "4", header: 0
  },
  {
    id: 13, col: 1, run: "W", header: 0
  },
  {
    id: 14, col: 1, run: "2", header: 0
  },
  {
    id: 15, col: 1, run: "1", header: 0
  },
  {
    id: 16, col: 1, run: "6", header: 0
  },
  {
    id: 17, col: 2, run: "2", header: 1
  },
  {
    id: 18, col: 2, run: "1", header: 0
  },
  {
    id: 19, col: 2, run: twoTwo, header: 0
  },
  {
    id: 20, col: 2, run: "2", header: 0
  },
  {
    id: 21, col: 2, run: "0", header: 0
  },
  {
    id: 22, col: 2, run: "1", header: 0
  },
  {
    id: 23, col: 2, run: "4", header: 0
  },
  {
    id: 24, col: 2, run: "0", header: 0
  },
  {
    id: 25, col: 3, run: "3", header: 1
  },
  {
    id: 26, col: 3, run: "4", header: 0
  },
  {
    id: 27, col: 3, run: "W", header: 0
  },
  {
    id: 28, col: 3, run: threeThree, header: 0
  },
  {
    id: 29, col: 3, run: "1", header: 0
  },
  {
    id: 30, col: 3, run: "0", header: 0
  },
  {
    id: 31, col: 3, run: "2", header: 0
  },
  {
    id: 32, col: 3, run: "0", header: 0
  },
  {
    id: 33, col: 4, run: "4", header: 1
  },
  {
    id: 34, col: 4, run: "1", header: 0
  },
  {
    id: 35, col: 4, run: "0", header: 0
  },
  {
    id: 36, col: 4, run: "4", header: 0
  },
  {
    id: 37, col: 4, run: fourFour, header: 0
  },
  {
    id: 38, col: 4, run: "6", header: 0
  },
  {
    id: 39, col: 4, run: "1", header: 0
  },
  {
    id: 40, col: 4, run: "4", header: 0
  },
  {
    id: 41, col: 5, run: "5", header: 1
  },
  {
    id: 42, col: 5, run: "0", header: 0
  },
  {
    id: 43, col: 5, run: "2", header: 0
  },
  {
    id: 44, col: 5, run: "0", header: 0
  },
  {
    id: 45, col: 5, run: "4", header: 0
  },
  {
    id: 46, col: 5, run: fiveFive, header: 0
  },
  {
    id: 47, col: 5, run: "1", header: 0
  },
  {
    id: 48, col: 5, run: "W", header: 0
  },
  {
    id: 49, col: 6, run: "6", header: 1
  },
  {
    id: 50, col: 6, run: "0", header: 0
  },
  {
    id: 51, col: 6, run: "2", header: 0
  },
  {
    id: 52, col: 6, run: "1", header: 0
  },
  {
    id: 53, col: 6, run: "0", header: 0
  },
  {
    id: 54, col: 6, run: "1", header: 0
  },
  {
    id: 55, col: 6, run: sixSix, header: 0
  },
  {
    id: 56, col: 6, run: "1", header: 0
  },
  {
    id: 57, col: 7, run: "7", header: 1
  },
  {
    id: 58, col: 7, run: "1", header: 0
  },
  {
    id: 59, col: 7, run: "0", header: 0
  },
  {
    id: 60, col: 7, run: "4", header: 0
  },
  {
    id: 61, col: 7, run: "0", header: 0
  },
  {
    id: 62, col: 7, run: "6", header: 0
  },
  {
    id: 63, col: 7, run: "W", header: 0
  },
  {
    id: 64, col: 7, run: sevenSeven, header: 0
  },
]
}

console.log(this.props.gameCards.cardOne);
console.log(this.props.gameCards.cardTwo);
console.log(this.props.gameCards.runs);
console.log(this.props.gameCards.wicketEvent);

const cardTwo = this.props.gameCards.cardTwo;
const runs = this.props.gameCards.runs;

if (cardTwo === 100 && this.props.overPageFlag != true) {

if (this.props.gameCards.cardOne === 0 || this.props.gameCards.cardOne === 7 || this.props.gameCards.cardOne === 14 || this.props.gameCards.cardOne === 21 && this.props.overPageFlag != true) {



  let colZero = boardRuns.map((data, index) => {
      if (data.col === 0) {
          return (
              <Row style={styles.CardValueSquare}>
                <Text style={styles.rundValueText}>{data.run}</Text>
              </Row>
        )
        }
      })

      let colOne = boardRuns.map((data, index) => {
        const getRow = this.getRow(data, index, 1);
        return (getRow)
          })

          let colTwo = boardRuns.map((data, index) => {
            const getOpacity = this.getOpacity(data, index, 2);
            return (getOpacity)
      })

      let colThree = boardRuns.map((data, index) => {
        const getOpacity = this.getOpacity(data, index, 3);
        return (getOpacity)
          })

          let colFour = boardRuns.map((data, index) => {
            const getOpacity = this.getOpacity(data, index, 4);
            return (getOpacity)
              })

              let colFive = boardRuns.map((data, index) => {
                const getOpacity = this.getOpacity(data, index, 5);
                return (getOpacity)
                  })

                  let colSix = boardRuns.map((data, index) => {
                    const getOpacity = this.getOpacity(data, index, 6);
                    return (getOpacity)
                      })

                      let colSeven = boardRuns.map((data, index) => {
                        const getOpacity = this.getOpacity(data, index, 7);
                        return (getOpacity)
                          })

                return (

                  <Grid>
                    <Col>{colZero}</Col>
                    <Col>{colOne}</Col>
                    <Col>{colTwo}</Col>
                    <Col>{colThree}</Col>
                    <Col>{colFour}</Col>
                    <Col>{colFive}</Col>
                    <Col>{colSix}</Col>
                    <Col>{colSeven}</Col>
                  </Grid>
                )
}
else if (this.props.gameCards.cardOne === 1 || this.props.gameCards.cardOne === 8 || this.props.gameCards.cardOne === 15 || this.props.gameCards.cardOne === 22 && this.props.overPageFlag != true) {


  let colZero = boardRuns.map((data, index) => {
      if (data.col === 0) {
          return (
              <Row style={styles.CardValueSquare}>
                <Text style={styles.rundValueText}>{data.run}</Text>
              </Row>
        )
        }
      })

      let colOne = boardRuns.map((data, index) => {
        const getOpacity = this.getOpacity(data, index, 1);
        return (getOpacity)
          })

          let colTwo = boardRuns.map((data, index) => {
            const getRow = this.getRow(data, index, 2);
            return (getRow)
              })

              let colThree = boardRuns.map((data, index) => {
                const getOpacity = this.getOpacity(data, index, 3);
                return (getOpacity)
                })

                  let colFour = boardRuns.map((data, index) => {
                    const getOpacity = this.getOpacity(data, index, 4);
                    return (getOpacity)
                      })

                      let colFive = boardRuns.map((data, index) => {
                        const getOpacity = this.getOpacity(data, index, 5);
                        return (getOpacity)
                          })

                          let colSix = boardRuns.map((data, index) => {
                            const getOpacity = this.getOpacity(data, index, 6);
                            return (getOpacity)
                              })

                              let colSeven = boardRuns.map((data, index) => {
                                const getOpacity = this.getOpacity(data, index, 7);
                                return (getOpacity)
                                  })

                        return (
                          <Grid>

                            <Col>{colZero}</Col>
                            <Col>{colOne}</Col>
                            <Col>{colTwo}</Col>
                            <Col>{colThree}</Col>
                            <Col>{colFour}</Col>
                            <Col>{colFive}</Col>
                            <Col>{colSix}</Col>
                            <Col>{colSeven}</Col>
                          </Grid>
                        )

}
else if (this.props.gameCards.cardOne === 2 || this.props.gameCards.cardOne === 9 || this.props.gameCards.cardOne === 16 || this.props.gameCards.cardOne === 23 && this.props.overPageFlag != true) {



  let colZero = boardRuns.map((data, index) => {
      if (data.col === 0) {
          return (
              <Row style={styles.CardValueSquare}>
                <Text style={styles.rundValueText}>{data.run}</Text>
              </Row>
        )
        }
      })

      let colOne = boardRuns.map((data, index) => {
        const getOpacity = this.getOpacity(data, index, 1);
        return (getOpacity)
          })

          let colTwo = boardRuns.map((data, index) => {
            const getOpacity = this.getOpacity(data, index, 2);
            return (getOpacity)
              })

              let colThree = boardRuns.map((data, index) => {
                const getRow = this.getRow(data, index, 3);
                return (getRow)
                  })

                  let colFour = boardRuns.map((data, index) => {
                    const getOpacity = this.getOpacity(data, index, 4);
                    return (getOpacity)
                      })

                      let colFive = boardRuns.map((data, index) => {
                        const getOpacity = this.getOpacity(data, index, 5);
                        return (getOpacity)
                          })

                          let colSix = boardRuns.map((data, index) => {
                            const getOpacity = this.getOpacity(data, index, 6);
                            return (getOpacity)
                              })

                              let colSeven = boardRuns.map((data, index) => {
                                const getOpacity = this.getOpacity(data, index, 7);
                                return (getOpacity)
                                  })

                        return (
                          <Grid>

                            <Col>{colZero}</Col>
                            <Col>{colOne}</Col>
                            <Col>{colTwo}</Col>
                            <Col>{colThree}</Col>
                            <Col>{colFour}</Col>
                            <Col>{colFive}</Col>
                            <Col>{colSix}</Col>
                            <Col>{colSeven}</Col>
                          </Grid>
                        )

}
else if (this.props.gameCards.cardOne === 3 || this.props.gameCards.cardOne === 10 || this.props.gameCards.cardOne === 17 || this.props.gameCards.cardOne === 24 && this.props.overPageFlag != true) {



  let colZero = boardRuns.map((data, index) => {
      if (data.col === 0) {
          return (
              <Row style={styles.CardValueSquare}>
                <Text style={styles.rundValueText}>{data.run}</Text>
              </Row>
        )
        }
      })

      let colOne = boardRuns.map((data, index) => {
        const getOpacity = this.getOpacity(data, index, 1);
        return (getOpacity)
          })

          let colTwo = boardRuns.map((data, index) => {
            const getOpacity = this.getOpacity(data, index, 2);
            return (getOpacity)
              })

              let colThree = boardRuns.map((data, index) => {
                const getOpacity = this.getOpacity(data, index, 3);
                return (getOpacity)
                  })

                  let colFour = boardRuns.map((data, index) => {
                    const getRow = this.getRow(data, index, 4);
                    return (getRow)

                      })

                      let colFive = boardRuns.map((data, index) => {
                        const getOpacity = this.getOpacity(data, index, 5);
                        return (getOpacity)
                          })

                          let colSix = boardRuns.map((data, index) => {
                            const getOpacity = this.getOpacity(data, index, 6);
                            return (getOpacity)
                              })

                              let colSeven = boardRuns.map((data, index) => {
                                const getOpacity = this.getOpacity(data, index, 7);
                                return (getOpacity)
                                  })

                        return (
                          <Grid>

                            <Col>{colZero}</Col>
                            <Col>{colOne}</Col>
                            <Col>{colTwo}</Col>
                            <Col>{colThree}</Col>
                            <Col>{colFour}</Col>
                            <Col>{colFive}</Col>
                            <Col>{colSix}</Col>
                            <Col>{colSeven}</Col>
                          </Grid>
                        )

}
else if (this.props.gameCards.cardOne === 4 || this.props.gameCards.cardOne === 11 || this.props.gameCards.cardOne === 18 || this.props.gameCards.cardOne === 25 && this.props.overPageFlag != true) {



  let colZero = boardRuns.map((data, index) => {
      if (data.col === 0) {
          return (
              <Row style={styles.CardValueSquare}>
                <Text style={styles.rundValueText}>{data.run}</Text>
              </Row>
        )
        }
      })

      let colOne = boardRuns.map((data, index) => {
        const getOpacity = this.getOpacity(data, index, 1);
        return (getOpacity)
          })

          let colTwo = boardRuns.map((data, index) => {
            const getOpacity = this.getOpacity(data, index, 2);
            return (getOpacity)
              })

              let colThree = boardRuns.map((data, index) => {
                const getOpacity = this.getOpacity(data, index, 3);
                return (getOpacity)
                  })

                  let colFour = boardRuns.map((data, index) => {
                    const getOpacity = this.getOpacity(data, index, 4);
                    return (getOpacity)

                      })

                      let colFive = boardRuns.map((data, index) => {
                        const getRow = this.getRow(data, index, 5);
                        return (getRow)
                          })

                          let colSix = boardRuns.map((data, index) => {
                            const getOpacity = this.getOpacity(data, index, 6);
                            return (getOpacity)
                              })

                              let colSeven = boardRuns.map((data, index) => {
                                const getOpacity = this.getOpacity(data, index, 7);
                                return (getOpacity)
                                  })

                        return (
                          <Grid>

                            <Col>{colZero}</Col>
                            <Col>{colOne}</Col>
                            <Col>{colTwo}</Col>
                            <Col>{colThree}</Col>
                            <Col>{colFour}</Col>
                            <Col>{colFive}</Col>
                            <Col>{colSix}</Col>
                            <Col>{colSeven}</Col>
                          </Grid>
                        )

}
else if (this.props.gameCards.cardOne === 5 || this.props.gameCards.cardOne === 12 || this.props.gameCards.cardOne === 19 || this.props.gameCards.cardOne === 26 && this.props.overPageFlag != true) {


  let colZero = boardRuns.map((data, index) => {
      if (data.col === 0) {
          return (
              <Row style={styles.CardValueSquare}>
                <Text style={styles.rundValueText}>{data.run}</Text>
              </Row>
        )
        }
      })

      let colOne = boardRuns.map((data, index) => {
        const getOpacity = this.getOpacity(data, index, 1);
        return (getOpacity)
          })

          let colTwo = boardRuns.map((data, index) => {
            const getOpacity = this.getOpacity(data, index, 2);
            return (getOpacity)
              })

              let colThree = boardRuns.map((data, index) => {
                const getOpacity = this.getOpacity(data, index, 3);
                return (getOpacity)
                  })

                  let colFour = boardRuns.map((data, index) => {
                    const getOpacity = this.getOpacity(data, index, 4);
                    return (getOpacity)

                      })

                      let colFive = boardRuns.map((data, index) => {
                        const getOpacity = this.getOpacity(data, index, 5);
                        return (getOpacity)
                          })

                          let colSix = boardRuns.map((data, index) => {
                            const getRow = this.getRow(data, index, 6);
                            return (getRow)
                              })

                              let colSeven = boardRuns.map((data, index) => {
                                const getOpacity = this.getOpacity(data, index, 7);
                                return (getOpacity)
                                  })

                        return (
                          <Grid>

                            <Col>{colZero}</Col>
                            <Col>{colOne}</Col>
                            <Col>{colTwo}</Col>
                            <Col>{colThree}</Col>
                            <Col>{colFour}</Col>
                            <Col>{colFive}</Col>
                            <Col>{colSix}</Col>
                            <Col>{colSeven}</Col>
                          </Grid>
                        )

}
else if (this.props.gameCards.cardOne === 6 || this.props.gameCards.cardOne === 13 || this.props.gameCards.cardOne === 20 || this.props.gameCards.cardOne === 27 && this.props.overPageFlag != true) {


  let colZero = boardRuns.map((data, index) => {
      if (data.col === 0) {
          return (
              <Row style={styles.CardValueSquare}>
                <Text style={styles.rundValueText}>{data.run}</Text>
              </Row>
        )}
      })

      let colOne = boardRuns.map((data, index) => {
        const getOpacity = this.getOpacity(data, index, 1);
        return (getOpacity)
      })

      let colTwo = boardRuns.map((data, index) => {
          const getOpacity = this.getOpacity(data, index, 2);
          return (getOpacity)
      })

      let colThree = boardRuns.map((data, index) => {
          const getOpacity = this.getOpacity(data, index, 3);
          return (getOpacity)
      })

      let colFour = boardRuns.map((data, index) => {
          const getOpacity = this.getOpacity(data, index, 4);
          return (getOpacity)
      })

      let colFive = boardRuns.map((data, index) => {
          const getOpacity = this.getOpacity(data, index, 5);
          return (getOpacity)
      })

      let colSix = boardRuns.map((data, index) => {
          const getOpacity = this.getOpacity(data, index, 6);
          return (getOpacity)
      })

      let colSeven = boardRuns.map((data, index) => {
          const getRow = this.getRow(data, index, 7);
          return (getRow)
        })

      return (
        <Grid>

          <Col>{colZero}</Col>
          <Col>{colOne}</Col>
          <Col>{colTwo}</Col>
          <Col>{colThree}</Col>
          <Col>{colFour}</Col>
          <Col>{colFive}</Col>
          <Col>{colSix}</Col>
          <Col>{colSeven}</Col>
        </Grid>
      )
}
else {


let colZero = boardRuns.map((data, index) => {
    if (data.col === 0) {
        return (
            <Row style={styles.CardValueSquare}>
              <Text style={styles.CardValueText}>{data.run}</Text>
            </Row>
      )
      }
    })

    let colOne = boardRuns.map((data, index) => {
      const getRow = this.getRowAll(data, index, 1);
      return (getRow)
    })

    let colTwo = boardRuns.map((data, index) => {
      const getRow = this.getRowAll(data, index, 2);
      return (getRow)
    })

    let colThree = boardRuns.map((data, index) => {
        const getRow = this.getRowAll(data, index, 3);
        return (getRow)
    })

    let colFour = boardRuns.map((data, index) => {
        const getRow = this.getRowAll(data, index, 4);
        return (getRow)
    })

    let colFive = boardRuns.map((data, index) => {
        const getRow = this.getRowAll(data, index, 5);
        return (getRow)
    })

    let colSix = boardRuns.map((data, index) => {
        const getRow = this.getRowAll(data, index, 6);
        return (getRow)
    })

    let colSeven = boardRuns.map((data, index) => {
        const getRow = this.getRowAll(data, index, 7);
        return (getRow)
    })


    return (
      <Grid>

        <Col>{colZero}</Col>
        <Col>{colOne}</Col>
        <Col>{colTwo}</Col>
        <Col>{colThree}</Col>
        <Col>{colFour}</Col>
        <Col>{colFive}</Col>
        <Col>{colSix}</Col>
        <Col>{colSeven}</Col>
      </Grid>
    )
  }
}
else if (cardTwo != 100 && this.props.overPageFlag != true) {


  let colZero = boardRuns.map((data, index) => {
      if (data.col === 0) {
          return (
              <Row style={styles.CardValueSquare}>
                <Text style={styles.rundValueText}>{data.run}</Text>
              </Row>
        )}
      })

      let colOne = boardRuns.map((data, index) => {
        const getOpacity = this.getDarkOpacity(data, index, 1);
        return (getOpacity)
      })

      let colTwo = boardRuns.map((data, index) => {
          const getOpacity = this.getDarkOpacity(data, index, 2);
          return (getOpacity)
      })

      let colThree = boardRuns.map((data, index) => {
          const getOpacity = this.getDarkOpacity(data, index, 3);
          return (getOpacity)
      })

      let colFour = boardRuns.map((data, index) => {
          const getOpacity = this.getDarkOpacity(data, index, 4);
          return (getOpacity)
      })

      let colFive = boardRuns.map((data, index) => {
          const getOpacity = this.getDarkOpacity(data, index, 5);
          return (getOpacity)
      })

      let colSix = boardRuns.map((data, index) => {
          const getOpacity = this.getDarkOpacity(data, index, 6);
          return (getOpacity)
      })

      let colSeven = boardRuns.map((data, index) => {
          const getRow = this.getDarkOpacity(data, index, 7);
          return (getRow)
        })


        const opacity = this.animatedValueRuns.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 1, 1]
        })

      return (
        <Grid>

          <Col>{colZero}</Col>
          <Col>{colOne}</Col>
          <Col>{colTwo}</Col>
          <Col>{colThree}</Col>
          <Col>{colFour}</Col>
          <Col>{colFive}</Col>
          <Col>{colSix}</Col>
          <Col>{colSeven}</Col>
          <Col style={{position: 'absolute', top: '10%', left: '10%', right: 0, bottom: 0}}>
          <Row style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Animated.Text style={{opacity, fontSize: 200, color: '#fff'}}>{runs}</Animated.Text>
          </Row>
          </Col>
        </Grid>
      )

      //const getTopRowRuns = this.getTopRowRuns();

      /*
    return (
    <Grid>
      <Col>
      {getTopRowRuns}
      <Row style={styles.CardValueSquare}>
        <Text style={styles.CardValueTextRuns}>A</Text>
      </Row>
      <Row style={styles.CardValueSquare}>
        <Text style={styles.CardValueTextRuns}>2</Text>
      </Row>
      <Row style={styles.CardValueSquare}>
        <Text style={styles.CardValueTextRuns}>3</Text>
      </Row>
      <Row style={styles.CardValueSquare}>
        <Text style={styles.CardValueTextRuns}>4</Text>
      </Row>
      <Row style={styles.CardValueSquare}>
        <Text style={styles.CardValueTextRuns}>5</Text>
      </Row>
      <Row style={styles.CardValueSquare}>
        <Text style={styles.CardValueTextRuns}>6</Text>
      </Row>
      <Row style={styles.CardValueSquare}>
        <Text style={styles.CardValueTextRuns}>7</Text>
      </Row>
      </Col>
      <Col style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
      <Row style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 200}}>{runs}</Text>
      </Row>
      </Col>
    </Grid>
    )
    */
}
else {


  //fail safe display.
  let colZero = boardRuns.map((data, index) => {
      if (data.col === 0) {
          return (
              <Row style={styles.CardValueSquare}>
                <Text style={styles.CardValueText}>{data.run}</Text>
              </Row>
        )
        }
      })

      let colOne = boardRuns.map((data, index) => {
        const getRow = this.getRowAll(data, index, 1);
        return (getRow)
      })

      let colTwo = boardRuns.map((data, index) => {
        const getRow = this.getRowAll(data, index, 2);
        return (getRow)
      })

      let colThree = boardRuns.map((data, index) => {
          const getRow = this.getRowAll(data, index, 3);
          return (getRow)
      })

      let colFour = boardRuns.map((data, index) => {
          const getRow = this.getRowAll(data, index, 4);
          return (getRow)
      })

      let colFive = boardRuns.map((data, index) => {
          const getRow = this.getRowAll(data, index, 5);
          return (getRow)
      })

      let colSix = boardRuns.map((data, index) => {
          const getRow = this.getRowAll(data, index, 6);
          return (getRow)
      })

      let colSeven = boardRuns.map((data, index) => {
          const getRow = this.getRowAll(data, index, 7);
          return (getRow)
      })


      return (
        <Grid>

          <Col>{colZero}</Col>
          <Col>{colOne}</Col>
          <Col>{colTwo}</Col>
          <Col>{colThree}</Col>
          <Col>{colFour}</Col>
          <Col>{colFive}</Col>
          <Col>{colSix}</Col>
          <Col>{colSeven}</Col>
        </Grid>
      )
    }
}



getRow = (data, index, cardNumberValue) => {
  //THIS IS WHEN YOU CLICK THE FIRST CARD.

  let battingStrikeRate = 1000;

  if ((data.id === 10 && (data.run === "0" || data.run === "1" || data.run === "2" || data.run === "4" || data.run === "W")) || (data.id === 19 && (data.run === "0" || data.run === "4" || data.run === "6" ))) {
  const gameRunEvents = this.props.gameRuns.gameRunEvents;
  const players = this.props.players.players;
  const facingBall = this.props.players.facingBall;

  const battingStrikeRateArray = CardBoard.battingStrikeRate(gameRunEvents, players, facingBall);

  battingStrikeRate = battingStrikeRateArray[2];
}

let pressureScore = 1000;
if ((data.id === 28 && (data.run === "W" || data.run === "4")) || (data.id === 37 && (data.run === "4" || data.run === "0")) || (data.id === 46 && (data.run === "W" || data.run === "1"))) {
const runRateValue = this.displayRequiredRunRate();
const runRate = runRateValue[0];
console.log(runRate);

const display = this.getDisplayRunsTotal();
const wickets = display[1];
console.log(wickets);

const getPressureScore = CardBoard.getPressureScore(runRate, wickets);
console.log(getPressureScore[0]);
pressureScore = getPressureScore[0];
console.log(pressureScore);
}

let formScore = 1000;
if ((data.id === 55 && (data.run === "W" || data.run === "1" || data.run === "0" || data.run === "2" || data.run === "4")) || (data.id === 64 && (data.run === "0" || data.run === "2" || data.run === "4" || data.run === "6"))) {
  const gameRunEvents = this.props.gameRuns.gameRunEvents;
  const players = this.props.players.players;
  const facingBall = this.props.players.facingBall;

  const getFormScore = CardBoard.getFormScore(players, facingBall, gameRunEvents);
  console.log(getFormScore);
  const formScoreOne = getFormScore[0];
  const formScoreTwo = getFormScore[1];

  if (facingBall === 1) {
    formScore = formScoreOne;
  }
  else {
    formScore = formScoreTwo;
  }
  console.log(formScore);
}

  const opacity = this.animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0]
  })

  console.log(data.col);
  console.log(data);
  console.log(cardNumberValue);
  console.log(data.header);


  //let { springValue } = this.state;
  //let { yAnimation } = this.state;
  if (data.col === cardNumberValue && data.header === 1) {
      return (
      <Row style={styles.CardValueSquare}>
        <Text style={styles.CardValueText}>{data.run}</Text>
      </Row>
    )
  }
  else if (data.col === cardNumberValue && data.run === "4" && battingStrikeRate === 1000 && pressureScore === 1000 && formScore === 1000 && (data.id != 10 || data.id != 19 || data.id != 28 || data.id != 37 || data.id != 46 || data.id != 55 || data.id != 64)) {
      return (
        <Row style={styles.fourValueSquare}>
        <Animated.View style={
        {opacity,
          width: '100%',
          height: '100%',
          borderRadius: 60 / 2,
          //backgroundColor: 'transparent',
          borderColor: '#7CFC00',
          borderWidth: 2,
        backgroundColor: '#7CFC00',
        position: 'absolute',}}>
        </Animated.View>
        <Text style={styles.rundValueText}>{data.run}a</Text>
        </Row>
    )
    }
    else if (data.col === cardNumberValue && data.run === "W" && battingStrikeRate === 1000 && pressureScore === 1000 && formScore === 1000 && (data.id != 10 || data.id != 28 || data.id != 46 || data.id != 55 || data.id != 64)) {
        return (
          <Row style={styles.wicketValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#FF',
            borderWidth: 2,
          backgroundColor: '#FF69B4',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.rundValueText}>{data.run}</Text>
          </Row>
      )
      }
      else if (data.col === cardNumberValue && data.run === "6" && battingStrikeRate === 1000 && pressureScore === 1000 && formScore === 1000 && (data.id != 10 || data.id != 19 || data.id != 28 || data.id != 37 || data.id != 46 || data.id != 55 || data.id != 64)) {
          return (
            <Row style={styles.sixValueSquare}>
            <Animated.View style={
            {opacity,
              width: '100%',
              height: '100%',
              borderRadius: 60 / 2,
              //backgroundColor: 'transparent',
              borderColor: '#f7ff00',
              borderWidth: 2,
            backgroundColor: '#f7ff00',
            position: 'absolute',}}>
            </Animated.View>
                <Text style={styles.sixValueText}>{data.run}b</Text>
            </Row>
        )
        }
    else if (data.col === cardNumberValue) {
      if ((data.id === 10 && data.run === "W") || (data.id === 19 && data.run === "0" && battingStrikeRate <= 30) || (data.id === 28 && data.run === "W" && pressureScore > 90) || (data.id === 37 && data.run === "6") || (data.id === 46 && data.run === "W" && pressureScore > 90) || (data.id === 55 && data.run === "W") || (data.id === 55 && data.run === "0")) {
        if (data.run === "W") {
        return (
          <Row style={styles.strikeRateWValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#FF69B4',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRateWickerValueText}>{data.run}</Text>
          </Row>
      )
      }
      else {
        return (
          <Row style={styles.strikeRateWValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#FF69B4',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRateWValueText}>{data.run}</Text>
          </Row>
      )
      }
      }
      else if ((data.id === 10 && data.run === "0") || (data.id === 19 && data.run === "0" && battingStrikeRate <= 60) || (data.id === 28 && data.run === "W" && pressureScore > 80) || (data.id === 37 && data.run === "1") || (data.id === 46 && data.run === "1"  && pressureScore > 80) || (data.id === 55 && data.run === "1" && formScore <= 20) || (data.id === 64 && data.run === "1")) {
        if (data.run === "W") {
        return (
          <Row style={styles.strikeRate100ValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#FF8300',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRateWickerValueText}>{data.run}</Text>
          </Row>
      )
      }
      else {
        return (
          <Row style={styles.strikeRate100ValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#FF8300',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRate100ValueText}>{data.run}</Text>
          </Row>
      )
      }
      }
      else if ((data.id === 10 && data.run === "1" && battingStrikeRate <= 100) || (data.id === 19 && data.run === "1") || (data.id === 28 && data.run === "0") || (data.id === 37 && data.run === "4" && pressureScore > 60) || (data.id === 46 && data.run === "W" && pressureScore > 60) || (data.id === 55 && data.run === "2") || (data.id === 54 && data.run === "4")) {
        if (data.run === "W") {
        return (
          <Row style={styles.strikeRate100ValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#f7ff00',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRateWickerValueText}>{data.run}</Text>
          </Row>
      )
    }
    else {
      return (
        <Row style={styles.strikeRate100ValueSquare}>
        <Animated.View style={
        {opacity,
          width: '100%',
          height: '100%',
          //backgroundColor: 'transparent',
          borderColor: '#fff',
          borderWidth: 2,
        backgroundColor: '#f7ff00',
        position: 'absolute',}}>
        </Animated.View>
            <Text style={styles.strikeRate120ValueText}>{data.run}</Text>
        </Row>
    )
    }
      }
      else if ((data.id === 10 && data.run === "1" && battingStrikeRate <= 120) || (data.id === 19 && data.run === "2") || (data.id === 28 && data.run === "2") || (data.id === 37 && data.run === "0" && pressureScore > 45) || (data.id === 46 && data.run === "1" && pressureScore > 45) || (data.id === 55 && data.run === "1") || (data.id === 54 && data.run === "2")) {
        return (
          <Row style={styles.strikeRate120ValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#fff',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRate120ValueText}>{data.run}</Text>
          </Row>
      )
      }
      else if ((data.id === 10 && data.run === "2") || (data.id === 19 && data.run === "4") || (data.id === 28 && data.run === "4" && pressureScore > 30) || (data.id === 37 && data.run === "4" && pressureScore > 30) || (data.id === 46 && data.run === "0")) {
        return (
          <Row style={styles.strikeRate120ValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#add8e6',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRate140ValueText}>{data.run}c</Text>
          </Row>
      )
      }
      else if ((data.id === 10 && data.run === "4") || (data.id === 19 && data.run === "6") || (data.id === 28 && data.run === "4" && pressureScore > 15) || (data.id === 37 && data.run === "0" && pressureScore > 15) || (data.id === 46 && data.run === "6") || (data.id === 55 && data.run === "4") || (data.id === 54 && data.run === "6")) {
        return (
          <Row style={styles.strikeRate141ValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#7CFC00',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRate141ValueText}>{data.run}d</Text>
          </Row>
      )
      }
      else if ((data.id === 28 && data.run === "1") || (data.id === 37 && data.run === "0" && pressureScore > 0) || (data.id === 46 && data.run === "4")) {
        return (
          <Row style={styles.greyValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#ddd',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRate141ValueText}>{data.run}i</Text>
          </Row>
      )
      }
      else {
        return (
          <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>{data.run}</Text>
          </Row>
      )
      }
    }
}


getRowAll = (data, index, cardNumberValue) => {
  //THIS IS WHEN YOU CLICK 'PLAY!'.

  let battingStrikeRate = 1000;
  if ((data.id === 10 &&  (data.run === "0" || data.run === "1" || data.run === "2" || data.run === "4" || data.run === "6" || data.run === "W")) || (data.id === 19 && (data.run === "0" || data.run === "4" || data.run === "6"))) {
  const gameRunEvents = this.props.gameRuns.gameRunEvents;
  const players = this.props.players.players;
  const facingBall = this.props.players.facingBall;

  const battingStrikeRateArray = CardBoard.battingStrikeRate(gameRunEvents, players, facingBall);

  battingStrikeRate = battingStrikeRateArray[2];
}

  let pressureScore = 1000;
if ((data.id === 28 && (data.run === "W" || data.run === "4")) || (data.id === 37 && (data.run === "4" || data.run === "0")) || (data.id === 46 && (data.run === "W" || data.run === "1" || data.run === "6"))) {
  const runRateValue = this.displayRequiredRunRate();
  const runRate = runRateValue[0];
  console.log(runRate);

  const display = this.getDisplayRunsTotal();
  const wickets = display[1];
  console.log(wickets);

  const getPressureScore = CardBoard.getPressureScore(runRate, wickets);
  console.log(getPressureScore[0]);
  pressureScore = getPressureScore[0];
  console.log(pressureScore);
}

let formScore = 1000;
console.log(data.id);
console.log(data.run);
if (data.id === 55 || data.id === 64) {
  const gameRunEvents = this.props.gameRuns.gameRunEvents;
  const players = this.props.players.players;
  const facingBall = this.props.players.facingBall;

  const getFormScore = CardBoard.getFormScore(players, facingBall, gameRunEvents);
  console.log(getFormScore);
  const formScoreOne = getFormScore[0];
  const formScoreTwo = getFormScore[1];

  if (facingBall === 1) {
    formScore = formScoreOne;
  }
  else {
    formScore = formScoreTwo;
  }
  console.log(formScore);
}

  const opacity = this.animatedValueAll.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0]
  })

  //let { springValue } = this.state;
  //let { yAnimation } = this.state;
  if (data.col === cardNumberValue && data.header === 1) {
    return (
    <Row style={styles.CardValueSquare}>
      <Text style={styles.CardValueText}>{data.run}</Text>
    </Row>
  )
  }
    else if (data.col === cardNumberValue && data.run === "4" && battingStrikeRate === 1000 && pressureScore === 1000 && formScore === 1000 && (data.id != 10 || data.id != 19 || data.id != 28 || data.id != 37 || data.id != 46 || data.id != 55 || data.id != 64)) {
        console.log(formScore);
        console.log(battingStrikeRate);
        console.log(pressureScore);
        console.log(data.id);
        return (
          <Row style={styles.fourValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            borderRadius: 60 / 2,
            //backgroundColor: 'transparent',
            borderColor: '#7CFC00',
            borderWidth: 2,
          backgroundColor: '#7CFC00',
          position: 'absolute',}}>
          </Animated.View>
          <Text style={styles.CardValueText}>{data.run}f</Text>
          </Row>
      )
      }
    else if (data.col === cardNumberValue && data.run === "W" && battingStrikeRate === 1000 && pressureScore === 1000 && formScore === 1000 && (data.id != 10 || data.id != 28 || data.id != 46 || data.id != 55 || data.id != 64)) {
        return (
          <Row style={styles.wicketValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#FF69B4',
            borderWidth: 2,
          backgroundColor: '#FF69B4',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.rundValueText}>{data.run}</Text>
          </Row>
      )
      }
      else if (data.col === cardNumberValue && data.run === "6" && battingStrikeRate === 1000 && pressureScore === 1000 && formScore === 1000 && (data.id != 10 || data.id != 19 || data.id != 28 || data.id != 37 || data.id != 46 || data.id != 55 || data.id != 64)) {
          console.log(battingStrikeRate);
          console.log(pressureScore);
          console.log(data.id);
          return (
            <Row style={styles.sixValueSquare}>
            <Animated.View style={
            {opacity,
              width: '100%',
              height: '100%',
              borderRadius: 60 / 2,
              //backgroundColor: 'transparent',
              borderColor: '#f7ff00',
              borderWidth: 2,
            backgroundColor: '#f7ff00',
            position: 'absolute',}}>
            </Animated.View>
                <Text style={styles.sixValueText}>{data.run}g</Text>
            </Row>
        )
        }
    else if (data.col === cardNumberValue) {
      console.log(data.id);
      console.log(battingStrikeRate);
      if ((data.id === 10 && data.run === "W") || (data.id === 19 && data.run === "0" && (battingStrikeRate <= 30 || battingStrikeRate === 'NaN')) || (data.id === 28 && data.run === "W" && pressureScore > 90) || (data.id === 37 && data.run === "6") || (data.id === 46 && data.run === "W" && pressureScore > 90) || (data.id === 55 && data.run === "W") || (data.id === 64 && data.run === "0")) {
        if (data.run === "W") {
        return (
          <Row style={styles.strikeRateWValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#FF69B4',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRateWValueText}>{data.run}</Text>
          </Row>
      )
      }
      else {
        return (
          <Row style={styles.strikeRateWValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#FF69B4',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRateWValueText}>{data.run}</Text>
          </Row>
      )
      }
      }
      else if ((data.id === 10 && data.run === "0") || (data.id === 19 && data.run === "0" && battingStrikeRate <= 60) || (data.id === 28 && data.run === "W" && pressureScore > 80) || (data.id === 37 && data.run === "1") || (data.id === 46 && data.run === "1"  && pressureScore > 80) || (data.id === 55 && data.run === "1" && formScore <= 20) || (data.id === 64 && data.run === "1")) {
        if (data.run === "W") {
        return (
          <Row style={styles.strikeRate100ValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#FF8300',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRateWickerValueText}>{data.run}aa</Text>
          </Row>
      )
      }
      else {
        return (
          <Row style={styles.strikeRate100ValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#FF8300',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRate100ValueText}>{data.run}</Text>
          </Row>
      )
      }
      }
      else if ((data.id === 10 && data.run === "1" && battingStrikeRate <= 100) || (data.id === 19 && data.run === "1") || (data.id === 28 && data.run === "0") || (data.id === 37 && data.run === "4" && pressureScore > 60) || (data.id === 46 && data.run === "W" && pressureScore > 60) || (data.id === 55 && data.run === "2") || (data.id === 64 && data.run === "4")) {
        if (data.run === "W") {
        return (
          <Row style={styles.strikeRate100ValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#f7ff00',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRateWickerValueText}>{data.run}</Text>
          </Row>
      )
    }
    else {
      return (
        <Row style={styles.strikeRate100ValueSquare}>
        <Animated.View style={
        {opacity,
          width: '100%',
          height: '100%',
          //backgroundColor: 'transparent',
          borderColor: '#fff',
          borderWidth: 2,
        backgroundColor: '#f7ff00',
        position: 'absolute',}}>
        </Animated.View>
            <Text style={styles.strikeRate120ValueText}>{data.run}</Text>
        </Row>
    )
    }
      }
      else if ((data.id === 10 && data.run === "1" && battingStrikeRate <= 120) || (data.id === 19 && data.run === "2") || (data.id === 28 && data.run === "2") || (data.id === 37 && data.run === "0" && pressureScore > 45) || (data.id === 46 && data.run === "1" && pressureScore > 45) || (data.id === 55 && data.run === "1" && formScore <= 30) || (data.id === 64 && data.run === "2")) {
        return (
          <Row style={styles.strikeRate120ValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#fff',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRate120ValueText}>{data.run}</Text>
          </Row>
      )
      }
      else if ((data.id === 10 && data.run === "2") || (data.id === 19 && data.run === "4") || (data.id === 28 && data.run === "4" && pressureScore > 30) || (data.id === 37 && data.run === "4" && pressureScore > 30) || (data.id === 46 && data.run === "0")) {
        return (
          <Row style={styles.strikeRate140ValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#add8e6',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRate140ValueText}>{data.run}h</Text>
          </Row>
      )
      }
      else if ((data.id === 10 && data.run === "4") || (data.id === 19 && data.run === "6") || (data.id === 28 && data.run === "4" && pressureScore > 15) || (data.id === 37 && data.run === "0" && pressureScore > 15) || (data.id === 46 && data.run === "6") || (data.id === 55 && data.run === "4") || (data.id === 64 && data.run === "6")) {
        return (
          <Row style={styles.strikeRate141ValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#7CFC00',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRate141ValueText}>{data.run}i</Text>
          </Row>
      )
      }
      else if ((data.id === 28 && data.run === "1") || (data.id === 37 && data.run === "0" && pressureScore > 0) || (data.id === 46 && data.run === "4")) {
        return (
          <Row style={styles.greyValueSquare}>
          <Animated.View style={
          {opacity,
            width: '100%',
            height: '100%',
            //backgroundColor: 'transparent',
            borderColor: '#fff',
            borderWidth: 2,
          backgroundColor: '#ddd',
          position: 'absolute',}}>
          </Animated.View>
              <Text style={styles.strikeRate141ValueText}>{data.run}i</Text>
          </Row>
      )
      }
      else {
        return (
          <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>{data.run}</Text>
          </Row>
      )
      }
    }
}

getOpacity = (data, index, cardNumberValue) => {


  let battingStrikeRate = 1000;
  if ((data.id === 10 &&  (data.run === "0" || data.run === "1" || data.run === "2" || data.run === "4")) || (data.id === 19 && data.run === "0" ) || (data.id === 19 && (data.run === "4" || data.run === "0" || data.run === "6"))) {
    const gameRunEvents = this.props.gameRuns.gameRunEvents;
    const players = this.props.players.players;
    const facingBall = this.props.players.facingBall;

    const battingStrikeRateArray = CardBoard.battingStrikeRate(gameRunEvents, players, facingBall);

    battingStrikeRate = battingStrikeRateArray[2];
}

let pressureScore = 1000;
if ((data.id === 28 && (data.run === "W" || data.run === "4")) || (data.id === 37 && (data.run === "4" || data.run === "0")) || (data.id === 46 && (data.run === "W" || data.run === "1"))) {
const runRateValue = this.displayRequiredRunRate();
const runRate = runRateValue[0];
console.log(runRate);

const display = this.getDisplayRunsTotal();
const wickets = display[1];
console.log(wickets);

const getPressureScore = CardBoard.getPressureScore(runRate, wickets);
console.log(getPressureScore[0]);
pressureScore = getPressureScore[0];
console.log(pressureScore);
}

let formScore = 1000;
if ((data.id === 55 && (data.run === "W" || data.run === "1" || data.run === "0" || data.run === "2" || data.run === "4")) || (data.id === 64 && (data.run === "0" || data.run === "2" || data.run === "4" || data.run === "6"))) {
  const gameRunEvents = this.props.gameRuns.gameRunEvents;
  const players = this.props.players.players;
  const facingBall = this.props.players.facingBall;

  const getFormScore = CardBoard.getFormScore(players, facingBall, gameRunEvents);
  console.log(getFormScore);
  const formScoreOne = getFormScore[0];
  const formScoreTwo = getFormScore[1];

  if (facingBall === 1) {
    formScore = formScoreOne;
  }
  else {
    formScore = formScoreTwo;
  }
  console.log(formScore);
}

  const opacity = this.animatedValueRuns.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 1]
  })

  if (data.col === cardNumberValue && data.header === 1) {
    return (
      <Row style={styles.CardValueSquare}>
        <Text style={styles.CardValueText}>{data.run}</Text>
      </Row>
  )
  }
  else if (data.col === cardNumberValue && data.run === "4" && battingStrikeRate === 1000 && pressureScore === 1000 && formScore === 1000 && (data.id != 10 || data.id != 19 || data.id != 28 || data.id != 37 || data.id != 46 || data.id != 55 || data.id != 64)) {
      return (
        <Animated.View style={{opacity}}>
        <Row style={styles.fourValueSquareOpacity}>
          <Text style={styles.rundValueTextOpacity}>{data.run}j</Text>
        </Row>
        </Animated.View>
    )
    }
    else if (data.col === cardNumberValue && data.run === "W" && battingStrikeRate === 1000 && pressureScore === 1000 && formScore === 1000 && (data.id != 10 || data.id != 28 || data.id != 46 || data.id != 55 || data.id != 64)) {
        return (
          <Animated.View style={{opacity}}>
          <Row style={styles.wicketValueSquareOpacity}>
              <Text style={styles.rundValueTextOpacity}>{data.run}</Text>
          </Row>
          </Animated.View>
      )
      }
      else if (data.col === cardNumberValue && data.run === "6" && battingStrikeRate === 1000 && pressureScore === 1000 && formScore === 1000 && (data.id != 10 || data.id != 19 || data.id != 28 || data.id != 37 || data.id != 46 || data.id != 55 || data.id != 64)) {
          return (
            <Animated.View style={{opacity}}>
            <Row style={styles.sixValueSquareOpacity}>
                <Text style={styles.rundValueTextOpacity}>{data.run}l</Text>
            </Row>
            </Animated.View>
        )
        }
    else if (data.col === cardNumberValue) {
      if ((data.id === 10 && data.run === "W") || (data.id === 19 && data.run === "0" && battingStrikeRate <= 30) || (data.id === 28 && data.run === "W" && pressureScore > 90) || (data.id === 37 && data.run === "6") || (data.id === 46 && data.run === "W" && pressureScore > 90) || (data.id === 55 && data.run === "W") || (data.id === 64 && data.run === "0")) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRateWValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRateWValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}</Text>

          </Row>
            </View>
          </Animated.View>
      )
      }
      else if ((data.id === 10 && data.run === "0") || (data.id === 19 && data.run === "0" && battingStrikeRate <= 60) || (data.id === 28 && data.run === "W" && pressureScore > 80) || (data.id === 37 && data.run === "1") || (data.id === 46 && data.run === "1"  && pressureScore > 80) || (data.id === 55 && data.run === "1" && formScore <= 20) || (data.id === 64 && data.run === "1")) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRate60ValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRate60ValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}</Text>

          </Row>
            </View>
          </Animated.View>
      )
      }
      else if ((data.id === 10 && data.run === "1" && battingStrikeRate <= 100) || (data.id === 19 && data.run === "1") || (data.id === 28 && data.run === "0") || (data.id === 37 && data.run === "4" && pressureScore > 60) || (data.id === 46 && data.run === "W" && pressureScore > 60) || (data.id === 55 && data.run === "1" && formScore <= 30) || (data.id === 64 && data.run === "2")) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRate100ValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRate100ValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}u</Text>

          </Row>
            </View>
          </Animated.View>
      )
      }
      else if ((data.id === 10 && data.run === "1" && battingStrikeRate <= 120) || (data.id === 19 && data.run === "2") || (data.id === 28 && data.run === "2") || (data.id === 37 && data.run === "0" && pressureScore > 45) || (data.id === 46 && data.run === "1" && pressureScore > 45) || (data.id === 55 && data.run === "2") || (data.id === 64 && data.run === "4")) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRate120ValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRate120ValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}</Text>

          </Row>
            </View>
          </Animated.View>
      )
      }
      else if ((data.id === 10 && data.run === "2") || (data.id === 19 && data.run === "4") || (data.id === 28 && data.run === "4" && pressureScore > 30) || (data.id === 37 && data.run === "4" && pressureScore > 30) || (data.id === 46 && data.run === "0") || (data.id === 55 && data.run === "4") || (data.id === 64 && data.run === "6")) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRate140ValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRate140ValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}m</Text>

          </Row>
            </View>
          </Animated.View>
      )
      }
      else if ((data.id === 10 && data.run === "4") || (data.id === 19 && data.run === "6") || (data.id === 28 && data.run === "4" && pressureScore > 15) || (data.id === 37 && data.run === "0" && pressureScore > 15) || (data.id === 46 && data.run === "6")) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRate141ValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRate141ValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}n</Text>

          </Row>
            </View>
          </Animated.View>
      )
      }
      else if ((data.id === 28 && data.run === "1") || (data.id === 37 && data.run === "0" && pressureScore > 0) || (data.id === 46 && data.run === "4")) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRate141ValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRate141ValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}n</Text>

          </Row>
            </View>
          </Animated.View>
      )
      }
      else {
        return (
          <Animated.View style={{opacity}}>
          <Row style={styles.runValueSquareOpacity}>
              <Text style={styles.rundValueTextOpacity}>{data.run}</Text>
          </Row>
          </Animated.View>
      )
      }
    }
}

getDarkOpacity = (data, index, cardNumberValue) => {
  //THIS IS WHEN ALL THE ROWS ARE DARK.

  let battingStrikeRate = 1000;
  if ((data.id === 10 && (data.run === "0" || data.run === "1" || data.run === "2" || data.run === "4")) || (data.id === 19 && (data.run === "0" || data.run === "4" || data.run === "6") )) {
  const gameRunEvents = this.props.gameRuns.gameRunEvents;
  const players = this.props.players.players;
  const facingBall = this.props.players.facingBall;

  const battingStrikeRateArray = CardBoard.battingStrikeRate(gameRunEvents, players, facingBall);

  battingStrikeRate = battingStrikeRateArray[2];
}

let pressureScore = 1000;
if ((data.id === 28 && (data.run === "W" || data.run === "4")) || (data.id === 37 && (data.run === "4" || data.run === "0")) || (data.id === 46 && (data.run === "W" || data.run === "1"))) {
const runRateValue = this.displayRequiredRunRate();
const runRate = runRateValue[0];
console.log(runRate);

const display = this.getDisplayRunsTotal();
const wickets = display[1];
console.log(wickets);

const getPressureScore = CardBoard.getPressureScore(runRate, wickets);
console.log(getPressureScore[0]);
pressureScore = getPressureScore[0];
console.log(pressureScore);
}

let formScore = 1000;
if ((data.id === 55 && (data.run === "W" || data.run === "1" || data.run === "0" || data.run === "2" || data.run === "4")) || (data.id === 64 && (data.run === "0" || data.run === "2" || data.run === "4" || data.run === "6"))) {
  const gameRunEvents = this.props.gameRuns.gameRunEvents;
  const players = this.props.players.players;
  const facingBall = this.props.players.facingBall;

  const getFormScore = CardBoard.getFormScore(players, facingBall, gameRunEvents);
  console.log(getFormScore);
  const formScoreOne = getFormScore[0];
  const formScoreTwo = getFormScore[1];

  if (facingBall === 1) {
    formScore = formScoreOne;
  }
  else {
    formScore = formScoreTwo;
  }
  console.log(formScore);
}

  const opacity = this.animatedValueRuns.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 1, 1]
  })

  if (data.col === cardNumberValue && data.header === 1) {
    return (
    <Row style={styles.CardValueSquare}>
      <Text style={styles.CardValueText}>{data.run}</Text>
    </Row>
  )
  }
  else if (data.col === cardNumberValue && data.run === "4" && battingStrikeRate === 1000 && pressureScore === 1000 && formScore === 1000 && (data.id != 10 || data.id != 19 || data.id != 28 || data.id != 37 || data.id != 46 || data.id != 55 || data.id != 64)) {
      return (
        <Animated.View style={{opacity}}>
        <Row style={styles.fourValueSquareDarkOpacity}>
          <Text style={styles.rundValueTextOpacity}>{data.run}o</Text>
        </Row>
        </Animated.View>
    )
    }
    else if (data.col === cardNumberValue && data.run === "W" && battingStrikeRate === 1000 && pressureScore === 1000 && (data.id != 10 || data.id != 28 || data.id != 46 || data.id != 55 || data.id != 64)) {
        return (
          <Animated.View style={{opacity}}>
          <Row style={styles.wicketValueSquareDarkOpacity}>
              <Text style={styles.rundValueTextOpacity}>{data.run}</Text>
          </Row>
          </Animated.View>
      )
      }
      else if (data.col === cardNumberValue && data.run === "6" && battingStrikeRate === 1000 && pressureScore === 1000 && formScore === 1000 && (data.id != 10 || data.id != 19 || data.id != 28 || data.id != 37 || data.id != 46 || data.id != 55 || data.id != 64)) {
          return (
            <Animated.View style={{opacity}}>
            <Row style={styles.sixValueSquareDarkOpacity}>
                <Text style={styles.rundValueTextOpacity}>{data.run}q</Text>
            </Row>
            </Animated.View>
        )
        }
    else if (data.col === cardNumberValue) {
      if ((data.id === 10 && data.run === "W") || (data.id === 19 && data.run === "0" && battingStrikeRate <= 30) || (data.id === 28 && data.run === "W" && pressureScore > 90) || (data.id === 37 && data.run === "6") || (data.id === 46 && data.run === "W" && pressureScore > 90) || (data.id === 55 && data.run === "W") || (data.id === 64 && data.run === "0")) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRateWValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRateWValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}t</Text>

          </Row>
            </View>
          </Animated.View>
      )
      }
      else if ((data.id === 10 && data.run === "0") || (data.id === 19 && data.run === "0" && battingStrikeRate <= 60) || (data.id === 28 && data.run === "W" && pressureScore > 80) || (data.id === 37 && data.run === "1") || (data.id === 46 && data.run === "1"  && pressureScore > 80) || (data.id === 55 && data.run === "1" && formScore <= 20) || (data.id === 64 && data.run === "1")) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRate60ValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRate60ValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}u</Text>

          </Row>
            </View>
          </Animated.View>
      )
      }

      else if ((data.id === 10 && data.run === "1" && battingStrikeRate <= 100) || (data.id === 19 && data.run === "1") || (data.id === 28 && data.run === "0") || (data.id === 37 && data.run === "4" && pressureScore > 60) || (data.id === 46 && data.run === "W" && pressureScore > 60) || (data.id === 55 && data.run === "1" && formScore <= 30) || (data.id === 64 && data.run === "2")) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRate100ValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRate100ValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}</Text>

          </Row>
            </View>
          </Animated.View>
      )
      }
      else if ((data.id === 10 && data.run === "1" && battingStrikeRate <= 120) || (data.id === 19 && data.run === "2") || (data.id === 28 && data.run === "2") || (data.id === 37 && data.run === "0" && pressureScore > 45) || (data.id === 46 && data.run === "1" && pressureScore > 45) || (data.id === 55 && data.run === "2") || (data.id === 64 && data.run === "4")) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRate120ValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRate120ValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}</Text>

          </Row>
            </View>
          </Animated.View>
      )
      }
      else if ((data.id === 10 && data.run === "2") || (data.id === 19 && data.run === "4") || (data.id === 28 && data.run === "4" && pressureScore > 30) || (data.id === 37 && data.run === "4" && pressureScore > 30) || (data.id === 46 && data.run === "0") || (data.id === 55 && data.run === "4") || (data.id === 64 && data.run === "6")) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRate140ValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRate140ValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}r</Text>

          </Row>
            </View>
          </Animated.View>
      )
      }
      else if ((data.id === 10 && data.run === "4") || (data.id === 19 && data.run === "6") || (data.id === 28 && data.run === "4" && pressureScore > 15) || (data.id === 37 && data.run === "0" && pressureScore > 15) || (data.id === 46 && data.run === "6")) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRate141ValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRate141ValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}s</Text>

          </Row>
            </View>
          </Animated.View>
      )
      }
      else if ((data.id === 28 && data.run === "1") || (data.id === 37 && data.run === "0" && pressureScore > 0) || (data.id === 46 && data.run === "4")) {
        return (
          <Animated.View style={{opacity}}>
          <View style={styles.strikeRate141ValueSquareDarkOpacityUnder}>
          <Row style={styles.strikeRate141ValueSquareDarkOpacity}>

              <Text style={styles.rundValueTextOpacity}>{data.run}x</Text>

          </Row>
            </View>
          </Animated.View>
      )
      }
      else {
        return (
          <Animated.View style={{opacity}}>
          <Row style={styles.runValueSquareDarkOpacity}>
              <Text style={styles.rundValueTextOpacity}>{data.run}</Text>
          </Row>
          </Animated.View>
      )
      }
    }
}

BoardDisplayStrikeRateTop = () => {
  if (this.props.overPageFlag != true) {
    return (
      <Row>
        <BoardDisplayStrikeRateTop />
      </Row>
    )
  }
}


  render() {
    return (
        <Grid style={{paddingLeft: 15, paddingRight: 15}}>
          {this.BoardDisplayStrikeRateTop()}
          {this.getScorecard()}
        </Grid>
    );
  }
}

const mapStateToProps = state => ({
  gameRuns: state.gameRuns,
  ball: state.ball,
  gameCards: state.gameCards,
  players: state.players,
  firstInningsRuns: state.firstInningsRuns,
});

export default connect(mapStateToProps)(BoardDisplayTopAttack);

/*
Native Base StyleSheet
*/
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  gridStyle: {
    borderColor: '#ffffff',
    borderWidth: 1,
  },
  CardValueText: {
    color: '#ccc',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontWeight: 'bold',
    padding: 5,
  },
  CardValueTextRuns: {
    color: '#ccc',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontWeight: 'bold',
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  CardValueSquare: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 2,
  },
  runValueSquare: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 2,
  },
  runValueSquareOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.6)',
  },
  runValueSquareDarkOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.8)',
  },
  wicketValueSquare: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: 'transparent',
    borderColor: '#FF69B4',
    borderWidth: 2,
  },
  wicketValueSquareOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(100,41,71,0.9)',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.6)',
  },
  wicketValueSquareDarkOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(100,41,71,0.9)',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.8)',
  },
  rundValueText: {
    color: '#fff',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    //fontWeight: 'bold',
    padding: 5,
  },
  sixValueText: {
    color: '#555',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    //fontWeight: 'bold',
    padding: 5,
  },
  rundValueTextOpacity: {
    color: '#fff',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    //fontWeight: 'bold',
    padding: 5,
    opacity: 0.5,
  },
  fourValueSquare: {
    width: '100%',
    height: 'auto',
    borderRadius: 60 / 2,
    backgroundColor: 'transparent',
    borderColor: '#7CFC00',
    borderWidth: 2,
  },
  fourValueSquareOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(49,99,0,0.9)',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.6)',
  },
  fourValueSquareDarkOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(49,99,0,0.9)',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.8)',
  },
  sixValueSquare: {
    width: '100%',
    height: 'auto',
    borderRadius: 60 / 2,
    backgroundColor: 'transparent',
    borderColor: '#f7ff00',
    borderWidth: 2,
  },
  sixValueSquareOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(97,100,0,0.9)',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.6)',
  },
  sixValueSquareDarkOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(97,100,0,0.9)',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.8)',
  },
  strikeRate120ValueSquareDarkOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(77,44,93,0.8)',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.8)',
  },
  strikeRate120ValueSquareDarkOpacityUnder: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    //borderColor: 'transparent',
    //borderWidth: 2,
    backgroundColor: 'rgb(255,255,255)',
  },
  strikeRate120ValueSquare: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 2,
  },
  strikeRate120ValueText: {
    color: '#555',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    //fontWeight: 'bold',
    padding: 5,
  },
  strikeRate140ValueSquareDarkOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(77,44,93,0.8)',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.8)',
  },
  strikeRate140ValueSquareDarkOpacityUnder: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    //borderColor: 'transparent',
    //borderWidth: 2,
    backgroundColor: 'rgb(173, 216, 230)',
  },
  strikeRate140ValueSquare: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 2,
  },
  strikeRate140ValueText: {
    color: '#555',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    //fontWeight: 'bold',
    padding: 5,
  },
  strikeRate141ValueSquareDarkOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(77,44,93,0.8)',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.8)',
  },
  strikeRate141ValueSquareDarkOpacityUnder: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    //borderColor: 'transparent',
    //borderWidth: 2,
    backgroundColor: 'rgb(247, 255, 0)',
  },
  strikeRate141ValueSquare: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 2,
  },
  strikeRate141ValueText: {
    color: '#555',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    //fontWeight: 'bold',
    padding: 5,
  },
  strikeRate100ValueSquareDarkOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(77,44,93,0.8)',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.8)',
  },
  strikeRate100ValueSquareDarkOpacityUnder: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: 'rgb(247, 255, 0)',
    //borderColor: '#fff',
    //borderWidth: 2,
    backgroundColor: '#fff',
  },
  strikeRate100ValueSquare: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 2,
  },
  strikeRate100ValueText: {
    color: '#fff',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    //fontWeight: 'bold',
    padding: 5,
  },
  strikeRate60ValueSquareDarkOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(77,44,93,0.8)',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.8)',
  },
  strikeRate60ValueSquareDarkOpacityUnder: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    //borderColor: 'transparent',
    //borderWidth: 2,
    backgroundColor: '#FF8300',
  },
  strikeRate60ValueSquare: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: '#FF8300',
    borderColor: '#fff',
    borderWidth: 2,
  },
  strikeRate60ValueText: {
    color: '#fff',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    //fontWeight: 'bold',
    padding: 5,
  },
  strikeRateWValueSquareDarkOpacity: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    borderColor: 'rgba(77,44,93,0.8)',
    borderWidth: 2,
    backgroundColor: 'rgba(77,44,93,0.8)',
  },
  strikeRateWValueSquareDarkOpacityUnder: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    //backgroundColor: 'transparent',
    //borderColor: 'transparent',
    //borderWidth: 2,
    backgroundColor: '#FF69B4',
  },
  strikeRateWValueSquare: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: '#FF69B4',
    borderColor: '#fff',
    borderWidth: 2,
  },
  strikeRateWValueText: {
    color: '#fff',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    //fontWeight: 'bold',
    padding: 5,
  },
  strikeRateWickerValueText: {
    color: '#FF69B4',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    //fontWeight: 'bold',
    padding: 5,
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
  },
  linearGradient: {
    opacity: 0.9
  },

});

/*

<Col>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>&nbsp;</Text>
  </Row>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>A</Text>
  </Row>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>2</Text>
  </Row>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>3</Text>
  </Row>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>4</Text>
  </Row>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>5</Text>
  </Row>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>6</Text>
  </Row>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>7</Text>
  </Row>
</Col>
<Col>
<Row style={styles.CardValueSquare}>
<Text style={styles.CardValueText}>A</Text>
</Row>
<Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
</Row>
<Row style={styles.runValueSquare}>
<Text style={styles.rundValueText}>3</Text>
</Row>
<Row style={styles.fourValueSquare}>
  <Text style={styles.rundValueText}>4</Text>
</Row>
<Row style={styles.wicketValueSquare}>
    <Text style={styles.rundValueText}>W</Text>
</Row>
<Row style={styles.runValueSquare}>
<Text style={styles.rundValueText}>2</Text>
</Row>
<Row style={styles.runValueSquare}>
<Text style={styles.rundValueText}>1</Text>
</Row>
<Row style={styles.sixValueSquare}>
    <Text style={styles.rundValueText}>6</Text>
</Row>
</Col>
<Col>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>2</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>1</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>2</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>1</Text>
  </Row>
  <Row style={styles.fourValueSquare}>
    <Text style={styles.rundValueText}>4</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
</Col>
<Col>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>3</Text>
  </Row>
  <Row style={styles.fourValueSquare}>
    <Text style={styles.rundValueText}>4</Text>
  </Row>
  <Row style={styles.wicketValueSquare}>
    <Text style={styles.rundValueText}>W</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>1</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>2</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
</Col>
<Col>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>4</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>1</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.fourValueSquare}>
    <Text style={styles.rundValueText}>4</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.sixValueSquare}>
    <Text style={styles.rundValueText}>6</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>1</Text>
  </Row>
  <Row style={styles.fourValueSquare}>
    <Text style={styles.rundValueText}>4</Text>
  </Row>
</Col>
<Col>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>5</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>2</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.fourValueSquare}>
    <Text style={styles.rundValueText}>4</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>1</Text>
  </Row>
  <Row style={styles.wicketValueSquare}>
    <Text style={styles.rundValueText}>W</Text>
  </Row>
</Col>
<Col>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>6</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>2</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>1</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>1</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>1</Text>
  </Row>
</Col>
<Col>
  <Row style={styles.CardValueSquare}>
    <Text style={styles.CardValueText}>7</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>1</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.fourValueSquare}>
    <Text style={styles.rundValueText}>4</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
  <Row style={styles.sixValueSquare}>
    <Text style={styles.rundValueText}>6</Text>
  </Row>
  <Row style={styles.wicketValueSquare}>
    <Text style={styles.rundValueText}>W</Text>
  </Row>
  <Row style={styles.runValueSquare}>
    <Text style={styles.rundValueText}>0</Text>
  </Row>
</Col>

*/
