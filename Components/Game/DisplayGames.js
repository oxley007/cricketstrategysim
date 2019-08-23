import React from 'react';
import { TouchableHighlight, View, StyleSheet, ImageBackground } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Row, Col, Icon, H3, H2 } from 'native-base';

import LinearGradient from 'react-native-linear-gradient';

export default class DisplayScorecard extends React.PureComponent {
    // toggle a todo as completed or not via update()
    toggleComplete() {
        this.props.doc.ref.update({
            complete: !this.props.complete,
        });
    }

    getImageBackground = () => {
      console.log(this.props.displayId + ' displayID22');
      console.log(this.props.topScorePlayer + ' what about top player?');
      let displayId = this.props.displayId;
      let lastNumberGet = displayId.toString().split('').pop();
      console.log(lastNumberGet);
      let lastNumber = Number(lastNumberGet);
      console.log(lastNumber);

        //return <ImageBackground source={require('../../assets/4dot6-cricekt-sim-bg-image-web.png')} style={styles.backgroundImage}>


      if (lastNumber === 0 || lastNumber === 3 || lastNumber === 6 || lastNumber === 9) {
        console.log('hit 0 3 6 9 ' + lastNumber);
        return (<ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-2.png`)} style={styles.backgroundImage}>
          {this.getDisplay()}
        </ImageBackground>)
      }
      else if (lastNumber === 1 || lastNumber === 4 || lastNumber === 7) {
        console.log('hit 1 4 7 ' + lastNumber);
        return (<ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-web.png`)} style={styles.backgroundImage}>
          {this.getDisplay()}
        </ImageBackground>)
      }
      else {
        console.log('hit else ' + lastNumber);
        return (<ImageBackground source={require(`../../assets/4dot6-cricekt-sim-bg-image-3.png`)} style={styles.backgroundImage}>
          {this.getDisplay()}
        </ImageBackground>)
      }
    }

    getIconDisplay = () => {
      if (this.props.gameResult === 2) {
    return (<Icon name="ios-checkmark-circle-outline" style={{fontSize: 30, color: '#77dd77', fontWeight: 600}} />)
    }
    else if (this.props.gameResult === 1) {
      return (<Icon name="ios-close-circle-outline" style={{fontSize: 30, color: '#000', fontWeight: 900}} />)
    }
    else {
      // no icon
    }
    }

    getContinueGame = () => {
    if (this.props.gameResult === 0) {
      return (
        <Row style={styles.rowCenter}>
        <Text style={{fontSize: 30, color: '#fff'}}>Continue Game</Text>
      </Row>
      )
    }
    else {
      // no icon
    }
    }

    getTopScores = () => {
      if (this.props.gameResult === 0) {
        //return nothing.
      }
      else {
        return (
          <Col>
          <View style={styles.horizontalRule} />
            <Row style={styles.rowCenter}>
                <H3 style={styles.whiteText}>Top Scores:</H3>
            </Row>
            <Row style={styles.rowLeft}>
              <Col size={2}>
                <Text style={styles.whiteText}>{this.props.topScorePlayer}</Text>
              </Col>
              <Col size={1}>
                <Text style={styles.whiteText}>{this.props.topScore} ({this.props.topScoreBalls})</Text>
              </Col>
            </Row>
            <Row style={styles.rowLeft}>
              <Col size={2}>
                <Text style={styles.whiteText}>{this.props.topSecondScorePlayer}</Text>
              </Col>
              <Col size={1}>
                <Text style={styles.whiteText}>{this.props.topSecondScore} ({this.props.topSecondBalls})</Text>
              </Col>
            </Row>
          </Col>
        )
      }
    }

    getDisplay = () => {
      return (
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
      locations={[0,0.7,0.9]} colors={['#12c2e9', '#c471ed']} style={styles.linearGradient}>
      <TouchableHighlight
        onPress={() => this.toggleComplete()}
      >
      <ListItem style={{ flex: 1, height: 240, flexDirection: 'row', alignItems: 'center' }}>
      <Col>
        <Row style={styles.rowCenter}>
          <H2 style={{color: '#fff'}}>Game #{this.props.displayId}&nbsp;</H2>
          {this.getIconDisplay()}
        </Row>
        {this.getContinueGame()}
        <View style={styles.horizontalRule} />
        <Row style={{marginTop: 0, height: 20}}>
          <Col >
              <Text style={styles.whiteText}>Target: {this.props.firstInningsRuns}</Text>
          </Col>
          <Col>
              <Text style={styles.whiteText}>Total: {this.props.totalRuns}/{this.props.totalWickets}</Text>
          </Col>
        </Row>
        {this.getTopScores()}

          <Row>
              {this.props.complete && (
                  <Text>COMPLETE</Text>
              )}
          </Row>
          </Col>
        </ListItem>
      </TouchableHighlight>
      </LinearGradient>
    )
    }

    render() {
      console.log(this.props.displayId + ' displayID22');
      console.log(this.props.topScorePlayer + ' what about top player?');
        return (
          <View>
          {this.getImageBackground()}
          </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    loginForm: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    whiteText: {
      color: '#fff',
    },
    rowCenter: {
      marginRight: 'auto',
      marginLeft: 'auto',
      height: 30,
    },
    rowLeft: {
      height: 30,
      textAlign: 'left',
      alignItems: 'flex-start',
    },
    linearGradient: {
      opacity: 0.9
    },
    horizontalRule: {
      borderBottomColor: '#fff',
      borderBottomWidth: 1,
      width: '75%',
      marginTop: 15,
      marginBottom: 15,
      marginRight: 'auto',
      marginLeft: 'auto',
    },
});
