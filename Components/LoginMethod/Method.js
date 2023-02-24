import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
// import {AccessToken, LoginManager, Profile} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/firestore';
import '@react-native-firebase/app';
import supabase from '../Portfolio/Supabase';

const Method = () => {
  const navigation = useNavigation();
  const [initial, setInitial] = useState(true);
  const [user, setUser] = useState();
  const [names, setNames] = useState();
  const [emails, setEmails] = useState('');
  const [firstname, setfirstname] = useState();
  const [email1, setemail1] = useState();
  const [uuid, setuuid] = useState();
  const todoRef = firebase.firestore().collection('Userinfo');

  // name = user.displayName;
  // email = user.email;

  // add to firebase
  // const addField = () => {
  //   if (names === !null && emails === !null) {
  //     const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  //     const data = {
  //       Email: emails,
  //       // createdAt: timestamp,
  //       Name: names,

  //     };

  //     todoRef
  //       .add(data)
  //       .then(() => {

  //         alert("hiiiiiiiiiii")
  //       })
  //       .catch(error => {
  //         alert(error);
  //       });
  //   }

  //   }
  // console.log(names);
  const addField = async () => {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const data1 = {
      firstname: names.displayName,
      email: names.email,
      uuid: names.uid,
      imageurl: names.photoURL,
    };
    const {data, error} = await supabase.from('Android_Auth').insert({
      UID: names.uid,
      Full_name: names.displayName,
      Email: names.email,
    });
    if (data) {
      // console.log(data[0]);
    }
    if (error) {
      // console.log(error);
    }
    // console.log(data);

    todoRef
      .doc(firebase.auth().currentUser.uid)
      .set(data1)
      .then(() => {
        // alert("hiiiiiiiiiii")
        navigation.navigate('News');
      })
      .catch(error => {
        // alert(error);
      });
  };
  // console.log(names.displayName)

  // anonymous login
  guestuser = () => {
    auth()
      .signInAnonymously()
      .then(() => {
        // console.log('User signed in anonymously');
        navigation.navigate('News');
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          // console.log('Enable anonymous in your firebase console.');
        }

        // console.error(error);
      });
  };
  //  google login
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '465082959500-ilgmidap3tks9a3il53pd3acbkr2tnmn.apps.googleusercontent.com',
    });
  }, []);

  const Google = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // console.log(googleCredential);
    // Sign-in the user with the credential
    // navigation.navigate('Submit');
    return auth().signInWithCredential(googleCredential);
  };

  const signout1 = async () => {
    try {
      await GoogleSignin.signOut();
      await auth().signOut();
      navigation.navigate('Onboardingscreen');
      // Google Account disconnected from your app.
      // Perform clean-up actions, such as deleting data associated with the disconnected account.
    } catch (error) {
      // console.error(error);
    }
  };

  // //facebook login

  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   if (initial) setInitial(false);
  // }
  // useEffect(() => {
  //   const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber;
  // }, []);

  // async function signinwithFb() {
  //   // Attempt login with permissions
  //   const result = await LoginManager.logInWithPermissions([
  //     'public_profile',
  //     'email',
  //   ]);

  //   if (result.isCancelled) {
  //     throw 'User cancelled the login process';
  //   }

  //   // Once signed in, get the users AccesToken
  //   const data = await AccessToken.getCurrentAccessToken();

  //   if (!data) {
  //     throw 'Something went wrong obtaining access token';
  //   }

  //   // Create a Firebase credential with the AccessToken
  //   const facebookCredential = auth.FacebookAuthProvider.credential(
  //     data.accessToken,
  //   );
  //   navigation.navigate('News');
  //   // Sign-in the user with the credential
  //   return auth().signInWithCredential(facebookCredential);
  // }
  // const signOut = async () => {
  //   try {
  //     await firebase.auth().signOut();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const regWithFacebook = async (userID) =>{
  //   try {
  //     const res = await auth().createUserWithEmailAndPassword(
  //       userID,
  //     );
  //     console.log(res)
  //   }
  //   catch(error){
  //     console.log(error)
  //   }

  // }
  if (!user) {
    return (
      <View>
        <View>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginTop: '10%',
              color: 'black',
              fontWeight: 'bold',
              fontFamily: 'RobotoCondensed-Bold',
            }}>
            Login to Get More Access and Connect with Others
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            marginTop: '35%',
            alignItems: 'center',
            marginRight: '5%',
          }}>
          <View style={{width: '90%'}}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                backgroundColor: '#FF3366',
                borderRadius: 10,
                borderWidth: 1,
                marginLeft: '5%',
                height: 65,
                padding: 15,
                borderColor: 'white',
              }}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  marginLeft: '5%',
                  backgroundColor: '#FF3366',
                }}
                source={require('../../assets/LoginMethod/call.png')}
              />
              <Text
                style={{
                  fontSize: 15,
                  marginTop: '1%',
                  marginLeft: '10%',
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Continue with Phone Number
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{marginTop: '7%', color: 'black'}}>
              ----------------OR------------------
            </Text>
          </View>
          <View style={{width: '90%', marginTop: '7%'}}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                borderRadius: 10,
                borderWidth: 1,
                marginLeft: '5%',
                height: 50,
                padding: 10,
                borderColor: 'white',
              }}
              onPress={
                () =>
                  Google().then(res => {
                    // console.log(res);
                    setUser(res.user);
                    setNames(res.user);

                    const user = res.user;
                    // console.log(user);

                    // names = user.displayName;
                  })
                // setEmails(user.email)

                // .catch(error => console.log(error))
              }>
              <Image
                style={{width: 30, height: 30, marginLeft: '5%'}}
                source={require('../../assets/LoginMethod/google.png')}
              />
              <Text
                style={{
                  fontSize: 15,
                  marginTop: '1%',
                  marginLeft: '13%',
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                Continue with Google
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{width: '90%', marginTop: '5%'}}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                backgroundColor: '#3b5998',
                borderRadius: 10,
                borderWidth: 1,
                marginLeft: '5%',
                height: 50,
                padding: 10,
                borderColor: 'white',
              }}
              // onPress={signinwithFb}
            >
              <Image
                style={{width: 30, height: 30, marginLeft: '5%'}}
                source={require('../../assets/LoginMethod/fb.png')}
              />
              <Text
                style={{
                  fontSize: 15,
                  marginTop: '1%',
                  marginLeft: '13%',
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Continue with Facebook
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{width: '90%', marginTop: '5%'}}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                backgroundColor: '#00acee',
                borderRadius: 10,
                borderWidth: 1,
                marginLeft: '5%',
                height: 50,
                padding: 10,
                borderColor: 'white',
              }}>
              <Image
                style={{width: 30, height: 30, marginLeft: '5%'}}
                source={require('../../assets/LoginMethod/twi.png')}
              />
              <Text
                style={{
                  fontSize: 15,
                  marginTop: '1%',
                  marginLeft: '13%',
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Continue with Twitter
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{width: '90%', marginTop: '5%'}}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                backgroundColor: 'black',
                borderRadius: 10,
                borderWidth: 1,
                marginLeft: '5%',
                height: 50,
                padding: 10,
                borderColor: 'white',
              }}>
              <Image
                style={{width: 30, height: 30, marginLeft: '5%'}}
                source={require('../../assets/LoginMethod/user.png')}
              />
              <Text
                style={{
                  fontSize: 15,
                  marginTop: '1%',
                  marginLeft: '13%',
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Continue with Guest
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: '10%'}}>
            <Text style={{textAlign: 'center', color: 'black'}}>
              By Continuing your confirm that you agree to our{' '}
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: '#3b5998',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Terms and Conditions
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View>
      <ImageBackground
        style={{height: '100%'}}
        source={require('../../assets/inbg.png')}>
        <TextInput
          style={{
            borderWidth: 1,
            width: '100%',
            borderRadius: 8,
            borderColor: 'rgba(140, 90, 160, .01)',
            color: 'rgba(140, 90, 160, .01)',
            textAlign: 'center',
          }}
          onChangeText={namesss => setNames(namesss)}
          value={user.displayName}></TextInput>

        <TextInput
          style={{
            borderWidth: 1,
            width: '100%',
            borderRadius: 8,
            borderColor: 'rgba(140, 90, 160, .01)',
            textAlign: 'center',
            color: 'rgba(140, 90, 160, .01)',
          }}
          onChangeText={emailsss => setEmails(emailsss)}
          value={user.email}></TextInput>

        <Text style={{textAlign: 'center', color: 'rgba(140, 90, 160, .01)'}}>
          {user.uid}
        </Text>

        <View>
          <View style={{alignItems: 'center'}}>
            <Image
              style={{
                height: 100,
                width: 100,
                borderWidth: 1,
                borderRadius: 50,
              }}
              source={require('../../assets/User/user.png')}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: '8%',
              marginTop: '80%',
              justifyContent: 'space-evenly',
              // alignItems: 'center',
            }}>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                width: '30%',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                }}
                onPress={signout1}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    paddingTop: '8%',
                  }}>
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                width: '30%',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                }}
                onPress={addField}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    paddingTop: '8%',
                  }}>
                  Continue with Email
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* <TouchableOpacity style={{borderWidth:1,borderRadius:10,height:30,marginTop:'20%'}} onPress={signout1}><Text>signout</Text></TouchableOpacity> */}
      </ImageBackground>
    </View>
  );
};

export default Method;
