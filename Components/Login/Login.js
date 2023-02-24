import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  View,
  Image,
  Alert,
  BackHandler,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import PhoneInput from 'react-native-phone-number-input';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';

const App = props => {
  const navigation = useNavigation();
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Method');

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const [user, setUser] = useState(null);

  const [mobile, setMobile] = useState(null);

  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');
  const [otpview, setotpview] = useState(true);
  const phoneInput = useRef(null);
  const getPhoneNumber = () => {
    Alert.alert(mobile);
  };

  const onAuthStateChanged = async userAuth => {
    if (!userAuth) {
      return;
    }
    if (userAuth) {
      // console.log(userAuth);
      setUser(userAuth);
    }

    return () => userReference();
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => {
      subscriber;
    };
  }, []);

  const signInWithMobileNumber = async () => {
    const confirmation = await auth().signInWithPhoneNumber(mobile);
    setConfirm(confirmation);
  };

  const confirmCode = async () => {
    try {
      await confirm.confirm(code);
      props.navigation.navigate('Signup');
    } catch (error) {
      // console.log('Invalid code.');
    }
    setotpview(false);
  };

  const signOut = async () => {
    auth().signOut();

    setUser(null);

    return () => userReference();
  };

  function submitcodes() {
    props.navigation.navigate('News');
  }
  if (user !== null) {
    props.navigation.navigate('Signup');
  }
  useEffect(() => {
    GoogleSignin.configure();
  }, []);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      // console.log(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/inbg.png')}
      style={{width: '100%', height: 850}}>
      <SafeAreaView style={{height: '100%'}}>
        <View>
          <Image
            style={{
              width: '45%',
              height: 280,
              marginLeft: '25%',
              marginTop: '15%',
            }}
            source={require('../../assets/OTP.png')}
          />
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: 10,
              textAlign: 'center',
            }}>
            OTP Verification
          </Text>
          <Text style={{textAlign: 'center', color: 'black'}}>
            We will send you one time password to this mobile number.
          </Text>
        </View>

        <View style={{marginTop: '-30%', flex: 1, alignItems: 'center'}}>
          {user === null && (
            <>
              <View
                style={{
                  borderWidth: 2,
                  textAlign: 'center',
                  height: 60,
                  marginTop: '41.5%',
                  borderRadius: 4,
                  borderColor: '#FF3366',
                  marginRight: '1%',
                }}>
                <PhoneInput
                  value={mobile}
                  ref={phoneInput}
                  onChangeFormattedText={text => {
                    setMobile(text);
                  }}
                  defaultCode="IN"
                  withShadow
                  autoFocus
                  keyboardType="phone-pad"
                  placeholder=" Phone Number"
                  textContainerStyle={{paddingVertical: '2%'}}
                />
              </View>
              {!confirm ? (
                <>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#FF3366',
                      margin: 10,
                      padding: 15,
                      alignItems: 'center',
                      marginTop: '20%',
                      borderRadius: 8,
                      width: 200,
                    }}
                    onPress={() => signInWithMobileNumber()}>
                    <Text style={{color: 'white'}}>Get Code</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={{marginTop: 30, color: 'black', top: -5}}>
                    Enter the OTP
                  </Text>
                  <TextInput
                    value={code}
                    onChangeText={e => setCode(e)}
                    style={{
                      borderWidth: 1,
                      width: '55%',
                      textAlign: 'center',
                      borderRadius: 5,
                      borderColor: '#FF3366',
                      fontSize: 20,
                      color: 'black',
                    }}></TextInput>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#FF3366',
                      margin: 10,
                      padding: 15,
                      alignItems: 'center',
                      marginTop: '5%',
                      borderRadius: 8,
                      width: 200,
                    }}
                    onPress={() => confirmCode()}>
                    <Text style={{color: 'white'}}>Confirm Code</Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          )}
        </View>

        {user !== null && (
          // props.navigation.naviagte("News")
          <View style={{margin: 10}}>
            <Text style={{margin: 10}}>{user.phoneNumber}</Text>
            <TouchableOpacity onPress={signOut} style={{alignItems: 'center'}}>
              <Text>Sign Out</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default App;
