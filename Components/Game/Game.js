import React from 'react';
import firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';
import { Header, Left, Right, Icon, Content, Container, H1, H3, Footer, Button, Tab, Tabs, TabHeading } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, PixelRatio, ScrollView, View, Text, TextInput, Platform, Image, FlatList, Dimensions } from 'react-native';

import { connect } from "react-redux";
import { updateTeamPlayers } from '../../Reducers/teamPlayers';
import { updatePlayers } from '../../Reducers/players';

import DisplayGames from '../Game/DisplayGames';
import TabOne from './GameMain';
import DisplayBattingCard from '../Board/DisplayBattingCard';


class Game extends React.Component {
  constructor(props) {
    super(props);
    const { currentUser } = firebase.auth()
    this.ref = firebase.firestore().collection(currentUser.uid).doc('players');
    this.state = {
        loading: true,
        isLoaded: false,
        players: [],
    };
  }


  state = {
    teamPlayers: this.props.teamPlayers.teamPlayers || [],
    players: this.props.players.players || [],
    facingBall: this.props.players.facingBall || 1,
  };

  handleChange = ( teamPlayers, players, firstInningsRuns ) => {
    this.setState({ teamPlayers });
    this.setState({ players });
    this.setState({ firstInningsRuns });
  };

  componentDidMount() {
    console.log(this.props.players.facingBall);
    //SplashScreen.hide()
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    const players = [];
    //this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)

    let allPlayers = this.props.players.players
    console.log(allPlayers);

    let id = 0
    let batterFlag = 2;
    allPlayers.map(player => {
      console.log('hit 3');
      console.log(player);
      if (id === 1 || id === 2) {
        batterFlag = 0;
      }
      else {
        batterFlag = 2;
      }

      /*
      players.push({
        id,
        batterFlag,
        player
      });
      */
      console.log(players);
      id++
      console.log(id);
      });

      console.log('hit');
      console.log(allPlayers);

      const facingBall = this.props.players.facingBall;

      console.log(facingBall);

      console.log('hit 2');
    console.log(players);
    this.setState({
      players: players,
      facingBall: facingBall,
    }, function () {
      const { players, facingBall } = this.state
      this.props.dispatch(updatePlayers(this.state.players, this.state.facingBall));
    })

    /*
    this.ref.get().then(function(documentSnapshot) {
  console.log(documentSnapshot);
  console.log(documentSnapshot.data());
  console.log(documentSnapshot.data().players);
  let allPlayers = documentSnapshot.data().players;
  console.log(allPlayers);

  let id = 0
  let batterFlag = 2;
  allPlayers.map(player => {
    console.log('hit 3');
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
    console.log(id);
    });

    console.log('hit');
    console.log(allPlayers);

    console.log('hit 2');
  console.log(players);
  this.setState({
    isLoaded: true,
    players: players
  });

  console.log(this.props.teamPlayers.teamPlayers);
  //this.setState({ players });
  console.log(this.state.players);

})
*/



}
  /*
  documentSnapshot.forEach((doc) => {
    console.log(doc.data());
    const { players } = doc.data();

    players.push({
      key: doc.id,
      doc, // DocumentSnapshot
      players,
    });
  });

  this.setState({
    players,
    loading: false,
 });
});

}
*/


componentWillUnmount() {
  console.log('componentWillUnmount');
    this.unsubscribe();
}

/*
onCollectionUpdate = (querySnapshot) => {
  const players = [];
  console.log(querySnapshot);
  querySnapshot.forEach((feild) => {
    console.log(doc.data());
    const { players } = doc.data();

    players.push({
      key: doc.id,
      doc, // DocumentSnapshot
      players,
    });
  });

  this.setState({
    players,
    loading: false,
 });

}
*/

  render() {
    console.log('Hit Game!');
    console.log(this.props.players.players);

    return (
    <Container>
    <Header hasTabs style={styles.headerStyle}>
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
        <Tabs initialPage={0}>
          <Tab heading={<TabHeading style={styles.activeTabStyle}>
                 <Text style={styles.activeTextStyle}>Scoreboard</Text>
               </TabHeading>}>
            <TabOne navigation={this.props.navigation} />
          </Tab>
          <Tab heading={<TabHeading style={styles.activeTabStyle}>
                 <Text style={styles.activeTextStyle}>Batting Card</Text>
               </TabHeading>}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
            locations={[0,0.9,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradient}>
              <FlatList
              data={this.props.players.players}
              renderItem={({ item }) => <DisplayBattingCard {...item} />}
              />
            </LinearGradient>
          </Tab>
        </Tabs>
  </Container>
  );
  }
}

const mapStateToProps = state => ({
  teamPlayers: state.teamPlayers,
  players: state.players,
});

export default connect(mapStateToProps)(Game);


const styles = StyleSheet.create({
    container: {
        //flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    colVerticleAlign: {
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
    },
    activeTabStyle: {
      backgroundColor: '#fff',
    },
    activeTextStyle: {
      color: '#c471ed',
      fontSize: 17,
    }
});
