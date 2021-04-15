
import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import 'react-native-gesture-handler';

// import { Container } from './styles';
import { Post, Header, Avatar, Name, Image, Description, Loading } from './styles';

import userPic from './../../assets/UserPic.png';

const axios = require('axios');

const feed = () => {
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);


  async function loadPage(pageNumber = page, shouldRefresh = false) {{
    if (total && pageNumber > total) return;

    setLoading(true);

    const response = await fetch(
      `http://localhost:3000/posts?limit=3&page=${pageNumber}`
    );
    
    const data = await response.json();
    const totalItems = response.headers.get('X-Total-Count');

    setTotal(Math.ceil(totalItems / 5));
    setFeed(shouldRefresh ? data : [...feed, ...data]);
    setPage(pageNumber + 1);
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
          onEndReached={() => loadPage()}
          onEndReachedThreshold={0.1}
          onRefresh={refreshList}
          refreshing={refreshing}
          ListFooterComponent={loading && <Loading/>}
          renderItem ={({item}) => (
            <Post>
              <Header>     
                <Avatar source = {userPic}/>
                {/* <Name>{item.author.name}</Name>   */}
                <Name>{item.recipe_name}</Name>
              </Header>
              <Image ratio ={0.834} source = {{uri : "http://localhost:3000/" + item.postImage}}/>

              <Description>
                {/* <Name>{item.author.name}</Name>  */}
                {item.description}
              </Description>
            </Post>
          )}
        />
      </View>
    );
}

export default feed;