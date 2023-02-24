import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  BackHandler,
  Alert,
  RefreshControl,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useState, useEffect, useRef, useContext} from 'react';
import supabase from '../Portfolio/Supabase';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Evilicons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {firebase} from '@react-native-firebase/firestore';
import imageUrlBuilder from '@sanity/image-url';
import client from '../../SanityClient';
import {useNavigation} from '@react-navigation/native';
import MenuDrawer from 'react-native-side-drawer';
// import Popover from 'react-native-popover-view/dist/Popover';categories
import Popover from 'react-native-popover-view/dist/Popover';
import Themecontext from '../../Themecontext';

import {
  SelectList,
  MultipleSelectList,
} from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import SearchBar from 'react-native-dynamic-search-bar';

function News({route}) {
  const [selected, setSelected] = useState('');
  const [categories, setCategories] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [filtervalue, setFiltervalue] = useState([]);
  const [states, setState] = useState(false);

  const builder = imageUrlBuilder(client);
  const [value, setvalue] = useState([]);
  const [images, setimages] = useState();
  const [publish, setpublish] = useState();
  const [updated, setupdated] = useState();
  const [like, setLike] = useState([]);
  const [reloding, setreloding] = useState(false);
  const [loading, setloading] = useState(true);
  const [rendername, setrendername] = useState();
  const [defaultnewsname, setdefaultnewsname] = useState(false);
  const [showvalue, setshowvalue] = useState(false);
  const [filtarcatagory, setfiltercatagory] = useState([]);
  const [makearr, setmakearr] = useState([]);
  const [mainarr, setmainarr] = useState([]);
  const [datefilter, setdatefilter] = useState([]);
  const [title, settitle] = useState();
  const Navigation = useNavigation();

  // const [Newsid,setNewsid]= useState()
  const todoRef = firebase.firestore().collection('News');

  const addField = async () => {
    let id = uuid.v4();
    const userid = await AsyncStorage.getItem('USERID');
    if (id === userid) {
      // //console.log('News Already Created');
    } else {
      const data = {
        newsid: id,
        likes: like,
        userid: userid,
      };
      // //console.log(userid);

      const timestamp = firebase.firestore.FieldValue.serverTimestamp();

      todoRef
        .doc(id)
        .set(data)
        .then(() => {
          // //console.log('News added');
        });
    }
  };

  const getuserid = async () => {
    userid = await AsyncStorage.getItem('USERID');
  };
  const getlikestatus = like => {
    let status = false;
    like.map(item => {
      if (item === userid) {
        status = true;
      } else {
        status = false;
      }
    });
    return status;
  };
  //nav

  useEffect(() => {
    function changethenewthevalue() {
      if (route.params == undefined) {
        //console.log('hello');
      } else if (route.params.paramkey == 'false') {
        setnews(false);
        setgame(true);
        setuser(true);
        setmarket(true);
        route.params.paramkey == null;
        //console.log(route.params.paramkey);
      }
    }
    changethenewthevalue();
  }, [route]);

  //end
  // hamburger menu

  const [urls, seturls] = useState();
  const [filter, setfilter] = useState([]);
  //nav color
  const [News, setnews] = useState(false);
  const [Game, setgame] = useState(true);
  const [Market, setmarket] = useState(true);
  const [User, setuser] = useState(true);
  //end

  // function Fetchdata() {
  //   fetch(
  //     'https://q9xfz7x1.api.sanity.io/v2021-03-25/data/query/production?query=*%5B_type%20%3D%3D%20%22post%22%5D%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20slug%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20body%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20author%20-%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20name%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22authorImage%22%3A%20image.asset-%3Eurl%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20mainImage%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20asset%20-%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20_id%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20publishedAt%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20_updatedAt%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22categories%22%3A%20categories%5B%5D-%3Etitle%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D',
  //     {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json',
  //       },
  //     },
  //   )
  //     .then(response => response.json())
  //     .then(response => {
  //       // //console.log('response', response);
  //       // setvalue(response.result[0].body[0].children[0].Text)
  //       // //console.log(response.result);
  //       setvalue(response.result);
  //       setFiltervalue(response.result);
  //       setfiltercatagory(response.result);
  //       setloading(false);
  //       // setfilter([
  //       //   response.result[0],
  //       //   response.result[1],
  //       //   response.result[2],
  //       //   response.result[3],
  //       //   response.result[4],
  //       //   response.result[5],
  //       // ]);
  //       setfilter([
  //         filterthevalue(response.result)[0],
  //         filterthevalue(response.result)[1],
  //         filterthevalue(response.result)[2],
  //         filterthevalue(response.result)[3],
  //       ]);
  //       setmainarr(gettheallthevalue(response.result));
  //       setdatefilter(filterthevalue(response.result));
  //     });
  // }

  // useEffect(() => {
  //   Fetchdata();
  // }, []);

  //supabase news
  useEffect(() => {
    async function getthedata() {
      const {data, error} = await supabase.from('news_table').select('content');
      if (data) {
        //console.log(data[0].content.result);
        //console.log('miniresult', data[0].content.result[0]);
        // setvalue(data[0].content.result);
        setvalue(data[0].content.result);
        setFiltervalue(data[0].content.result);
        setfiltercatagory(data[0].content.result);
        setloading(false);
        setfilter([
          filterthevalue(data[0].content.result)[0],
          filterthevalue(data[0].content.result)[1],
          filterthevalue(data[0].content.result)[2],
          filterthevalue(data[0].content.result)[3],
        ]);
        setmainarr(gettheallthevalue(data[0].content.result));
        setdatefilter(filterthevalue(data[0].content.result));
      }
    }
    getthedata();
    //end

    // async function inserdata() {
    //users insert
    // const {data: insertData, error: insertError} = await supabase
    //   .from('Users')
    //   .insert({UID: 'Sanj', Full_name: 'hello'});
    // if (insertData) {
    //   //console.log(data[0].content.result);
    //   setvalue(data[0].content.result);
    // }
    // if (insertError) {
    //   //console.log(insertError);
    // }
    // }
    // inserdata();
  }, []);
  // //console.log('value', value);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Do you want to exit ?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const toggleOpen = () => {
    if (states == true) {
      setState(false);
    } else setState(true);
  };

  //for scroll view any position to top
  const scrollRef = useRef();
  const onPress = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  function changethedata6(catagoryvalue) {
    const arr6 = filtervalue.filter(function (caaavalue) {
      return caaavalue;
    });
    setdatefilter(arr6);
    setrendername(catagoryvalue);
    setdefaultnewsname(true);
  }
  function changethedata(catagoryvalue) {
    const arr2 = filtervalue.filter(function (caaavalue) {
      return caaavalue.categories == catagoryvalue;
    });
    setdatefilter(arr2);
    toggleOpen();
    setrendername(catagoryvalue);
    setdefaultnewsname(true);
  }

  function datavaluechange(value) {
    setshowvalue(true);
    const options = value.toLowerCase();
    const arr3 = filtervalue.filter(function (caaavalue) {
      if (caaavalue.title.toLowerCase().includes(options)) {
        return caaavalue.title.toLowerCase().includes(options);
      } else if (caaavalue.categories[0].toLowerCase().includes(options)) {
        return caaavalue.categories[0].toLowerCase().includes(options);
      }
      // return caaavalue.title.toLowerCase().includes(options)
    });
    setdatefilter(arr3);
    if (value == '') {
      setshowvalue(false);
    }
  }
  const Theme = useContext(Themecontext);

  //category
  function gettheallthevalue(res) {
    const arr2 = res.map(function (caaavalue) {
      return caaavalue.categories[0];
    });
    // setmakearr(arr2);
    const arr3 = arr2.filter(function (caaavalue, index) {
      return arr2.indexOf(caaavalue) === index;
    });
    // setmainarr(arr3);
    return arr3;
  }

  function filterthevalue(res) {
    const arr3 = res.sort(function (a, b) {
      return new Date(moment(b.publishedAt)) - new Date(moment(a.publishedAt));
    });
    return arr3;

    // const arr = [
    //   '2022-12-27T09:56:46Z',
    //   '2023-01-12T10:01:54Z',
    //   '2023-01-27T05:35:51Z',
    //   '2023-01-11T05:30:16Z',
    //   '2023-01-13T04:48:00.000Z',
    // ];

    // //console.log('newdate', arr.sort(function(a,b){
    //   return new Date( moment(b))-new Date(moment(a))
    // }));
  }
  // //console.log('datefilter', datefilter);
  //nav color
  function clickthevalue(res) {
    if (res == 'News') {
      setnews(false);
      setgame(true);
      setmarket(true);
      setuser(true);
    }
    if (res == 'Game') {
      setgame(false);
      setnews(true);
      setmarket(true);
      setuser(true);
    }
    if (res == 'Market') {
      setmarket(false);
      setgame(true);
      setnews(true);
      setuser(true);
    }
    if (res == 'User') {
      setuser(false);
      setmarket(true);
      setgame(true);
      setnews(true);
    }
  }
  //end

  return (
    <>
      {loading == true ? (
        <View>
          <Image
            style={{
              width: '100%',
              height: '80%',
              marginLeft: '2%',
              marginTop: '20%',
            }}
            source={require('../../assets/Loding/gif.gif')}
          />
        </View>
      ) : (
        <View>
          <View style={{height: '100%'}}>
            <ImageBackground>
              <Image
                style={{height: 35, width: 140, marginLeft: '3%'}}
                source={require('../../assets/News/logo1.png')}></Image>

              <View>
                <SearchBar
                  placeholder="Search Here"
                  onChangeText={datavaluechange}
                  onClearPress={() => datavaluechange('')}
                  style={{marginTop: '2.5%'}}
                />
              </View>

              <View
                style={{
                  borderRadius: 8,
                  marginTop: '1%',
                  marginLeft: '-5%',
                }}>
                <ScrollView horizontal={true}>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      height: 60,
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginLeft: 20,
                        marginTop: '2%',
                      }}>
                      <TouchableOpacity
                        onPress={() => changethedata6('All News')}>
                        <Text
                          style={{
                            textAlign: 'center',
                            height: 35,
                            width: 100,
                            color: Theme.color,
                            fontSize: 16,

                            fontFamily: 'RobotoCondensed-Light',
                          }}>
                          All News
                        </Text>
                      </TouchableOpacity>
                      {mainarr.map(function (caaavalue, id) {
                        return (
                          <TouchableOpacity
                            TouchableOpacity
                            onPress={() => {
                              changethedata(caaavalue);
                            }}
                            key={id}>
                            <Text
                              style={{
                                borderColor: '#FF3366',

                                textAlign: 'center',
                                height: 35,
                                width: 100,
                                color: Theme.color,
                                fontSize: 16,
                                fontFamily: 'RobotoCondensed-Light',
                              }}>
                              {caaavalue}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                </ScrollView>
              </View>
              <ScrollView
                // refreshControl={
                //   <RefreshControl
                //     refreshing={reloding}
                //     onRefresh={() => Fetchdata()}
                //   />
                // }
                ref={scrollRef}>
                {showvalue == false ? (
                  <Text
                    style={{
                      color: '#FF3366',
                      left: 19,
                      fontSize: 17,
                      fontWeight: 'bold',
                      fontFamily: 'RobotoCondensed-Regular',
                    }}>
                    Top News
                  </Text>
                ) : null}
                <View style={{padding: 3}}>
                  {showvalue == false ? (
                    <ScrollView horizontal={true}>
                      {filter.map(function (caaavalue, index) {
                        return (
                          <TouchableOpacity
                            onPress={() =>
                              Navigation.navigate('MainNews', {
                                pramkey: caaavalue.title,
                                pramkey1: moment(caaavalue._updatedAt).format(
                                  'LL',
                                ),
                                pramkeyimage: caaavalue.mainImage.asset.url,
                                pramkey2: caaavalue.body.map(function (
                                  caavalue,
                                ) {
                                  return (
                                    <Text>{caavalue.children[0].text}</Text>
                                  );
                                }),
                                paramkey6: caaavalue.categories,
                                paramkey3: caaavalue.author.name,
                                paramkey4: moment(caaavalue.publishedAt).format(
                                  'LL',
                                ),
                                paramkey5: filtervalue.filter(function (
                                  caavalue,
                                ) {
                                  return (
                                    caavalue.categories ==
                                    caaavalue.categories[0]
                                  );
                                }),
                              })
                            }>
                            <View
                              style={{
                                padding: 10,
                              }}
                              key={index}>
                              <View
                                style={{
                                  borderWidth: 1,
                                  height: 250,
                                  borderColor: 'rgba(140, 90, 160, .01)',
                                }}>
                                <Image
                                  source={{uri: caaavalue.mainImage.asset.url}}
                                  style={{
                                    width: 300,
                                    height: 180,
                                    borderRadius: 10,
                                  }}
                                />
                                <Text
                                  style={{
                                    color: Theme.color,
                                    fontSize: 17,
                                    borderWidth: 1,
                                    height: 68,
                                    width: 300,
                                    borderColor: 'rgba(140, 90, 160, .01)',
                                    // borderColor: 'black',
                                    fontFamily: 'RobotoCondensed-Regular',
                                  }}>
                                  {caaavalue.title}
                                </Text>
                                <Text
                                  style={{
                                    color: Theme.color,
                                    left: 5,
                                    top: -238,
                                    borderWidth: 1,
                                    width: 80,
                                    textAlign: 'center',
                                    borderRadius: 250,
                                    backgroundColor: '#FF3366',
                                    borderColor: 'rgba(140, 90, 160, .01)',
                                  }}>
                                  {caaavalue.categories}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  ) : null}
                </View>
                <View>
                  <View
                    style={{
                      borderWidth: 1,
                      height: 30,
                      width: '50%',
                      marginLeft: '3%',
                      borderColor: 'rgba(140, 90, 160, .01)',
                    }}>
                    <Text
                      style={{
                        color: '#FF3366',
                        fontSize: 17,
                        fontWeight: 'bold',
                      }}>
                      {defaultnewsname == false ? (
                        <Text style={{fontFamily: 'RobotoCondensed-Regular'}}>
                          All News.
                        </Text>
                      ) : (
                        <Text style={{fontFamily: 'RobotoCondensed-Regular'}}>
                          {rendername}
                        </Text>
                      )}
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={{marginTop: '53%'}}>
                    {datefilter.map(function (caaavalue, index) {
                      return (
                        <View key={index}>
                          <View
                            style={{marginBottom: '56%', marginTop: '-52%'}}>
                            <TouchableOpacity
                              onPress={() =>
                                Navigation.navigate('MainNews', {
                                  pramkey: caaavalue.title,
                                  pramkey1: moment(caaavalue._updatedAt).format(
                                    'LL',
                                  ),
                                  pramkeyimage: caaavalue.mainImage.asset.url,
                                  pramkey2: caaavalue.body.map(function (
                                    caavalue,
                                  ) {
                                    return (
                                      <Text>{caavalue.children[0].text}</Text>
                                    );
                                  }),
                                  paramkey3: caaavalue.author.name,
                                  paramkey6: caaavalue.categories,
                                  paramkey4: moment(
                                    caaavalue.publishedAt,
                                  ).format('LL'),
                                  paramkey5: filtervalue.filter(function (
                                    caavalue,
                                  ) {
                                    return (
                                      caavalue.categories ==
                                      caaavalue.categories[0]
                                    );
                                  }),
                                })
                              }>
                              <View>
                                <View>
                                  <View style={{alignItems: 'center'}}>
                                    <View
                                      style={{
                                        borderWidth: 1,
                                        width: '98%',
                                        height: 80,
                                        borderColor: 'rgba(140, 90, 160, .01)',
                                      }}>
                                      <View
                                        style={{
                                          borderWidth: 1,
                                          display: 'flex',
                                          flexDirection: 'row',
                                          borderColor:
                                            'rgba(140, 90, 160, .01)',
                                        }}>
                                        <Image
                                          source={{
                                            uri: caaavalue.mainImage.asset.url,
                                          }}
                                          style={{
                                            width: '35%',
                                            height: 75,
                                            borderRadius: 5,
                                          }}
                                        />
                                        <View
                                          style={{
                                            borderWidth: 1,
                                            width: '65%',
                                            height: 45,
                                            borderColor:
                                              'rgba(140, 90, 160, .01)',
                                          }}>
                                          <Text
                                            style={{
                                              fontSize: 15,
                                              color: Theme.color,
                                              height: 43,
                                              fontFamily:
                                                'RobotoCondensed-Regular',
                                            }}>
                                            {caaavalue.title}
                                          </Text>
                                        </View>
                                      </View>
                                      <View
                                        style={{
                                          display: 'flex',
                                          alignItems: 'flex-end',
                                        }}>
                                        <View
                                          style={{
                                            borderWidth: 1,
                                            width: '40%',
                                            height: 29,
                                            marginTop: '-8%',
                                            borderColor:
                                              'rgba(140, 90, 160, .01)',
                                          }}>
                                          <Text
                                            style={{
                                              fontSize: 10,
                                              color: '#FF3366',
                                              textAlign: 'right',
                                            }}>
                                            {caaavalue.author.name}
                                          </Text>

                                          <Text
                                            style={{
                                              fontSize: 10,
                                              color: '#FF3366',
                                              textAlign: 'right',
                                            }}>
                                            <Evilicons
                                              name="clock"
                                              size={15}
                                              color="red"
                                            />
                                            {moment(
                                              caaavalue._updatedAt,
                                            ).format('LL')}
                                          </Text>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                              </View>
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'space-around',
                                }}>
                                <TouchableOpacity
                                  style={{
                                    flexDirection: 'row',
                                    marginRight: '90%',
                                  }}
                                  onPress={addField}></TouchableOpacity>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </ScrollView>
            </ImageBackground>
          </View>
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
            }}>
            <View
              style={{
                backgroundColor: '#ffffff',
                flexDirection: 'row',
                width: '100%',
                borderWidth: 1,
                borderColor: 'rgba(140, 90, 160, .01)',
                justifyContent: 'space-between',
                height: 54,
                paddingLeft: 20,
                paddingRight: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  Navigation.navigate('News');
                  clickthevalue('News');
                }}>
                <Ionicons
                  style={{marginLeft: '8%'}}
                  name="newspaper-outline"
                  size={30}
                  // color="#FF3366"
                  color={News == true ? 'black' : 'red'}
                />
                <Text style={{color: 'black'}}>News</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  Navigation.navigate('Animation');
                  clickthevalue('Game');
                }}>
                <Ionicons
                  style={{marginLeft: '8%'}}
                  name="game-controller-outline"
                  size={30}
                  // color="#FF3366"
                  color={Game == true ? 'black' : 'red'}
                />
                <Text style={{color: 'black'}}>Game</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  Navigation.navigate('Market');
                  clickthevalue('Market');
                }}>
                <Feather
                  style={{marginLeft: '8%'}}
                  name="bar-chart-2"
                  size={33}
                  // color="#FF3366"
                  color={Market == true ? 'black' : 'red'}
                />
                <Text style={{color: 'black'}}>Market</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  Navigation.navigate('User');
                  clickthevalue('User');
                }}>
                <Evilicons
                  name="user"
                  size={43}
                  // color="#FF3366"
                  color={User == true ? 'black' : 'red'}
                />
                <Text style={{color: 'black'}}>Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
}
export default News;
const styles = StyleSheet.create({
  Container: {
    marginBottom: '25%',
    marginTop: '-27%',
  },

  newsContainer: {
    padding: 1,
    color: 'black',
    shadowOpacity: 0.5,
    shadowColor: '#000',
    // backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'black',
    height: 100,
  },

  date: {
    fontSize: 9,
    color: '#FF3366',
    textAlign: 'right',
    top: '-40%',
    left: -10,
  },
});
