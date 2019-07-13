import React from 'react';
import firebase from 'react-native-firebase';
import { ScrollView, View, Text, TextInput, StyleSheet, PixelRatio, Platform, Image, FlatList, TouchableHighlight, TouchableOpacity } from 'react-native';
import {Header,Left,Right,Icon,Content,Grid,Row,Col,Container,H1,H3,Footer,Button} from 'native-base';

import { connect } from "react-redux";
import { updateGameId } from '../../Reducers/gameId';
import { updateGameRuns } from '../../Reducers/gameRuns';

import RunsTotal from './RunsTotal';
import BallDiff from '../../Util/BallDiff.js';
import CardBoard from '../../Util/CardBoard.js';

/*
const EntityAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'screen:GameList' }),
    ]
});
*/

class Board extends React.PureComponent {
  constructor(props) {
    const { currentUser } = firebase.auth()
    super(props);
    this.ref = firebase.firestore().collection(currentUser.uid);
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
    };
    this.rImages = [require('./random/a-hearts.png'),require('./random/2-hearts.png'),require('./random/3-hearts.png'),require('./random/4-hearts.png'),require('./random/5-hearts.png'),require('./random/6-hearts.png'),require('./random/7-hearts.png'),require('./random/a-diamonds.png'),require('./random/2-diamonds.png'),require('./random/3-diamonds.png'),require('./random/4-diamonds.png'),require('./random/5-diamonds.png'),require('./random/6-diamonds.png'),require('./random/7-diamonds.png'),require('./random/a-spades.png'),require('./random/2-spades.png'),require('./random/3-spades.png'),require('./random/4-spades.png'),require('./random/5-spades.png'),require('./random/6-spades.png'),require('./random/7-spades.png'),require('./random/a-clubs.png'),require('./random/2-clubs.png'),require('./random/3-clubs.png'),require('./random/4-clubs.png'),require('./random/5-clubs.png'),require('./random/6-clubs.png'),require('./random/7-clubs.png')]
  }

state = {
  gameID: this.props.gameID.gameID || '0',
  gameRunEvents: this.props.gameRuns.gameRunEvents || [{eventID: 0, runsValue: 0, ball: -1, runsType: 'deleted', wicketEvent: false, batterID: 0, bowlerID: 0}],
  eventID: this.props.gameRuns.eventID || 0,
  overBowled: this.props.gameRuns.overBowled || false,
};

handleChange = ( gameID, gameRuns ) => {
  this.setState({ gameID });
  this.setState({ gameRuns });
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
}

componentWillUnmount() {
  this.unsubscribe();
  clearInterval(this.interval);
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
  const games = [];
  querySnapshot.forEach((doc) => {
    const { gameId, gameName } = doc.data();

    games.push({
      key: doc.id,
      doc, // DocumentSnapshot
      gameId,
      gameName,
    });
  });

  this.setState({
    games,
    loading: false,
 });
}

  handleCards = () => {
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
        }/*,  function () {
          console.log(this.props.stoptimer.stoptimer);
          if (this.props.stopwatch.secondsElapsed >= 120) {
            this.handleStopClick();
          }
          else if (totalBall === 5 || runEventsLast.runsType.includes('WICKET')) {
            //don't do anything.
          }
          else if ( this.props.stoptimer.stoptimer === false ) {
            //const { secondsElapsed, laps, lastClearedIncrementer, incrementer, avgBall, avgSeconds } = this.state;
            //this.props.dispatch(updateStopwatch( this.state.secondsElapsed, this.state.laps, this.state.lastClearedIncrementer, this.state.incrementer, this.state.avgBall, this.state.avgSeconds ));
            //this.handleStopClickTwo(avgBalls, avgSeconds);
            this.handleStopClick()
          }
          else {
          const { secondsElapsed, laps, lastClearedIncrementer, incrementer, avgBall, avgSeconds } = this.state;
          this.props.dispatch(updateStopwatch( this.state.secondsElapsed, this.state.laps, this.state.lastClearedIncrementer, this.state.incrementer, this.state.avgBall, this.state.avgSeconds ));
        }
        }*/
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

  handleStopCardsOne = () => {
    this.setState({ randomClick: 1 });
    }

    handleStopCards = () => {
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

        gameRunEvents.push({eventID: eventID, runsValue: runs, ball: ball, runsType: 'runs', wicketEvent: wicketEvent, batterID: 0, bowlerID: 0});
        console.log(gameRunEvents);



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
        if (totalBall === 0 && totalOver > 0) {
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

            this.ref.doc(filtered[0]).update({
                gameRunEvents: gameRunEvents,
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

    render() {
      console.log('hit board!');
        return (
          <View>
            <Row>
              </Row>
              <Row style={{height: 100}}>
              <Button rounded large success
                onPress={() => this.handleCards()}
                >
                <Text>GO!</Text>
              </Button>
              <TouchableHighlight style={{height: 100}} onPress={() => this.handleStopCardsOne()}>
              <View style={{height: 100}}>
                <Image style={styles.cardDisplay}source={this.state.rImage}/>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style={{height: 100}} onPress={() => this.handleStopCards()}>
              <View style={{height: 100}}>
                <Image style={styles.cardDisplay}source={this.state.rImageTwo}/>
                </View>
              </TouchableHighlight>
            </Row>
            <Row>
              <Text>The number is: {this.state.random}</Text>
            </Row>
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
});

export default connect(mapStateToProps)(Board);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    largeButton: {
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 0,
      shadowOpacity: 0,
    },
    cardDisplay: {
      flex: 1,
    width: 100,
    height: 100,
    resizeMode: 'contain'
    }
});
