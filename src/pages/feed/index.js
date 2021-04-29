
import React, { useState, useEffect, useCallback } from 'react';
import {FlatList, View, Text, Alert } from 'react-native';
import 'react-native-gesture-handler';
import axios from 'axios';
import {Icon, Button} from 'native-base';


// import { Container } from './styles';
import { Post, Header, Avatar, Name, Image, Description, Loading } from './styles';

import userPic from './../../assets/UserPic.png';


const feed = ({navigation}) => {
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [itemId, setId] = useState()

  const commentsPressHandler = ({item}) => {
    console.log("comment pressed")
    console.log("id", item._id)
    navigation.navigate('Comment', {
      itemId: item._id,
      recipe_name: item.recipe_name,
      postImage: item.postImage,
      description: item.description    
    })
    
  }

  async function loadPage(pageNumber = page, shouldRefresh = false) {{
    if (total && pageNumber > total) return;

    setLoading(true);

    const response = await fetch(
      `http://localhost:3000/posts`
    );
    const data = await response.json();
    const totalItems = response.headers.get('X-Total-Count');
    setTotal(Math.ceil(totalItems / 5));
    setFeed(data);
    console.log("feed", feed)
    // setPage(pageNumber + 1)
    setLoading(false);
  }

  }

  useEffect(() => {
    loadPage();
  },[]);

  async function refreshList() {
    setRefreshing(true);

    await loadPage(1, true);

    setRefreshing(false);
  }

  return (
      <View>
        <FlatList 
          data={feed}
          keyExtractor={post => String(post._id)}
          // onEndReached={() => loadPage()}
          onEndReachedThreshold={0.1}
          onRefresh={refreshList}
          refreshing={refreshing}
          ListFooterComponent={loading && <Loading/>}
          renderItem ={({item}) => (
            <Post>
              <Header>     
                <Avatar source = {userPic}/>
                <Name>{item.recipe_name}{"\n"}Insert Author name here</Name>
                <Text></Text>
              </Header>
              <Image ratio ={0.834} source = {{uri : "http://localhost:3000/" + item.postImage}}/>

              <Description>
                {item.description}
              </Description>

              <Button transparent onPress = {() => commentsPressHandler({item})} style = {{marginLeft: 5, padding: 5, borderBottomColor: '#000000', borderBottomWidth: 1,}}>
                <Image source = {require('../../assets/comments.png')} 
                  resizeMode ="contain"
                  style = {{
                  width: 25,
                  height: 25,
                  padding: 5,
                  tintColor: '#FF8585'
                   }}
                   />
                <Text> Add a comment</Text>
                <Text>                                                                   </Text>
              </Button>
              
            </Post>
          )}
        />
      </View>
    );
}


export default feed;