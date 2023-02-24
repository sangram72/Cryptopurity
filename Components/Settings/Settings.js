import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('User');

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <SafeAreaView style={style.safe}>
      <Text style={{textAlign: 'center', fontSize: 20}}>Settings</Text>

      <View style={style.set}>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              marginTop: '30%',
              borderBottomWidth: 1,
              width: '80%',
            }}>
            Privacy-Policy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              marginTop: '10%',
              width: '80%',
              borderBottomWidth: 1,
            }}>
            Terms & Condition{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Method');
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: 'red',
              marginTop: '10%',
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
const style = StyleSheet.create({
  safe: {
    backgroundColor: 'white',
    height: '100%',
  },

  set: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: '10%',
  },
});
