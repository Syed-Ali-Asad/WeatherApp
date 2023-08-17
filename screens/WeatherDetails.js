import { StyleSheet, Text, View, Image, ImageBackground, FlatList,ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { logResponse } from '../config/logger'
import { WP } from '../constants'

const WeatherDetails = ({route}) => {
  const params = route.params
  const temp = params?.data
  const [data , setData] = useState([])
  const [todayForcast, setTodayForcast] = useState([])
  const [futureForcast , setFutureForcast] = useState([])
  const [loading, setLoading] = useState(false)
  const [backgroundImage, setBackgroundImage] = useState(require('../assets/morning.jpg'))


  const getTimeCategory = () => {
    const date = new Date();
    const hours = date.getHours();
    
    if (hours >= 5 && hours < 12) {
        return setBackgroundImage(require('../assets/morning.jpg'));
    } else if (hours >= 12 && hours < 17) {
        return setBackgroundImage(require('../assets/afternoon.jpg'));
    } else if (hours >= 17 && hours < 21) {
        return setBackgroundImage(require('../assets/evening.jpg'));
    } else {
        return setBackgroundImage(require('../assets/night.jpg'));
    }
  };


  logResponse("json", data)

  useEffect(()=>{
    setLoading(true)
    setData(temp)
    setTodayForcast(temp?.forecast?.forecastday[0]?.hour)
    setFutureForcast(temp?.forecast?.forecastday)
    setLoading(false)
    getTimeCategory()
  },[])

  const RenderForcast = ({item})=>{
    const {time, condition, temp_c} = item
    let formattedTime = formatTime(time)
    return(
      <View style = {[styles.forcastContainer]}>
        <Text style = {styles.forecastTimes}>{formattedTime}</Text>
        <Image source={{uri :`https:${condition?.icon}` }} style = {styles.forcastIcons}/>
        <Text style = {styles.forcastTemperatureText}>{temp_c}°C</Text>
      </View>
    )
  }

  const formatTime = (inputDateTime)=>{
    const date = new Date(inputDateTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    const amPm = hours < 12 ? "am" : "pm";
    const formattedTime = `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${amPm}`;

    return formattedTime;
}

const formatDate = (inputDateTime) => {
  const date = new Date(inputDateTime);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const formattedDate = `${day < 10 ? "0" : ""}${day}/${month < 10 ? "0" : ""}${month}`;
  return formattedDate;
};

const extractDayName = (inputDate) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(inputDate);
  const currentDate = new Date();
  const dayIndex = date.getDay();
  
  if (date.toDateString() === currentDate.toDateString()) {
      return 'Today';
  } else {
      const dayName = daysOfWeek[dayIndex];
      return dayName;
  }
};



  const RenderFutureForcast = ({item})=>{
    const {date, day} = item

    return(
   
          <View style = {styles.futureForcastBox}>
            <Text style = {styles.futureForcastDate}>{formatDate(date)}</Text>
            <Text style = {styles.futureForcastDay}>{extractDayName(date)}</Text>
            <View style={styles.futureForcastImageContainer}>
              <Image source={{uri :`https:${day?.condition?.icon}` }} style = {styles.futureForcastIcon}/>
            </View>
            <View style = {styles.minMaxTempContainer}>
              <Text style = {styles.futureForcastMinTemp}>{day?.mintemp_c}</Text>
              <Text style = {styles.futureForcastMaxTemp}>{day?.maxtemp_c}</Text>
            </View>
        </View>
    
    )
  }

  return (
    <ImageBackground source={backgroundImage} style={{flex: 1,backgroundColor:"gray"}}>

      {loading ? 
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={30} color="white"/></View>
      :
       <View>
        <View style={styles.topView}>
          <Text style = {styles.cityName}>{data?.location?.name}</Text>
        </View>
        
        <View style = {styles.temperatureBox}>
          <Text style = {styles.temperatureText}>{data?.current?.temp_c}°C</Text>
            <View style = {styles.container}>
              <Text style = {styles.temperatureStatus}>{data?.current?.condition?.text}</Text>
              <Image source={{uri : `https:${data?.current?.condition?.icon}`}} style = {{height : WP(8), width : WP(8), resizeMode : "cover"}}/>
            </View>
        </View>

        <FlatList 
          data={todayForcast}
          keyExtractor={(item)=> item.id}
          horizontal
          contentContainerStyle = {{columnGap : 8, paddingLeft : WP(2), height:WP(40)}}
          renderItem={({item})=>(
            <RenderForcast item = {item} />
          )}
        />
        <View style = {styles.separator}/>
        <FlatList
        data={futureForcast}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>(
          <RenderFutureForcast item = {item} />
        )}/>
       </View>

        }
    </ImageBackground>
  )
}

export default WeatherDetails

const styles = StyleSheet.create({
  cityName:{
    color : "white",
    padding : WP(6),
    fontSize : WP(7),
    fontWeight : '700'
  },
  temperatureBox:{
    height : WP(30),
    width : WP(100),
    justifyContent :'center',
    alignItems : 'center'
  },
  temperatureText:{
    color : 'white',
    fontWeight : '500',
    fontSize : WP(18)
  },
  container:{
    flexDirection : 'row',
    justifyContent:"center",
    alignItems:"center",
    columnGap: 5
  },
  temperatureStatus:{
    color : "white",
    fontSize : WP(4),
    fontWeight : '500'
  },
  forecastTimes:{
    color : "white",
    fontSize : WP(3),
  },
  forcastContainer:{
    height : WP(20),
    width : WP(20),
    marginVertical : WP(10),
    justifyContent : 'center',
    alignItems : 'center',
    rowGap : 5,
    backgroundColor : 'rgba(255,255,255,0.15)',
    borderRadius : WP(2)
  },
  forcastIcons:{
    height : WP(8),
    width : WP(8),
  },
  forcastTemperatureText:{
    color : "white",
  },
  separator:{
    backgroundColor : 'gray',
    height : WP(0.1),
    width : WP(90),
    alignSelf : 'center',
    marginVertical: 20
  },
  futureForcastDate:{
    color : 'white',
    width:"20%"
  },
  futureForcastDay:{
    color : 'rgba(255,255,255,0.7)',
    width:"20%"
  },
  futureForcastMinTemp:{
    color : 'rgba(255,255,255,0.6)'
  },
  futureForcastMaxTemp:{
    color : 'white'
  },
  minMaxTempContainer:{
    flexDirection : 'row',
    columnGap : WP(2),
    width:"20%"
  },
  futureForcastBox : {
    flexDirection : 'row',
    alignItems:"center",
    paddingHorizontal: 15
  },
  futureForcastIcon:{
    height : WP(8),
    width : WP(8),
  },
  futureForcastImageContainer:{
    width:"40%",
    justifyContent:"center",
    alignItems:"center"
  }
})