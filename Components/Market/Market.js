import {
  View,
  Text,
  BackHandler,
  SafeAreaView,
  TextInput,
  Touchable,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import Evilicons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import moment from 'moment';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Themecontext from '../../Themecontext';
import SearchBar from 'react-native-dynamic-search-bar';

function Market() {
  const [value, setvalue] = useState([]);
  const [loading, setloding] = useState(true);
  const Theme = useContext(Themecontext);

  //nevigation
  const navigation = useNavigation();
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('News', {
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

  useEffect(() => {
    fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(response => {
        // console.log('response', response);
        setloding(false);
        setvalue(response);
      });
  }, []);
  // console.log(value);
  //nav color
  const [News, setnews] = useState(false);
  const [Game, setgame] = useState(true);
  const [Market, setmarket] = useState(true);
  const [User, setuser] = useState(true);
  //end
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

  return loading == true ? (
    <View>
      <Image
        style={{width: '100%', height: '80%', marginLeft: 5, marginTop: 90}}
        source={require('../../assets/Loding/gif.gif')}
      />
    </View>
  ) : (
    <View>
      <View style={{height: '100%'}}>
        <View>
          <SearchBar placeholder="Search Here" style={{marginTop: '3%'}} />
        </View>
        <ScrollView horizontal={true}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              height: 60,
              marginTop: '2%',
            }}>
            <TouchableOpacity>
              <Text
                style={{
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: '#FF3366',
                  padding: 6,
                  marginLeft: 15,
                  marginTop: 10,
                  textAlign: 'center',
                  height: 35,

                  color: Theme.color,
                }}>
                Watchlist
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: '#FF3366',
                  padding: 6,
                  marginLeft: 15,
                  marginTop: 10,
                  textAlign: 'center',
                  height: 35,

                  color: Theme.color,
                }}>
                All Coins
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: '#FF3366',
                  padding: 6,
                  marginLeft: 15,
                  marginTop: 10,
                  textAlign: 'center',
                  height: 35,

                  color: Theme.color,
                }}>
                Top Gainers(24H)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: '#FF3366',
                  padding: 6,
                  marginLeft: 15,
                  marginTop: 10,
                  textAlign: 'center',
                  height: 35,

                  color: Theme.color,
                }}>
                Top Loosers(24H)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: '#FF3366',
                  padding: 6,
                  marginLeft: 15,
                  marginTop: 10,
                  textAlign: 'center',
                  height: 35,

                  color: Theme.color,
                }}>
                Most Viewed
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <ScrollView>
          <View>
            {value.map(function (caaavalue) {
              return (
                <>
                  <View>
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        borderRadius: 8,
                        borderColor: Theme.color,
                        marginTop: '2%',
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          width: '90%',
                        }}>
                        <Image
                          source={{uri: caaavalue.image}}
                          style={{
                            width: 50,
                            height: 50,
                            borderWidth: 20,

                            borderRadius: 100,
                            marginTop: 9,
                            marginBottom: '2%',
                            marginLeft: '2%',
                            shadowOffset: {
                              width: 0,
                              height: 15,
                            },
                            shadowOpacity: 0.58,
                            shadowRadius: 16.0,
                            elevation: 5,
                            shadowColor: '#000',
                            borderColor: 'rgba(140, 90, 160, .01)',
                          }}
                        />
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'column',
                            marginLeft: '2%',
                          }}>
                          <Text style={{color: Theme.color, marginTop: '5%'}}>
                            {caaavalue.name}
                          </Text>
                          <Text
                            style={{
                              color: Theme.color,

                              fontSize: 20,
                            }}>
                            {caaavalue.symbol}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                          }}>
                          <Text
                            style={{
                              color: Theme.color,
                              fontSize: 20,
                              marginTop: '2%',
                            }}>
                            ${caaavalue.current_price}
                          </Text>
                          <Text style={{color: Theme.color}}>
                            {caaavalue.price_change_percentage_24h}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              );
            })}
          </View>
        </ScrollView>
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
              navigation.navigate('News');
              clickthevalue('News');
            }}>
            <Ionicons
              style={{marginLeft: '8%'}}
              name="newspaper-outline"
              size={30}
              // color="#FF3366"
              color="black"
            />
            <Text style={{color: 'black'}}>News</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Animation');
              clickthevalue('Game');
            }}>
            <Ionicons
              style={{marginLeft: '8%'}}
              name="game-controller-outline"
              size={30}
              // color="#FF3366"
              color="black"
            />
            <Text style={{color: 'black'}}>Game</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Market');
              clickthevalue('Market');
            }}>
            <Feather
              style={{marginLeft: '8%'}}
              name="bar-chart-2"
              size={33}
              // color="#FF3366"
              color="red"
            />
            <Text style={{color: 'black'}}>Market</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('User');
              clickthevalue('User');
            }}>
            <Evilicons
              name="user"
              size={43}
              // color="#FF3366"
              color="black"
            />
            <Text style={{color: 'black'}}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default Market;
