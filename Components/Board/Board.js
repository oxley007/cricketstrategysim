import React from 'react';
import firebase from 'react-native-firebase';
import { ScrollView, View, Text, TextInput, StyleSheet, PixelRatio, Platform, Image, FlatList, TouchableHighlight, TouchableOpacity } from 'react-native';
import {Header,Left,Right,Icon,Content,Grid,Row,Col,Container,H1,H3,Footer,Button} from 'native-base';

import { connect } from "react-redux";
import { updateGameId } from '../../Reducers/gameId';
import { updateGameRuns } from '../../Reducers/gameRuns';
import { updatePlayers } from '../../Reducers/players';

import RunsTotal from './RunsTotal';
import DisplayCurrentBatters from './DisplayCurrentBatters'
import BallDiff from '../../Util/BallDiff.js';
import CardBoard from '../../Util/CardBoard.js';

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
        cardOne: 0,
        cardTwo: 0,
        randomClick: 2,
        incrementer: null,
        //players: [],
        facingBall: 0,
        firstInningsRuns: 0,
    };
    this.rImages = [require('./random/a-hearts.png'),require('./random/2-hearts.png'),require('./random/3-hearts.png'),require('./random/4-hearts.png'),require('./random/5-hearts.png'),require('./random/6-hearts.png'),require('./random/7-hearts.png'),require('./random/a-diamonds.png'),require('./random/2-diamonds.png'),require('./random/3-diamonds.png'),require('./random/4-diamonds.png'),require('./random/5-diamonds.png'),require('./random/6-diamonds.png'),require('./random/7-diamonds.png'),require('./random/a-spades.png'),require('./random/2-spades.png'),require('./random/3-spades.png'),require('./random/4-spades.png'),require('./random/5-spades.png'),require('./random/6-spades.png'),require('./random/7-spades.png'),require('./random/a-clubs.png'),require('./random/2-clubs.png'),require('./random/3-clubs.png'),require('./random/4-clubs.png'),require('./random/5-clubs.png'),require('./random/6-clubs.png'),require('./random/7-clubs.png')]
  }

state = {
  gameID: this.props.gameID.gameID || '0',
  gameRunEvents: this.props.gameRuns.gameRunEvents || [{eventID: 0, runsValue: 0, ball: -1, runsType: 'deleted', wicketEvent: false, batterID: 0, bowlerID: 0}],
  eventID: this.props.gameRuns.eventID || 0,
  overBowled: this.props.gameRuns.overBowled || false,
  ball: this.props.ball.ball || 0,
  over: this.props.ball.over || 0,
  players: this.props.players.players || [],
  facingBall: this.props.players.facingBall || 1,
};

handleChange = ( gameID, gameRuns, ball, players ) => {
  this.setState({ gameID });
  this.setState({ gameRuns });
  this.setState({ ball });
  this.setState({ players });
};

incrementer = () => {
  console.log(this.state.incrementer);
  let incrementer = null;
  console.log(incrementer);
  this.setState({incrementer: incrementer});
}

componentDidMount() {
  const { currentUser } = firebase.auth()
  this.setState({ currentUser })
  this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  this.refPlayers.onSnapshot(this.onDocCollectionUpdate)
  console.log('firstinnings hit next');
  this.getFirstInningsRuns();
}

componentWillUnmount() {
  this.unsubscribe();
  clearInterval(this.interval);
}

