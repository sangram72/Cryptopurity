import {
  View,
  Text,
  Dimensions,
  Animated,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  TextInput,
  ScrollView,
  BackHandler,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {useRef, useEffect, useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Themecontext from '../../Themecontext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SearchBar from 'react-native-dynamic-search-bar';
import Swiper from 'react-native-swiper';
import {firebase} from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import supabase from '../Portfolio/Supabase';
import {useBackHandler} from '@react-native-community/hooks';

// const Data = [
//   require('../../assets/GameFont/bgg.png'),
//   require('../../assets/bgg.png'),
//   require('../../assets/bgg.png'),
//   require('../../assets/bgg.png'),
// ];
// const {width, height} = Dimensions.get('screen');
// const ITEM_WIDTH = width * 0.7;
// const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

const Animation = props => {
  // get data
  const [firstname, setfirstname] = useState({});
  const [animationvalue, setanimationvalue] = useState([]);
  const [loading, setloading] = useState(true);
  const [points, setpoints] = useState();

  const todoRef = firebase.firestore().collection('Userinfo');
  useEffect(async () => {
    todoRef
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          setfirstname(snapshot.data());
        }
      });
  }, []);
  // end
  useEffect(() => {
    const updatePoints = async () => {
      const userId = firebase.auth().currentUser.uid;
      const {data: data1, error: error1} = await supabase
        .from('Android_Auth')
        .select('Points')
        .eq('UID', userId);

      if (error1) {
        //console.log('Could not fetch data from the table  ');
        //setQuizzes(null)
      }
      if (data1) {
        //setQuizzes(data)
        // alert(data1);
        // console.log('data1', data1);
        setpoints(data1[0].Points);
      }
    };
    updatePoints();
  }, []);
  const Navigation = useNavigation();
  useEffect(() => {
    const backAction = () => {
      Navigation.navigate('News', {
        paramkey: 'false',
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  //backhandelar
  // function Backactionhandler() {
  //   Alert.alert('', 'are you sure to exit the app', [
  //     {
  //       text: 'no',
  //       onPress: () => null,
  //       style: 'cancel',
  //     },
  //     {
  //       text: 'yes',
  //       onPress: () =>
  //         Navigation.navigate('News', {
  //           paramkey: 'false',
  //         }),

  //       style: 'cancel',
  //     },
  //   ]);
  //   return true;
  // }
  // useBackHandler(Backactionhandler);
  const Theme = useContext(Themecontext);

  const scrollX = useRef(new Animated.Value(0)).current;
  // const [coin, setcoin] = useState(200);
  // function getthevalue() {
  //   if (coin >= 20) {
  //     setcoin(coin - 20);
  //     Navigation.navigate('Instruction');
  //   } else {
  //     alert('you have no enough coins');
  //   }
  // }

  //Api
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
        setanimationvalue(gettheanimationvalue(response.result));
        setloading(false);
      });
  }, []);
  //end
  //api Fuction
  function gettheanimationvalue(res) {
    const arr2 = res.filter(function (caaavalue) {
      return caaavalue.categories[0] == 'Animation';
    });
    return arr2;
  }
  //end
  function chagetheanimationvalue(index) {
    if (index == 0) {
      Navigation.navigate('Instruction');
    }
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
        <View style={{height: '100%'}}>
          <View
            style={{display: 'flex', flexDirection: 'row', marginTop: '2%'}}>
            <View
              style={{
                borderWidth: 1,
                width: '97%',
                marginLeft: '2%',
                display: 'flex',
                flexDirection: 'row',
                borderColor: 'rgba(140, 90, 160, .01)',
              }}>
              <View
                style={{
                  borderWidth: 1,
                  width: '60%',
                  display: 'flex',
                  flexDirection: 'row',
                  borderColor: 'rgba(140, 90, 160, .01)',
                }}>
                <Image
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 30,
                    marginLeft: '2%',
                  }}
                  source={{uri: firstname.imageurl}}
                />
                <View
                  style={{
                    borderWidth: 1,
                    width: '73%',
                    display: 'flex',
                    alignItems: 'center',
                    borderColor: 'rgba(140, 90, 160, .01)',
                  }}>
                  <Text style={{color: Theme.color}}>Hello...</Text>
                  <TouchableOpacity onPress={() => Navigation.navigate('User')}>
                    <Text
                      style={{
                        color: Theme.color,
                        fontSize: 18,
                        fontFamily: 'RobotoCondensed-Regular',
                      }}>
                      {firstname.firstname}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  height: 40,
                  width: '40%',
                  alignItems: 'center',
                  borderColor: 'rgba(140, 90, 160, .01)',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    style={{height: 30, width: 30, borderRadius: 30}}
                    source={require('../../assets/Game/coin.png')}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: '1%',
                      marginLeft: '8%',
                    }}>
                    <Text style={{color: Theme.color, fontSize: 18}}>
                      {points}
                    </Text>
                    <Text
                      style={{
                        color: Theme.color,
                        fontSize: 18,
                        marginLeft: '10%',
                        fontFamily: 'RobotoCondensed-Regular',
                      }}>
                      CP
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View>
            <View>
              <KeyboardAvoidingView>
                <SearchBar
                  placeholder="Search Here"
                  style={{marginTop: '5%'}}
                />
              </KeyboardAvoidingView>
            </View>
          </View>
          <View>
            <View style={{height: '90%'}}>
              <Swiper style={styles.wrapper} showsButtons={false}>
                {animationvalue.map(function (caaavalue, index) {
                  return (
                    <>
                      <View style={{alignItems: 'center'}}>
                        <View
                          style={{
                            borderWidth: 1,
                            height: '90%',
                            width: '80%',
                            borderColor: 'rgba(140, 90, 160, .01)',
                          }}>
                          <View style={{alignItems: 'center'}}>
                            <View
                              style={{
                                borderWidth: 1,
                                alignItems: 'center',

                                // borderColor: 'red',
                                borderColor: 'rgba(140, 90, 160, .01)',
                              }}>
                              <Text
                                style={{
                                  fontSize: 40,
                                  fontFamily: 'Game On_PersonalUseOnly',
                                  color: 'black',
                                }}>
                                {caaavalue.title}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              shadowOffset: {
                                width: 0,
                                height: 15,
                              },
                              shadowOpacity: 0.58,
                              shadowRadius: 16.0,
                              elevation: 5,
                              shadowColor: '#000',
                              borderRadius: 20,
                              borderWidth: 1,
                              borderColor: 'rgba(140, 90, 160, .01)',
                            }}>
                            <TouchableOpacity
                              onPress={() => chagetheanimationvalue(index)}>
                              <View style={{display: 'flex', paddingTop: 20}}>
                                <ImageBackground
                                  source={{uri: caaavalue.mainImage.asset.url}}
                                  style={{
                                    height: '97%',
                                    borderRadius: 10,
                                  }}>
                                  <View
                                    style={{
                                      alignItems: 'center',
                                    }}>
                                    <View
                                      style={{
                                        borderWidth: 1,
                                        alignItems: 'center',
                                        height: '35%',
                                        width: '75%',
                                        borderColor: 'red',
                                        borderColor: 'rgba(140, 90, 160, .01)',
                                        marginTop: '70%',
                                      }}>
                                      <Text
                                        style={{
                                          textAlign: 'center',
                                          color: 'black',
                                          fontSize: 18,
                                          // fontFamily: 'Game On_PersonalUseOnly',
                                          fontFamily: 'RobotoCondensed-Regular',
                                        }}>
                                        {caaavalue.body[0].children[0].text}
                                      </Text>
                                    </View>
                                  </View>
                                  <View style={{alignItems: 'center'}}>
                                    <View
                                      style={{
                                        borderWidth: 2,
                                        alignItems: 'center',
                                        height: '30%',
                                        width: '50%',
                                        borderColor: 'red',
                                        borderRadius: 10,
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 30,
                                          fontFamily: 'Game On_PersonalUseOnly',
                                          color: Theme.color,
                                        }}>
                                        Play
                                      </Text>
                                    </View>
                                  </View>
                                </ImageBackground>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </>
                  );
                })}
              </Swiper>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default Animation;
const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
