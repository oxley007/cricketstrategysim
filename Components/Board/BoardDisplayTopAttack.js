import React, { Component } from 'react';

import { Container, Footer, Text, Button, Icon, H1 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, View, PixelRatio, Platform, Dimensions, ImageBackground } from 'react-native';
import { connect } from "react-redux";

import LinearGradient from 'react-native-linear-gradient';

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

  render() {

    return (
        <Grid>
          <Col>
            <Row style={styles.CardValueSquare}>
              <Text style={styles.CardValueText}>&nbsp;</Text>
            </Row>
            <Row style={styles.CardValueSquare}>
              <Text style={styles.CardValueText}>A</Text>
            </Row>
            <Row style={styles.CardValueSquare}>
              <Text style={styles.CardValueText}>2</Text>
            </Row>
            <Row style={styles.CardValueSquare}>
              <Text style={styles.CardValueText}>3</Text>
            </Row>
            <Row style={styles.CardValueSquare}>
              <Text style={styles.CardValueText}>4</Text>
            </Row>
            <Row style={styles.CardValueSquare}>
              <Text style={styles.CardValueText}>5</Text>
            </Row>
            <Row style={styles.CardValueSquare}>
              <Text style={styles.CardValueText}>6</Text>
            </Row>
            <Row style={styles.CardValueSquare}>
              <Text style={styles.CardValueText}>7</Text>
            </Row>
          </Col>
          <Col>
          <Row style={styles.CardValueSquare}>
          <Text style={styles.CardValueText}>A</Text>
          </Row>
          <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>0</Text>
          </Row>
          <Row style={styles.runValueSquare}>
          <Text style={styles.rundValueText}>3</Text>
          </Row>
          <Row style={styles.fourValueSquare}>
            <Text style={styles.rundValueText}>4</Text>
          </Row>
          <Row style={styles.wicketValueSquare}>
              <Text style={styles.rundValueText}>W</Text>
          </Row>
          <Row style={styles.runValueSquare}>
          <Text style={styles.rundValueText}>2</Text>
          </Row>
          <Row style={styles.runValueSquare}>
          <Text style={styles.rundValueText}>1</Text>
          </Row>
          <Row style={styles.sixValueSquare}>
              <Text style={styles.rundValueText}>6</Text>
          </Row>
          </Col>
          <Col>
            <Row style={styles.CardValueSquare}>
              <Text style={styles.CardValueText}>2</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>1</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>0</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>2</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>0</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>1</Text>
            </Row>
            <Row style={styles.fourValueSquare}>
              <Text style={styles.rundValueText}>4</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>0</Text>
            </Row>
          </Col>
          <Col>
            <Row style={styles.CardValueSquare}>
              <Text style={styles.CardValueText}>3</Text>
            </Row>
            <Row style={styles.fourValueSquare}>
              <Text style={styles.rundValueText}>4</Text>
            </Row>
            <Row style={styles.wicketValueSquare}>
              <Text style={styles.rundValueText}>W</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>0</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>1</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>0</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>2</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>0</Text>
            </Row>
          </Col>
          <Col>
            <Row style={styles.CardValueSquare}>
              <Text style={styles.CardValueText}>4</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>1</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>0</Text>
            </Row>
            <Row style={styles.fourValueSquare}>
              <Text style={styles.rundValueText}>4</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>0</Text>
            </Row>
            <Row style={styles.sixValueSquare}>
              <Text style={styles.rundValueText}>6</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>1</Text>
            </Row>
            <Row style={styles.fourValueSquare}>
              <Text style={styles.rundValueText}>4</Text>
            </Row>
          </Col>
          <Col>
            <Row style={styles.CardValueSquare}>
              <Text style={styles.CardValueText}>5</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>0</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>2</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>0</Text>
            </Row>
            <Row style={styles.fourValueSquare}>
              <Text style={styles.rundValueText}>4</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>0</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>1</Text>
            </Row>
            <Row style={styles.wicketValueSquare}>
              <Text style={styles.rundValueText}>W</Text>
            </Row>
          </Col>
          <Col>
            <Row style={styles.CardValueSquare}>
              <Text style={styles.CardValueText}>6</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>0</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>2</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>1</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>0</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>1</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>0</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>1</Text>
            </Row>
          </Col>
          <Col>
            <Row style={styles.CardValueSquare}>
              <Text style={styles.CardValueText}>7</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>1</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>0</Text>
            </Row>
            <Row style={styles.fourValueSquare}>
              <Text style={styles.rundValueText}>4</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>0</Text>
            </Row>
            <Row style={styles.sixValueSquare}>
              <Text style={styles.rundValueText}>6</Text>
            </Row>
            <Row style={styles.wicketValueSquare}>
              <Text style={styles.rundValueText}>W</Text>
            </Row>
            <Row style={styles.runValueSquare}>
              <Text style={styles.rundValueText}>0</Text>
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
  gridStyle: {
    borderColor: '#ffffff',
    borderWidth: 1,
  },
  CardValueText: {
    color: '#ccc',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontWeight: 'bold',
    padding: 5,
  },
  CardValueSquare: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 2,
  },
  runValueSquare: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 2,
  },
  wicketValueSquare: {
    width: '100%',
    height: 'auto',
    //borderRadius: 60 / 2,
    backgroundColor: 'transparent',
    borderColor: '#FF69B4',
    borderWidth: 2,
  },
  rundValueText: {
    color: '#fff',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    //fontWeight: 'bold',
    padding: 5,
  },
  fourValueSquare: {
    width: '100%',
    height: 'auto',
    borderRadius: 60 / 2,
    backgroundColor: 'transparent',
    borderColor: '#7CFC00',
    borderWidth: 2,
  },
  sixValueSquare: {
    width: '100%',
    height: 'auto',
    borderRadius: 60 / 2,
    backgroundColor: 'transparent',
    borderColor: '#f7ff00',
    borderWidth: 2,
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
  },
  linearGradient: {
    opacity: 0.9
  },

});
