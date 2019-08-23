import React from 'react';
import firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';
import { Header, Left, Right, Icon, Content, Container, H1, H2, H3, Footer, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, PixelRatio, ScrollView, View, Text, TextInput, Platform, Image, FlatList, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native';

import { connect } from "react-redux";
import { updateGameId } from '../../Reducers/gameId';
import { updateGameRuns } from '../../Reducers/gameRuns';
import { updatePlayers } from '../../Reducers/players';

import BallDiff from '../../Util/BallDiff.js';
import CardBoard from '../../Util/CardBoard.js';

class SimulateFirstInnings extends React.Component {
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
        simRuns: 0,
        simRunEvents: [],
        totalRuns: 0,
        totalWickets: 0,
        totalOver: 0,
        totalBall: 0,
    };
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

      let time = 250
      let n = 0;
      this.interval = setInterval(() => {
        n++
        if (n < 121 && this.state.totalWickets < 10) {
        this.simulateRuns();
      }
      else {
        const firstInningsRuns = this.state.totalRuns;
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
            firstInningsRuns: firstInningsRuns,
        });

        clearInterval(this.interval);

      }
        console.log(n);
      }, time);
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


simulateRuns = () => {
  const min = 0;
  const max = 27;
  const n = 0;

  //setTimeout('', 5000);




  //[...Array(n)].map((e, i) => {
  const randOneFull =  min + (Math.random() * (max-min));
  const randTwoFull =  min + (Math.random() * (max-min));
  console.log(randOneFull);
  console.log(randTwoFull);
  const randOneS = randOneFull.toFixed(0);
  const randTwoS = randTwoFull.toFixed(0);
  console.log(randOneS);
  console.log(randTwoS);

  const randOne = Number(randOneS);
  const randTwo = Number(randTwoS);

  const boardRuns = CardBoard.getBoardRuns(randOne, randTwo);
  const runs = boardRuns[0];
  const wicketEvent = boardRuns[1];

  console.log(runs);
  this.setState({ simRuns: runs });

  let simRunEvents = this.state.simRunEvents

  simRunEvents.push({runsValue: runs, wicketEvent: wicketEvent, runsType: 'runs'});
  console.log(simRunEvents);

  this.setState({ simRunEvents: simRunEvents });

  let display = this.getDisplayRunsTotal();
  let totalRuns = display[0];
  this.setState({ totalRuns: totalRuns });
  let totalWickets = display[1];
  this.setState({ totalWickets: totalWickets });
  let totalOver = display[2];
  this.setState({ totalOver: totalOver });
  let totalBall = display[3];
  this.setState({ totalBall: totalBall });

  let getRunRate = this.getRunRate();
  let runRate = getRunRate[0];
//})


}

getDisplayRunsTotal() {

  let gameRunEvents = this.state.simRunEvents;

  let sum = a => a.reduce((acc, item) => acc + item);
  let totalRuns = sum(gameRunEvents.map(acc => Number(acc.runsValue)));
  console.log(totalRuns);

  //Get total wickets
  let getWicketCount = BallDiff.getWicketCount(gameRunEvents);
  let totalWickets = getWicketCount[0];
  console.log(totalWickets);

  //----------calculate overs
  //let over = this.props.ball.over;
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

getRunRate() {
  let gameRunEvents = this.state.simRunEvents;
  let sum = a => a.reduce((acc, item) => acc + item);

//----------calculate overs
let ball = 0;

let legitBall = BallDiff.getLegitBall(ball, gameRunEvents);
let ballTotal = legitBall[0];
console.log(ballTotal);

ball = sum(ballTotal.map(acc => Number(acc)));
console.log(ball);

let totalBallDiff = BallDiff.getpartnershipDiffTotal(ball);
let totalOver = totalBallDiff[0];
console.log(totalOver);

let totalBall = totalBallDiff[1];
let overValue = totalOver + '.' +  totalBall;
let numberOverValue = Number(overValue);

//---------- end of calularte overs

//Calculate the total runs
let totalRuns = sum(gameRunEvents.map(acc => Number(acc.runsValue)));
console.log(totalRuns);

//workout run rate:
console.log(numberOverValue);
let runRate = totalRuns / numberOverValue;
console.log(runRate);

if (numberOverValue < 1) {
  let runRateOneDecimal = '';
  return ['RR: ~'];
}
else {
  let runRateOneDecimal = parseFloat(runRate).toFixed(1);
  return ['RR: ' + runRateOneDecimal];
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
      <Row size={2}>
        <Col>
        <View style={styles.horizontalRule} />
          <Row>
          <Text style={styles.headingText}>Simulate First Innings</Text>
          </Row>
          <Row>
          <Text style={styles.headingTextSmall}>Generate score to chase in the second innings</Text>
          </Row>
          <View style={styles.horizontalRule} />
        </Col>
      </Row>
      <Row size={5}>
        <Col style={styles.ballCircle}>
          <Text style={styles.textBall}>{this.state.simRuns}</Text>
        </Col>
      </Row>
      <Row size={2}>
        <Col style={styles.ballCircleRuns}>
          <Row>
            <Text style={styles.textBallRuns}>{this.state.totalRuns}/{this.state.totalWickets}</Text>
          </Row>
          <Row size={1}>
            <Text style={styles.textBallOvers}>({this.state.totalOver}.{this.state.totalBall})</Text>
          </Row>
        </Col>
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

export default connect(mapStateToProps)(SimulateFirstInnings);


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
      marginTop: 25,
      marginBottom: 25,
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
  },
  headingText: {
    fontSize: 40,
    color: '#fff',
  },
  ballCircle: {
    width: '100%',
    height: 300,
    borderRadius: 60 / 2,
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 3,
    margin: 1,
  },
  textBall: {
    color: '#c471ed',
    fontSize: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontWeight: 'bold',
  },
  ballCircleRuns: {
    width: '100%',
    height: 200,
    borderRadius: 60 / 2,
    backgroundColor: '#c471ed',
    borderColor: '#c471ed',
    borderWidth: 3,
    margin: 1,
  },
  textBallRuns: {
    color: '#fff',
    fontSize: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontWeight: 'bold',
  },
  textBallOvers: {
    color: '#fff',
    fontSize: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontWeight: 'bold',
  },
  headingTextSmall: {
    fontSize: 15,
    color: '#eee',
  }
});
