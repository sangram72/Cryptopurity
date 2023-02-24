import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  PermissionsAndroid,
  Platform,
  Share,
  BackHandler,
  Switch,
} from 'react-native';

import React, {useState, useEffect, useContext} from 'react';
// import FontAwesome5 from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Evilicons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {firebase} from '@react-native-firebase/firestore';
import Themecontext from '../../Themecontext';
import {EventRegister} from 'react-native-event-listeners';
import '@react-native-firebase/app';
import '@react-native-firebase/auth';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

const User = () => {
  const Navigation = useNavigation();
  const [Darkmode, setdarkmode] = useState(false);
  const [firstname, setfirstname] = useState({});
  const Theme = useContext(Themecontext);
  const navigation = useNavigation();
  const [imageData, setImageData] = useState(null);
  const [todos, setTodos] = useState([]);
  const todoRef = firebase.firestore().collection('Userinfo');
  const [dark, setdark] = useState(true);

  useEffect(() => {
    const backAction = () => {
      Navigation.navigate('News', {
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

  // useEffect(() => {
  //   const backAction = () => {
  //     Navigation.navigate('News', {
  //       paramkey: 'false',
  //     });
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);

  //   const [todos,setTodos]=useState('')
  //   useEffect(async ()=>{
  //   const getFromFirebase = firebase.firestore().collection("Userinfo");
  //   getFromFirebase.orderBy('timestamp','desc')
  //   getFromFirebase.onSnapshot((querySnapShot) => {
  //     const saveFirebaseTodos = [];
  //     querySnapShot.forEach((doc) => {
  //       saveFirebaseTodos.push(doc.data());
  //     });
  //     setTodos(saveFirebaseTodos);
  //   });
  // },[])
  //   const [todoss,setTodoss] = useState();

  // useEffect( async () => {
  //   todoRef.orderBy('timestamp','desc')
  //   .onSnapshot(
  //     quarysnapshot =>{
  //       const todos = []
  //       quarysnapshot.forEach((doc)=>{
  //         const {firstName} = doc.data()
  //         todos.push({
  //           id:doc.id,
  //           firstName,s
  //           // lastName,

  //         })
  //       })
  //       setTodoss(todos);

  //     }
  //   )
  // },[])
  // //console.log(todoss);

  // //console.log(todos);

  //backhamdelar
  // useEffect(() => {
  //   const backAction = () => {
  //     navigation.navigate('News', {
  //       paramkey: 'profile',
  //     });
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);
  // //end

  const buildLink = async () => {
    let link = await axios({
      method: 'POST',
      url: `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyCjWjlbrWTjiU1vxD2IOhKh35IIWB1PGWo`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        dynamicLinkInfo: {
          domainUriPrefix: 'https://metavypre.page.link/y1E4',
          link: 'https://www.google.com/',
          androidInfo: {
            androidPackageName: 'com.metavy',
          },
        },
      },
    });
    if (link.status === 200) {
      return link.data.shortLink;
    }
  };

  const shareLink = async () => {
    let shareURL;

    try {
      shareURL = await buildLink();
      //console.log(shareURL);
    } catch (error) {
      //console.log(error);
    }
    try {
      if (shareURL !== '') {
        await Share.share({
          message: `Here chec, ${shareURL}`,
        });
      }
    } catch (error) {
      //console.log(error);
    }
  };
  function changethevalue() {
    if (dark == true) {
      setdark(false);
    } else {
      setdark(true);
    }
  }

  // get data

  useEffect(async () => {
    todoRef
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          setfirstname(snapshot.data());
        }
      });
  }, []);
  //console.log(todos);
  //console.log(firstname);

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
  //console.log(imageData);
  return (
    <View style={{height: '100%', display: 'flex'}}>
      <View
        style={{
          height: '30%',
          backgroundColor: '#fcccd8',
          borderBottomLeftRadius: 10,
          borderBottomEndRadius: 10,
          position: 'relative',
          alignItems: 'flex-end',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: 'rgba(140, 90, 160, .01)',
            alignSelf: 'flex-end',
            marginTop: '2%',
            marginLeft: '10%',
          }}>
          <View style={{marginTop: '1%'}}>
            {dark == true ? (
              <Ionicons name="sunny-outline" size={20} color="black" />
            ) : (
              <Ionicons name="moon-outline" size={20} color="black" />
            )}
          </View>
          <Switch
            style={{
              borderWidth: 1,
              borderColor: '#ffffff',
              width: '15%',
              marginLeft: '-2%',
            }}
            value={Darkmode}
            onValueChange={value => {
              setdarkmode(value), changethevalue();
              EventRegister.emit('change theme', value);
            }}
          />
        </View>
      </View>

      <View
        style={{
          backgroundColor: 'white',
          height: '25%',
          width: '90%',
          alignSelf: 'center',
          bottom: 70,
          borderRadius: 20,
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
        <Image
          style={{
            height: 80,
            width: 80,
            borderRadius: 50,
            bottom: 30,
            marginLeft: '5%',
            borderWidth: 2,
            borderColor: 'white',
            marginTop: '-2%',
          }}
          source={{uri: firstname.imageurl}}
        />
        <View
          style={{
            flexDirection: 'column',
            borderWidth: 1,
            width: '85%',
            height: '45%',
            alignSelf: 'center',
            borderColor: 'rgba(140, 90, 160, .01)',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 25,
              fontFamily: 'RobotoCondensed-Regular',
            }}>
            {firstname.firstname}
          </Text>
          <Text
            style={{
              color: 'black',
              fontFamily: 'RobotoCondensed-Regular',
              fontSize: 18,
            }}>
            {firstname.email}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          height: '40%',
          width: '90%',
          alignSelf: 'center',
          borderRadius: 20,
          marginTop: '-5%',
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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}>
        <View
          style={{
            borderWidth: 1,
            height: '88%',
            width: '85%',
            display: 'flex',
            alignSelf: 'center',
            borderColor: 'rgba(140, 90, 160, .01)',
          }}>
          <TouchableOpacity>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingTop: 10,
                borderWidth: 1,
                marginTop: '1%',
                borderColor: 'rgba(140, 90, 160, .01)',
              }}>
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={25}
                color="black"
              />
              <Text
                style={{
                  // fontWeight: 'bold',
                  fontSize: 20,
                  color: 'black',
                  paddingLeft: 10,
                  marginTop: '-0.5%',
                }}>
                Account
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingTop: 10,
                borderWidth: 1,
                marginTop: '2%',
                borderColor: 'rgba(140, 90, 160, .01)',
              }}>
              <FontAwesome5 name="coins" size={20} color="black" />
              <Text
                style={{
                  // fontWeight: 'bold',
                  fontSize: 20,
                  color: 'black',
                  paddingLeft: 10,
                  marginTop: '-1%',
                }}>
                Coin
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingTop: 10,
                borderWidth: 1,
                marginTop: '2%',
                borderColor: 'rgba(140, 90, 160, .01)',
              }}>
              <Feather name="settings" size={20} color="black" />
              <Text
                style={{
                  // fontWeight: 'bold',
                  fontSize: 20,
                  color: 'black',
                  paddingLeft: 10,
                  marginTop: '-1%',
                }}>
                Settings
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingTop: 10,
                borderWidth: 1,
                marginTop: '2%',
                borderColor: 'rgba(140, 90, 160, .01)',
              }}>
              <Ionicons name="trophy-outline" size={20} color="black" />
              <Text
                style={{
                  // fontWeight: 'bold',
                  fontSize: 20,
                  color: 'black',
                  paddingLeft: 10,
                  marginTop: '-1%',
                }}>
                Rewards
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingTop: 10,
                borderWidth: 1,
                marginTop: '2%',
                borderColor: 'rgba(140, 90, 160, .01)',
              }}>
              <Ionicons name="ios-gift-outline" size={20} color="black" />
              <Text
                style={{
                  // fontWeight: 'bold',
                  fontSize: 20,
                  color: 'black',
                  paddingLeft: 10,
                  marginTop: '-1%',
                }}>
                Refer & Earn
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingTop: 10,
                borderWidth: 1,
                marginTop: '2%',
                borderColor: 'rgba(140, 90, 160, .01)',
              }}>
              <Evilicons name="question" size={25} color="black" />
              <Text
                style={{
                  // fontWeight: 'bold',
                  fontSize: 20,
                  color: 'black',
                  paddingLeft: 5,
                  marginTop: '-2%',
                }}>
                Help & Support
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default User;
