import React from 'react';
import firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';
import { Header, Left, Right, Icon, Content, Container, H1, H3, Footer, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, PixelRatio, ScrollView, View, Text, TextInput, Platform, Image, FlatList, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native';

import { connect } from "react-redux";
import { updateGameId } from '../../Reducers/gameId';
import { updateGameRuns } from '../../Reducers/gameRuns';
import { updatePlayers } from '../../Reducers/players';

import BallDiff from '../../Util/BallDiff.js';
import CardBoard from '../../Util/CardBoard.js';

class WicketCheck extends React.Component {
  constructor(props) {
    const { currentUser } = firebase.auth()
    super(props);
    this.ref = firebase.firestore().collection(currentUser.uid);
    this.refPlayers = firebase.firestore().collection(currentUser.uid).doc('players');
    this.state = {
        textInput: '',
        textInputBatter: '',
        loading: true,
        scorecard: [],
        rImage: '',
        cardWicket: 0,
        randomClick: 1,
        incrementer: null,
    };
    this.rImages = [require('../Board/random/a-hearts.png'),require('../Board/random/2-hearts.png'),require('../Board/random/3-hearts.png'),require('../Board/random/4-hearts.png'),require('../Board/random/5-hearts.png'),require('../Board/random/6-hearts.png'),require('../Board/random/7-hearts.png'),require('../Board/random/a-diamonds.png'),require('../Board/random/2-diamonds.png'),require('../Board/random/3-diamonds.png'),require('../Board/random/4-diamonds.png'),require('../Board/random/5-diamonds.png'),require('../Board/random/6-diamonds.png'),require('../Board/random/7-diamonds.png'),require('../Board/random/a-spades.png'),require('../Board/random/2-spades.png'),require('../Board/random/3-spades.png'),require('../Board/random/4-spades.png'),require('../Board/random/5-spades.png'),require('../Board/random/6-spades.png'),require('../Board/random/7-spades.png'),require('../Board/random/a-clubs.png'),require('../Board/random/2-clubs.png'),require('../Board/random/3-clubs.png'),require('../Board/random/4-clubs.png'),require('../Board/random/5-clubs.png'),require('../Board/random/6-clubs.png'),require('../Board/random/7-clubs.png')]
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
    //this.refPlayers.onSnapshot(this.onDocCollectionUpdate)
  }

  componentWillUnmount() {
    this.unsubscribe();
    clearInterval(this.interval);
  }

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


handleWicketStart = () => {
  const randomClick = this.state.randomClick
  if (randomClick === 1) {
    clearInterval(this.incrementer)
    this.setState({ randomClick: 0 });
    let secValue = 100;

    this.incrementer = setInterval( () => {
      if (this.state.randomClick === 0) {
    var randomInt = Math.floor(Math.random() * this.rImages.length)
    console.log(randomInt);
    this.setState({
      cardWicket: randomInt,
    })
    var rImage = this.rImages[randomInt]
        this.setState({
          rImage: rImage,
        }
      )}
    }, secValue);
  }
}

handleWicket = () => {
  const randomClick = this.state.randomClick
  if (randomClick === 0) {
    this.setState({ randomClick: 1 });
    const cardWicket = this.state.cardWicket;
    //var cardTwo = this.state.cardTwo;
    let cardColorCheck = CardBoard.getCardColor(cardWicket);
    let cardColor = cardColorCheck;
    //let wicketEvent = boardRuns[1];
    console.log(cardColor);


    const { currentUser } = this.state;
    console.log(currentUser);
    console.log(currentUser.uid);
    //this.setState({ currentUser })

      let sum = a => a.reduce((acc, item) => acc + item);

      //this.setState({ random: runs });

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

      // ************ workout who's batting **************** //
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
      console.log();
      let facingBall = this.props.players.facingBall;
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

      const runs = 0;
      let wicketEvent = false;
      if (cardColor === 'red') {
        console.log('Wicket event red');
        wicketEvent = true;
      }

      console.log(wicketEvent);

      gameRunEvents.push({eventID: eventID, runsValue: runs, ball: ball, runsType: 'runs', wicketEvent: wicketEvent, batterID: facingBatter, bowlerID: 0});
      console.log(gameRunEvents);

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

      if (cardColor === 'red') {

        if (facingBall === 1) {
          facingBatter = idBatterOneNumber;
        }
        else {
          facingBatter = idBatterTwoNumber;
        }

        allPlayers = this.props.players.players;

        allPlayers.map(player => {
          console.log(player);
          console.log(player.id);
          wicketsPlusTwo = totalWickets + 2;

          if (player.id === facingBatter) {
            //batterFlag = 1;
            allPlayers[player.id].batterFlag = 1;
            console.log(allPlayers);

          }
          else if (player.id === wicketsPlusTwo) {
            allPlayers[player.id].batterFlag = 0;
            console.log(allPlayers);
          }
          else {
            //do nothing.
          }
      })

      console.log(allPlayers);
      this.setState({
        players: allPlayers,
        facingBall: facingBall,
      }, function () {
        const { players, facingBall } = this.state
        this.props.dispatch(updatePlayers(this.state.players, this.state.facingBall));
      })

      console.log(this.props.players.players);

    }



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

      if (cardColor === 'red') {
        setTimeout(() => {
          this.props.navigation.navigate('WicketOut');
          }, 1000);  //5000 milliseconds
        }
        else if (cardColor === 'too close to call') {
          setTimeout(() => {
            this.props.navigation.navigate('TooCloseToCall');
            }, 1000);  //5000 milliseconds
        }
        else {
          setTimeout(() => {
            this.props.navigation.navigate('WicketNotOut');
            }, 1000);  //5000 milliseconds
        }
    }
  }


  render() {
    return (
    <Container>
    <Header style={styles.headerStyle}>
      <Left size={1}>
        <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} style={{color: '#fff', paddingLeft: 20, marginTop: 'auto', marginBottom: 'auto' }} />
      </Left>
      <Col size={1} style={ styles.logoStylingCol }>
      <Image
       source={require('../../assets/4dot6logo-transparent.png')}
       style={{ height: '100%', width: 'auto', justifyContent: 'center', alignItems: 'center', resizeMode: 'contain' }}
      />
      </Col>
      <Right size={1} style={styles.colVerticleAlign}>
        </Right>
    </Header>
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0,0.9,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradient}>
    <Content style={{ flex: 1, width: '100%'}}>
      <Grid>
          <Text>Check Wicket</Text>
      </Grid>
      <Row style={{height: 100}}>
        <Button rounded large success
          onPress={() => this.handleWicketStart()}
          >
          <Text>GO!</Text>
        </Button>
      </Row>
      <Row>
        <TouchableHighlight style={{height: 100}} onPress={() => this.handleWicket()}>
        <View style={{height: 100}}>
          <Image style={styles.cardDisplay}source={this.state.rImage}/>
          </View>
        </TouchableHighlight>
      </Row>
    </Content>
    <Footer style={{ height: 100, backgroundColor: 'transparent', borderTopWidth: 0, backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0 }}>
    <Button rounded large warning style={styles.largeButton}
        onPress={() => this.props.navigation.navigate('Game')} >
        <Text style={styles.buttonTextBack}><Icon name='ios-arrow-back' style={styles.buttonTextBack} /> Back to game</Text>
      </Button>
    </Footer>
    </LinearGradient>
  </Container>
  );
  }
}

