import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
  StyleSheet,
  Keyboard,
  Button,
  ImageBackground,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/firestore';
import '@react-native-firebase/app';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Background from './Background';
// import supabase from './Supabase';
import supabase from './Portfolio/Supabase';
import Btn from './Btn';
import {maroon} from './constants';
import {useNavigation} from '@react-navigation/native';
import {create} from 'react-test-renderer';

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const Signup = props => {
  // Date picker for dob
  const [datePicker, setDatePicker] = useState(false);

  const [date, setDate] = useState(new Date());

  function showDatePicker() {
    setDatePicker(true);
  }
  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  }
  //console.log(moment(date).format('LLL'));

  const todoRef = firebase.firestore().collection('Userinfo');
  const [addEmail, setAddEmail] = useState('');
  const [addFirstName, setAddFirstName] = useState('');
  const [addLastName, setAddLaststName] = useState('');
  const [addDOB, setAddDOB] = useState('');
  // const [uid,setUid] = useState('');
  const addField = async () => {
    //  const uid = firebase.auth().currentUser.uid;
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const data1 = {
      firstname: addFirstName,
      email: addEmail,
      UID: firebase.auth().currentUser.uid,
      // UID: uid,
    };
    //console.log(data1);
    const {data, error} = await supabase.from('Users').insert({
      UID: firebase.auth().currentUser.uid,
      Full_name: addFirstName,
      Email: addEmail,
    });
    if (data) {
      //console.log(data[0]);
    }
    if (error) {
      //console.log(error);
    }
    //console.log(data);
    todoRef
      .doc(firebase.auth().currentUser.uid)
      .set(data1)
      .then(() => {
        alert('hiiiiiiiiiii');
        navigation.navigate('News');
      })
      .catch(error => {
        alert(error);
      });
  };
  //console.log(addFirstName);
  //console.log(addEmail);
  const [value, setValue] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [textInputemail, setTextInputemil] = useState('');
  const [textInputFirst, setTextInputFirst] = useState('');
  const [textInputLast, setTextInputLast] = useState('');
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const navigation = useNavigation();

  function checkTextInput() {
    if (!textInputFirst.trim()) {
      alert('Please Enter FirstName');
      return;
    }
    if (!textInputLast.trim()) {
      alert('Please Enter LastName');
      return;
    }

    navigation.navigate('News');
  }

  return (
    <KeyboardAvoidingView>
      <ImageBackground
        source={require('../assets/inbg.png')}
        style={{width: '100%', height: 850}}
        imageStyle={{
          resizeMode: 'cover',
          alignSelf: 'flex-end',
        }}>
        <View>
          <Image
            style={{
              height: 200,
              width: 250,
              position: 'relative',
              left: '20%',
              top: '35%',
            }}
            source={require('../assets/logo.png')}
          />
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            width: '83%',
            marginTop: '50%',
            marginLeft: '9%',
          }}>
          <TextInput
            placeholderTextColor={'black'}
            placeholder={'First Name'}
            onChangeText={firstName => setAddFirstName(firstName)}
            value={addFirstName}
            style={{
              borderWidth: 1,
              width: '100%',
              borderRadius: 8,
              borderColor: '#FF3366',
              marginTop: '-18%',
            }}></TextInput>

          <TextInput
            placeholderTextColor={'black'}
            onChangeText={email => setAddEmail(email)}
            value={addEmail}
            placeholder={'emil'}
            style={{
              borderWidth: 1,
              width: '100%',
              borderRadius: 8,
              marginTop: 10,
              borderColor: '#FF3366',
            }}></TextInput>

          {checkValidEmail ? (
            <Text style={style.textFailed}>Wrong Email Format</Text>
          ) : (
            <Text style={style.textFailed}> </Text>
          )}
        </View>
        {/* <View> <Text style={{textAlign: 'center', color: 'black'}}>{user.UID}</Text></View> */}
        {/* Dob */}
        <View>
          <Text
            style={{
              textAlign: 'left',
              color: 'black',
              position: 'relative',
              top: '-2%',
              left: '11%',
            }}>
            Date Of Birth
          </Text>
          <View style={{flexDirection: 'row'}}>
            {datePicker && (
              <DateTimePicker
                value={date}
                mode={'date'}
                is24Hour={true}
                onChange={onDateSelected}
                style={style.datePicker}
              />
            )}

            <TextInput
              style={{
                borderWidth: 1,
                marginLeft: '9.5%',
                width: '76%',
                textAlign: 'center',
                marginTop: '10%',
                borderRadius: 8,
                borderColor: '#FF3366',
                position: 'relative',
                bottom: '10%',
              }}
              placeholder={'DD-MM-YYYY'}
              // value={addDOB}
              onChangeText={DOB => setAddDOB(DOB)}
              keyboardType="numeric">
              {moment(date).format('DD-MM-YYYY')}
            </TextInput>

            {!datePicker && (
              <TouchableOpacity
                onPress={showDatePicker}
                style={{
                  borderRadius: 100,
                  alignItems: 'center',
                  width: '15%',
                  height: 30,
                  marginTop: '4%',
                }}>
                <EvilIcons
                  style={{marginRight: 20}}
                  name="calendar"
                  size={30}
                  color="#FF3366"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#FF3366',
            margin: 10,
            padding: 15,
            alignItems: 'center',
            marginTop: '5%',
            borderRadius: 8,
            marginLeft: '25%',
            width: 200,
          }}
          onPress={addField}>
          <Text style={{color: 'white'}}>Submit</Text>
        </TouchableOpacity>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Signup;
const style = StyleSheet.create({
  textFailed: {
    alignSelf: 'flex-start',
    color: 'red',
  },
  text: {
    fontSize: 25,
    color: 'red',
    padding: 3,
    marginBottom: 10,
    textAlign: 'center',
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
});
