import React from 'react';
import firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';
import { Header, Left, Right, Icon, Content, Container, H1, H3, Footer, Button, Card, CardItem, Body } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, PixelRatio, ScrollView, View, Text, TextInput, Platform, Image, FlatList, Dimensions } from 'react-native';

import { connect } from "react-redux";

import CardBoard from '../../Util/CardBoard.js';
import BallDiff from '../../Util/BallDiff.js';
import DisplayCurrentBatters from '../Board/DisplayCurrentBatters';
import RunsTotal from '../Board/RunsTotal';
import BoardDisplayTopAttack from '../Board/BoardDisplayTopAttack';
import BoardDisplayStats from '../Board/BoardDisplayStats';

import { updateGameRuns } from '../../Reducers/gameRuns';
import { updateOver } from '../../Reducers/over';
import { updateGameId } from '../../Reducers/gameId';
import { updateFirstInningsRuns } from '../../Reducers/firstInningsRuns';
import { updatePlayers } from '../../Reducers/players';


class OverBowledBoard extends React.Component {
  constructor(props) {
    const { currentUser } = firebase.auth()
    super(props);
    this.ref = firebase.firestore().collection(currentUser.uid);
    this.state = {
        textInput: '',
        textInputBatter: '',
        loading: true,
        scorecard: [],
        agressionValueOne: 0,
        agressionValueTwo: 0,
        agressionValue: 0,
    };
  }

  state = {
    gameID: this.props.gameID.gameID || '0',
    gameRunEvents: this.props.gameRuns.gameRunEvents || [],
    firstInningsRuns: this.props.firstInningsRuns.firstInningsRuns || 0,
    ball: this.props.ball.ball || 0,
    over: this.props.ball.over || 0,
    players: this.props.players.players || [],
    facingBall: this.props.players.facingBall || 1,
  };

  handleChange = ( gameRuns, gameID, firstInningsRuns, ball, players ) => {
    this.setState({ gameID });
    this.setState({ gameRuns });
    this.setState({ firstInningsRuns });
    this.setState({ ball });
    this.setState({ players });
  };

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

    const requiredRunRateOneDecimal = parseFloat(requiredRunRate).toFixed(1);
    return [requiredRunRateOneDecimal];

  }

  getPressureScore = () => {

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

    const displayCurrentBatters = <DisplayCurrentBatters />
    const coachChat = this.getCoachChat(pressureScore);
    console.log(coachChat);

    return (
      <Grid>
        <Row>
            {displayCurrentBatters}
        </Row>
        <Row>
            {coachChat}
        </Row>
      </Grid>
    )
}

