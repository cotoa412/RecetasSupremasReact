import React, { Component } from 'react';
import AuthenticationService from '../../services/AuthenticationService';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt from 'jwt-decode'

import userPic from '../../assets/UserPic.png';
import { Post, Header, Avatar, Name, Image, Description, Loading } from './styles';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Button,
  TouchableHighlight,
  Alert
} from 'react-native';

export default class SignUpView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      posts: [],
      postNumber: '',
      postResult: []
    }
  }
   async componentDidMount(){
    try{
      const currentUsername = await AsyncStorage.getItem('user')
      const userData = jwt(currentUsername)
      //console.log(userData)
      axios({
        method: 'get',
        url: 'http://localhost:3000/users/'+userData.userId,
      })
      .then(response => {
        this.setState({userName: response.data.username})
        this.setState({posts: response.data.postCount})
        this.setState({postNumber: response.data.postCount.length})
        
        return response.data.postCount
      })
      .catch(err => {
        console.error(err);
        throw err;
      });
    } catch (e){
      console.error(e)
    }
  }

  // async getPosts(postArray){
  //   let array = [];
  //   let url = postArray;
  //   for (let i = 0; i < url.length; i++)   {
  //     try {
  //       let res = await axios({
  //         method: 'get',
  //         url: 'http://localhost:3000/posts/'+url[i]
  //       })
  //       .then(response => {
  //         return response.data
  //       })
  //       .catch(err => {
  //         console.error(err)
  //         throw err
  //       });
  //       array.push(res);
  //     }
  //     catch (e) {
  //       console.error(e.message);
  //     }
  //   };
  //   console.log('Here::    ',array)
  //  return array
  // };
  
  render() {
    const posts = this.state.posts
    console.log('Por favorr!: ',posts)
    return (
      <View>
        <Text>{this.state.userName}</Text>
        <Text>{this.state.postNumber}</Text>
        <FlatList 
          data={posts}
          renderItem ={({item}) => (
            <Post>
              <Header>     
                <Avatar source = {userPic}/>
                <Name>{item.recipe_name}{"\n"}Insert Author name here</Name>
                
              </Header>
              <Image ratio ={0.834} source = {{uri : "http://localhost:3000/" + item.postImage}}/>
              <Description>
                {item.description}
              </Description>
            </Post>
          )}
          //keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
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
  signUpText: {
    color: 'black',
    marginTop: 20,
    fontSize: 30
  }
});