onDocCollectionUpdate = (documentSnapshot) => {
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

  let allPlayers = [];

  if (ball <= 0 && over <= 0) {
    console.log(ball + ' + ' + over);
    allPlayers = documentSnapshot.data().players;
  }
  else {
    console.log('else all players from redux.');
    allPlayers = this.props.players.players;
  }
  console.log(allPlayers);

  //Get total wickets
  const facingBall = this.props.players.facingBall;

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


    console.log(players);

    this.setState({
      players: players,
      facingBall: facingBall,
    }, function () {
      const { players, facingBall } = this.state
      this.props.dispatch(updatePlayers(this.state.players, this.state.facingBall));
    })

    console.log(this.props.players.players);


    //this.setState({ players: players });
    //console.log(this.state.players);
  }

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
  const games = [];
  querySnapshot.forEach((doc) => {
    const { gameId, gameName, firstInningsRuns } = doc.data();

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

 console.log('get First Innings Runs');
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

  handleCards = () => {
    const randomClick = this.state.randomClick
    if (randomClick === 2) {
    clearInterval(this.incrementer)
    this.setState({ randomClick: 0 });
    let secValue = 100;


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
  }

    handleStopCards = () => {
      const randomClick = this.state.randomClick
      if (randomClick === 1) {
      this.setState({ randomClick: 2 });
      var cardOne = this.state.cardOne;
      var cardTwo = this.state.cardTwo;
      let boardRuns = CardBoard.getBoardRuns(cardOne, cardTwo);
      let runs = boardRuns[0];
      let wicketEvent = boardRuns[1];
      console.log(runs);

      const { currentUser } = this.state;
      console.log(currentUser);
      console.log(currentUser.uid);
      //this.setState({ currentUser })

        let sum = a => a.reduce((acc, item) => acc + item);

        this.setState({ random: runs });

        let eventID = this.props.gameRuns.eventID;
        eventID++
        console.log(eventID);


        let gameRunEvents = this.props.gameRuns.gameRunEvents;
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
        let facingBall = this.state.facingBall;
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
        this.setState({facingBall: facingBall});

        //handle wicket event to remove batsman.
        //Get total wickets
        let getWicketCount = BallDiff.getWicketCount(gameRunEvents);
        let totalWickets = getWicketCount[0];
        console.log(totalWickets);

        //if (wicketEvent === true || runs === 6 || runs === '6' || runs === 4 || runs === '4' ) {
          if (wicketEvent === true ) {
            console.log('wicket event true!!');
          setTimeout(() => {
            this.props.navigation.navigate('WicketCheck');
          }, 1000);  //1000 milliseconds
          }
          else {
            console.log('wicket event false!');


      let allPlayers = this.props.players.players;
      console.log(allPlayers);
      this.setState({
        players: allPlayers,
        facingBall: facingBall,
      }, function () {
        const { players, facingBall } = this.state
        this.props.dispatch(updatePlayers(this.state.players, this.state.facingBall));
      })


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
        let numberBallValue = 0;
        if (totalBall === 0 && totalOver > 0 && wicketEvent != true) {
          let eventID = this.props.gameRuns.eventID;
          numberBallValue = Number(6);
          //this.props.dispatch(updateGameRuns(gameRunEvents, eventID, true))

          this.setState({
            gameRunEvents: gameRunEvents,
            eventID: eventID,
            overBowled: true,
          }, function () {
            const { gameRunEvents, eventID, overBowled } = this.state
            this.props.dispatch(updateGameRuns(this.state.gameRunEvents, this.state.eventID, this.state.overBowled));
          })


          console.log(this.state.games);
          console.log(this.state.games[0].gameId);
          const gameId = this.props.gameID.gameID

          let highestScorers = CardBoard.getHighestScorers(gameRunEvents, allPlayers);
          let battersHighestScore = highestScorers[0];
          let battersNameHighestScore = highestScorers[1];
          let highestScoreBallCount = highestScorers[2];
          let battersSecondHighestScore = highestScorers[3];
          let battersNameSecondHighestScore = highestScorers[4];
          let secondHighestScoreBallCount = highestScorers[5];


          //get date, time, seconds
          //let sec = new Date().getSeconds(); //Current Seconds
          //let date = new  Date().toLocaleString();
          //let dateTime = Date().toString().replace(/T/, ' ').replace(/\..+/, '')
          //console.log(dateTime);



          let filtered = CardBoard.getFilteredKey(this.state.games, gameId);

          /*
          let currentKey = this.state.games.map(acc => {
            console.log(acc);
            if (acc.gameId  === gameId) {
              console.log(acc.gameId);
              console.log(acc.key);
              return acc.key;
            }
            });
            console.log(currentKey);

            let filtered = currentKey.filter(t=>t != undefined);
            console.log(filtered);
            console.log(filtered[0]);
            */

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
            });

         setTimeout(() => {
        this.props.navigation.navigate('OverBowled');
    }, 1000);  //5000 milliseconds

        }
        else {
          //do nothing
          console.log('naviagte not hit');
          this.setState({
            gameRunEvents: gameRunEvents,
            eventID: eventID,
            overBowled: false,
          }, function () {
            const { gameRunEvents, eventID, overBowled } = this.state
            this.props.dispatch(updateGameRuns(this.state.gameRunEvents, this.state.eventID, this.state.overBowled));
          })

        }
        let numberOverValue = Number(totalOver);
      }
      }
      else {
        //do nothing.
      }
    }

    getFirstInningsRuns = () => {
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

    playNewGame = () => {
      //to do
    }

    playButtons = () => {
      let gameRunEvents = this.props.gameRuns.gameRunEvents;
      const gameId = this.props.gameID.gameID
      const allPlayers = this.props.players.players;

      let sum = a => a.reduce((acc, item) => acc + item);

      //Calculate the total runs
      let totalRuns = sum(gameRunEvents.map(acc => Number(acc.runsValue)));
      console.log(totalRuns);
      console.log(this.state.firstInningsRuns);

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
      let firstInningsRuns = this.state.firstInningsRuns;
      console.log(firstInningsRuns);
      let firstInningsRunsTotal = 0;
      if (firstInningsRuns === 0) {
        firstInningsRunsTotal = 1000;
      }
      else {
      let firstInningsRunsTotalArray = firstInningsRuns.filter( runs => runs != undefined)
      firstInningsRunsTotal = Number(firstInningsRunsTotalArray);
    }

    console.log(firstInningsRunsTotal);

      //Get total wickets
      let getWicketCount = BallDiff.getWicketCount(gameRunEvents);
      let totalWickets = getWicketCount[0];
      console.log(totalWickets);

      if (totalWickets >= 10) {
        let filtered = CardBoard.getFilteredKey(this.state.games, gameId);
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
            <Text>RRR: x.x</Text>
            <Text>Pressure: xx%</Text>
            <Text>Target: {this.state.firstInningsRuns}</Text>
          </Col>
        </Row>
      )

      }
      else if (totalRuns > firstInningsRunsTotal) {
        let filtered = CardBoard.getFilteredKey(this.state.games, gameId);
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
            <Text>RRR: x.x</Text>
            <Text>Pressure: xx%</Text>
            <Text>Target: {this.state.firstInningsRuns}</Text>
          </Col>
        </Row>
      )
      }
      else if (over >= 20) {
        let filtered = CardBoard.getFilteredKey(this.state.games, gameId);
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
            <Text>RRR: x.x</Text>
            <Text>Pressure: xx%</Text>
            <Text>Target: {this.state.firstInningsRuns}</Text>
          </Col>
        </Row>
      )
      }
      else {
        console.log(this.state.firstInningsRuns);
        return (
        <Row style={{height: 100}}>
          <Col size={1}>
            <Button style={styles.goButton} rounded large success
              onPress={() => this.handleCards()}
            >
              <Text style={styles.goButtonText}>PLAY!</Text>
            </Button>
          </Col>
          <Col size={1}>
            <TouchableHighlight style={{height: 100}} onPress={() => this.handleStopCardsOne()}>
              <View style={{height: 100}}>
                <Image style={styles.cardDisplay}source={this.state.rImage}/>
              </View>
            </TouchableHighlight>
          </Col>
          <Col size={1}>
            <TouchableHighlight style={{height: 100}} onPress={() => this.handleStopCards()}>
              <View style={{height: 100}}>
                <Image style={styles.cardDisplay}source={this.state.rImageTwo}/>
              </View>
            </TouchableHighlight>
          </Col>
          <Col size={1}>
            <Text>RRR: x.x</Text>
            <Text>Pressure: xx%</Text>
            <Text>Target: {this.state.firstInningsRuns}</Text>
          </Col>
        </Row>
      )
      }
    }


    render() {
      console.log('hit board!');
      //console.log(this.state.players);
      console.log(this.props.players.players);
        return (
          <View>
            <View style={styles.horizontalRule} />
            <DisplayCurrentBatters />
            <View style={styles.horizontalRule} />
            {this.playButtons()}
            <Row>
              <RunsTotal />
            </Row>
          </View>
        );
    }
}

const mapStateToProps = state => ({
  gameID: state.gameID,
  gameRuns: state.gameRuns,
  ball: state.ball,
  players: state.players,
});

export default connect(mapStateToProps)(Board);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    goButton: {
      width: 100,
      height: 100,
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
