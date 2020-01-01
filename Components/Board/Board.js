import React from 'react';
import firebase from 'react-native-firebase';
import { ScrollView, View, Text, TextInput, StyleSheet, PixelRatio, Platform, Image, FlatList, TouchableHighlight, TouchableOpacity } from 'react-native';
import {Header,Left,Right,Icon,Content,Grid,Row,Col,Container,H1,H3,Footer,Button,FooterTab} from 'native-base';

import { connect } from "react-redux";
import { updateGameId } from '../../Reducers/gameId';
import { updateGameRuns } from '../../Reducers/gameRuns';
import { updatePlayers } from '../../Reducers/players';
import { updateGames } from '../../Reducers/games';
import { updateGamesList } from '../../Reducers/gamesList';
import { updateFirstInningsRuns } from '../../Reducers/firstInningsRuns';
import { updatePlayerStats } from '../../Reducers/playerStats';
import { updateGameCards } from '../../Reducers/gameCards';


import RunsTotal from './RunsTotal';
import DisplayCurrentBatters from './DisplayCurrentBatters'
import RequiredRunRate from './RequiredRunRate';
import BallDiff from '../../Util/BallDiff.js';
import CardBoard from '../../Util/CardBoard.js';
import BoardDisplayStats from './BoardDisplayStats';
//import GameStats from '../../Util/GameStats.js';


class Board extends React.PureComponent {
  constructor(props) {
    const { currentUser } = firebase.auth()
    super(props);
    this.ref = firebase.firestore().collection(currentUser.uid);
    this.refPlayers = firebase.firestore().collection(currentUser.uid).doc('players');
    //this.id = firebase.firestore.FieldPath.documentId();
    this.state = {
        loading: true,
        random: 0,
        games: [],
        rImage: '',
        rImageTwo: '',
        cardOne: 100,
        cardTwo: 100,
        randomClick: 2,
        incrementer: null,
        //players: [],
        //facingBall: 0,
        firstInningsRuns: 0,
        facingBall: 1,
    };
    this.rImages = [require('./random/a-hearts.png'),require('./random/2-hearts.png'),require('./random/3-hearts.png'),require('./random/4-hearts.png'),require('./random/5-hearts.png'),require('./random/6-hearts.png'),require('./random/7-hearts.png'),require('./random/a-diamonds.png'),require('./random/2-diamonds.png'),require('./random/3-diamonds.png'),require('./random/4-diamonds.png'),require('./random/5-diamonds.png'),require('./random/6-diamonds.png'),require('./random/7-diamonds.png'),require('./random/a-spades.png'),require('./random/2-spades.png'),require('./random/3-spades.png'),require('./random/4-spades.png'),require('./random/5-spades.png'),require('./random/6-spades.png'),require('./random/7-spades.png'),require('./random/a-clubs.png'),require('./random/2-clubs.png'),require('./random/3-clubs.png'),require('./random/4-clubs.png'),require('./random/5-clubs.png'),require('./random/6-clubs.png'),require('./random/7-clubs.png')]
  }

state = {
  gameID: this.props.gameID.gameID || '0',
  keyID: this.props.gameID.keyID || '0',
  gameRunEvents: this.props.gameRuns.gameRunEvents || [{eventID: 0, runsValue: 0, ball: -1, runsType: 'deleted', wicketEvent: false, batterID: 0, bowlerID: 0}],
  eventID: this.props.gameRuns.eventID || 0,
  overBowled: this.props.gameRuns.overBowled || false,
  ball: this.props.ball.ball || 0,
  over: this.props.ball.over || 0,
  players: this.props.players.players || [],
  facingBall: this.props.players.facingBall || 1,
  games: this.props.games.games || [],
  gamesList: this.props.gamesList.gamesList || [],
  firstInningsRuns: this.props.firstInningsRuns.firstInningsRuns || 0,
  winningStreak: this.props.playerStats.winningStreak || 0,
  longestStreak: this.props.playerStats.longestStreak || 0,
  highestPlayerScore: this.props.playerStats.highestPlayerScore || 0,
  highestPlayerScoreId: this.props.playerStats.highestPlayerScoreId || 0,
  highestTeamScore: this.props.playerStats.highestTeamScore || 0,
  cardOne: this.props.gameCards.cardOne || 100,
  cardTwo: this.props.gameCards.cardTwo || 100,
  runs: this.props.gameCards.runs || 100,
  wicketEvent: this.props.gameCards.wicketEvent || false,
};

handleChange = ( gameID, gameRuns, ball, players, games, gamesList, firstInningsRuns, playerStats, gameCards ) => {
  this.setState({ gameID });
  this.setState({ gameRuns });
  this.setState({ ball });
  this.setState({ players });
  this.setState({ games });
  this.setState({ gamesList });
  this.setState({ firstInningsRuns });
  this.setState({ playerStats });
  this.setState({ gameCards });
};

incrementer = () => {
  console.log(this.state.incrementer);
  let incrementer = null;
  console.log(incrementer);
  this.setState({incrementer: incrementer});
}


componentDidMount() {
  console.log(this.props.games.games);
  console.log(this.props.players.facingBall);
  console.log('board componentDidMount');

  const { currentUser } = firebase.auth()
  this.setState({ currentUser })
  console.log(this.props.players.facingBall);
  this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  console.log(this.props.players.facingBall);
  const facingBall = this.props.players.facingBall;
  this.setState({ facingBall: facingBall });
  this.refPlayers.onSnapshot(this.onDocCollectionUpdate)
  console.log('firstinnings hit next');
  const { navigation } = this.props;
  const gameId = navigation.getParam('gameId', 0);
  console.log(gameId + ' = gamId');
  //this.getFirstInningsRuns();
}

componentWillUnmount() {
  this.unsubscribe();
  clearInterval(this.interval);
}

onDocCollectionUpdate = (documentSnapshot) => {
  console.log(this.state.facingBall);
    const players = [];
    let sum = a => a.reduce((acc, item) => acc + item);
  console.log(documentSnapshot);
  console.log(documentSnapshot.data());
  console.log(documentSnapshot.data().players);
  let gameRunEvents = this.props.gameRuns.gameRunEvents;

  console.log(this.props.ball.ball);

  let ball = 0;

  let legitBall = BallDiff.getLegitBall(ball, gameRunEvents);
  let ballTotal = legitBall[0];
  console.log(ballTotal);

  ball = sum(ballTotal.map(acc => Number(acc)));
  console.log(ball);

  let totalBallDiff = BallDiff.getpartnershipDiffTotal(ball);
  const over = totalBallDiff[0];
   ball = totalBallDiff[1];
  console.log(ball + ' + ' + over);

  console.log(this.props.players.players);
  console.log(this.props.players.facingBall);
  console.log(facingBall);


  let allPlayers = this.props.players.players;
  let facingBall = this.state.facingBall;

  console.log(allPlayers);
  console.log(facingBall);

  if (ball <= 0 && over <= 0) {
    console.log(ball + ' + ' + over);
    allPlayers = documentSnapshot.data().players;
    facingBall = 1;
  }

  console.log(allPlayers);

  if (allPlayers === [] || allPlayers === undefined || allPlayers === null || allPlayers.length < 1) {
    console.log('allplays null hit?');
    allPlayers = documentSnapshot.data().players;
  }
  else {
    console.log('else all players from redux.');
    allPlayers = this.props.players.players;
  }

/*
  if (facingBall === undefined) {
    console.log('facingBall null hit?');
    //facingBall = documentSnapshot.data().facingBall;
    //console.log();
  }
  else {
    console.log('else all players from redux.');
    facingBall = this.props.players.facingBall;
  }
  */

  console.log(allPlayers);

  //Get total wickets
  //const facingBall = this.props.players.facingBall;

  let id = 0;
  let batterFlag = 2;
  if (ball === 0 && over === 0) {
  allPlayers.map(player => {
    console.log(player);



    if (id === 1 || id === 2) {
      batterFlag = 0;
    }
    else {
      batterFlag = 2;
    }

    players.push({
      id,
      batterFlag,
      player
    });
    console.log(players);
    id++

    });


    //this.setState({ players: players });
    //console.log(this.state.players);
  }

  console.log(players);
  console.log(facingBall);

  this.setState({
    players: allPlayers,
    facingBall: facingBall,
  }, function () {
    const { players, facingBall } = this.state
    this.props.dispatch(updatePlayers(this.state.players, this.state.facingBall));
  })

  console.log(this.props.players.players);

  console.log('finished onDocCollectionUpdate');

  }

/*
componentDidUpdate() {
  //generate random integer between 0 and rImages.length
  if (this.state.randomClick === false) {
  var randomInt = Math.floor(Math.random() * this.rImages.length)
  console.log(randomInt);
  var rImage = this.rImages[randomInt]
  return (
    <Row style={{height: 100}}>
    <Image style={styles.cardDisplay} source={rImage}/>
  </Row>
  )
  //this.setState({ rImage: rImage });
}
else {
  //something.
}
}
*/

onCollectionUpdate = (querySnapshot) => {
  console.log('onCollectionUpdate hit');
  console.log(this.props.games.games);
  const games = this.props.games.games;
  querySnapshot.forEach((doc) => {
    const { gameId, gameName, firstInningsRuns } = doc.data();

/*
    games.push({
      key: doc.id,
      doc, // DocumentSnapshot
      gameId,
      gameName,
      firstInningsRuns,
    });
  });


  this.setState({
    games,
    loading: false,
 });
 */

 });

/*
 console.log('get First Innings Runs');
 console.log(games);
const gameId = this.props.gameID.gameID
let firstInningsRuns = games.map(acc => {
 console.log(acc);
 if (acc.gameId  === gameId) {
   console.log(acc.firstInningsRuns);
   return acc.firstInningsRuns;
 }
 });
 */

/*
 console.log(firstInningsRuns);
 this.setState({firstInningsRuns: firstInningsRuns});
*/
}


