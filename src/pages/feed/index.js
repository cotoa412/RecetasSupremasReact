
import React, { useState, useEffect, useCallback } from 'react';
import { Button, FlatList, View, Text } from 'react-native';
import 'react-native-gesture-handler';
import axios from 'axios';


// import { Container } from './styles';
import { Post, Header, Avatar, Name, Image, Description, Loading } from './styles';

import userPic from './../../assets/UserPic.png';


const feed = ({navigation}) => {
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const pressHandler = () => {
    navigation.navigate('Register');
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
            </Post>
          )}
        />
      </View>
    );
}

export default feed;