import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Image, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import ImagePicker from 'react-native-image-crop-picker';
import { RectButton } from 'react-native-gesture-handler';


const axios = require('axios').default;

export default class SignUpView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipe_name: '',
      desc: '',
      tips:'',
      postImage: null,
    }
  }

  
  render() {

    const {recipe_name} = this.state
    const {desc} = this.state
    const {postImage} = this.state

    const handlerChoosePhoto = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
            this.setState({postImage: image.path})
          });
    }
    
    const handlerPost = () => {
     
      console.log(recipe_name)
      console.log(desc)
      console.log(postImage)

      axios({
        method: 'post',
        url: 'http://localhost:3000/posts',
        headers: '',
        data: {
          recipe_name: recipe_name,
          description: desc,
          tips:'',
          postImage: postImage
        }
        
      }).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.data);
      });
    }
    

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Recipe name"
              underlineColorAndroid='transparent'
              onChangeText={(recipe_name) => this.setState({recipe_name})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Write a description"
              underlineColorAndroid='transparent'
              onChangeText={(desc) => this.setState({desc})}/>
        </View> 

        <View>
          {postImage && (
            <Image
                source = {{uri: postImage}}
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