  handleCards = () => {
    const randomClick = this.state.randomClick
    if (randomClick === 2) {
    clearInterval(this.incrementer)
    this.setState({ randomClick: 0 });
    let secValue = 100;

    this.setState({
      cardOne: 100,
      cardTwo: 100,
    }, function () {
      const { cardOne, cardTwo } = this.state
      this.props.dispatch(updateGameCards(this.state.cardOne, this.state.cardTwo));
    })


    //this.incrementer = null;
    //if (this.state.randomClick === false) {
    //var randomInt = Math.floor(Math.random() * this.rImages.length)
    //console.log(randomInt);
    //var rImage = this.rImages[randomInt]
    //this.setState({ rImage: rImage });


    this.incrementer = setInterval( () => {
      if (this.state.randomClick === 0) {
    var randomInt = Math.floor(Math.random() * this.rImages.length)
    console.log(randomInt);
    this.setState({
      cardOne: randomInt,
    })
    var rImage = this.rImages[randomInt]
        this.setState({
          rImage: rImage,
        }
      )}
      if (this.state.randomClick === 1) {
        var randomInt = Math.floor(Math.random() * this.rImages.length)
        console.log(randomInt);
        this.setState({
          cardTwo: randomInt,
        })
        var rImageTwo = this.rImages[randomInt]
            this.setState({
              rImageTwo: rImageTwo,
            }
          )
        }
      }, secValue);
    }
  }

