import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';

const CheckInternet = ({isConnected, setIsConnected}) => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      //console.log('Connection type', state.type);
      //console.log('Is connected?', state.isConnected);
      setIsConnected(state.isConnected);
    });

    // Unsubscribe
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <View>
      <Image
        style={{height: 300, width: 300, marginLeft: '15%', marginTop: '50%'}}
        // source={require('../images/internet.jpeg')}
      />
      {/* <Text>{isConnected==true ? '' : 'No Internet Connection'}</Text> */}
    </View>
  );
};

export default CheckInternet;
