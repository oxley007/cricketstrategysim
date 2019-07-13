import React from 'react';
import firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';
import { Header, Left, Right, Icon, Content, Container, H1, H3, Footer, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, PixelRatio, ScrollView, View, Text, TextInput, Platform, Image, FlatList, Dimensions } from 'react-native';

import { connect } from "react-redux";

import { updateRuns } from '../../Reducers/runs';
import { updateOver } from '../../Reducers/over';
import { updateBatterRuns } from '../../Reducers/batterRuns';
import { updateGameId } from '../../Reducers/gameId';

import GameDisplayRuns from './GameDisplayRuns';
import DisplayScorecard from '../Game/DisplayScorecard';
import GameDisplayTotalRuns from '../Game/GameDisplayTotalRuns';
import RunsPerBall from '../Board/RunsPerBall';

import Board from '../Board/Board';


class Game extends React.Component {
  constructor(props) {
    const { currentUser } = firebase.auth()
    super(props);
    this.ref = firebase.firestore().collection(currentUser.uid);
    this.state = {
        textInput: '',
        textInputBatter: '',
        loading: true,
        scorecard: [],
        docID: '',
    };
  }

  state = {
    batterRuns: this.props.batterRuns.batterRuns || 0,
    gameID: this.props.gameID.gameID || '0',
  };

  handleChange = ( batterRuns, gameID ) => {
    this.setState({ batterRuns });
    this.setState({ gameID });
  };

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
}

componentWillUnmount() {
    this.unsubscribe();
}

onCollectionUpdate = (querySnapshot) => {
  const scorecard = [];
  querySnapshot.forEach((doc) => {
    const { gameId, title, runs, complete } = doc.data();

    scorecard.push({
      key: doc.id,
      doc, // DocumentSnapshot
      gameId,
      title,
      runs,
      complete,
    });
  });

  this.setState({
    scorecard,
    loading: false,
 });
}

  updateTextInput(value) {
      this.setState({ textInput: value });
  }

  updateTextInputBatter() {
    let batterName = this.state.textInput
    this.setState({ textInputBatter: batterName });

    this.setState({
      textInput: '',
    });
  }

  scorecardList = () => {
    console.log(this.state.scorecard.item );
    return (
      <Col>
      <Row>
    <ScrollView>
      <Text>Scorecard:</Text>
    </ScrollView>
    </Row>
      <Row>
      <FlatList
          data={this.state.scorecard}
          renderItem={({ item }) => <DisplayScorecard {...item} />}
        />
      </Row>
    </Col>
    )

  }

  runsTotal = () => {
    console.log(this.state.scorecard.item );
    return (
      <Col>
      <Row>
    <ScrollView>
      <Text>Total:</Text>
    </ScrollView>
    </Row>
      <Row>
      <FlatList
          data={this.state.scorecard}
          renderItem={({ item }) => <GameDisplayTotalRuns {...item} />}
        />
      </Row>
      <Row><Text>GameID: {this.props.gameID.gameID}</Text></Row>
    </Col>
    )

  }

  addRuns() {
    const { currentUser } = this.state;

    let totalRuns = this.props.batterRuns.batterRuns;
    console.log(totalRuns);

    let totalRunsNumber = Number(totalRuns);
    console.log(totalRunsNumber);

    let gameId = this.props.gameID.gameID;


  this.ref.add({
    title: this.state.textInputBatter,
    runs: totalRuns,
    gameId: gameId,
    gameRunEvents: [],
  });
  totalRuns = 0;
  console.log(totalRuns);

  const doc = this.ref.doc()
  //const db = firebase.firestore();
  //const ref = db.collection(currentUser.uid).doc();
  //const id = ref.id;
  console.log(doc);
  console.log(doc.id);
  let docID = doc.id;
  this.setState({ docID: docID })

  this.setState({
    batterRuns: totalRuns,
  }, function () {
    const { batterRuns } = this.state
    this.props.dispatch(updateBatterRuns(this.state.batterRuns));
  })

  this.setState({
    textInput: '',
    textInputBatter: '',
  });
}


  testRuns = () => {
    return (
      <Col>
      <Row>
        {this.scorecardList()}
      </Row>
      <Row>
      <TextInput
      placeholder={'Batsman Name'}
    value={this.state.textInput}
    onChangeText={(text) => this.updateTextInput(text)}
      />
      </Row>
      <Row>
      <Button rounded large warning
    disabled={!this.state.textInput.length}
    onPress={() => this.updateTextInputBatter()}
      style={styles.largeButton}>
          <Text>Add Batsman</Text>
        </Button>
      </Row>
      <Row>
      <Text>{this.state.textInputBatter}</Text>
      </Row>
      <Row>
      <Button rounded large warning
    disabled={!this.state.textInputBatter.length}
    onPress={() => this.addRuns()}
      style={styles.largeButton}>
          <Text>Wicket! (Add to DB)</Text>
        </Button>
      </Row>
      <Row>
        {this.runsTotal()}
      </Row>
    </Col>
    )

  }

  render() {
    if (this.state.loading) {
    return null; // or render a loading icon
  }

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
          {this.testRuns()}
      </Grid>
      <GameDisplayRuns />
      <Board navigation={this.props.navigation} />
      <RunsPerBall />
    </Content>
    <Footer style={{ height: 100, backgroundColor: 'transparent', borderTopWidth: 0, backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0 }}>
    <Button rounded large warning style={styles.largeButton}
        onPress={() => this.props.navigation.navigate('Home')} >
        <Text style={styles.buttonTextBack}><Icon name='ios-arrow-back' style={styles.buttonTextBack} /> Back to run counter</Text>
      </Button>
      <H1 style={{color:'#fff'}}>
      </H1>
    </Footer>
    </LinearGradient>
  </Container>
  );
  }
}

const mapStateToProps = state => ({
  batterRuns: state.batterRuns,
  gameID: state.gameID,
});

export default connect(mapStateToProps)(Game);


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
    }
});