  handleStopCardsOne = () => {
    const randomClick = this.state.randomClick
    if (randomClick === 0) {
    this.setState({ randomClick: 1 });
    }
    else {
      //don notrhing.
    }

    const cardOne = this.state.cardOne;

    this.setState({
      cardOne: cardOne,
      cardTwo: 100,
      runs: 100,
      wicketEvent: false,
    }, function () {
      const { cardOne, cardTwo, runs, wicketEvent } = this.state
      this.props.dispatch(updateGameCards(this.state.cardOne, this.state.cardTwo, this.state.runs, this.state.wicketEvent));
    })

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

    handleStopCards = () => {
      const randomClick = this.state.randomClick
      if (randomClick === 1) {
      this.setState({ randomClick: 2 });
      var cardOne = this.state.cardOne;
      console.log(cardOne);
      var cardTwo = this.state.cardTwo;
      let gameRunEvents = this.props.gameRuns.gameRunEvents;
      const players =  this.props.players.players;
      let facingBall = this.props.players.facingBall;
      const battingStrikeRateArray = CardBoard.battingStrikeRate(gameRunEvents, players, facingBall);
      const aceAce = battingStrikeRateArray[0];
      const twoTwo = battingStrikeRateArray[1];
      let aceWicket = false;
      let twoWicket = false;
      let threeWicket = false;
      let fourWicket = false;
      let fiveWicket = false;
      let sixWicket = false;
      let sevenWicket = false;

      if (aceAce === "W") {
        aceWicket = true;
      }

      if (twoTwo === "W") {
        twoWicket = true;
      }

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

      if (threeThree === "W") {
        threeWicket = true;
      }

      if (fourFour === "W") {
        fourWicket = true;
      }

      if (fiveFive === "W") {
        fiveWicket = true;
      }

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
      const aggBoard = getFormScoreRuns[3];

      if (sixSix === "W") {
        sixWicket = true;
      }

      if (sevenSeven === "W") {
        sevenWicket = true;
      }

      let boardRuns = CardBoard.getBoardRuns(cardOne, cardTwo, aceAce, aceWicket, twoTwo, twoWicket, threeThree, threeWicket, fourFour, fourWicket, fiveFive, fiveWicket, sixSix, sixWicket, sevenSeven, sevenWicket, batterId, aggBoard);
      let runs = boardRuns[0];
      let wicketEvent = boardRuns[1];
      console.log(runs);
      const gameId = this.props.gameID.gameID
      console.log(gameId);
      let games = this.props.games.games;
      console.log(games);
      let keyID = this.props.gameID.keyID;
      console.log(keyID);

      /* Get Player Stats */
      console.log(this.props.playerStats.winningStreak);
      console.log(this.props.playerStats.longestStreak);
      let winningStreak = this.props.playerStats.winningStreak;
      let longestStreak = this.props.playerStats.longestStreak;
      //let winningStreak = 0;
      //let longestStreak = 0;

      const { currentUser } = this.state;
      console.log(currentUser);
      console.log(currentUser.uid);
      //this.setState({ currentUser })

      //const cardTwo = this.state.cardTwo;
      this.setState({
        cardOne: 100,
        cardTwo: cardTwo,
        runs: runs,
        wicketEvent: wicketEvent,
      }, function () {
        const { cardOne, cardTwo, runs, wicketEvent } = this.state
        this.props.dispatch(updateGameCards(this.state.cardOne, this.state.cardTwo, this.state.runs, this.state.wicketEvent));
      })

      const { navigation } = this.props;
      const displayId = navigation.getParam('displayId', 111000);

      if (displayId === 111000) {
        let now = new Date();
        let isoString = now.toISOString();
        console.log(isoString);
        dateTime = isoString.replace(/T/, '').replace(/\..+/, '').replace(/-/, '').replace(/:/, '').replace(/-/, '').replace(/:/, '');
        console.log(dateTime);
        const dateTimeInt = parseInt(dateTime);
        displayId = dateTimeInt;
      }

      let indexOfGameNumber = 0;
      let indexOfGamePreFiltered = this.props.games.games.map(acc => {
        console.log(indexOfGameNumber);
        console.log(acc);
        if (acc.displayId  === displayId) {
          console.log(acc.firstInningsRuns);
          return indexOfGameNumber;
        }
        else {
          indexOfGameNumber++;
          return 'na';
        }
        //indexOfGameNumber++;
        });

        console.log(indexOfGamePreFiltered);

        const indexOfGame = indexOfGamePreFiltered.filter(t=>t != 'na');
        console.log(indexOfGame);
        console.log(indexOfGame[0]);


        let sum = a => a.reduce((acc, item) => acc + item);

        this.setState({ random: runs });

        let eventID = this.props.gameRuns.eventID;
        eventID++
        console.log(eventID);


        //let gameRunEvents = this.props.gameRuns.gameRunEvents;
        console.log(gameRunEvents);

        let ballCount = gameRunEvents.map(acc => {
          console.log(acc);
          return 1;
      });
      let ball = sum(ballCount.map(acc => Number(acc)));

        console.log(ball);

        //************ workout who's batting ****************//
        console.log(this.props.players.players);
        let batters = this.props.players.players
        console.log(batters);

        let findCurrentBatters = batters.map(acc => {
          console.log(acc);
          if (acc.batterFlag === 0) {
            console.log(acc.batterFlag);
            return {id: [acc.id]};
          }
            else {
              console.log(acc.batterFlag);
              return {id: [100]};
            }
          });
        console.log(findCurrentBatters);

        let idBatter = 0;
        let currentBatters = findCurrentBatters.filter( batter => batter['id'] != 100)
        console.log(currentBatters);

        let idBatterOne = currentBatters[0].id;
        console.log(idBatterOne);
        let idBatterTwo = currentBatters[1].id
        console.log(idBatterTwo);

        let idBatterOneNumber = Number(idBatterOne);
        console.log(idBatterOneNumber);
        let idBatterTwoNumber = Number(idBatterTwo);
        console.log(idBatterTwoNumber);

        //worout who is facing.
        //let facingBall = this.props.players.facingBall;
        if (ball <= 1) {
          facingBall = 1;
        }
        else {
          //nothing
        }

        console.log(facingBall);
        if (facingBall === 1) {
          facingBatter = idBatterOneNumber;
        }
        else {
          facingBatter = idBatterTwoNumber;
        }

        if (wicketEvent != true ) {
        gameRunEvents.push({eventID: eventID, runsValue: runs, ball: ball, runsType: 'runs', wicketEvent: wicketEvent, batterID: facingBatter, bowlerID: 0});
        console.log(gameRunEvents);
        }

        //Calculate the total runs
        let totalRuns = sum(gameRunEvents.map(acc => Number(acc.runsValue)));
        console.log(totalRuns);

        if (ball === 6 || ball === 12 || ball === 18 || ball === 24 || ball === 30 || ball === 36 || ball ===42 || ball === 48 ||
        ball === 54 || ball === 60 || ball === 66 || ball === 72 || ball === 78 || ball === 84 || ball === 90 || ball === 96 ||
        ball === 102 || ball === 108 || ball === 114 || ball === 120 ) {
          if (facingBall === 1 && (runs === 1 || runs === 3)) {
            facingBall = 1;
          }
          else if (facingBall === 2 && (runs === 1 || runs === 3)) {
              facingBall = 2;
          }
          else if (facingBall === 1 && (runs === 0 || runs === 2 || runs === 4 || runs === 6 )) {
            facingBall = 2;
          }
          else {
            facingBall = 1;
          }
        } else {
          if (runs === 1 || runs === 3) {
            if (facingBall === 1) {
              facingBall = 2;
            }
            else {
              facingBall = 1;
            }
        }
      }
        console.log(facingBall);
        //this.setState({facingBall: facingBall});

        //handle wicket event to remove batsman.
        //Get total wickets
        let getWicketCount = BallDiff.getWicketCount(gameRunEvents);
        let totalWickets = getWicketCount[0];
        console.log(totalWickets);

        //if (wicketEvent === true || runs === 6 || runs === '6' || runs === 4 || runs === '4' ) {
          if (wicketEvent === true ) {
            console.log('wicket event true!!');
          setTimeout(() => {
            this.props.navigation.navigate('WicketCheck', {
              displayId: displayId,
            });
          }, 1000);  //1000 milliseconds
          }
          else {
            console.log('wicket event false!');

            console.log(this.props.players.players);

      let allPlayers = this.props.players.players;

      console.log(allPlayers);

      console.log(allPlayers);
      console.log(facingBall);
      this.setState({
        players: allPlayers,
        facingBall: facingBall,
      }, function () {
        const { players, facingBall } = this.state
        this.props.dispatch(updatePlayers(this.state.players, this.state.facingBall));
      })

      console.log(this.props.players.players);
      console.log(this.props.players.facingBall);

        console.log('we hitting check over bowled?');
        //Get the reunEvents from Redux.

        //----------calculate overs
        ball = 0;

        let legitBall = BallDiff.getLegitBall(ball, gameRunEvents);
        let ballTotal = legitBall[0];
        console.log(ballTotal);

        ball = sum(ballTotal.map(acc => Number(acc)));
        console.log(ball);

        let totalBallDiff = BallDiff.getpartnershipDiffTotal(ball);
        let totalBall = totalBallDiff[1];
        let totalOver = totalBallDiff[0];
        console.log(totalBall);
        console.log(totalOver);
        let numberBallValue = 0;

        //Get First Innings Runs
        const { navigation } = this.props;
        let firstInningsRuns = navigation.getParam('firstInningsRuns', 0);
        console.log(firstInningsRuns);

        if (firstInningsRuns === 0) {
          firstInningsRuns = this.props.firstInningsRuns.firstInningsRuns;
        }
        else {
          //do nohthing.
        }

        if (totalBall === 0 && totalOver > 0 && wicketEvent != true && totalRuns <= firstInningsRuns && totalOver < 20) {
          let eventID = this.props.gameRuns.eventID;
          numberBallValue = Number(6);
          //this.props.dispatch(updateGameRuns(gameRunEvents, eventID, true))

          console.log(gameRunEvents);
          this.setState({
            gameRunEvents: gameRunEvents,
            eventID: eventID,
            overBowled: true,
          }, function () {
            const { gameRunEvents, eventID, overBowled } = this.state
            this.props.dispatch(updateGameRuns(this.state.gameRunEvents, this.state.eventID, this.state.overBowled));
          })

          if (totalRuns === 0) {
            //do nohting.
          }
          else {
            let filtered = '';
            if (keyID === '0' || keyID === undefined) {
              filtered = CardBoard.getFilteredKey(this.props.games.games, gameId);
              console.log(filtered);

              this.setState({
                keyID: filtered,
                gameID: gameId,
              }, function () {
                const { keyID, gameID } = this.state
                this.props.dispatch(updateGameId(this.state.keyID, this.state.gameID));
              })
            }
            else {
              filtered = gameId;
            }

            //filtered[0] = filtered;

            console.log('ball and over more than 0.');
          let highestScorers = CardBoard.getHighestScorers(gameRunEvents, allPlayers);
          console.log(highestScorers);
          let battersHighestScore = highestScorers[0];
          let battersNameHighestScore = highestScorers[1];
          let highestScoreBallCount = highestScorers[2];
          let battersSecondHighestScore = highestScorers[3];
          let battersNameSecondHighestScore = highestScorers[4];
          let secondHighestScoreBallCount = highestScorers[5];


          let gameStart = {
            displayId: displayId,
            firstInningsRuns: firstInningsRuns,
            gameId: gameId,
            gameName: "Cricket Strategy Sim",
            gameResult: 0,
            players: allPlayers,
            gameRunEvents: gameRunEvents,
            key: filtered,
            topScore: battersHighestScore,
            topScoreBalls: highestScoreBallCount,
            topScorePlayer: battersNameHighestScore,
            topSecondScore: battersSecondHighestScore,
            topSecondBalls: secondHighestScoreBallCount,
            topSecondScorePlayer: battersNameSecondHighestScore,
            totalRuns: totalRuns,
            totalWickets: totalWickets,
          }

          console.log(gameStart);


          let gameDisplayIdIndexCount = 0
          let gameDisplayIdIndexArray = games.map(acc => {
          console.log(acc);
          console.log(acc.displayId);
          if (acc.displayId  === displayId) {
            console.log(acc.displayId);
            return gameDisplayIdIndexCount;
          }
          else {
            gameDisplayIdIndexCount++;
            return 'na';
          }
          });

          console.log(gameDisplayIdIndexArray);

          let gameDisplayIdIndex = gameDisplayIdIndexArray.filter( runs => runs != 'na')
          console.log(gameDisplayIdIndex);

          console.log(games);
          games.splice(gameDisplayIdIndex,1,gameStart);

          this.setState({
          games: games,
          }, function () {
            const { games } = this.state
            this.props.dispatch(updateGames(this.state.games));
          })

          console.log(this.props.games.games);

          }

         setTimeout(() => {
        this.props.navigation.navigate('OverBowled');
    }, 1000);  //5000 milliseconds

        }
        else if (totalWickets >= 10 || totalRuns > firstInningsRuns || totalOver >= 20) {
          console.log('naviagte not hit');
          //Re-Calculate the total runs after update
          gameRunEvents = this.props.gameRuns.gameRunEvents;
          totalRunsRefresh = sum(gameRunEvents.map(acc => Number(acc.runsValue)));
          console.log(totalRunsRefresh);

          console.log(gameRunEvents);
          this.setState({
            gameRunEvents: gameRunEvents,
            eventID: eventID,
            overBowled: false,
          }, function () {
            const { gameRunEvents, eventID, overBowled } = this.state
            this.props.dispatch(updateGameRuns(this.state.gameRunEvents, this.state.eventID, this.state.overBowled));
          })

          let filtered = '';
          if (keyID === '0' || keyID === undefined) {
            filtered = CardBoard.getFilteredKey(this.props.games.games, gameId);
            console.log(filtered);

            this.setState({
              keyID: filtered,
              gameID: gameId,
            }, function () {
              const { keyID, gameID } = this.state
              this.props.dispatch(updateGameId(this.state.keyID, this.state.gameID));
            })
          }
          else {
            filtered = gameId;
            console.log(filtered);
          }

          //filtered[0] = filtered;

          console.log('ball and over more than 0.');
        let highestScorers = CardBoard.getHighestScorers(gameRunEvents, allPlayers);
        console.log(highestScorers);
        let battersHighestScore = highestScorers[0];
        let battersNameHighestScore = highestScorers[1];
        let highestScoreBallCount = highestScorers[2];
        let battersSecondHighestScore = highestScorers[3];
        let battersNameSecondHighestScore = highestScorers[4];
        let secondHighestScoreBallCount = highestScorers[5];

        console.log(gameRunEvents);
        console.log(firstInningsRuns);
        console.log(totalRuns);

        //let game = [];
        if (totalRuns > firstInningsRuns ) {
          let game = {
            displayId: displayId,
            firstInningsRuns: firstInningsRuns,
            gameId: gameId,
            gameName: "Cricket Strategy Sim",
            gameResult: 1,
            players: allPlayers,
            gameRunEvents: gameRunEvents,
            key: filtered[0],
            topScore: battersHighestScore,
            topScoreBalls: highestScoreBallCount,
            topScorePlayer: battersNameHighestScore,
            topSecondScore: battersSecondHighestScore,
            topSecondBalls: secondHighestScoreBallCount,
            topSecondScorePlayer: battersNameSecondHighestScore,
            totalRuns: totalRunsRefresh,
            totalWickets: totalWickets,
          }

          console.log(gameRunEvents);
          console.log(totalRunsRefresh);
          console.log(allPlayers);
          console.log(battersHighestScore);
          console.log(battersNameHighestScore);
          console.log(highestScoreBallCount);
          console.log(battersSecondHighestScore);
          console.log(battersNameSecondHighestScore);
          console.log(secondHighestScoreBallCount);
          console.log(totalWickets);
          console.log(1);

          if (battersSecondHighestScore[0][0] === undefined || battersSecondHighestScore[0][0] <0 || battersSecondHighestScore[0][0] === null) {
            battersSecondHighestScore[0][0] = 0;
          }

          this.ref.doc(filtered[0]).update({
              gameRunEvents: gameRunEvents,
              totalRuns: totalRunsRefresh,
              players: allPlayers,
              topScore: battersHighestScore[0][0],
              topScorePlayer: battersNameHighestScore[0].player,
              topScoreBalls: highestScoreBallCount,
              topSecondScore: battersSecondHighestScore[0][0],
              topSecondScorePlayer: battersNameSecondHighestScore[0].player,
              topSecondBalls: secondHighestScoreBallCount,
              totalWickets: totalWickets,
              gameResult: 2,
          });

          winningStreak++
          if (winningStreak > longestStreak) {
            longestStreak = winningStreak
          }
          else {
            //nothing.
          }

          this.ref.doc("playerStats").update({
            winningStreak: winningStreak,
            longestStreak: longestStreak,
            highestPlayerScore: 0,
            highestPlayerScoreId: 0,
            highestTeamScore: 0,
          });

          /*
          this.ref.doc(filtered).update({
            displayId: 111,
            firstInningsRuns: this.state.firstInningsRuns,
            gameId: gameId,
            gameName: "Cricket Strategy Sim",
            gameResult: 1,
            players: allPlayers,
            gameRunEvents: gameRunEvents,
            key: filtered,
            topScore: battersHighestScore,
            topScoreBalls: highestScoreBallCount,
            topScorePlayer: battersNameHighestScore,
            topSecondScore: battersSecondHighestScore,
            topSecondBalls: secondHighestScoreBallCount,
            topSecondScorePlayer: battersNameSecondHighestScore,
            totalRuns: totalRuns,
            totalWickets: totalWickets,
          });
          */
        }
        else {
          console.log('lost so do the following...');
          let game = {
            displayId: displayId,
            firstInningsRuns: firstInningsRuns,
            gameId: gameId,
            gameName: "Cricket Strategy Sim",
            gameResult: 1,
            players: allPlayers,
            gameRunEvents: gameRunEvents,
            key: filtered[0],
            topScore: battersHighestScore[0][0],
            topScorePlayer: battersNameHighestScore[0].player,
            topScoreBalls: highestScoreBallCount,
            topSecondScore: battersSecondHighestScore[0][0],
            topSecondScorePlayer: battersNameSecondHighestScore[0].player,
            topSecondBalls: secondHighestScoreBallCount,
            totalRuns: totalRunsRefresh,
            totalWickets: totalWickets,
          }
          this.ref.doc(filtered[0]).update({
              gameRunEvents: gameRunEvents,
              totalRuns: totalRunsRefresh,
              players: allPlayers,
              topScore: battersHighestScore[0][0],
              topScorePlayer: battersNameHighestScore[0].player,
              topScoreBalls: highestScoreBallCount,
              topSecondScore: battersSecondHighestScore[0][0],
              topSecondScorePlayer: battersNameSecondHighestScore[0].player,
              topSecondBalls: secondHighestScoreBallCount,
              totalWickets: totalWickets,
              gameResult: 1,
          });

          winningStreak = 0;

          this.ref.doc("playerStats").update({
            winningStreak: winningStreak,
            longestStreak: longestStreak,
            highestPlayerScore: 0,
            highestPlayerScoreId: 0,
            highestTeamScore: 0,
          });




          /*
          this.ref.doc(filtered).update({
            displayId: 111,
            firstInningsRuns: this.state.firstInningsRuns,
            gameId: gameId,
            gameName: "Cricket Strategy Sim",
            gameResult: 2,
            players: allPlayers,
            gameRunEvents: gameRunEvents,
            key: filtered,
            topScore: battersHighestScore,
            topScoreBalls: highestScoreBallCount,
            topScorePlayer: battersNameHighestScore,
            topSecondScore: battersSecondHighestScore,
            topSecondBalls: secondHighestScoreBallCount,
            topSecondScorePlayer: battersNameSecondHighestScore,
            totalRuns: totalRuns,
            totalWickets: totalWickets,
          });
          */
        }

        let gameResult = 0
        if (totalRuns > firstInningsRuns) {
          gameResult = 2;
        }
        else {
          gameResult = 1;
        }

        let gameComplete = {
          displayId: displayId,
          firstInningsRuns: firstInningsRuns,
          gameId: gameId,
          gameName: "Cricket Strategy Sim",
          gameResult: gameResult,
          players: allPlayers,
          gameRunEvents: gameRunEvents,
          key: filtered[0],
          topScore: battersHighestScore[0][0],
          topScorePlayer: battersNameHighestScore[0].player,
          topScoreBalls: highestScoreBallCount,
          topSecondScore: battersSecondHighestScore[0][0],
          topSecondScorePlayer: battersNameSecondHighestScore[0].player,
          topSecondBalls: secondHighestScoreBallCount,
          totalRuns: totalRunsRefresh,
          totalWickets: totalWickets,
        }

        console.log(gameComplete);


        let gameDisplayIdIndexCount = 0
        let gameDisplayIdIndexArray = games.map(acc => {
        console.log(acc);
        console.log(acc.displayId);
        if (acc.displayId  === displayId) {
          console.log(acc.displayId);
          return gameDisplayIdIndexCount;
        }
        else {
          gameDisplayIdIndexCount++;
          return 'na';
        }
        });

        console.log(gameDisplayIdIndexArray);

        let gameDisplayIdIndex = gameDisplayIdIndexArray.filter( runs => runs != 'na')
        console.log(gameDisplayIdIndex);

        console.log(games);
        games.splice(gameDisplayIdIndex,1,gameComplete);

        this.setState({
        games: games,
        }, function () {
          const { games } = this.state
          this.props.dispatch(updateGames(this.state.games));
        })

        console.log(this.props.games.games);

        console.log(winningStreak);
        console.log(longestStreak);

        this.setState({
        winningStreak: winningStreak,
        longestStreak: longestStreak,
        highestPlayerScore: 0,
        highestPlayerScoreId: 0,
        highestTeamScore: 0,
        }, function () {
          const { winningStreak, longestStreak, highestPlayerScore, highestPlayerScoreId, highestTeamScore } = this.state
          this.props.dispatch(updatePlayerStats(this.state.winningStreak, this.state.longestStreak, this.state.highestPlayerScore, this.state.highestPlayerScoreId, this.state.highestTeamScore));
        })

        console.log(this.props.playerStats.winningStreak);
        console.log(this.props.playerStats.longestStreak);

        //Add not out batsman runs here to player's Form attribute.

          const allPlayers = this.props.players.players;
          const facingBall = this.props.players.facingBall;

          allPlayers.map(player => {
            console.log(player);
            console.log(player.id);

            if (player.batterFlag === 0) {
              const scoreTwo = allPlayers[player.id].scoreOne;
              const scoreThree = allPlayers[player.id].scoreTwo;

              let outs = 0;
              if (allPlayers[player.id].outs <= 0) {
                outs = 0;
              }
              else {
                outs = allPlayers[player.id].outs
                outs--
              }

              let batterRunsCount = gameRunEvents.map(acc => {
                console.log(acc);
                if (acc.batterID === allPlayers[player.id]) {
                  console.log(acc.runsValue);
                  return [acc.runsValue];
                }
                else {
                    console.log(acc.runsValue);
                    return 0;
                  }
                });

                console.log(batterRunsCount);

                const batterRuns = sum(batterRunsCount.map(acc => Number(acc)));

                console.log(batterRuns);

              allPlayers[player.id].scoreOne = batterRuns;
              allPlayers[player.id].scoreTwo = scoreTwo;
              allPlayers[player.id].scoreThree = scoreThree;
              allPlayers[player.id].outs = outs;

              console.log(allPlayers);

            }
        })

        console.log(allPlayers);
        console.log(facingBall);
        this.setState({
          players: allPlayers,
          facingBall: facingBall,
        }, function () {
          const { players, facingBall } = this.state
          this.props.dispatch(updatePlayers(this.state.players, this.state.facingBall));
        })

        //***** ENDS ***//

        }
        else {

          //Re-Calculate the total runs after update
          console.log(gameRunEvents);
          //gameRunEvents = this.props.gameRuns.gameRunEvents;
          //console.log(gameRunEvents);
          totalRunsRefresh = sum(gameRunEvents.map(acc => Number(acc.runsValue)));
          console.log(totalRunsRefresh);

          console.log('naviagte not hit');
          this.setState({
            gameRunEvents: gameRunEvents,
            eventID: eventID,
            overBowled: false,
          }, function () {
            const { gameRunEvents, eventID, overBowled } = this.state
            this.props.dispatch(updateGameRuns(this.state.gameRunEvents, this.state.eventID, this.state.overBowled));
          })

          let filtered = '';
          if (keyID === '0' || keyID === undefined) {
            filtered = CardBoard.getFilteredKey(this.props.games.games, gameId);
            console.log(filtered);

            this.setState({
              keyID: filtered,
              gameID: gameId,
            }, function () {
              const { keyID, gameID } = this.state
              this.props.dispatch(updateGameId(this.state.keyID, this.state.gameID));
            })
          }
          else {
            console.log(gameId);
            filtered = gameId;
            console.log(filtered);
          }

          //filtered[0] = filtered;

          console.log('ball and over more than 0.');
        let highestScorers = CardBoard.getHighestScorers(gameRunEvents, allPlayers);
        console.log(highestScorers);
        let battersHighestScore = highestScorers[0];
        let battersNameHighestScore = highestScorers[1];
        let highestScoreBallCount = highestScorers[2];
        let battersSecondHighestScore = highestScorers[3];
        let battersNameSecondHighestScore = highestScorers[4];
        let secondHighestScoreBallCount = highestScorers[5];

        console.log(filtered);
        console.log(filtered[0]);
        console.log(totalRuns);
        console.log(totalRunsRefresh);

        let gameBall = {
          displayId: displayId,
          firstInningsRuns: firstInningsRuns,
          gameId: gameId,
          gameName: "Cricket Strategy Sim",
          gameResult: 0,
          players: allPlayers,
          gameRunEvents: gameRunEvents,
          key: filtered[0],
          topScore: battersHighestScore,
          topScoreBalls: highestScoreBallCount,
          topScorePlayer: battersNameHighestScore,
          topSecondScore: battersSecondHighestScore,
          topSecondBalls: secondHighestScoreBallCount,
          topSecondScorePlayer: battersNameSecondHighestScore,
          totalRuns: totalRunsRefresh,
          totalWickets: totalWickets,
        }

              console.log(gameBall);


            let gameDisplayIdIndexCount = 0
            let gameDisplayIdIndexArray = games.map(acc => {
              console.log(acc);
              console.log(acc.displayId);
              if (acc.displayId  === displayId) {
                console.log(acc.displayId);
                return gameDisplayIdIndexCount;
              }
              else {
                gameDisplayIdIndexCount++;
                return 'na';
              }
            });

            console.log(gameDisplayIdIndexArray);

            let gameDisplayIdIndex = gameDisplayIdIndexArray.filter( runs => runs != 'na')
            console.log(gameDisplayIdIndex);

            console.log(games);
            games.splice(gameDisplayIdIndex,1,gameBall);

            this.setState({
              games: games,
        }, function () {
          const { games } = this.state
          this.props.dispatch(updateGames(this.state.games));
        })

        console.log(this.props.games.games);
      // }


        }
        let numberOverValue = Number(totalOver);
      }
      }
      else {
        //do nothing.
      }
    }

    /*
    getFirstInningsRuns = () => {

      const { navigation } = this.props;
      const firstInningsRuns = navigation.getParam('firstInningsRuns', 0);

      firstInningsRuns

      console.log('getFirstInningsRuns hit');
      console.log(this.state.games);
    const gameId = this.props.gameID.gameID
    let firstInningsRuns = this.state.games.map(acc => {
      console.log(acc);
      if (acc.gameId  === gameId) {
        console.log(acc.firstInningsRuns);
        return acc.firstInningsRuns;
      }
      });

      console.log(firstInningsRuns);
      this.setState({firstInningsRuns: firstInningsRuns});
    }
    */

    playNewGame = () => {
      //to do

      this.setState({
        firstInningsRuns: 0,
      }, function () {
        const { firstInningsRuns } = this.state
        this.props.dispatch(updateFirstInningsRuns(this.state.firstInningsRuns));
      })

      const { navigation } = this.props;
      this.props.navigation.navigate('GameListNew')
    }

    playButtons = () => {
      console.log(this.props.gameRuns.gameRunEvents);
      let gameRunEvents = this.props.gameRuns.gameRunEvents;
      const gameId = this.props.gameID.gameID
      console.log(gameId);
      const allPlayers = this.props.players.players;
      console.log(allPlayers);
      let keyID = this.props.gameID.keyID;
      console.log(keyID);

      let sum = a => a.reduce((acc, item) => acc + item);

      //Calculate the total runs
      let totalRuns = sum(gameRunEvents.map(acc => Number(acc.runsValue)));
      console.log(totalRuns);

      let ball = 0;

      let legitBall = BallDiff.getLegitBall(ball, gameRunEvents);
      let ballTotal = legitBall[0];
      console.log(ballTotal);

      ball = sum(ballTotal.map(acc => Number(acc)));
      console.log(ball);

      let totalBallDiff = BallDiff.getpartnershipDiffTotal(ball);
      const over = totalBallDiff[0];
      /*
      let firstInningsRuns = [];
      if (this.state.firstInningsRuns === 0) {
        firstInningsRuns = [0]
      }
      else {
      let firstInningsRuns = this.state.firstInningsRuns;
    }
      let firstInningsRunsTotalArray = firstInningsRuns.filter( runs => runs != undefined)
      console.log(firstInningsRunsTotalArray);
      */

      const { navigation } = this.props;
      let firstInningsRuns = navigation.getParam('firstInningsRuns', 0);
      console.log(firstInningsRuns);

      if (firstInningsRuns === 0) {
        firstInningsRuns = this.props.firstInningsRuns.firstInningsRuns;
      }
      else {
        //do nohthing.
      }

      /*
      if (firstInningsRuns === 0) {
        firstInningsRuns = 1000;
      }
      else {
      //do nothing.
    }
    */

    //console.log(firstInningsRunsTotal);

      //Get total wickets
      let getWicketCount = BallDiff.getWicketCount(gameRunEvents);
      let totalWickets = getWicketCount[0];
      console.log(totalWickets);
      /*
      console.log(this.props.games.games);
      let games = this.props.games.games;
      //let games = this.props.gamesList.gamesList;

      let gameIndex = games.findIndex(function(c) {
       return c.gameId == gameId;
      });

      console.log(gameIndex);
      console.log(allPlayers);
      */

      console.log(totalWickets);
      if (totalWickets >= 10) {
        /*
        let filtered = '';
        if (keyID === '0') {
          filtered = CardBoard.getFilteredKey(this.props.games.games, gameId);
          console.log(filtered);

          this.setState({
            keyID: filtered,
            gameID: gameId,
          }, function () {
            const { keyID, gameID } = this.state
            this.props.dispatch(updateGameID(this.state.keyID, this.state.gameID));
          })
        }
        else {
          filtered = keyID;
        }
        console.log('Wickets 10 or more.');
        //let filtered = CardBoard.getFilteredKey(this.props.games.games, gameId);
        let highestScorers = CardBoard.getHighestScorers(gameRunEvents, allPlayers);
        let battersHighestScore = highestScorers[0];
        let battersNameHighestScore = highestScorers[1];
        let highestScoreBallCount = highestScorers[2];
        let battersSecondHighestScore = highestScorers[3];
        let battersNameSecondHighestScore = highestScorers[4];
        let secondHighestScoreBallCount = highestScorers[5];
          this.ref.doc(filtered[0]).update({
              gameRunEvents: gameRunEvents,
              totalRuns: totalRuns,
              players: allPlayers,
              topScore: battersHighestScore[0][0],
              topScorePlayer: battersNameHighestScore[0].player,
              topScoreBalls: highestScoreBallCount,
              topSecondScore: battersSecondHighestScore[0][0],
              topSecondScorePlayer: battersNameSecondHighestScore[0].player,
              topSecondBalls: secondHighestScoreBallCount,
              totalWickets: totalWickets,
              gameResult: 1,
          });
          */

          /*
          let game = {
            gameRunEvents: gameRunEvents,
            totalRuns: totalRuns,
            players: allPlayers,
            topScore: battersHighestScore[0][0],
            topScorePlayer: battersNameHighestScore[0].player,
            topScoreBalls: highestScoreBallCount,
            topSecondScore: battersSecondHighestScore[0][0],
            topSecondScorePlayer: battersNameSecondHighestScore[0].player,
            topSecondBalls: secondHighestScoreBallCount,
            totalWickets: totalWickets,
            gameResult: 1,
          }

          console.log(game);
          console.log(games);
          games.slice(0);
          games.unshift(game);
          console.log(games);

          /*
          var indexCurrentGame = games.indexOf(gameIndex);
          if (~indexCurrentGame) {
              games[indexCurrentGame] = game;
        }


          //console.log(games);
          //games.update(game. {index: gameIndex})
          //console.log(games);

          this.setState({
            games: games,
          }, function () {
            const { games } = this.state
            this.props.dispatch(updateGames(this.state.games));
          })
          */

        return (
        <Row style={{height: 100}}>
          <Col size={3}>
            <Button style={styles.goButton} rounded large success
              onPress={() => this.playNewGame()}
            >
              <Text style={styles.goButtonText}>All OUT! Play Again?</Text>
            </Button>
          </Col>
          <Col size={1}>
            <RequiredRunRate firstInningsRuns={firstInningsRuns} />
            <Text>RRR: x.x</Text>
            <Text>Pressure: xx%</Text>
            <Text>Target: {firstInningsRuns}</Text>
          </Col>
        </Row>
      )

      }
      else if (totalRuns > firstInningsRuns) {
        /*
        let filtered = '';
        if (keyID === '0') {
          filtered = CardBoard.getFilteredKey(this.props.games.games, gameId);
          console.log(filtered);

          this.setState({
            keyID: filtered,
            gameID: gameId,
          }, function () {
            const { keyID, gameID } = this.state
            this.props.dispatch(updateGameID(this.state.keyID, this.state.gameID));
          })
        }
        else {
          filtered = keyID;
        }
        console.log('total runs more than first innings toal!.');
        //let filtered = CardBoard.getFilteredKey(this.props.games.games, gameId);
        console.log(gameRunEvents);
        let highestScorers = CardBoard.getHighestScorers(gameRunEvents, allPlayers);
        let battersHighestScore = highestScorers[0];
        let battersNameHighestScore = highestScorers[1];
        let highestScoreBallCount = highestScorers[2];
        let battersSecondHighestScore = highestScorers[3];
        let battersNameSecondHighestScore = highestScorers[4];
        let secondHighestScoreBallCount = highestScorers[5];
          this.ref.doc(filtered[0]).update({
              gameRunEvents: gameRunEvents,
              totalRuns: totalRuns,
              players: allPlayers,
              topScore: battersHighestScore[0][0],
              topScorePlayer: battersNameHighestScore[0].player,
              topScoreBalls: highestScoreBallCount,
              topSecondScore: battersSecondHighestScore[0][0],
              topSecondScorePlayer: battersNameSecondHighestScore[0].player,
              topSecondBalls: secondHighestScoreBallCount,
              totalWickets: totalWickets,
              gameResult: 2,
          });
          */

          /*
          let game = {
            gameRunEvents: gameRunEvents,
            totalRuns: totalRuns,
            players: allPlayers,
            topScore: battersHighestScore[0][0],
            topScorePlayer: battersNameHighestScore[0].player,
            topScoreBalls: highestScoreBallCount,
            topSecondScore: battersSecondHighestScore[0][0],
            topSecondScorePlayer: battersNameSecondHighestScore[0].player,
            topSecondBalls: secondHighestScoreBallCount,
            totalWickets: totalWickets,
            gameResult: 1,
          }

          console.log(games);
          games.update(game)
          console.log(games);

          this.setState({
            games: games,
          }, function () {
            const { games } = this.state
            this.props.dispatch(updateGames(this.state.games));
          })
          */


        return (
        <Row style={{height: 100}}>
          <Col size={3}>
            <Button style={styles.goButton} rounded large success
              onPress={() => this.playNewGame()}
            >
              <Text style={styles.goButtonText}>Win! Play Again?</Text>
            </Button>
          </Col>
          <Col size={1}>
            <RequiredRunRate firstInningsRuns={firstInningsRuns} />
            <Text>RRR: x.x</Text>
            <Text>Pressure: xx%</Text>
            <Text>Target: {firstInningsRuns}</Text>
          </Col>
        </Row>
      )
      }
      else if (over >= 20) {
        /*
        let filtered = '';
        if (keyID === '0') {
          filtered = CardBoard.getFilteredKey(this.props.games.games, gameId);
          console.log(filtered);

          this.setState({
            keyID: filtered,
            gameID: gameId,
          }, function () {
            const { keyID, gameID } = this.state
            this.props.dispatch(updateGameID(this.state.keyID, this.state.gameID));
          })
        }
        else {
          filtered = keyID;
        }
        console.log('over 20 overs.');
        //let filtered = CardBoard.getFilteredKey(this.props.games.games, gameId);
        let highestScorers = CardBoard.getHighestScorers(gameRunEvents, allPlayers);
        let battersHighestScore = highestScorers[0];
        let battersNameHighestScore = highestScorers[1];
        let highestScoreBallCount = highestScorers[2];
        let battersSecondHighestScore = highestScorers[3];
        let battersNameSecondHighestScore = highestScorers[4];
        let secondHighestScoreBallCount = highestScorers[5];
          this.ref.doc(filtered[0]).update({
              gameRunEvents: gameRunEvents,
              totalRuns: totalRuns,
              players: allPlayers,
              topScore: battersHighestScore[0][0],
              topScorePlayer: battersNameHighestScore[0].player,
              topScoreBalls: highestScoreBallCount,
              topSecondScore: battersSecondHighestScore[0][0],
              topSecondScorePlayer: battersNameSecondHighestScore[0].player,
              topSecondBalls: secondHighestScoreBallCount,
              totalWickets: totalWickets,
              gameResult: 1,
          });
          */

          /*
          let game = {
            gameRunEvents: gameRunEvents,
            totalRuns: totalRuns,
            players: allPlayers,
            topScore: battersHighestScore[0][0],
            topScorePlayer: battersNameHighestScore[0].player,
            topScoreBalls: highestScoreBallCount,
            topSecondScore: battersSecondHighestScore[0][0],
            topSecondScorePlayer: battersNameSecondHighestScore[0].player,
            topSecondBalls: secondHighestScoreBallCount,
            totalWickets: totalWickets,
            gameResult: 1,
          }

          console.log(games);
          games.update(game)
          console.log(games);

          this.setState({
            games: games,
          }, function () {
            const { games } = this.state
            this.props.dispatch(updateGames(this.state.games));
          })
          */

        return (
        <Row style={{height: 100}}>
          <Col size={3}>
            <Button style={styles.goButton} rounded large success
              onPress={() => this.playNewGame()}
            >
              <Text style={styles.goButtonText}>Game over! Play Again?</Text>
            </Button>
          </Col>
          <Col size={1}>
            <RequiredRunRate firstInningsRuns={firstInningsRuns} />
            <Text>RRR: x.x</Text>
            <Text>Pressure: xx%</Text>
            <Text>Target: {firstInningsRuns}</Text>
          </Col>
        </Row>
      )
      }
      else {

        /*
          ******************
        console.log('continue game.');
        let filtered = CardBoard.getFilteredKey(this.props.games.games, gameId);
        console.log(filtered);
          //this.ref.doc(filtered[0]).update({
          this.ref.doc(filtered).update({
              gameResult: 0,
          });


          console.log(allPlayers);
          console.log(gameRunEvents);
          console.log(ball);
          console.log(over);
          if (totalRuns === 0) {
            //do nothing
          }
          else {
            console.log('ball and over more than 0.');
          let highestScorers = CardBoard.getHighestScorers(gameRunEvents, allPlayers);
          console.log(highestScorers);
          //let battersHighestScore = highestScorers[0];
          //let battersNameHighestScore = highestScorers[1];
          //let highestScoreBallCount = highestScorers[2];
          //let battersSecondHighestScore = highestScorers[3];
          //let battersNameSecondHighestScore = highestScorers[4];
          //let secondHighestScoreBallCount = highestScorers[5];


          /*
          ***************************
          let game = {
            displayId: 111,
            firstInningsRuns: this.state.firstInningsRuns,
            gameId: gameId,
            gameName: "Cricket Strategy Sim",
            gameResult: 0,
            players: allPlayers,
            gameRunEvents: gameRunEvents,
            key: filtered,
            //topScore: battersHighestScore,
            //topScoreBalls: highestScoreBallCount,
            //topScorePlayer: battersNameHighestScore,
            //topSecondScore: battersSecondHighestScore,
            //topSecondBalls: secondHighestScoreBallCount,
            //topSecondScorePlayer: battersNameSecondHighestScore,
            totalRuns: totalRuns,
            totalWickets: totalWickets,
          }


          /*
          let game = {
            gameRunEvents: gameRunEvents,
            totalRuns: totalRuns,
            players: allPlayers,
            totalWickets: totalWickets,
            gameResult: 0,
          }
          */

          /*
          *********************
          //const some_array = [...this.state.some_array]
          console.log(game);
          console.log(games);
          console.log(game[0]);
          games[0] = game;
          console.log(games);
        }
        */

          /*
          console.log(game);
          console.log(games);
          games.slice(0);
          console.log(games);
          games.unshift(game);
          console.log(games);
          */

          /*

          this.setState({
            games: games,
          }, function () {
            const { games } = this.state
            this.props.dispatch(updateGames(this.state.games));
          })
          */


        return (
        <Row>
          <Col size={1}>
            <Button style={styles.goButton} large success
              onPress={() => this.handleCards()}
            >
              <Text style={styles.goButtonText}>PLAY!</Text>
            </Button>
          </Col>
          <Col size={1} style={{backgroundColor: '#c471ed'}}>
            <TouchableHighlight style={{height: 100, marginTop: 10}} onPress={() => this.handleStopCardsOne()}>
              <View style={{height: 100}}>
                <Image style={styles.cardDisplay}source={this.state.rImage}/>
              </View>
            </TouchableHighlight>
          </Col>
          <Col size={1} style={{backgroundColor: '#c471ed'}}>
            <TouchableHighlight style={{height: 100, marginTop: 10}} onPress={() => this.handleStopCards()}>
              <View style={{height: 100}}>
                <Image style={styles.cardDisplay}source={this.state.rImageTwo}/>
              </View>
            </TouchableHighlight>
          </Col>
          <BoardDisplayStats firstInningsRuns={firstInningsRuns} />
        </Row>
      )
      }
    }


    render() {
      console.log('hit board!');
      //console.log(this.state.players);
      console.log(this.props.players.players);
        return (

          <Footer style={{ height: 350, backgroundColor: 'transparent', borderTopWidth: 0, backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0}}>
          <Col>
          <Row>
          <DisplayCurrentBatters />
          </Row>

          <Row>
            <RunsTotal />
            </Row>
            {this.playButtons()}

          </Col>
          </Footer>
        );
    }
}

/*  <Row>

{this.playButtons()}

</Row>
*/

const mapStateToProps = state => ({
  gameID: state.gameID,
  gameRuns: state.gameRuns,
  ball: state.ball,
  players: state.players,
  games: state.games,
  gamesList: state.gamesList,
  firstInningsRuns: state.firstInningsRuns,
  playerStats: state.playerStats,
  gameCards: state.gameCards,
});

export default connect(mapStateToProps)(Board);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    goButton: {
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: '#77dd77',
    },
    goButtonText: {
      color: '#fff',
      fontSize: 30,
    },
    cardDisplay: {
      flex: 1,
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  horizontalRule: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  horizontalRuleTop: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    width: '100%',
    marginBottom: 15,
  },
});
