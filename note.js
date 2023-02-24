import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StyleSheet,
  ImageBackground,
  TextInput,
  ScrollView,
  BackHandler,
} from 'react-native';
import React, {useEffect, useContext} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import Themecontext from '../../Themecontext';
import SearchBar from 'react-native-dynamic-search-bar';

const Animation = props => {
  const Navigation = useNavigation();
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
  const Theme = useContext(Themecontext);

  return (
    <View style={{marginBottom: '-40%'}}>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'rgba(140, 90, 160, .01)',
          width: '27%',
          height: 35,
          marginLeft: '72%',
          marginTop: '1%',
          top: 10,
          borderRadius: 30,
          // backgroundColor: '#FF3366',
        }}>
        <Image
          style={{
            width: '25%',
            height: 30.9,
            marginTop: 1,
          }}
          source={require('../../assets/Game/coin.png')}
        />
        <Text
          style={{
            color: Theme.color,
            textAlign: 'right',
            top: -31,
            fontSize: 22,
            left: -5,
          }}>
          100 CP
        </Text>
      </View>

      <View>
        <Text
          style={{
            color: Theme.color,
            left: 70,
            fontSize: 15,
            padding: 5,
            top: -25,
          }}>
          Hello...
        </Text>
        <TouchableOpacity onPress={() => Navigation.navigate('User')}>
          <Text
            style={{
              color: Theme.color,
              left: 70,
              top: -30,
              padding: 4,
              fontSize: 20,
            }}>
            User Name
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Navigation.navigate('User')}>
          <Image
            style={{height: 60, width: 60, top: -88, left: 7}}
            source={require('../../assets/User/user1.png')}
          />
        </TouchableOpacity>
        <View>
          <SearchBar placeholder="Search Here" style={{top: -69}} />
        </View>
        <View style={{marginTop: -45}}>
          <ScrollView horizontal={true}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                height: 60,
              }}>
              <TouchableOpacity
                onPress={() => Navigation.navigate('Animation1')}>
                <Text
                  style={{color: Theme.color, marginLeft: 30, fontSize: 18}}>
                  All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{color: Theme.color, marginLeft: 20, fontSize: 18}}>
                  Legendary
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{color: Theme.color, marginLeft: 20, fontSize: 18}}>
                  Game
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{color: Theme.color, marginLeft: 20, fontSize: 18}}>
                  Quiz
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{color: Theme.color, marginLeft: 20, fontSize: 18}}>
                  Ludu
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{color: Theme.color, marginLeft: 20, fontSize: 18}}>
                  Teen Patty
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{color: Theme.color, marginLeft: 20, fontSize: 18}}>
                  Crypto Game
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{
                    color: Theme.color,
                    marginLeft: 20,
                    fontSize: 18,
                    marginRight: 10,
                  }}>
                  AAAAAAA
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Animation;
