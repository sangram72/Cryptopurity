import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  SafeAreaView,
  BackHandler
} from 'react-native';
import React,{useState,useEffect} from 'react';

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const Feedback = () => {
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
  const [mood, setMood] = useState('');
  const [like,setLike] = useState(false);
  const [like1,setLike1] = useState(false);
  const [like2,setLike2] = useState(false);
  const [like3,setLike3] = useState(false);
  const [like4,setLike4] = useState(false);
  


  return (
    <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
      <View style={{height: '10%', width: '100%', backgroundColor: 'white'}}>
        <TouchableOpacity>
          <Entypo
            name="circle-with-cross"
            size={24}
            color="#00d4ff"
            style={{marginLeft: '80%', marginTop: '5%'}}
          />
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: 'white'}}>
        <Text style={{fontSize: 20, marginLeft: '10%', fontWeight: '500'}}>
          {' '}
          Give feedback{' '}
        </Text>
        <Text style={{fontSize: 15, fontWeight: '300', marginLeft: '12%'}}>
          what do you think of the editing tool?
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginLeft: '3%',
            marginTop: '6%',
          }}>
          <TouchableOpacity>
            <FontAwesome5 name="sad-tear" size={30} 
        style={{
          color: like? 'yellow':'#00d4ff'
        }}
        onPress={()=>{setLike(!like)
        }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="emoticon-sad-outline"
              size={35}
                  style={{
          color: like1? 'yellow':'#00d4ff'
        }}
        onPress={()=>{setLike1(!like1)
        }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo
               style={{
                color: like2? 'yellow':'#00d4ff'
              }}
              onPress={()=>{setLike2(!like2)
              }}
            
            name="emoji-neutral" size={30} color="#00d4ff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo
               style={{
                color: like3? 'yellow':'#00d4ff'
              }}
              onPress={()=>{setLike3(!like3)
              }}
            
            name="emoji-happy" size={30} color="#00d4ff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Fontisto
               style={{
                color: like4? 'yellow':'#00d4ff'
              }}
              onPress={()=>{setLike4(!like4)
              }}
            
            name="smiley" size={30} color="#00d4ff" />
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 15, marginLeft: '10%', marginTop: '10%'}}>
          {' '}
          Do you have any thoughts you'd like to share?
        </Text>
        <TextInput
          style={{
            height: '25%',
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            borderLeftWidth: 0.5,
            borderRightWidth: 0.5,
            width: '80%',
            marginLeft: '10%',
            marginTop: '10%',
            borderRadius: 10,
            borderColor: '#00d4ff',
          }}
        />
        <Text style={{fontSize: 15, marginLeft: '10%', marginTop: '10%'}}>
          {' '}
          May we follow you up on your feedback?{' '}
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginRight: '10%',
          }}>
          <View style={styles.wrapper}>
            {['yes', 'no'].map(feeling => (
              <View key={feeling} style={styles.mood}>
                <Text style={styles.feeling}>{feeling}</Text>
                <TouchableOpacity
                  style={styles.outter}
                  onPress={() => setMood(feeling)}>
                  {mood === feeling && <View style={styles.inner} />}
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: '8%',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#00d4ff',
              height: '150%',
              width: '30%',
              borderRadius: 8,
            }}
            onPress={() => {
              console.log('submitted');
              Alert.alert('Submitted');
            }}>
            <Text
              style={{
                color: 'white',
                borderRadius: 20,
                textAlign: 'center',
                marginTop: '5%',
              }}>
              {' '}
              Send
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#00d4ff',
              height: '150%',
              width: '30%',
              borderRadius: 8,
            }}
            onPress={() => {}}>
            <Text
              style={{color: 'white', textAlign: 'center', marginTop: '5%'}}>
              {' '}
              cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Feedback 
const styles = StyleSheet.create({
  outter: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    marginLeft: '10%',
    marginTop: '8%',
  },
  inner: {
    width: 15,
    height: 15,
    backgroundColor: '#00d4ff',
    borderRadius: 10,
    marginLeft: '24%',
    marginTop: '24%',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  mood: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  feeling: {
    fontSize: 22,
    textTransform: 'capitalize',
  },
});