const mapStateToProps = state => ({
  gameID: state.gameID,
  gameRuns: state.gameRuns,
  ball: state.ball,
  players: state.players,
});

export default connect(mapStateToProps)(WicketCheck);


const styles = StyleSheet.create({
    container: {
        //flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5
    },
    textHeader: {
      color: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    textHeaderThreshold: {
      color: '#fff',
      alignItems: 'flex-start',
      width: '90%'
    },
    textDesc: {
      color: '#eee',
      fontWeight: '100',
    },
    textHeaderNumber: {
      color: '#fff',
      fontSize: 40,
      lineHeight: 40,
    },
    colCenter: {
      alignItems: 'center',
    },
    horizontalRule: {
      borderBottomColor: '#fff',
      borderBottomWidth: 0.5,
      width: '100%',
      marginTop: 15,
      marginBottom: 15,
    },
    colVerticleAlign: {
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    largeButton: {
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 0,
      shadowOpacity: 0,
    },
    buttonText: {
      fontSize: PixelRatio.get() === 1 ? 28 : PixelRatio.get() === 1.5 ? 32 : PixelRatio.get() === 2 ? 36 : 40,
      color: '#c471ed',
      marginTop: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      fontWeight: '200',
    },
    buttonTextBack: {
      fontSize: 20,
      color: '#c471ed',
      marginTop: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      fontWeight: '200',
    },
    rowPadding :{
      paddingTop: 20,
    },
    logoStylingCol :{
      marginBottom: 5,
      marginTop: 5,
      marginLeft: Platform.OS === 'android' ? '17%' : 0,
      justifyContent: 'center'
    },
    headerStyle: {
      height: PixelRatio.get() === 1 ? 45 : PixelRatio.get() === 1.5 ? 50 : PixelRatio.get() === 2 ? 75 : PixelRatio.get() === 3.5 ? 60 : PixelRatio.get() === 3 && Platform.OS === 'android' ? 60 : 75,
      backgroundColor: '#12c2e9',
    },
    horizontalRule: {
      borderTopColor: '#fff',
      borderTopWidth: 0.5,
      width: '100%',
      marginTop: 30,
    },
    ThresholdStyle: {
      fontSize: 40,
      width: 60,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopColor: '#fff',
      borderBottomColor: '#fff', backgroundColor: 'rgba(204, 204, 204, 0.4)'
    },
    cardDisplay: {
      flex: 1,
    width: 100,
    height: 100,
    resizeMode: 'contain'
    }
});
