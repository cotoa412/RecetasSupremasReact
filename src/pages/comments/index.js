
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet,TextInput, TouchableHighlight, FlatList, View, Text, Alert } from 'react-native';
import {Icon, Button, Left} from 'native-base';
import 'react-native-gesture-handler';
import { Post, Header, Avatar, Name, Image, Description, Loading } from './styles';

import userPic from './../../assets/UserPic.png';
import { add } from 'react-native-reanimated';

const comments = []

const comment = ({navigation, route}) => {

    const {itemId, recipe_name, postImage, description} = route.params;
    const [comment, setComment] = useState([]);

    const DATA = [
        {
          id: itemId,
          recipe_name: recipe_name,
          postImage: postImage,
          description: description
        },]
    
    
    const submitPressHandler = () => {
        comments.push(comment)
        
    }
        
        console.log(comment)

        
  return (
      <View>
        <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem = {({item}) => (
            <Post>
              <Header>     
                <Avatar source = {userPic}/>
                <Name>{item.recipe_name}{"\n"}Insert Author name here</Name>
                
              </Header>
              <Image ratio ={0.834} source = {{uri : "http://localhost:3000/" + item.postImage}}/>

              <Description>
                {item.description}
              </Description>
              <TextInput ref={input1 => {}} style={styles.inputs ,{backgroundColor: "#FFFFFF",
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
              marginLeft: 10,
              marginRight: 10}}
              placeholder="Add a comment"
              multiline
              numberOfLines={3}
              underlineColorAndroid='transparent'
              onChangeText={(comment) => setComment({comment})}
              />
              <Button transparent onPress = {() => submitPressHandler({item})} style = {{ marginLeft: 10, marginTop:13, padding: 5, backgroundColor: "#FFFFFF"}}>
                <Text> Submit     </Text>
                <Image source = {require('../../assets/play.png')} 
                  resizeMode ="contain"
                  style = {{
                  width: 20,
                  height: 20,
                  padding: 5,
                  tintColor: '#000000'
                   }}
                   />
                
              </Button>
              
            </Post>

          )}
          
          />
        </View>
    );
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
        marginRight:16,
        borderBottomColor: '#000',
        flex:1,
        backgroundColor: '#FFFFFF'
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

export default comment;