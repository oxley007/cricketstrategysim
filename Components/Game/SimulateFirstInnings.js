import React from 'react';
import firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';
import { Header, Left, Right, Icon, Content, Container, H1, H2, H3, Footer, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, PixelRatio, ScrollView, View, Text, TextInput, Platform, Image, FlatList, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { connect } from "react-redux";
import { updateGameId } from '../../Reducers/gameId';
import { updateGameRuns } from '../../Reducers/gameRuns';
import { updatePlayers } from '../../Reducers/players';
import { updateGames } from '../../Reducers/games';
import { updateTeamPlayers } from '../../Reducers/teamPlayers';
import { updateGamesList } from '../../Reducers/gamesList';
import { updateFirstInningsRuns } from '../../Reducers/firstInningsRuns';

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
        newGameFlag: 0,
        runRate: 'RR: ~',
        n: 0,
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
    games: this.props.games.games || [],
    teamPlayers: this.props.teamPlayers.teamPlayers || [],
    gamesList: this.props.gamesList.gamesList || [],
    firstInningsRuns: this.props.firstInningsRuns.firstInningsRuns || 0,
  };

  handleChange = ( gameID, gameRuns, ball, players, games, teamPlayers, gamesList ) => {
    this.setState({ gameID });
    this.setState({ gameRuns });
    this.setState({ ball });
    this.setState({ players });
    this.setState({ games });
    this.setState({ teamPlayers });
    this.setState({ gamesList });
  };

  incrementer = () => {
    console.log(this.state.incrementer);
    let incrementer = null;
    console.log(incrementer);
    this.setState({incrementer: incrementer});
  }


  componentDidMount() {



  }

  componentWillUnmount() {
    this.unsubscribe();
    clearInterval(this.interval);
  }

  simulateInnings = () => {
    console.log(this.props.games.games);
    console.log(this.state.totalWickets);
    console.log(this.state.totalRuns);
    console.log(this.state.totalOver);
    console.log(this.state.totalBall);
    console.log(this.state.runRate);
    console.log(this.state.simRuns);
    console.log(this.state.simRunEvents);
    console.log(n);
    let n = this.state.n;
    //let n = this.onLoad();
    console.log(n);

    if (n === undefined) {
      n = 0;
    }
    const { currentUser } = firebase.auth()
    console.log(n);
    this.setState({ currentUser })
    console.log(n);
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    console.log(n);
    this.refPlayers.onSnapshot(this.onDocCollectionUpdate)
    console.log(n);
    console.log(this.props.games.games);
    //this.refPlayers.onSnapshot(this.onDocCollectionUpdate)

      let time = 250
      n = 0;
      const simRuns = 0;
      this.setState({ simRuns: simRuns });

      const simRunEvents = [];
      this.setState({ simRunEvents: simRunEvents });
      console.log(n);
      console.log(this.state.newGameFlag);
      this.interval = setInterval(() => {
        n++
        console.log(n);
        console.log(this.state.newGameFlag);
        console.log(this.state.totalWickets);
      if (n < 121 && this.state.totalWickets < 10 && this.state.newGameFlag === 1) {
        this.simulateRuns();
      }
      else if (this.state.newGameFlag === 0) {
        n = 0;

        console.log('n')

        const totalWickets = 0
        this.setState({ totalWickets: totalWickets });

        let totalRuns = 0;
        this.setState({ totalRuns: totalRuns });

        const totalOver = 0;
        this.setState({ totalOver: totalOver });

        const totalBall = 0;
        this.setState({ totalBall: totalBall });

        const runRate = 0;
        this.setState({ runRate: runRate });

        const simRuns = 0;
        this.setState({ simRuns: simRuns });

        const simRunEvents = [];
        this.setState({ simRunEvents: simRunEvents });

        }
      else {
        const firstInningsRuns = this.state.totalRuns;

        this.setState({
          firstInningsRuns: firstInningsRuns,
        }, function () {
          const { firstInningsRuns } = this.state
          this.props.dispatch(updateFirstInningsRuns(this.state.firstInningsRuns));
        })

        const gameId = this.props.gameID.gameID;
        const teamPlayers =this.props.teamPlayers.teamPlayers;

        console.log(this.props.games.games);
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

        console.log(this.props.games.games);
        let games = this.props.games.games;
        console.log(games);

        const { navigation } = this.props;
        const displayId = navigation.getParam('displayId', gameId);  //.it might need tobe 'displayId' (in brackets)
        console.log(displayId);

        console.log(filtered[0]);

        const game = {
          displayId: displayId,
          firstInningsRuns: firstInningsRuns,
          gameId: gameId,
          gameName: "Cricket Strategy Sim",
          gameResult: 0,
          gameRunEvents: [],
          players: teamPlayers,
          key: filtered[0],
          topScore: 0,
          topScoreBalls: 0,
          topScorePlayer: '',
          topSecondBalls: 0,
          topSecondScore: 0,
          topSecondScorePlayer: '',
          totalRuns: 0,
          totalWickets: 0,
          keyId: '',
        }

        console.log(game);

        //games.push({displayId: displayId, firstInningsRuns: firstInningsRuns, gameId: gameId, gameName: "Cricket Strategy Sim", gameResult: 0, key: currentKey, topScore: 0, topScoreBalls: 0, topScorePlayer: '', topSecondBalls: 0, topSecondScore: 0, topSecondScorePlayer: '', totalRuns: 0, totalWickets: 0});
        console.log(games);
        games.unshift(game);
        console.log(games);

        this.setState({
          games: games,
        }, function () {
          const { games } = this.state
          this.props.dispatch(updateGames(this.state.games));
        })
        console.log(this.props.games.games);

        let newGameFlag = 2;
        this.setState({newGameFlag: newGameFlag});

        /*
        console.log(this.props.gamesList.gamesList);
        let gamesTwo = this.props.gamesList.gamesList;
        console.log(gamesTwo);

        gamesTwo.unshift(game);
        console.log(gamesTwo);

        console.log(this.props.gamesList.gamesList);
        this.setState({
          gamesList: gamesTwo,
        }, function () {
          const { gamesList } = this.state
          this.props.dispatch(updateGamesList(this.state.gamesList));
        })
        console.log(this.props.gamesList.gamesList);
        */


        clearInterval(this.interval);


      }
        console.log(n);
      }, time);
  }


  onLoad = () => {

    console.log('n')

    const totalWickets = 0
    this.setState({ totalWickets: totalWickets });

    const newGameFlag = 1;
    //const newGameFlag = 0;
    this.setState({ newGameFlag: newGameFlag });
    console.log(this.state.newGameFlag);

    let totalRuns = 0;
    this.setState({ totalRuns: totalRuns });

    const totalOver = 0;
    this.setState({ totalOver: totalOver });

    const totalBall = 0;
    this.setState({ totalBall: totalBall });

    const runRate = 0;
    this.setState({ runRate: runRate });

    const n = 0;

    return n;

  }

  onCollectionUpdate = (querySnapshot) => {
    console.log(this.props.games.games);
    const games = [];
    console.log(this.props.games.games);
    let keyId = "";
    querySnapshot.forEach((doc) => {
      const { gameId, gameName } = doc.data();
      keyId = doc.id
      games.push({
        key: doc.id,
        doc, // DocumentSnapshot
        gameId,
        gameName,
      });
    });

    console.log(keyId);

    this.setState({
      games,
      loading: false,
      keyId: keyId,
   });
   console.log(this.props.games.games);
  }

  onDocCollectionUpdate = (documentSnapshot) => {
    console.log(this.state.facingBall);

    let allPlayers = this.props.players.players;
    let facingBall = this.state.facingBall;

    console.log(allPlayers);
    console.log(facingBall);


    if (allPlayers === [] || allPlayers === undefined || allPlayers === null || allPlayers.length < 1 ) {
      console.log('allplays null hit?');
      allPlayers = documentSnapshot.data().players;
    }
    else {
      console.log('else all players from redux.');
      allPlayers = this.props.players.players;
    }


    console.log(allPlayers);
    console.log(facingBall);


    this.setState({
      players: allPlayers,
      facingBall: 1,
    }, function () {
      const { players, facingBall } = this.state
      this.props.dispatch(updatePlayers(this.state.players, this.state.facingBall));
    })

    console.log(this.props.players.players);

    console.log('finished onDocCollectionUpdate');

    }