getCoachChat = (pressureScore) => {
    if (pressureScore <= 20) {
      console.log('uncre 20');
      return (
      <Grid>
        <View style={styles.horizontalRule} />
        <Row style={styles.rowPaddingCChatTitle}>
          <Col size={1}>
            <Text style={styles.rowPaddingPressureText}>Coach Chat: <Text style={styles.rowPaddingPressureTextPercentage}>(Pressue: {pressureScore}%)</Text></Text>
          </Col>
        </Row>
        <Row style={styles.rowPaddingChat}>
          <Text style={styles.chatText}>"Not much pressure. You can either play safe and keep wickets in hand and risk the runrate going up."</Text>
        </Row>
        <Row style={styles.rowPaddingChat}>
          <Text style={{color: '#fff'}}>or</Text>
        </Row>
        <Row style={styles.rowPaddingChat}>
          <Text style={styles.chatText}>"Play with risk to keep the runrate low. The risky option does come with the possibility of losing wickets and therefore increasing the game pressure."</Text>
        </Row>
        <View style={styles.horizontalRule} />
        <Row style={styles.rowPadding}>
          <Text style={{color: '#fff'}}>"So captain, what will you choose to do?..."</Text>
        </Row>
      </Grid>
    )
    }
    else if (pressureScore <= 40) {
      console.log('uncre 40');
      return (
      <Grid>
        <Row>
          <Text>You can play safe a keep wickets in hand. This will give you a chance to hit big near the end of the innings.</Text>
        </Row>
        <Row>
          <Text>or</Text>
        </Row>
        <Row>
          <Text>Put the pressure back on the bowling team and hit big now. The risk for you is losing wickets now will add pressure back on your team.</Text>
        </Row>
      </Grid>
    )
    }
    else if (pressureScore <= 60) {
      console.log('uncre 60');
      return (
      <Grid>
        <Row>
          <Text>A bit of pressure on your team. You could keep one batsman rotating the strike, the other hitting out.</Text>
        </Row>
        <Row>
          <Text>or</Text>
        </Row>
        <Row>
          <Text>Hold out and have both batsman playing with a medium amount of risk to take the innings deep.</Text>
        </Row>
        <Row>
          <Text>or</Text>
        </Row>
        <Row>
          <Text>Hit big this over and see if you can release some of the pressure.</Text>
        </Row>
      </Grid>
    )
    }
    else if (pressureScore <= 80) {
      console.log('uncre 80');
      return (
      <Grid>
        <Row>
          <Text>Do you play your established batsman to play with medium or low risk to keep their momentum and help the other batsman and play high risk with the less established batsmen.</Text>
        </Row>
        <Row>
          <Text>or</Text>
        </Row>
        <Row>
          <Text>Do you hit out with the established batsman as they have a good board with runs to be scored. This will slow the other batsman to build their innings.</Text>
        </Row>
        <Row>
          <Text>or</Text>
        </Row>
        <Row>
          <Text>Both hit out. Go big and see if you can reduce the pressure of the innings.</Text>
        </Row>
      </Grid>
    )
    }
    else if (pressureScore> 80) {
      console.log('uncre 100');
      return (
      <Grid>
        <Row>
          <Text>If you have wickets I hand you need to hit out</Text>
        </Row>
        <Row>
          <Text>or</Text>
        </Row>
        <Row>
          <Text>if you are near the end of the 20 overs, see get your established batsman with lots of potential runs on their board to take it home. The other batsman can rotate the strike.</Text>
        </Row>
        <Row>
          <Text>or</Text>
        </Row>
        <Row>
          <Text>Hit big. Both can go for the slog and see you can get close.</Text>
        </Row>
      </Grid>
    )
    }
  }

  getAggressionBoard = (agressionValue) => {

    console.log(this.props.players.players);
    let batters = this.props.players.players
    const facingBall = this.props.players.facingBall
    let allPlayers = [];
    console.log(batters);

    if (agressionValue === 1 || agressionValue === 2 || agressionValue === 3) {
      this.setState({ agressionValueOne: agressionValue });
      this.setState({ agressionValue: agressionValue });

      // ************ workout who's batting **************** //
      let currentBatterCount = 0;
      allPlayers = batters.map(acc => {
        console.log(acc);
        if (acc.batterFlag === 0 && currentBatterCount === 0) {
          console.log(acc.batterFlag);
          currentBatterCount++
          return {player: acc.player, id: acc.id, scoreOne: acc.scoreOne, scoreTwo: acc.scoreTwo, scoreThree: acc.scoreThree, outs: acc.outs, batterFlag: acc.batterFlag, aggBoard: agressionValue };
        }
          else {
            console.log(acc.batterFlag);
            return acc;
          }
        });
    }
    else {
      this.setState({ agressionValueTwo: agressionValue });
      this.setState({ agressionValue: agressionValue });

      // ************ workout who's batting **************** //
      let currentBatterCount = 0;
      allPlayers = batters.map(acc => {
        console.log(acc);
        if (acc.batterFlag === 0 && currentBatterCount === 0) {
          console.log(acc.batterFlag);
          currentBatterCount++

          return acc;
        }
        else if (acc.batterFlag === 0 && currentBatterCount === 1) {
          currentBatterCount++
          return {player: acc.player, id: acc.id, scoreOne: acc.scoreOne, scoreTwo: acc.scoreTwo, scoreThree: acc.scoreThree, outs: acc.outs, batterFlag: acc.batterFlag, aggBoard: agressionValue };
        }
          else {
            console.log(acc.batterFlag);
            return acc;
          }
        });
    }

  console.log(allPlayers);


  this.setState({
    players: allPlayers,
    facingBall: facingBall,
  }, function () {
    const { players, facingBall } = this.state
    this.props.dispatch(updatePlayers(this.state.players, this.state.facingBall));
  })


  }

  getAggressionOne = () => {
    if (this.state.agressionValueOne === 0) {
    return (
      <Grid>
      <Col size={3}>
        <Text style={styles.whiteText}>Player One</Text>
      </Col>
      <Col size={2} style={styles.aggressiveButton}>
        <Button full danger
        onPress={() => this.getAggressionBoard(1)} >
          <Text style={styles.whiteText}>Aggressive</Text>
        </Button>
      </Col>
      <Col size={2} style={styles.aggressiveButton}>
        <Button full warning
        onPress={() => this.getAggressionBoard(2)} >
          <Text style={styles.whiteText}>Medium</Text>
        </Button>
      </Col>
      <Col size={2}>
        <Button full success
        onPress={() => this.getAggressionBoard(3)} >
          <Text style={styles.whiteText}>Defensive</Text>
        </Button>
      </Col>
    </Grid>
  )
}
else if (this.state.agressionValueOne === 1) {
  return (
    <Grid>
    <Col size={3}>
      <Text style={styles.whiteText}>Player One</Text>
    </Col>
    <Col size={2} style={styles.aggressiveButton}>
      <Button full danger
      onPress={() => this.getAggressionBoard(1)} >
        <Text style={styles.whiteText}>Aggressive</Text>
      </Button>
    </Col>
    <Col size={2} style={styles.aggressiveButton}>
      <Button bordered full warning
      onPress={() => this.getAggressionBoard(2)} >
        <Text style={styles.whiteText}>Medium</Text>
      </Button>
    </Col>
    <Col size={2}>
      <Button bordered full success
      onPress={() => this.getAggressionBoard(3)} >
        <Text style={styles.whiteText}>Defensive</Text>
      </Button>
    </Col>
  </Grid>
)
}
else if (this.state.agressionValueOne === 2) {
  return (
    <Grid>
    <Col size={3}>
      <Text style={styles.whiteText}>Player One</Text>
    </Col>
    <Col size={2} style={styles.aggressiveButton}>
      <Button bordered full danger
      onPress={() => this.getAggressionBoard(1)} >
        <Text style={styles.whiteText}>Aggressive</Text>
      </Button>
    </Col>
    <Col size={2} style={styles.aggressiveButton}>
      <Button  full warning
      onPress={() => this.getAggressionBoard(2)} >
        <Text style={styles.whiteText}>Medium</Text>
      </Button>
    </Col>
    <Col size={2}>
      <Button bordered full success
      onPress={() => this.getAggressionBoard(3)} >
        <Text style={styles.whiteText}>Defensive</Text>
      </Button>
    </Col>
  </Grid>
)
}
else {
  return (
    <Grid>
    <Col size={3}>
      <Text style={styles.whiteText}>Player One</Text>
    </Col>
    <Col size={2} style={styles.aggressiveButton}>
      <Button bordered full danger
      onPress={() => this.getAggressionBoard(1)} >
        <Text style={styles.whiteText}>Aggressive</Text>
      </Button>
    </Col>
    <Col size={2} style={styles.aggressiveButton}>
      <Button bordered full warning
      onPress={() => this.getAggressionBoard(2)} >
        <Text style={styles.whiteText}>Medium</Text>
      </Button>
    </Col>
    <Col size={2}>
      <Button full success
      onPress={() => this.getAggressionBoard(3)} >
        <Text style={styles.whiteText}>Defensive</Text>
      </Button>
    </Col>
  </Grid>
)
}
}

