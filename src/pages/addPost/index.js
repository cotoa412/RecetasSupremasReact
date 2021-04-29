import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RNRestart from 'react-native-restart';
import { useIsFocused } from '@react-navigation/native'


const axios = require('axios').default;

import FormData from 'form-data'
var file = require('file-system');
import DocumentPicker from 'react-native-document-picker';


const initialState = {
    recipe_name: '',
    desc: '',
    tips:'',
    postImage: null,
    uniqueValue: 1
}

export default class SignUpView extends Component {
  state = initialState;
  constructor(props) {
    super(props);
    this.state = {
      recipe_name: '',
      desc: '',
      tips:'',
      postImage: null,
      uniqueValue: 1
    }
  }

  resetState = () => {
    this.setState(initialState);
  }

  render() {


    const {recipe_name} = this.state
    const {desc} = this.state
    const {postImage} = this.state


    const handlerChoosePhoto  = async () => {
      
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        });
        console.log(
          res.uri,
          res.type, // mime type
          res.name,
          res.size,
        );
        this.setState({postImage: res})
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err;
        }
      }
    }

    const sendPostRequest = async () => {

      const form = new FormData();
      
      form.append('recipe_name', recipe_name);
      form.append('description', desc);
      form.append('tips', "");
      form.append('postImage', postImage);
      console.log(form)
      try {
          const userId = await AsyncStorage.getItem('userId')
          const resp = await axios.post('http://localhost:3000/posts', form)
          .then((response) => {
            console.log(response)
            const postId = response.data.createdPost
            console.log('THE POST ID: ', postId)
            console.log('User id: ',userId)
            const result = [userId, postId]
            savePostId(userId,postId)
            //forceRemount();
            console.log('THE RESULT: ', result)
            return result
          })
         
        }catch(error) {
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error(error.response.data);
                console.error(error.response.status);
                console.error(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.error(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', error.message);
              }
          }
  };

    const savePostId = (userId,postId) =>{
      console.log('This is the last id: ', userId)
      console.log('This is the last id: ', postId)
      axios({
        method: 'patch',
        url: 'http://localhost:3000/users/post/'+userId,
        data: {"post":postId}
      })
      .then(response => {
        //console.log('the ultimate response: ',response)
        return response
      })
      .catch(err => {
        console.error(err);
        throw err;
      });
    }

    const handlerPost = () => {
     
      console.log(recipe_name)
      console.log(desc)
      console.log(postImage)
      this.resetState()
      this.textInput.clear()
      this.textInput1.clear()
      Alert.alert(null,"Post created successfully")
      sendPostRequest();

    }
  

  

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput ref={input1 => { this.textInput1 = input1 }} style={styles.inputs}
              placeholder="Recipe name"
              underlineColorAndroid='transparent'
              onChangeText={(recipe_name) => this.setState({recipe_name})}
              />
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput ref={input => { this.textInput = input }} style={styles.inputs}
              placeholder="Write a description"
              underlineColorAndroid='transparent'
              onChangeText={(desc) => this.setState({desc})}/>
        </View> 

        <View>
          {postImage && (
            <Image
                source = {{uri: postImage.uri}}
                style = {{width: 300, height: 300, marginBottom: 20}}
            />
          )}
        </View> 

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={handlerChoosePhoto}>
          <Text style={styles.signUpText}>Upload Image</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={handlerPost}>
          <Text style={styles.signUpText}>Post</Text>
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
  loginButton: {
    borderWidth:1,
    borderColor:'#000',
    backgroundColor:'#fff',
  },
  signUpText: {
    color: 'black',
  }
});