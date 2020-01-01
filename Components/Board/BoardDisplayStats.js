import React, { Component, useRef, useState, useEffect } from 'react';

import { Header, Container, Footer, Left, Right, Text, Button, Icon, H1, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, View, PixelRatio, Platform, Dimensions, ImageBackground, Easing, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";

import LinearGradient from 'react-native-linear-gradient';
import RequiredRunRate from './RequiredRunRate';
import {Animated} from "react-native";
import {useSpring, animated} from 'react-spring'

import { updateGameRuns } from '../../Reducers/gameRuns';
import { updateOver } from '../../Reducers/over';
import { updateGameCards } from '../../Reducers/gameCards';

const arr = []
for (var i = 0; i < 500; i++) {
  arr.push(i)
}



class BoardDisplayStats extends Component {
  constructor (props) {
  super(props)
  this.animatedValueRuns = new Animated.Value(0)
  this.animation = new Animated.Value(0)
  this.opacity = new Animated.Value(1)
  this.animatedValue = []
    arr.forEach((value) => {
      this.animatedValue[value] = new Animated.Value(0)
    })
  this.state = {
      stop: 0,
      animatedflag: 0,
  };
  }

  state = {
    gameRunEvents: this.props.gameRuns.gameRunEvents || [],
    eventID: this.props.gameRuns.eventID || 0,
    ball: this.props.ball.ball || 0,
    over: this.props.ball.over || 0,
    cardOne: this.props.gameCards.cardOne || 100,
    cardTwo: this.props.gameCards.cardTwo || 100,
    runs: this.props.gameCards.runs || 100,
    wicketEvent: this.props.gameCards.wicketEvent || false,
    progressStatus: 0,

  };

  handleChange = ( gameRuns, ball, gameCards ) => {
    this.setState({ gameRuns });
    this.setState({ ball });
    this.setState({ gameCards });
  };


componentDidUpdate () {
}


 componentDidMount () {
}

componentWillMount = () => {
     this.animatedWidth = new Animated.Value(10)
     this.animatedHeight = new Animated.Value(10)
  }
  animatedBox = () => {
    let animatedFlag = this.state.animatedFlag
    if (animatedFlag === 0) {
      animatedFlag = 1;
      this.setState({ animatedFlag: animatedFlag });
    console.log(this.animatedHeight._value);
    console.log(this.animatedHeight);
     Animated.timing(this.animatedHeight, {
        toValue: 800,
        duration: 1000,
     }).start();
   }
   else if (animatedFlag === 1) {
     animatedFlag = 2;
     this.setState({ animatedFlag: animatedFlag });
     console.log('stop animate');
     console.log(this.animatedHeight._value);

    Animated.timing(
      this.animatedHeight
   ).stop(() =>{
     console.log(this.animatedHeight._value);
   });
   }
   else {
     this.animatedHeight.setValue(10);
     animatedFlag = 0;
     this.setState({ animatedFlag: animatedFlag });
   }
  }

  animatedBoxWidth = () => {
    let animatedFlag = this.state.animatedFlag
    if (animatedFlag === 2) {
      animatedFlag = 3;
      this.setState({ animatedFlag: animatedFlag });
    console.log(this.animatedWidth._value);
    console.log(this.animatedWidth);
     Animated.timing(this.animatedWidth, {
        toValue: 800,
        duration: 1700,
     }).start();
   }
   else if (animatedFlag === 3) {
     animatedFlag = 4;
     this.setState({ animatedFlag: animatedFlag });
     console.log('stop animate');
     console.log(this.animatedWidth._value);

    Animated.timing(
      this.animatedWidth
   ).stop(() =>{
     console.log(this.animatedWidth._value);
   });
   }
   else {
     this.animatedWidth.setValue(10);
     animatedFlag = 0;
     this.setState({ animatedFlag: animatedFlag });
   }
  }

  render() {
    return (
        <Grid>
        <Col size={1} style={{backgroundColor: '#c471ed'}}>
          <RequiredRunRate firstInningsRuns={this.props.firstInningsRuns} overPageFlag={false} />
          <Text>RR: x.x</Text>
          <Text>Pressure: xx%</Text>
          <Text>Target: {this.props.firstInningsRuns}</Text>
        </Col>
        </Grid>
    );
  }
}

const mapStateToProps = state => ({
  gameRuns: state.gameRuns,
  ball: state.ball,
  gameCards: state.gameCards,
});

export default connect(mapStateToProps)(BoardDisplayStats);

/*
Native Base StyleSheet
*/
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    containerWidth: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    containerProgrss: {
    width: "100%",
    height: 40,
    padding: 3,
    borderColor: "#FAA",
    borderWidth: 3,
    borderRadius: 30,
    marginTop: 200,
    justifyContent: "center",
  },
  inner:{
    width: "100%",
    height: 30,
    borderRadius: 15,
    backgroundColor:"green",
  },
  progress: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#e6537d',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 60,
    paddingVertical: 10,
    overflow: 'hidden'
  },
  box: {
      backgroundColor: 'blue',
      width: 10,
      height: 10,
      flexDirection: 'row'
   },
  label:{
    fontSize:23,
    color: "black",
    position: "absolute",
    zIndex: 1,
    alignSelf: "center",
  },
    progressBar: {
   height: 20,
   width: '100%',
   backgroundColor: 'white',
   borderColor: '#000',
   borderWidth: 2,
   borderRadius: 5,
   flexDirection: 'row'
 },
    linearGradient: {
      flex: 1,
      //paddingLeft: 15,
      //paddingRight: 15,
      //borderRadius: 5
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
    largeButtonStartGame: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 0,
      shadowOpacity: 0,
      textAlign: 'center',
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
    buttonTextStartGame: {
      fontSize: 20,
      color: '#c471ed',
      marginTop: 'auto',
      marginRight: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '200',
      textAlign: 'center',
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
    rowPadding :{
      paddingTop: 20,
    },
    rowPaddingStartGame :{
      paddingTop: 10,
      paddingRight: 20,
      paddingBottom: 10,
      paddingLeft: 20,
      textAlign: 'center',
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
    containerAnimation: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
