import React from 'react';

import { ScrollView, View, Text, TextInput, StyleSheet, PixelRatio, Platform, Image, FlatList } from 'react-native';
import {Header,Left,Right,Icon,Content,Grid,Row,Col,Container,H1,H3,Footer,Button} from 'native-base';

import { connect } from "react-redux";
import firebase from 'react-native-firebase';
import { updatePlayerStats } from '../../Reducers/playerStats';
import { updateGames } from '../../Reducers/games';


class GameListLongestStreak extends React.Component {
  constructor(props) {
    super(props);
    const { currentUser } = firebase.auth()
    this.refPlayerStats = firebase.firestore().collection(currentUser.uid).doc('playerStats');
    this.state = {
        longestStreak: 0,
        loading: true,
    };
  }


  state = {
    winningStreak: this.props.playerStats.winningStreak || 0,
    longestStreak: this.props.playerStats.longestStreak || 0,
    highestPlayerScore: this.props.playerStats.highestPlayerScore || 0,
    highestPlayerScoreId: this.props.playerStats.highestPlayerScoreId || 0,
    highestTeamScore: this.props.playerStats.highestTeamScore || 0,
    games: this.props.games.games || [],
  };

  handleChange = ( playerStats ) => {
    this.setState({ playerStats });
    this.setState({ games });
  };

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    //this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    this.refPlayerStats.onSnapshot(this.onDocCollectionUpdate)
}

componentWillUnmount() {
    this.unsubscribe();
}

onDocCollectionUpdate = (documentSnapshot) => {
  console.log(documentSnapshot);
  console.log(documentSnapshot.data());
  console.log(documentSnapshot.data().winningStreak);

  const longestStreak = documentSnapshot.data().longestStreak;
  const winningStreak = documentSnapshot.data().winningStreak;

  this.setState({
    longestStreak,
    loading: false,
 });

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

}

  getLongestStreak = () => {
    const longestStreak = this.state.longestStreak;

    const games = this.props.games.games;

    if (games === undefined || games === null || games.length < 1) {
        return (
          <Row size={3}>
            <Text style={styles.winningStreakNumber}>{longestStreak}</Text>
          </Row>
        )
    }
    else {
    return (
      <Row size={3}>
        <Text style={styles.winningStreakNumber}>{this.props.playerStats.longestStreak}</Text>
      </Row>
      )
    }
  }

  render() {
    return (
      <Col size={2} style={styles.rowPaddingStartGame}>
        <Row size={3}>
          <Text style={styles.winningStreakText}>Longest winning streak:</Text>
        </Row>
        {this.getLongestStreak()}
      </Col>
  );
  }
}


const mapStateToProps = state => ({
  playerStats: state.playerStats,
  games: state.games,
});

export default connect(mapStateToProps)(GameListLongestStreak);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    winningStreakText: {
      fontSize: 14,
      color: '#fff',
      marginTop: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      fontWeight: '200',
      textAlign:'center',
      alignSelf:'center',
      flexDirection: 'column',
    },
    winningStreakNumber: {
      fontSize: 44,
      color: '#fff',
      marginTop: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      fontWeight: '600',
      textAlign:'center',
      alignSelf:'center',
      flexDirection: 'column',
    },
    rowPaddingStartGame :{
      paddingTop: 10,
      paddingRight: 20,
      paddingBottom: 10,
      paddingLeft: 20,
      textAlign: 'center',
    },
});
