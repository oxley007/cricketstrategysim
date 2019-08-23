import React, { Component } from 'react';

import { Container, Footer, Text, Button, Icon, H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, View, PixelRatio, Platform, Dimensions } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import BallDiff from '../../Util/BallDiff.js';

import { connect } from "react-redux";
import { updateGameId } from '../../Reducers/gameId';
import { updateGameRuns } from '../../Reducers/gameRuns';
import { updatePlayers } from '../../Reducers/players';


class DisplayCurrentBatters extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: true,
    };
  }

  state = {
    gameID: this.props.gameID.gameID || '0',
    gameRunEvents: this.props.gameRuns.gameRunEvents || [{eventID: 0, runsValue: 0, ball: -1, runsType: 'deleted', wicketEvent: false, batterID: 0, bowlerID: 0}],
    eventID: this.props.gameRuns.eventID || 0,
    overBowled: this.props.gameRuns.overBowled || false,
    players: this.props.players.players || [],
    facingBall: this.props.players.facingBall || 1,
  };

  handleChange = ( gameID, gameRuns, players ) => {
    this.setState({ gameID });
    this.setState({ gameRuns });
    this.setState({ players });
  };


  getBatterRuns = () => {

    console.log(this.props.batterId);
    let gameRunEvents = this.props.gameRuns.gameRunEvents;

    let sum = a => a.reduce((acc, item) => acc + item);

    let ballCount = 0;
    let batterRunsCount = gameRunEvents.map(acc => {
      console.log(acc);
      if (acc.batterID === this.props.batterId) {
        console.log(acc.runsValue);
        ballCount++
        return [acc.runsValue];
      }
      else {
          console.log(acc.runsValue);
          return 0;
        }
      });

      console.log(batterRunsCount);

      let batterRuns = sum(batterRunsCount.map(acc => Number(acc)));

      console.log(batterRuns);

        return (
              <Text style={styles.batterText}>{batterRuns} ({ballCount})</Text>
            )
  }



  render() {
    return (
      <View>
      {this.getBatterRuns()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  gameID: state.gameID,
  gameRuns: state.gameRuns,
  players: state.players,
});

export default connect(mapStateToProps)(DisplayCurrentBatters);

/*
Native Base StyleSheet
*/
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  batterText: {
    color: '#fff'
  }

});
