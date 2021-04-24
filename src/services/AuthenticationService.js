import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt from 'jwt-decode'

class AuthenticationService {
  storeData = async (value) => {
    try {
      await AsyncStorage.setItem('user', value)
      const currentUser = await AsyncStorage.getItem('user')
      console.log('From localStorage: ',jwt(currentUser))
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

  logout() {
    AsyncStorage.removeItem("user");
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

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthenticationService();