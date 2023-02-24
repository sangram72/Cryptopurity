import { View, Text,StyleSheet,TouchableOpacity, Touchable, SafeAreaView,BackHandler } from 'react-native'
import React,{useEffect} from 'react'
import  FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import  AntDesign  from 'react-native-vector-icons/AntDesign';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'


const Pointhis = ({route}) => {
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
    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
      <TouchableOpacity
       onPress={() => {
        navigation.navigate('Points');
      }}
      >
      <Text style={{marginTop:'10%',marginLeft:'5%',fontSize:25}}> <AntDesign name="arrowleft" size={24} color="black" /> Rewards
     
      </Text>
      </TouchableOpacity><TouchableOpacity>
      <Text style={{marginTop:'17%',marginRight:'5%',fontSize:25,borderRadius:20,paddingVertical:4,paddingHorizontal:40,shadowOpacity:2,shadowColor:'black',
    borderWidth:1}}><FontAwesome5 name="coins" size={24} color="black" style={{justifyContent:'left'}}/>
    </Text>
    </TouchableOpacity>
    </View>
    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
      {/* <TouchableOpacity style={{alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'black',
    marginTop:'5%',
    opacity:20}}>
        <Text style={{fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white'}} 
    > available Rewards </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'black',
    marginTop:'5%'}}>
        <Text style={{fontSize:16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white'}}> Redeemed </Text>
      </TouchableOpacity> */}
    </View>
    <View style={{backgroundColor:'white',height:'20%', width:'90%',borderRadius:10, borderWidth:1,marginLeft:20,display:'flex',flexDirection:'row',justifyContent:'space-evenly'
    ,marginTop:7
  }}>
     <Text style={{fontSize:15}}><Ionicons name="filter" size={24} color="black" />Filters</Text>
     <TouchableOpacity  >
     <Text>All brands<MaterialIcons name="arrow-drop-down" size={24} color="black" /></Text>
     </TouchableOpacity>
     <TouchableOpacity  >
     <Text style={{alignItems:'center'}}>India<MaterialIcons name="arrow-drop-down" size={24} color="black" /></Text>
     </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

export default Pointhis