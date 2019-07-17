import React, { Component } from 'react';

import { Container, Footer, Text, Button, Icon, H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, View, PixelRatio, Platform, Dimensions } from 'react-native';
import { connect } from "react-redux";

import { updateGameRuns } from '../../Reducers/gameRuns';
import { updateOver } from '../../Reducers/over';


class BoardDisplayTopAttack extends Component {

  state = {
    gameRunEvents: this.props.gameRuns.gameRunEvents || [],
    eventID: this.props.gameRuns.eventID || 0,
    ball: this.props.ball.ball || 0,
    over: this.props.ball.over || 0,
  };

  handleChange = ( gameRuns, ball ) => {
    this.setState({ gameRuns });
    this.setState({ ball });
  };



  RunsPerOverDsiplay() {


}




  render() {

    return (
        <Grid style={styles.rowPadding}>
          <Col>
          <Row>
          <Text></Text>
          </Row>
          <Row>
          <Text>A</Text>
          </Row>
          <Row>
          <Text>2</Text>
          </Row>
          <Row>
          <Text>3</Text>
          </Row>
          <Row>
          <Text>4</Text>
          </Row>
          <Row>
          <Text>5</Text>
          </Row>
          <Row>
          <Text>6</Text>
          </Row>
          <Row>
          <Text>7</Text>
          </Row>
          </Col>
          <Col>
          <Row>
          <Text>A</Text>
          </Row>
          <Row>
          <Text>0</Text>
          </Row>
          <Row>
          <Text>3</Text>
          </Row>
          <Row>
          <Text>4</Text>
          </Row>
          <Row>
          <Text>W</Text>
          </Row>
          <Row>
          <Text>2</Text>
          </Row>
          <Row>
          <Text>1</Text>
          </Row>
          <Row>
          <Text>6</Text>
          </Row>
          </Col>
          <Col>
          <Row>
          <Text>2</Text>
          </Row>
          <Row>
          <Text>1</Text>
          </Row>
          <Row>
          <Text>0</Text>
          </Row>
          <Row>
          <Text>2</Text>
          </Row>
          <Row>
          <Text>0</Text>
          </Row>
          <Row>
          <Text>1</Text>
          </Row>
          <Row>
          <Text>4</Text>
          </Row>
          <Row>
          <Text>0</Text>
          </Row>
          </Col>
        </Grid>
    );
  }
}

const mapStateToProps = state => ({
  gameRuns: state.gameRuns,
  ball: state.ball,
});

export default connect(mapStateToProps)(BoardDisplayTopAttack);

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
});
