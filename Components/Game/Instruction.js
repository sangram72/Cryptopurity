import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  BackHandler,
} from 'react-native';
import React, {useRef, useEffect, useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-web-hover';
import {firebase} from '@react-native-firebase/firestore';
import supabase from '../Portfolio/Supabase';

const Instruction = () => {
  const [introductionvalue, setintroductionvalue] = useState();
  const [gamestartingoption, setgamestartingoption] = useState(false);
  const [textcount, settextcount] = useState(0);
  const [Quizees, setQuizzes] = useState();

  useEffect(() => {
    //total_token get dynamic
    const fetchPoints = async () => {
      const userId = firebase.auth().currentUser.uid;
      // console.log(userId);
      const {data, error} = await supabase
        .from('Android_Auth')
        .select('Points')
        .eq('UID', userId);

      if (error) {
        // console.log('Could not fetch data from the table  ');
        //setQuizzes(null)
      }
      if (data) {
        setQuizzes(data[0].Points);
        // console.log(data);
        const user_have_total_token = data[0].Points;

        //updatePoints(user_have_total_token)

        // console.log(user_have_total_token);
        // setEntryPoint(user_have_total_token);
      }
    };

    fetchPoints();
  }, []);

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

      // updatePoints(user_have_total_token)
      // console.log('user_have_total_token', user_have_total_token);
      //token
      // console.log(user_have_total_token);
      const {data, error} = await supabase
        .from('Android_Auth')
        .update({Points: user_have_total_token - 10})

        .eq('UID', firebase.auth().currentUser.uid);

      if (error) {
        // console.log(error);
      }
      if (data) {
        // console.log(data);
        alert('points updated');
      }
    }

    // call in next button updatePoints()
    //updatePoints()
  };

  //end

  const [loading, setloading] = useState(true);

  //backhamdelar
  const navigation = useNavigation();
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Animation');

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  //end

  //API
  useEffect(() => {
    fetch(
      'https://gj7xu81f.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20%22post%22%5D%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20slug%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20body%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20mainImage%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20asset%20-%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20_id%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22categories%22%3A%20categories%5B%5D-%3Etitle%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(response => {
        // console.log(response);

        setintroductionvalue(gettheintroductionvalue(response.result));
        setloading(false);
      });
  }, []);
  //End

  //api Fuction
  function gettheintroductionvalue(res) {
    const arr2 = res.filter(function (caaavalue) {
      return caaavalue.categories[0] == 'Introduction';
    });
    return arr2;
  }

  //end

  function changethedata() {
    if (Quizees >= 1) {
      navigation.navigate('Animation1');
    } else alert('you have no valid point');
  }

  return (
    <>
      {loading == true ? (
        <View>
          <Image
            style={{width: '100%', height: '80%', marginLeft: 5, marginTop: 90}}
            source={require('../../assets/Loding/gif.gif')}
          />
        </View>
      ) : (
        <View style={{display: 'flex'}}>
          <View>
            {introductionvalue && (
              <ImageBackground
                source={{uri: introductionvalue[textcount].mainImage.asset.url}}
                style={{height: '100%', width: '100%'}}>
                <ScrollView>
                  <View
                    style={{
                      alignItems: 'flex-end',
                    }}>
                    <View
                      style={{
                        borderWidth: 1,
                        width: '30%',
                        borderColor: 'rgba(140, 90, 160, .01)',
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: '25%',
                        }}>
                        <Image
                          style={{height: 23, width: 24, marginTop: '2%'}}
                          source={require('../../assets/Game/coin.png')}
                        />
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: 'black',
                            marginLeft: '25%',
                            borderWidth: 1,
                            borderColor: 'rgba(140, 90, 160, .01)',
                            // borderColor: '#ffffff',
                            width: '180%',
                            alignSelf: 'center',
                          }}>
                          {Quizees}
                        </Text>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: 'black',
                          }}>
                          CP
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <View
                      style={{
                        borderWidth: 1,
                        height: 35,
                        width: '40%',
                        alignItems: 'center',
                        borderRadius: 8,
                        borderColor: 'rgba(140, 90, 160, .01)',
                      }}>
                      {introductionvalue && (
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 20,
                            fontFamily: 'Oswald-Bold',
                          }}>
                          {introductionvalue[textcount].title}
                        </Text>
                      )}
                    </View>
                    <View
                      style={{
                        borderWidth: 1,
                        width: '85%',
                        height: 480,
                        marginTop: '5%',
                        borderColor: 'rgba(140, 90, 160, .01)',
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: 'RobotoCondensed-Regular',
                        }}>
                        {introductionvalue[0].body[0].children[0].text}
                      </Text>
                    </View>
                  </View>
                  <View style={{alignItems: 'center', display: 'flex'}}>
                    <View
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        borderWidth: 1,
                        height: 70,
                        width: '60%',
                        marginTop: '5%',

                        borderColor: 'rgba(140, 90, 160, .01)',
                      }}>
                      <ImageBackground
                        style={{
                          height: 60,
                          width: 150,
                        }}
                        source={require('../../assets/Game/Result/buttonb.png')}>
                        <View style={{alignItems: 'center', paddingTop: 10}}>
                          <TouchableOpacity
                            onPress={() => {
                              changethedata(), updatePoints();
                              // navigation.navigate('Animation1');
                            }}>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: 20,
                                fontFamily: 'Oswald-Bold',
                              }}>
                              Next
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </ImageBackground>
                    </View>
                  </View>
                </ScrollView>
              </ImageBackground>
            )}
          </View>
        </View>
      )}
    </>
  );
};

export default Instruction;
