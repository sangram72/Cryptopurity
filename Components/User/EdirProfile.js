import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  Image,
  TextInput,
  BackHandler,
  Alert,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import CheckInternet from '../CheckInternet';
import {firebase} from '@react-native-firebase/firestore';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import '@react-native-firebase/app';
import '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';

const EdirProfile = ({route}) => {
  // const [user, setUser] = useState([]);
  // const todoRef = firebase.firestore().collection('Userinfo');
  // useEffect(() => {
  //   todoRef.onSnapshot(querySnapshot => {
  //     const user = [];
  //     querySnapshot.forEach(doc => {
  //       const {firstName, lastName} = doc.data();
  //       user.push({
  //         id: doc.id,
  //         firstName,
  //         lastName,
  //       });
  //     });
  //     setUser(user);
  //   });
  // }, []);

  const [isConnected, setIsConnected] = useState(false);
  const [imageData, setImageData] = useState({});
  // const openCamera = async () =>{
  //   const result = await launchCamera ({mediaType:'photo'})
  //   setImageData(result);

  // }
  const openGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'mixed',
      selectionLimit: 1,
      includeBase64: true,
      saveToPhotos: true,
    });
    setImageData(result);
  };
  console.log(imageData);
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
  // const {
  //   control,
  //   handleSubmit,
  //   formState: {errors, isValid}
  // } = useForm({mode: 'onBlur'})

  // const onSubmit = data => console.log(data)
  const [EnteredValue, setEnteredValue] = useState(150);
  const ShowMaxAlert = EnteredValue => {
    var TextLength = EnteredValue.length.toString();

    if (TextLength == 150) {
      Alert.alert('Sorry, You have reached the maximum input limit.');
      // Put your code here which you want to execute when TextInput entered text reached to 10.
    }
  };
  return (
    // <SafeAreaView style={{backgroundColor:'grey',height:'20%'}}>
    <View style={{height: '100%'}}>
      <KeyboardAvoidingView>
        <View
          style={{
            height: 250,
            backgroundColor: '#fa6b8f',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <View
            style={{display: 'flex', flexDirection: 'row', marginTop: '3%'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('User');
              }}>
              <Feather
                name="arrow-left"
                size={25}
                style={{color: 'white', marginLeft: '2%'}}
              />
            </TouchableOpacity>
            <Text
              style={{
                marginLeft: '30%',
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
              }}>
              Edit Profile
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 25,
                marginTop: '5%',
                fontWeight: 'bold',
                color: 'black',
                textAlign: 'center',
              }}>
              Sangram Nandi
            </Text>
          </View>
          <Text style={{fontSize: 15, textAlign: 'center', marginTop: '5%'}}>
            {' '}
            Unfortunately, there’s nothing less funny than trying to be funny.
            The key to a comedic Instagram bio is keeping honest, like this one
            from a drink brand.
          </Text>
        </View>
        <View style={{display: 'flex', alignItems: 'center', bottom: '9%'}}>
          <View
            style={{
              width: '20%',

              height: 70,
            }}>
            <TouchableOpacity
              onPress={() => {
                openGallery();
              }}>
              {imageData !== null ? (
                <Image
                  source={{uri: imageData.uri}}
                  style={{
                    height: 120,
                    width: 120,
                    borderRadius: 100,
                    top: 10,
                    left: -15,
                    borderWidth: 10,
                    borderColor: 'white',
                  }}
                />
              ) : (
                <Image
                  source={require('../../assets/User/user1.png')}
                  style={{
                    height: 120,
                    width: 120,
                    borderRadius: 100,
                    top: 10,
                    left: -15,
                    borderWidth: 10,
                    borderColor: 'white',
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              color: '#fa6b8f',
              marginLeft: '18%',
            }}>
            User Name
          </Text>

          <TextInput
            style={{
              marginLeft: '2%',
              padding: 5,
              color: 'black',
              fontWeight: 'bold',
              marginTop: '3%',
              backgroundColor: '#f5f5f5',
              width: '70%',
              height: 40,
              borderRadius: 10,
              marginLeft: '15%',
              shadowOffset: {
                width: 0,
                height: 15,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              elevation: 5,
              shadowColor: '#000',
              borderWidth: 3,
              borderColor: 'rgba(140, 90, 160, .01)',
            }}>
            Sangram Nandi
          </TextInput>

          <View style={{display: 'flex'}}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: '#fa6b8f',
                marginLeft: '18%',
                marginTop: '2%',
              }}>
              Bio
            </Text>

            <TextInput
              style={{
                marginTop: '3%',
                backgroundColor: '#f5f5f5',
                width: '70%',
                height: 130,
                borderRadius: 10,
                marginLeft: '15%',
                shadowOffset: {
                  width: 0,
                  height: 15,
                },
                shadowOpacity: 0.58,
                shadowRadius: 16.0,
                elevation: 5,
                shadowColor: '#000',
                borderWidth: 3,
                borderColor: 'rgba(140, 90, 160, .01)',
                color: 'black',

                fontWeight: 'bold',
                textAlignVertical: 'top',
              }}
              multiline={true}
              numberOfLines={5}
              maxLength={150}
              onChangeText={EnteredValue => ShowMaxAlert(EnteredValue)}>
              Sangram Nandi
            </TextInput>
          </View>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              color: '#fa6b8f',
              marginLeft: '18%',
              marginTop: '2%',
            }}>
            Location
          </Text>

          <TextInput
            style={{
              marginLeft: '2%',
              padding: 5,
              color: 'black',
              fontWeight: 'bold',
              marginTop: '2%',
              backgroundColor: '#f5f5f5',
              width: '70%',
              height: 40,
              borderRadius: 10,
              marginLeft: '15%',
              shadowOffset: {
                width: 0,
                height: 15,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              elevation: 5,
              shadowColor: '#000',
              borderWidth: 3,
              borderColor: 'rgba(140, 90, 160, .01)',
            }}>
            Kolkata,India
          </TextInput>

          <TouchableOpacity
            style={{
              marginTop: '2%',
              backgroundColor: '#fa6b8f',
              width: '30%',
              height: 40,
              borderRadius: 10,
              marginLeft: '35%',
              shadowOffset: {
                width: 0,
                height: 15,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              elevation: 5,
              shadowColor: '#000',
              borderWidth: 3,
              borderColor: 'rgba(140, 90, 160, .01)',
            }}>
            <Text
              style={{
                fontSize: 15,
                padding: 5,
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'white',
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EdirProfile;
const styles = StyleSheet.create({
  btn: {
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
  },
});
