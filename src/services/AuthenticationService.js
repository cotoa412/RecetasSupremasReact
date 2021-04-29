import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt from 'jwt-decode'

class AuthenticationService {
  storeData = async (value) => {
    try {
      await AsyncStorage.setItem('user', value)
      const currentUser = await AsyncStorage.getItem('user')
      console.log('From localStorage: ',jwt(currentUser))
      const currentUserDecrypted = jwt(currentUser)
      const currentUserId = currentUserDecrypted.userId
      console.log('From localStorage user id: ', currentUserId)
      await AsyncStorage.setItem('userId', currentUserId)
      const currentUserIdRes = await AsyncStorage.getItem('userId')
      console.log('From localStorage user id: ', currentUserIdRes)

    } catch (e) {
      console.error(e)
    }
  }

  login = (email, password) => {
    const user = {
        "email": email,
        "password": password
    };  
    const token = axios({
      method: 'post',
      url: 'http://localhost:3000/users/login',
      data: user
    })
    .then(response => {
      this.storeData(response.data.token)
      return response.data.token;
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
    return token
  }

  logout = async () => {
    try {
      await AsyncStorage.removeItem('user')
    } catch (e) {
      console.error(e)
    }
  }

  register = async(name,surname,username, email, password) => {
    const user = {
        "name": name,
        "surname": surname,
        "username": username,
        "email": email,
        "password": password
    };
    return axios({
        method: 'post',
        url: 'http://localhost:3000/users/signup',
        data: user
      })
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  delete = () =>{
    
  }

  getCurrentUser = async() => {
    try{
      const currentUsername = await AsyncStorage.getItem('user')
      const userData = jwt(currentUsername)
      console.log(userData)
      axios({
        method: 'get',
        url: 'http://localhost:3000/users/'+userData.userId,
      })
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.error(err);
        throw err;
      })
    } catch (e){
      console.error(e)
    }
  }


}

export default new AuthenticationService();