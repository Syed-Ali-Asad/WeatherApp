import {Text, TextInput,Image, TouchableOpacity,ActivityIndicator, ImageBackground, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import WeatherDetails from './WeatherDetails';
import { WP } from '../constants';

export default function Home() {
  const [cityName, setCityName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation()

  const getWeatherDetails =  () => {
      if (cityName.length == 0) return alert("Please enter a city name");

      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json, text/plain, */*");
      myHeaders.append("LANG", "en");
      myHeaders.append("AppVersion", "2.0.67");
      myHeaders.append("city_id", "1");
      myHeaders.append("h3_index_id", "10731");
      myHeaders.append("sub_area_id", "3801");
      myHeaders.append("device_id", "73673ace419adfb0");
      myHeaders.append("vertical", "1");
      myHeaders.append("secretkey", "ADFKLNADF2332425KNLNLKsrlklnlsdlner");
      myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyMzk3MDUsInJvbGVfc2x1ZyI6IlJldGFpbGVyIiwicm9sZSI6IlJldGFpbGVyIiwicm9sZV9pZCI6MywiY2l0eV9pZCI6MiwiYXJlYV9pZCI6bnVsbCwic3ViX2FyZWFfaWQiOm51bGwsImgzX2luZGV4X2lkIjo4NTgxLCJ2ZXJ0aWNhbF9pZCI6MX0sImlhdCI6MTY4OTIzODA1MSwiZXhwIjoxNjg5MzI0NDUxLCJhdWQiOiJkYXN0Z3lyLmNvbSJ9.xdw8MjOw2kj1Zx8u2gBK0sA-1Lwe-ozNWyeipeakne8");
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };


      setLoading(true)
      fetch(`http://api.weatherapi.com/v1/forecast.json?key=f94657b590f34c66969144900231308&q=${cityName}&days=5`, requestOptions)
        .then(response => response.text())
        .then(result => {
          let temp = JSON.parse(result);

          if(temp.error)
            alert(temp.error.message);
          else
            navigation.navigate("WeatherDetails", {
              data: temp
            });
        })
        .catch(error => {console.log("Failed to get location data!")})
        .finally(()=>setLoading(false))  
  }

  return (
    <ImageBackground source={require('../assets/homeBackground.jpg')} style = {{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
        <Image source={require('../assets/homeIcon.png')} style = {{height : 100, width : 100}}/>
        <Text style = {styles.homeTitle}>Discover the weather of any city!</Text>
        <Text style = {styles.homeSubTitle}>Type the name of any city and check the current weather of that city</Text>
     
        <TextInput
          placeholder="City Name"
          placeholderTextColor={"white"}
          value={cityName}
          onChangeText={(text) => setCityName(text)}
          style = {styles.textInputContainer}
        />

     
        <TouchableOpacity 
          onPress={getWeatherDetails}
          style = {styles.btnTextContainer}>
          {loading && <ActivityIndicator size={20} color="white" style={{marginRight:10}}/>}
          <Text style = {styles.btnText}>Search</Text>
        </TouchableOpacity>
  </ImageBackground>
  )
}

const styles = StyleSheet.create({
  homeTitle:{
    color : "white",
    fontSize : WP(5.5),
    textAlign : 'center',
    marginTop : WP(5)
  },
  homeSubTitle:{
    color : "white",
    fontSize : WP(4),
    textAlign : 'center',
    marginTop : WP(5)
  },
  textInputContainer:{
    borderColor : 'lightgray', 
    borderWidth : WP(0.2),
    color : 'white',
    width : WP(80),
    borderRadius : WP(3),
    marginVertical : WP(5),
    paddingHorizontal : WP(3)
  },
  btnText:{
    color : "white",
    fontSize : 18,
    fontWeight : 'bold'
  },
  btnTextContainer:{
    height : WP(12), 
    width : "80%", 
    backgroundColor : "dodgerblue", 
    borderRadius : WP(4), 
    justifyContent : 'center',
    alignItems : 'center',
    marginTop : WP(2),
    flexDirection:"row"
  }
})