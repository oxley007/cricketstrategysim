// Loading.js
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

//import SplashScreen from 'react-native-splash-screen';
import firebase from 'react-native-firebase'

export default class Loading extends React.Component {

  componentDidMount() {
    //SplashScreen.hide()
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'GameList' : 'SignUp')
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