simulateRuns = () => {
  console.log(this.props.games.games);
  let gameRunEvents = this.state.simRunEvents;
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

  const boardRuns = CardBoard.getBoardRuns(randOne, randTwo, 0, false, 0, false, 2, false, 0, false, 1, false, 0, false, 0, true, null, null);
  const runs = boardRuns[0];
  let wicketEvent = boardRuns[1];
  console.log(wicketEvent);

  if (wicketEvent === true) {
    const minWicket = 0;
    const maxWicket = 1;
    let randWicket =  minWicket + (Math.random() * (maxWicket-minWicket));
    //randWicket = Math.floor(randWicket)
    randWicket = Math.round(randWicket);
    console.log(randWicket);
    console.log(wicketEvent);
    if (randWicket < 1) {
      wicketEvent = true;
    }
    else {
      wicketEvent = false;
    }
  }

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
  let runRate = display[4];
  this.setState({ runRate: runRate });

  //let getRunRate = this.getRunRate();
  //let runRate = getRunRate[0];
//})


}

getDisplayRunsTotal() {
  console.log(this.props.games.games);
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
  let overValue = totalOver + '.' +  totalBall;
  let numberOverValue = Number(overValue);
  //---------- end of calularte overs

  //workout run rate:
  console.log(numberOverValue);
  let runRate = totalRuns / numberOverValue;
  console.log(runRate);

  if (numberOverValue < 1) {
    //let runRateOneDecimal = '';
    runRate = 'RR: ~';
  }
  else {
    let runRateOneDecimal = parseFloat(runRate).toFixed(1);
    runRate = 'RR: ' + runRateOneDecimal;
  }

  return [totalRuns, totalWickets, totalOver, totalBall, runRate]
}