getAggressionTwo = () => {
  if (this.state.agressionValueTwo === 0) {
  return (
    <Grid>
      <Col size={3}>
        <Text style={styles.whiteText}>Player two</Text>
      </Col>
      <Col size={2} style={styles.aggressiveButton}>
        <Button full danger
        onPress={() => this.getAggressionBoard(4)} >
          <Text style={styles.whiteText}>Aggressive</Text>
        </Button>
      </Col>
      <Col size={2} style={styles.aggressiveButton}>
        <Button full warning
        onPress={() => this.getAggressionBoard(5)} >
          <Text style={styles.whiteText}>Medium</Text>
        </Button>
      </Col>
      <Col size={2}>
        <Button full success
        onPress={() => this.getAggressionBoard(6)} >
          <Text style={styles.whiteText}>Defensive</Text>
        </Button>
      </Col>
    </Grid>
    )
  }
  else if (this.state.agressionValueTwo === 4) {
  return (
    <Grid>
      <Col size={3}>
        <Text style={styles.whiteText}>Player two</Text>
      </Col>
      <Col size={2} style={styles.aggressiveButton}>
        <Button full danger
        onPress={() => this.getAggressionBoard(4)} >
          <Text style={styles.whiteText}>Aggressive</Text>
        </Button>
      </Col>
      <Col size={2} style={styles.aggressiveButton}>
        <Button bordered full warning
        onPress={() => this.getAggressionBoard(5)} >
          <Text style={styles.whiteText}>Medium</Text>
        </Button>
      </Col>
      <Col size={2}>
        <Button bordered full success
        onPress={() => this.getAggressionBoard(6)} >
          <Text style={styles.whiteText}>Defensive</Text>
        </Button>
      </Col>
    </Grid>
    )
  }
  else if (this.state.agressionValueTwo === 5) {
  return (
    <Grid>
      <Col size={3}>
        <Text style={styles.whiteText}>Player two</Text>
      </Col>
      <Col size={2} style={styles.aggressiveButton}>
        <Button bordered full danger
        onPress={() => this.getAggressionBoard(4)} >
          <Text style={styles.whiteText}>Aggressive</Text>
        </Button>
      </Col>
      <Col size={2} style={styles.aggressiveButton}>
        <Button  full warning
        onPress={() => this.getAggressionBoard(5)} >
          <Text style={styles.whiteText}>Medium</Text>
        </Button>
      </Col>
      <Col size={2}>
        <Button bordered full success
        onPress={() => this.getAggressionBoard(6)} >
          <Text style={styles.whiteText}>Defensive</Text>
        </Button>
      </Col>
    </Grid>
    )
  }
  else {
  return (
    <Grid>
      <Col size={3}>
        <Text style={styles.whiteText}>Player two</Text>
      </Col>
      <Col size={2} style={styles.aggressiveButton}>
        <Button bordered full danger
        onPress={() => this.getAggressionBoard(4)} >
          <Text style={styles.whiteText}>Aggressive</Text>
        </Button>
      </Col>
      <Col size={2} style={styles.aggressiveButton}>
        <Button bordered full warning
        onPress={() => this.getAggressionBoard(5)} >
          <Text style={styles.whiteText}>Medium</Text>
        </Button>
      </Col>
      <Col size={2}>
        <Button  full success
        onPress={() => this.getAggressionBoard(6)} >
          <Text style={styles.whiteText}>Defensive</Text>
        </Button>
      </Col>
    </Grid>
    )
  }
  }

  render() {
    return (
      <Grid>
        <Row>
          {this.getPressureScore()}
        </Row>
        <Row>
          {this.getAggressionOne()}
        </Row>
        <Row>
          {this.getAggressionTwo()}
        </Row>
        <Row>
          <BoardDisplayTopAttack aggBoardValue={this.state.agressionValue} overPageFlag={true} />
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  gameRuns: state.gameRuns,
  gameID: state.gameID,
  firstInningsRuns: state.firstInningsRuns,
  ball: state.ball,
  players: state.players,
});

export default connect(mapStateToProps)(OverBowledBoard);


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
      borderBottomWidth: 1,
      width: '100%',
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
    rowPadding: {
      paddingTop: 15,
      paddingBottom: 15
    },
    rowPaddingCChatTitle: {
      paddingTop: 5,
      paddingBottom: 5
    },
    rowPaddingChat: {
      paddingBottom: 5,
    },
    rowPaddingPressure: {
      paddingBottom: 15,
      justifyContent: 'center',
    },
    rowPaddingPressureText: {
      color: '#fff',
      fontSize: 20,
    },
    rowPaddingPressureTextPercentage: {
      color: '#ddd',
      fontSize: 15,
      //alignSelf: 'flex-end',
    },
    chatText: {
      color: '#fff',
      fontStyle: 'italic',
    },
    whiteText: {
      color: '#fff',
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
    ThresholdStyle: {
      fontSize: 40,
      width: 60,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopColor: '#fff',
      borderBottomColor: '#fff', backgroundColor: 'rgba(204, 204, 204, 0.4)'
    },
    aggressiveButton: {
      paddingRight: 5,
      paddingBottom: 5,
    }
});
