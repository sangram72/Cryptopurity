import react, {useState, useEffect} from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import {View, Text, Image, ImageBackground} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './Components/Login/Login';
import Signup from './Components/Signup';
import News from '../Metavy 001/Components/News/News';
import Game from '../Metavy 001/Components/Game/Game';
import Method from './Components/LoginMethod/Method';
import Animation from './Components/Game/Animation';
import Animation1 from './Components/Game/Animation1';
import Result from './Components/Game/Result';

import User from '../Metavy 001/Components/User/User';
import Settings from './Components/Settings/Settings';
import Points from './Components/Points/Points';
import Pointhis from './Components/Points/Pointhis';
import Crypto from './Components/Portfolio/Crypto';
import EdirProfile from './Components/User/EdirProfile';
import Feedback from './Components/HelpSupport/Feedback';
import Onboardingscreen from './Components/Onboardingscreen';
import Instruction from './Components/Game/Instruction';

import MainNews from './Components/News/MainNews';
import Market from '../Metavy 001/Components/Market/Market';
import {EventRegister} from 'react-native-event-listeners';
import Themecontext from './Themecontext';
import theme from './theme';

// import Articles from './Components/Articles';
const Splashscrrenimage = props => {
  setTimeout(() => {
    if (!User) {
      props.navigation.navigate('Onboardingscreen');
    } else {
      props.navigation.navigate('News');
    }
  }, 3800);

  return (
    <View>
      <ImageBackground
        style={{height: '100%'}}
        source={require('./assets/bgg.png')}>
        <Image
          style={{width: '100%', height: '80%', marginLeft: 5, marginTop: 50}}
          source={require('./assets/Animation/gif.gif')}
        />
      </ImageBackground>
    </View>
  );
};

const Stack = createNativeStackNavigator();

const App = props => {
  const [darkmode, setDarkMode] = useState(false);
  useEffect(() => {
    const listener = EventRegister.addEventListener('change theme', data => {
      setDarkMode(data);
      // console.log(data);
    });
    return () => {
      EventRegister.removeAllListeners(listener);
    };
  }, [darkmode]);

  const [isFirstLaunched, setIsFirstLaunched] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem('AlreadyLaunched').then(value => {
      if (value === null) {
        AsyncStorage.setItem('AlreadyLaunched', 'true');
        setIsFirstLaunched(true);
      } else {
        setIsFirstLaunched(false);
      }
    });
  }, []);
  return (
    <Themecontext.Provider value={darkmode === true ? theme.dark : theme.light}>
      <NavigationContainer theme={darkmode == true ? DarkTheme : DefaultTheme}>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Splashscrren">
          <Stack.Screen name="Splashscrren" component={Splashscrrenimage} />
          {isFirstLaunched && (
            <Stack.Screen
              name="Onboardingscreen"
              component={Onboardingscreen}
            />
          )}

          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Method" component={Method} />
          <Stack.Screen name="News" component={News} />
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="Market" component={Market} />
          <Stack.Screen name="Animation" component={Animation} />
          <Stack.Screen name="Animation1" component={Animation1} />
          <Stack.Screen name="Instruction" component={Instruction} />
          <Stack.Screen name="Result" component={Result} />

          <Stack.Screen name="User" component={User} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Points" component={Points} />
          <Stack.Screen name="Pointhis" component={Pointhis} />
          <Stack.Screen name="Crypto" component={Crypto} />
          <Stack.Screen name="EdirProfile" component={EdirProfile} />
          <Stack.Screen name="Feedback" component={Feedback} />

          <Stack.Screen name="MainNews" component={MainNews} />

          {/* <Stack.Screen name="Articles" component={Articles}/> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Themecontext.Provider>
  );
};

export default App;
