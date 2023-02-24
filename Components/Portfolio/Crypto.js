import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import supabase from './Supabase';

const Crypto = () => {
  const navigation = useNavigation();
  console.log('hello');
  const [value, setvalue] = useState();
  // console.log('supabase', supabase);

  useEffect(() => {
    async function getthedata() {
      const {data, error} = await supabase.from('news').select('content');
      if (data) {
        console.log(data[0].content.result);
        console.log('miniresult', data[0].content.result[0]);
        setvalue(data[0].content.result);
      }
    }
    getthedata();
    // async function inserdata() {
   
    // const {data: insertData, error: insertError} = await supabase
    //   .from('Users')
    //   .insert({UID: 'Sanj', Full_name: 'hello'});
    // if (insertData) {
    //   console.log(data[0].content.result);
    //   setvalue(data[0].content.result);
    // }
    // if (insertError) {
    //   console.log(insertError);
    // }
    // }
    // inserdata();
  }, []);
  console.log('value', value);

  return (
    <View style={{backgroundColor: '#094b79', height: '100%'}}>
      <View style={styles.new}>
        <Text style={{textAlign: 'center', fontSize: 25, marginTop: 40}}>
          {' '}
          Learn Crypto invesment
        </Text>
        <Text style={{textAlign: 'center', marginTop: 15}}>
          without putting your real money
        </Text>

        <Image
          style={{height: 150, width: 150, marginLeft: 80, marginTop: 30}}
          source={require('../../assets/CryptoImage.png')}
        />

        <Text style={{textAlign: 'center', marginTop: 60, fontSize: 15}}>
          <AntDesign name="checkcircleo" size={20} color="green" style={{}} />{' '}
          invest in crypto coins{' '}
        </Text>
        <Text style={{marginTop: 10, fontSize: 15, marginLeft: '21.5%'}}>
          <AntDesign name="checkcircleo" size={20} color="green" style={{}} />{' '}
          Check progress with real {} market growth{' '}
        </Text>
        <Text style={{marginTop: 10, fontSize: 15, marginLeft: '21.5%'}}>
          <AntDesign name="checkcircleo" size={20} color="green" style={{}} />{' '}
          get featured in our top cryptopurity {} profiles{' '}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: '80%',
          backgroundColor: '#00d4ff',
          color: 'white',
          paddingVertical: 10,
          paddingHorizontal: 30,
          borderRadius: 20,
          elevation: 3,
          marginLeft: 40,
          marginRight: 30,
          marginTop: 30,
        }}>
        <Text style={{textAlign: 'center'}}>Create cryptopurity</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Crypto;
const styles = StyleSheet.create({
  new: {
    height: '70%',
    backgroundColor: 'white',
    marginTop: '20%',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 90,
    borderRadius: 50,
  },
});
