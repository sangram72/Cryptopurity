import { View, Text, SafeAreaView, Touchable, TouchableOpacity ,Image, ScrollView,BackHandler} from 'react-native'
import React,{useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const Points = ({route}) => {
    const navigation = useNavigation()
    useEffect(() => {
      const backAction = () => {
       navigation.navigate('User')
            
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
    }, []);
  return (
 
  
     <SafeAreaView>
    <View style={{backgroundColor:'#010128'}}>
        <TouchableOpacity
         onPress={() => {
          navigation.navigate('Pointhis');
        }}
        >
        <Text style={{color:'white',fontSize:17,textAlign:'right'}}>Points History</Text>
        </TouchableOpacity>
         <FontAwesome5 
         style={{marginLeft:"45%"}}
         name="coins" size={30} color="gold" />
      <Text  style={{color:'white',fontSize:22,textAlign:'center'}}>Points</Text>
      <Text style={{color:'white',fontSize:12,textAlign:'center'}}>(Available + Invested)</Text>
    </View>
    <View >
        <Text style={{color:'black'}}>What are points?</Text>
        <Text>A mortgage point equals 1 percent of your total loan amount — for example, on a $100,000 loan, one point would be $1,000.</Text>
    </View>
    <View style={{backgroundColor:'#010128'}}>
    <Text style={{color:'white',textAlign:'center',fontSize:20}}>Create Your Portfolio</Text>
    <Text style={{color:'white',textAlign:'center',}}>A portfolio is a collection of financial investments like stocks, bonds, commodities, cash, and cash equivalents, including closed-end funds and exchange traded funds (ETFs). People generally believe that stocks, bonds, and cash comprise the core of a portfolio</Text>
    <Image
    style={{alignContent:'center',width:'50%',height:'20%',marginLeft:'25%',marginTop:'5%'}}
    source={require('../../assets/sliding.jpg')}></Image>
    <TouchableOpacity
      style={{
        backgroundColor:'blue',
        
        margin: 7,
        padding: 10,
       
       marginLeft:'10%',
        borderRadius:10,
        width:'80%',}}
        onPress={() => {
          navigation.navigate('Crypto');
        }}
    >
      <Text style={{textAlign:'center',color:'white',fontWeight:'bold'}}>Learn More</Text>
    </TouchableOpacity>
    </View>
   <View>
    <Text style={{color:'black',fontWeight:'bold'}}>Earn Points</Text>
    <Text>Make Contributions and Earn Points</Text>
   </View>
   <View>
    <Text style={{color:'black',fontWeight:'bold'}}>Daily Points</Text>
    
   </View>
    
    </SafeAreaView>
   
    
  )
}

export default Points