goToSefcondInnings = () => {

  console.log(this.state.totalRuns);
  const firstInningsRuns = this.state.totalRuns
  console.log(firstInningsRuns);
  console.log(this.props.games.games);
  const { navigation } = this.props;
  const displayId = navigation.getParam('displayId');  //.it might need tobe 'displayId' (in brackets)
  console.log(displayId);
  let newGameFlag = 0;
  this.setState({newGameFlag: newGameFlag});

  const teamPlayers = this.props.teamPlayers.teamPlayers;
  console.log(teamPlayers);

  this.setState({
    players: teamPlayers,
    facingBall: 1,
  }, function () {
    const { players, facingBall } = this.state
    this.props.dispatch(updatePlayers(this.state.players, this.state.facingBall));
  })

  const gameRunEvents = this.props.gameRuns.gameRunEvents;

  this.setState({
    gameRunEvents: gameRunEvents,
    overBowled: false,
  }, function () {
    const { gameRunEvents, overBowled } = this.state
    this.props.dispatch(updateGameRuns(this.state.gameRunEvents, this.state.overBowled));
  })

  const totalWicketsReset = 0
  this.setState({ totalWickets: totalWicketsReset });

  //const newGameFlag = 1;
  const newGameFlagReset = 0;
  this.setState({ newGameFlag: newGameFlagReset });
  console.log(this.state.newGameFlag);

  let totalRunsReset = 0;
  this.setState({ totalRuns: totalRunsReset });

  const totalOverReset = 0;
  this.setState({ totalOver: totalOverReset });

  const totalBallReset = 0;
  this.setState({ totalBall: totalBallReset });

  const runRateReset = 0;
  this.setState({ runRate: runRateReset });

  this.props.navigation.navigate('Game', {
    displayId: displayId,
    firstInningsRuns: firstInningsRuns,
  });
}

getSimRuns = () => {
  console.log(this.props.games.games);
  if (this.state.newGameFlag === 0) {
    console.log('newGameFlag === 0');
    return (
    <Col style={styles.ballCircle}>
    <Button rounded large warning style={styles.generateInningsLargeButton}
        onPress={() => this.changeGameFlag()} >
        <Text style={styles.generateInningsButtonText}>Generatre innings <Icon name='ios-arrow-forward' style={styles.generateInningsButtonText} /></Text>
      </Button>
    </Col>
    )
  }
  else {
  return (
    <Col style={styles.ballCircle}>
      <Text style={styles.textBall}>{this.state.simRuns}</Text>
    </Col>
  )
}
}

changeGameFlag = () => {
  const n = this.onLoad();
  console.log(n);
  this.setState({n: n});

  console.log(this.state.n);
  console.log(this.state.newGameFlag);
  this.simulateInnings();
  //console.log(this.props.games.games);
  //let newGameFlag = 1;
  //this.setState({newGameFlag: newGameFlag});




}

displayStartSecondInnings = () => {

  if (this.state.newGameFlag === 2 ) {
    return (
    <Button rounded large warning style={styles.largeButton}
      onPress={() => this.goToSefcondInnings()} >
      <Text style={styles.buttonTextBack}><Icon name='ios-arrow-back' style={styles.buttonTextBack} /> Start second innings</Text>
    </Button>
    )
  }
  else {
    //nothing.
  }
}


  render() {
    console.log(this.props.games.games);
    console.log(this.state.totalWickets);
    console.log(this.state.totalRuns);
    console.log(this.state.totalOver);
    console.log(this.state.totalBall);
    console.log(this.state.runRate);
    console.log(this.state.simRuns);
    console.log(this.state.simRunEvents);

    return (
    <Container>
    <NavigationEvents
                onDidFocus={() => console.log('Refreshed')}
                />
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
        {this.getSimRuns()}
      </Row>
      <Row size={2}>
        <Col style={styles.ballCircleRuns}>
          <Row>
            <Text style={styles.textBallRuns}>{this.state.totalRuns}/{this.state.totalWickets}</Text>
          </Row>
          <Row size={1}>
            <Text style={styles.textBallOvers}>({this.state.totalOver}.{this.state.totalBall} overs, {this.state.runRate})</Text>
          </Row>
        </Col>
      </Row>
    </Content>
    <Footer style={{ height: 100, backgroundColor: 'transparent', borderTopWidth: 0, backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0 }}>
      {this.displayStartSecondInnings()}
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
  games: state.games,
  teamPlayers: state.teamPlayers,
  gamesList: state.gamesList,
  firstInningsRuns: state.firstInningsRuns,
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
    generateInningsLargeButton: {
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
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
    generateInningsButtonText: {
      fontSize: 40,
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
    height: 200,
    borderRadius: 60 / 2,
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 3,
    margin: 1,
  },
  textBall: {
    color: '#c471ed',
    fontSize: 150,
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
