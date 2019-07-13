import React, { Component } from 'react';
import { Container, Header, Content, Item, Input, Icon, Row, Button, Label } from 'native-base';
import { ScrollView, View, Text, TextInput, StyleSheet, PixelRatio, Platform, Image, FlatList } from 'react-native';

import t from 'tcomb-form-native';

import firebase from 'react-native-firebase';
import { connect } from "react-redux";
import { updateGameId } from '../../Reducers/gameId';
import { updateGameRuns } from '../../Reducers/gameRuns';

import BallDiff from '../../Util/BallDiff.js';

const Form = t.form.Form;

const User = t.struct({
  batterOne: t.String,
  batterTwo: t.String,
  batterThree: t.String,
  batterFour: t.String,
  batterFive: t.String,
  batterSix: t.String,
  batterSeven: t.String,
  batterEight: t.String,
  batterNine: t.String,
  batterTen: t.String,
  batterEleven: t.String,
  coach: t.String,
});

const formStyles = {
  ...Form.stylesheet,
  controlLabel: {
    normal: {
      display: 'none',
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}

const options = {
  fields: {
    batterOne: {
      label: '',
      placeholder: "Opening Batsman",
      stylesheet: formStyles,
    },
  },
};

class AddPlayers extends Component {
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

  updateTextInputBatter() {
    let batterName = this.state.textInput
    this.setState({ textInputBatter: batterName });

    this.setState({
      textInput: '',
    });
  }

handleSubmit = () => {
  const { currentUser } = this.state
  const value = this._form.getValue(); // use that ref to get the form value
  console.log('value: ', value);
  console.log(value.batterOne);

  if (value != undefined) {
    let playerArray = []
    //playerArray.push({[0, value.coach]}, {[1, value.batterOne]}, {[2, value.batterTwo]}, {[3, value.batterThree]}, {[4, value.batterFour]}, {[5, value.batterFive]}, {[6, value.batterSix]}, {[7, value.batterSeven]}, {[8, value.batterEight]}, {[9, value.batterNine]}, {[10, value.batterTen]}, {[11, value.batterEleven]});
    //playerArray.push({0:[0, value.coach]}, {1:[1, value.batterOne]}, {2:[2, value.batterTwo]}, {3:[3, value.batterThree]}, {4:[4, value.batterFour]}, {5:[5, value.batterFive]}, {6:[6, value.batterSix]}, {7:[7, value.batterSeven]}, {8:[8, value.batterEight]}, {9:[9, value.batterNine]}, {10:[10, value.batterTen]}, {11:[11, value.batterEleven]});
      //, [3, value.batterThree], [4, value.batterFour], [5, value.batterFive], [6, value.batterSix], [7, value.batterSeven], [8, value.batterEight], [9, value.batterNine], [10, value.batterTen], [11, value.batterEleven]);
      playerArray.push(value.coach, value.batterOne, value.batterTwo, value.batterThree, value.batterFour, value.batterFive, value.batterSix, value.batterSeven, value.batterEight, value.batterNine, value.batterTen, value.batterEleven);
    console.log(playerArray);

      this.ref.doc("players").set({
          players: playerArray,
        })
        .then(() => this.props.navigation.navigate('GameList'))
        //.catch(error => this.setState({ errorMessage: error.message }))
    }
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
        <View style={styles.container}>
          <Form
          style={formStyles.controlLabel}
           ref={c => this._form = c} // assign a ref
          type={User}
          options={options}
          />
        <Button rounded large warning
      onPress={this.handleSubmit}
        style={styles.largeButton}>
            <Text>All Done!</Text>
          </Button>
        </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  batterRuns: state.batterRuns,
  gameID: state.gameID,
});

export default connect(mapStateToProps)(AddPlayers);

const styles = StyleSheet.create({
    container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
    largeButton: {
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 0,
      shadowOpacity: 0,
    },
});
