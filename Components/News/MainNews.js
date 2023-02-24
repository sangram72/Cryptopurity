import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  BackHandler,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useRef, useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import moment from 'moment';
import Themecontext from '../../Themecontext';
import Shared from '../Shared';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Popover from 'react-native-popover-view';
import {firebase} from '@react-native-firebase/firestore';
import supabase from '../Portfolio/Supabase';
const MainNews = ({route}) => {
  const Navigation = useNavigation();
  const [value, setvalue] = useState([]);
  const [condition, setcodition] = useState(false);
  const [point, setpoint] = useState(1);
  useEffect(() => {
    const backAction = () => {
      Navigation.navigate('News');

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  //console.log(route.params.paramkey5);

  const scrollRef = useRef();
  const onPress = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  //Dark theme
  const Theme = useContext(Themecontext);
  const [size, setsize] = useState(18);
  const [sizecon, setsizecon] = useState(true);

  function changethefontsize() {
    if (size < 22) {
      setsize(size + 2);
      setsizecon(false);
    } else {
      setsizecon(true);
      setsize(16);
    }
  }
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

      // console.log(user_have_total_token);
      const {data, error} = await supabase
        .from('Android_Auth')
        .update({Points: user_have_total_token + 1})

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
  // End update total_token in points table for userId

  // async function inserdata() {
  //   const {insertData, insertError} = await supabase
  //     .from('token')
  //     .insert({UID: firebase.auth().currentUser.uid, User_type: 'hello'});

  //   if (insertData) {
  //     console.log(insertData);
  //   }
  //   if (insertError) {
  //     console.log(insertError);
  //   }
  // }
  async function getthenewdata() {
    const {data, error} = await supabase.from('Point').insert({
      UID: firebase.auth().currentUser.uid,
      Points: point,
    });
    // alert('submmited');
    if (data) {
      // console.log(data);
    }
    if (error) {
      // console.log(error);
    }
  }
  async function getdata(res) {
    const {data1, error} = await supabase.from('Point').select();
    // console.log(data1);

    // .eq('ID', firebase.auth().currentUser.uid)
    // .single();
  }

  //reactiong supabase
  async function getTitle(res) {
    // alert(user.id)
    const userId = firebase.auth().currentUser.uid;
    const {data: latestIdData, error: latestIdError} = await supabase
      .from('transaction_detailes')
      .select()
      .eq('user_id', userId);

    if (latestIdError) {
      // console.log(latestIdError);
    }
    if (latestIdData) {
      //alert(latestIdData[0].title)
      // console.log(latestIdData);

      const select_latestIdData = [];
      if (latestIdData.length == 0) {
        const {data, error} = await supabase
          .from('transaction_detailes')
          .insert({
            points: 1,
            user_id: firebase.auth().currentUser.uid,
            title: res.title,
            //.eq('praduman','BTC miner Core Scientific receives a $37.4M bankruptcy financing with a temporary approval.')
          })
          .single();
        // getthedata();
        // alert('submitted');

        if (error) throw error;
      } else {
        const select_Array = [];
        for (let index = 0; index < latestIdData.length; index++) {
          select_Array.push(latestIdData[index].title);

          //const element = latestIdData[index];
        }
        if (select_Array.includes(res.title)) {
          alert('no points for this news');
        } else {
          const {data, error} = await supabase
            .from('transaction_detailes')
            .insert({
              points: 1,
              user_id: firebase.auth().currentUser.uid,
              title: res.title,
              //.eq('praduman','BTC miner Core Scientific receives a $37.4M bankruptcy financing with a temporary approval.')
            })
            .single();
          updatePoints();
          alert('congratulations you have get 1 point');

          if (error) throw error;
        }
      }
    }
  }
  //end

  return (
    <View>
      <ImageBackground
        style={{
          width: '100%',
          height: '100%',
        }}>
        <SafeAreaView>
          <ScrollView ref={scrollRef}>
            {condition == false ? (
              <>
                <View>
                  <TouchableOpacity onPress={getdata}>
                    <Text style={{color: 'black', marginTop: 10}}>hello</Text>
                  </TouchableOpacity>
                  <View style={{alignItems: 'flex-end', top: 20, left: -15}}>
                    <TouchableOpacity onPress={changethefontsize}>
                      <MaterialCommunityIcons
                        name="format-font-size-increase"
                        size={25}
                        color="#FF3366"
                      />
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={{
                      color: Theme.color,
                      fontSize: 17,
                      borderWidth: 1,
                      borderRadius: 25,
                      width: '20%',
                      textAlign: 'center',

                      left: 15,
                      backgroundColor: '#FF3366',
                      borderColor: 'rgba(135, 90, 160, .01)',
                    }}>
                    {route.params.paramkey6}
                  </Text>
                  <Text
                    style={{
                      marginTop: '1%',
                      fontSize: 29,
                      color: Theme.color,
                      padding: 15,
                      alignSelf: 'flex-start',
                      textAlign: 'left',
                      fontFamily: 'RobotoCondensed-Regular',
                    }}>
                    {route.params.pramkey}
                  </Text>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: 'rgba(135, 90, 160, .01)',
                      // borderColor: '#ffffff',
                      width: '94%',
                      marginTop: '-1%',
                      marginLeft: '3.5%',
                    }}>
                    <Text style={styles.Author}>
                      Author - {route.params.paramkey3}
                    </Text>
                    <Text style={styles.PublishedAt}>
                      Published - {route.params.paramkey4}
                    </Text>
                    <Text style={styles.Updatetime}>
                      Updatetime - {route.params.pramkey1}
                    </Text>
                  </View>
                  <View>
                    <Image
                      source={{uri: route.params.pramkeyimage}}
                      style={{
                        width: '95%',
                        height: 180,
                        marginLeft: '3%',
                        marginTop: '2%',
                        borderRadius: 5,
                      }}
                    />
                  </View>

                  {route.params.pramkey2.map(function (caaavalue) {
                    return (
                      <View
                        style={{
                          padding: 2,
                          textAlign: 'auto',
                          marginTop: '1%',
                          marginLeft: '3%',
                        }}>
                        <Text
                          style={
                            sizecon == true
                              ? {fontSize: 16, color: Theme.color}
                              : {fontSize: size, color: Theme.color}
                          }>
                          {caaavalue}
                        </Text>
                      </View>
                    );
                  })}
                  <Text
                    style={{
                      color: Theme.color,
                      marginTop: '2%',
                      marginLeft: '3%',
                      borderBottomWidth: 1,
                      borderColor: 'black',
                      width: '20%',
                    }}
                  />

                  <Text
                    style={{
                      borderBottomWidth: 1,
                      borderColor: '#c7c4c3',
                      marginTop: '2%',
                      width: '95%',
                      marginLeft: '3%',
                    }}></Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: Theme.color,
                      fontSize: 18,
                    }}>
                    What do you Think
                  </Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '90%',
                      marginLeft: '5%',
                      marginTop: '8%',
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        height: 30,
                        width: '100%',
                        borderWidth: 1,
                        justifyContent: 'space-evenly',
                        borderColor: 'rgba(135, 90, 160, .01)',
                      }}>
                      <View>
                        <TouchableOpacity
                          // onPress={() =>
                          //   getthenewdata({
                          //     title: route.params.pramkey,
                          //     UID: firebase.auth().currentUser.uid,
                          //   })
                          // }
                          onPress={() =>
                            getTitle({title: route.params.pramkey})
                          }>
                          <Image
                            style={{
                              height: 35,
                              width: 35,
                            }}
                            source={require('../../assets/Reaction/love.png')}
                          />
                          <Text
                            style={{color: Theme.color, textAlign: 'center'}}>
                            Love
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{}}>
                        <TouchableOpacity
                          onPress={() =>
                            getTitle({title: route.params.pramkey})
                          }>
                          <Image
                            style={{
                              height: 35,
                              width: 35,
                            }}
                            source={require('../../assets/Reaction/laugh.png')}
                          />
                          <Text
                            style={{color: Theme.color, textAlign: 'center'}}>
                            Haha
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View>
                        <TouchableOpacity
                          onPress={() =>
                            getTitle({title: route.params.pramkey})
                          }>
                          <Image
                            style={{
                              height: 35,
                              width: 35,
                            }}
                            source={require('../../assets/Reaction/strange.png')}
                          />
                          <Text
                            style={{color: Theme.color, textAlign: 'center'}}>
                            Angry
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View>
                        <TouchableOpacity>
                          <Image
                            style={{
                              height: 35,
                              width: 35,
                            }}
                            source={require('../../assets/Reaction/cry.png')}
                          />
                          <Text
                            style={{color: Theme.color, textAlign: 'center'}}>
                            Sad
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View>
                        <TouchableOpacity
                          onPress={() =>
                            getTitle({title: route.params.pramkey})
                          }>
                          <Image
                            style={{
                              height: 35,
                              width: 35,
                            }}
                            source={require('../../assets/Reaction/star.png')}
                          />
                          <Text
                            style={{color: Theme.color, textAlign: 'center'}}>
                            Happy
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View>
                        <TouchableOpacity
                          onPress={() =>
                            getTitle({title: route.params.pramkey})
                          }>
                          <Image
                            style={{
                              height: 35,
                              width: 35,
                            }}
                            source={require('../../assets/Reaction/wow.png')}
                          />
                          <Text
                            style={{color: Theme.color, textAlign: 'center'}}>
                            Shock
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View
                      style={{
                        marginTop: '25%',
                        marginLeft: '-7%',
                      }}>
                      <Shared />
                    </View>
                  </View>
                </View>
              </>
            ) : (
              <>
                <View>
                  <View style={{alignItems: 'flex-end', top: 20, left: -15}}>
                    <TouchableOpacity onPress={changethefontsize}>
                      <MaterialCommunityIcons
                        name="format-font-size-increase"
                        size={25}
                        color="#FF3366"
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      color: Theme.color,
                      fontSize: 17,
                      borderWidth: 1,
                      borderRadius: 25,
                      width: '20%',
                      textAlign: 'center',
                      marginTop: '-1%',
                      marginLeft: '3%',
                      backgroundColor: '#FF3366',
                      borderColor: 'rgba(135, 90, 160, .01)',
                      // borderColor: 'black',
                    }}>
                    {route.params.paramkey6}
                  </Text>
                  <Text
                    style={{
                      marginTop: '1%',
                      fontSize: 28,
                      color: Theme.color,
                      padding: 15,
                      alignSelf: 'flex-start',
                      textAlign: 'left',
                      fontFamily: 'RobotoCondensed-Regular',
                    }}>
                    {value.value}
                  </Text>

                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: 'rgba(135, 90, 160, .01)',
                      // borderColor: '#ffffff',

                      width: '94%',
                      marginLeft: '4%',
                      marginTop: '1%',
                    }}>
                    <Text style={styles.Authorr}>Author - {value.author}</Text>
                    <Text style={styles.PublishedAt}>
                      Published - {value.publishedAt}
                    </Text>
                    <Text style={styles.Updatetime}>
                      Updatetime - {value._updatedAt}
                    </Text>
                  </View>
                  <View>
                    <Image
                      source={{uri: value.image}}
                      style={{
                        width: '95%',
                        height: 180,
                        marginLeft: '3%',
                        marginTop: '2.5%',
                        borderRadius: 5,
                      }}
                    />
                  </View>
                  {value.databody.map(function (caaavalue) {
                    return (
                      <View
                        style={{
                          padding: 2,
                          textAlign: 'auto',
                          marginTop: '1%',
                          marginLeft: '3%',
                        }}>
                        <Text
                          style={
                            sizecon == true
                              ? {fontSize: 16, color: Theme.color}
                              : {fontSize: size, color: Theme.color}
                          }>
                          {caaavalue}
                        </Text>
                      </View>
                    );
                  })}
                  <View>
                    <Text
                      style={{
                        color: Theme.color,
                        marginTop: '2%',
                        marginLeft: '3%',
                        borderBottomWidth: 1,
                        borderColor: 'black',
                        width: '20%',
                      }}
                    />

                    <Text
                      style={{
                        borderBottomWidth: 1,
                        borderColor: '#c7c4c3',
                        marginTop: '2%',
                        width: '95%',
                        marginLeft: '3%',
                      }}></Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: Theme.color,
                        fontSize: 18,
                      }}>
                      What do you Think
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '90%',
                      marginLeft: '5%',
                      marginTop: '8%',
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        height: 30,
                        width: '100%',
                        borderWidth: 1,
                        justifyContent: 'space-evenly',
                        borderColor: 'rgba(135, 90, 160, .01)',
                      }}>
                      <View>
                        <TouchableOpacity
                          // onPress={() =>
                          //   getthenewdata({
                          //     title: route.params.pramkey,
                          //     UID: firebase.auth().currentUser.uid,
                          //   })
                          // }
                          onPress={() => getTitle({title: value.value})}>
                          <Image
                            style={{
                              height: 35,
                              width: 35,
                            }}
                            source={require('../../assets/Reaction/love.png')}
                          />
                          <Text
                            style={{color: Theme.color, textAlign: 'center'}}>
                            Love
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{}}>
                        <TouchableOpacity
                          onPress={() => getTitle({title: value.value})}>
                          <Image
                            style={{
                              height: 35,
                              width: 35,
                            }}
                            source={require('../../assets/Reaction/laugh.png')}
                          />
                          <Text
                            style={{color: Theme.color, textAlign: 'center'}}>
                            Haha
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View>
                        <TouchableOpacity
                          onPress={() => getTitle({title: value.value})}>
                          <Image
                            style={{
                              height: 35,
                              width: 35,
                            }}
                            source={require('../../assets/Reaction/strange.png')}
                          />
                          <Text
                            style={{color: Theme.color, textAlign: 'center'}}>
                            Angry
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View>
                        <TouchableOpacity
                          onPress={() => getTitle({title: value.value})}>
                          <Image
                            style={{
                              height: 35,
                              width: 35,
                            }}
                            source={require('../../assets/Reaction/cry.png')}
                          />
                          <Text
                            style={{color: Theme.color, textAlign: 'center'}}>
                            Sad
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View>
                        <TouchableOpacity
                          onPress={() => getTitle({title: value.value})}>
                          <Image
                            style={{
                              height: 35,
                              width: 35,
                            }}
                            source={require('../../assets/Reaction/star.png')}
                          />
                          <Text
                            style={{color: Theme.color, textAlign: 'center'}}>
                            Happy
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View>
                        <TouchableOpacity
                          onPress={() => getTitle({title: value.value})}>
                          <Image
                            style={{
                              height: 35,
                              width: 35,
                            }}
                            source={require('../../assets/Reaction/wow.png')}
                          />
                          <Text
                            style={{color: Theme.color, textAlign: 'center'}}>
                            Shock
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={{marginTop: '25%', marginLeft: '-7%'}}>
                      <Shared />
                    </View>
                  </View>
                </View>
              </>
            )}
            <View>
              <Text
                style={{
                  fontSize: 20,
                  color: Theme.color,
                  marginLeft: '2%',
                  marginTop: '2%',
                  borderBottomWidth: 1,
                  borderColor: Theme.color,
                  width: '96%',
                }}>
                Related News
              </Text>
            </View>

            <View>
              {route.params.paramkey5.map(function (caaavalue) {
                return (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        setvalue({
                          value: caaavalue.title,
                          image: caaavalue.mainImage.asset.url,
                          _updatedAt: moment(caaavalue._updatedAt).format(
                            'LLL',
                          ),
                          publishedAt: moment(caaavalue.publishedAt).format(
                            'LLL',
                          ),
                          author: caaavalue.author.name,

                          databody: caaavalue.body.map(function (caavalue) {
                            return <Text>{caavalue.children[0].text}</Text>;
                          }),
                        }),
                          setcodition(true),
                          onPress();
                      }}>
                      <View
                        style={{
                          disply: 'flex',
                          padding: 5,
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            disply: 'flex',
                            flexDirection: 'row',

                            justifyContent: 'space-between',
                          }}>
                          <Image
                            style={{width: '27%', height: 60, borderRadius: 5}}
                            source={{uri: caaavalue.mainImage.asset.url}}
                          />
                          <Text
                            style={{
                              width: '72%',
                              fontWeight: 'bold',
                              color: Theme.color,
                              borderWidth: 1,
                              height: '54%',
                              borderColor: 'rgba(135, 90, 160, .01)',
                              // borderColor: 'black',
                            }}>
                            {caaavalue.title}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </>
                );
              })}
            </View>

            <View>
              <Text
                style={{
                  borderBottomWidth: 1,
                  borderColor: Theme.color,
                  marginTop: 20,
                }}></Text>
              <Text style={{textAlign: 'center', color: Theme.color}}>
                © Copyright 2022, All Rights Reserved | Powered By Metavy
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default MainNews;

const styles = StyleSheet.create({
  Title: {},

  Updatetime: {
    marginTop: '2%',
    fontSize: 10,
    textAlign: 'justify',
    color: '#FF3366',
  },
  PublishedAt: {
    fontSize: 10,
    textAlign: 'justify',
    color: '#FF3366',
    top: 10,
  },

  Author: {
    top: '70%',
    fontSize: 10,
    textAlign: 'right',
    color: '#FF3366',
  },
  Authorr: {
    top: '75%',
    fontSize: 10,
    textAlign: 'right',
    color: '#FF3366',
  },
  Abcd: {
    color: 'red',
  },
});
