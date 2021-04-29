import React, { Component } from 'react';
import AuthenticationService from '../../services/AuthenticationService';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';

export default class SignUpView extends Component {

  constructor(props) {
    super(props);
    state = {
      fullName: '',
      email   : '',
      password: '',
    }
  }

  out = () => {
    AuthenticationService.logout();
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.container}>

        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.out()}>
          <Text style={styles.signUpText}>Cerrar Sesion</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.buttonContainer, styles.deleteButton]} onPress={() => this.onClickListener('sign_up')}>
          <Text style={styles.signUpText}>Eliminar Cuenta</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
      borderBottomColor: '#000',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:350,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#000',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:350,
    borderRadius:30,
  },
  signupButton: {
    backgroundColor:'#FF8585',
  },
  deleteButton: {
    backgroundColor:'#ff0000',
  },
  signUpText: {
    color: 'black',
  }
});