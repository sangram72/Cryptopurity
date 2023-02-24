import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Background from '../Background';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import supabase from '../Portfolio/Supabase';
import {firebase} from '@react-native-firebase/firestore';

const Result = ({route}) => {
  const navigation = useNavigation();
  const [Value, setvalue] = useState('');
  function datapass() {
    navigation.navigate('Animation');
  }
  function datapass1() {
    navigation.navigate('Game');
  }
  const score = route.params.paramkey;

  useEffect(() => {
    if (route.params.paramkey <= 40) {
      setvalue('good ');
    }
    if (route.params.paramkey > 40 && route.params.paramkey <= 60) {
      setvalue('better');
    }
    if (route.params.paramkey > 60 && route.params.paramkey <= 100) {
      setvalue('best');
    }
    // console.log('points', route.params.paramkey3);
  }, []);
  useEffect(() => {
    const updatePoints = async () => {
      const userId = firebase.auth().currentUser.uid;
      const {data: data1, error: error1} = await supabase
        .from('Android_Auth')
        .select('Points')
        .eq('UID', userId);

      if (error1) {
        // console.log('Could not fetch data from the table  ');
        //setQuizzes(null)
      }
      if (data1) {
        //setQuizzes(data)
        // alert('updated1');
        // console.log(data1);
        const user_have_total_token = data1[0].Points;
        const totalcoin = route.params.paramkey3;

        // updatePoints(user_have_total_token)
        // console.log('user_have_total_token', user_have_total_token);

        // console.log(user_have_total_token);
        const {data, error} = await supabase
          .from('Android_Auth')
          .update({Points: user_have_total_token + totalcoin})

          .eq('UID', firebase.auth().currentUser.uid);

        if (error) {
          // console.log(error);
        }
        if (data) {
          // console.log(data);
          // alert('points updated');
        }
      }

      // call in next button updatePoints()
      //updatePoints()
    };
    updatePoints();
  }, []);

  return (
    <>
      <ImageBackground
        source={require('../../assets/Game/Result/result.png')}
        style={{height: '100%'}}>
        <View style={{display: 'flex', marginTop: '10%'}}>
          <View
            style={{borderWidth: 1, borderColor: 'rgba(140, 90, 160, .01)'}}>
            <Text
              style={{
                color: '#ffffff',
                fontSize: 40,
                fontWeight: 'bold',
                textAlign: 'center',
                fontFamily: 'RobotoCondensed-Light',
              }}>
              {Value}
            </Text>
          </View>
        </View>
        <View
          style={{display: 'flex', alignItems: 'center', marginTop: '19.5%'}}>
          <View
            style={{
              borderWidth: 1,
              width: '50%',
              borderColor: 'rgba(140, 90, 160, .01)',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 50,
                fontWeight: 'bold',
                color: '#ffffff',
                fontFamily: 'RobotoCondensed-LightItalic',
              }}>
              {route.params.paramkey}
            </Text>
          </View>
        </View>
        <View style={{display: 'flex', marginTop: '15%', alignItems: 'center'}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              width: '50%',
              height: 50,
              borderColor: 'rgba(140, 90, 160, .01)',
            }}>
            {score <= 40 && score > 0 ? (
              <>
                <Image
                  source={require('../../assets/Game/Result/star.png')}
                  style={{height: 30, width: 30}}
                />
                <Image
                  source={require('../../assets/Game/Result/staro.png')}
                  style={{height: 30, width: 30, marginTop: '-10%'}}
                />
                <Image
                  source={require('../../assets/Game/Result/staro.png')}
                  style={{height: 30, width: 30}}
                />
              </>
            ) : score > 40 && score <= 70 ? (
              <>
                <Image
                  source={require('../../assets/Game/Result/star.png')}
                  style={{height: 30, width: 30}}
                />
                <Image
                  source={require('../../assets/Game/Result/star.png')}
                  style={{height: 30, width: 30, marginTop: '-10%'}}
                />
                <Image
                  source={require('../../assets/Game/Result/staro.png')}
                  style={{height: 30, width: 30}}
                />
              </>
            ) : score > 70 && score <= 100 ? (
              <>
                <Image
                  source={require('../../assets/Game/Result/star.png')}
                  style={{height: 30, width: 30}}
                />
                <Image
                  source={require('../../assets/Game/Result/star.png')}
                  style={{height: 30, width: 30, marginTop: '-10%'}}
                />
                <Image
                  source={require('../../assets/Game/Result/star.png')}
                  style={{height: 30, width: 30}}
                />
              </>
            ) : (
              <>
                <Image
                  source={require('../../assets/Game/Result/staro.png')}
                  style={{height: 30, width: 30}}
                />
                <Image
                  source={require('../../assets/Game/Result/staro.png')}
                  style={{height: 30, width: 30, marginTop: '-10%'}}
                />
                <Image
                  source={require('../../assets/Game/Result/staro.png')}
                  style={{height: 30, width: 30}}
                />
              </>
            )}
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: '15%',
          }}>
          <ImageBackground
            style={{height: 200, width: 200}}
            source={require('../../assets/Game/correct.png')}>
            <Text
              style={{
                textAlign: 'center',
                paddingTop: '40%',
                fontSize: 30,
                fontWeight: 'bold',
                color: 'white',
              }}>
              {route.params.paramkey1}
            </Text>
          </ImageBackground>
          <ImageBackground
            style={{height: 200, width: 200}}
            source={require('../../assets/Game/wrong.png')}>
            <Text
              style={{
                textAlign: 'center',
                paddingTop: '40%',
                fontSize: 30,
                fontWeight: 'bold',
                color: 'white',
              }}>
              {route.params.paramkey2}
            </Text>
          </ImageBackground>
        </View>
        <View style={{display: 'flex', alignItems: 'center', marginTop: '1%'}}>
          <View
            style={{
              borderWidth: 1,
              width: '50%',
              height: 50,
              borderColor: 'rgba(140, 90, 160, .01)',
            }}>
            <ImageBackground
              source={require('../../assets/Game/Result/botton.png')}
              style={{height: 70}}>
              <TouchableOpacity onPress={datapass}>
                <Text
                  style={{
                    color: '#ffffff',
                    fontWeight: 'bold',
                    fontSize: 16,
                    textAlign: 'center',
                    paddingTop: 24,
                  }}>
                  Next
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default Result;
