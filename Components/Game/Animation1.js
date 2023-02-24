import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Background from '../Background';
import {useNavigation} from '@react-navigation/native';
import AutoTypingText from 'react-native-auto-typing-text';
import {ScrollView} from 'react-native-web-hover';

const Animation1 = props => {
  const navigation = useNavigation();
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Animation');

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const [dynamiccountvalue, setdynamiccountvalue] = useState(0);
  const [dynamiccountcondition, setdynamiccountcondition] = useState(false);
  const [dynamiccountcondition1, setdynamiccountcondition1] = useState(false);
  const [textnewname, settextnewname] = useState('Skip');
  const [newrendervalue, setnewrendervalue] = useState(false);
  const [dynamicvalues, setdynamicvalues] = useState();
  const [loading, setloading] = useState(true);
  const [showbutton, setshowbutton] = useState(true);

  const [rendervalue, setrendervalue] = useState(true);

  function changethedata1() {
    setrendervalue(false);
    if (rendervalue == false) {
      navigation.navigate('Game');
    }
  }

  function changethevalue8() {
    if (dynamiccountvalue == 0) {
      setdynamiccountcondition(true);
      setshowbutton(false);
      setrendervalue(false);
      setdynamiccountvalue(dynamiccountvalue + 1);
    }
    if (dynamiccountvalue == 1) {
      setdynamiccountcondition1(true);
      settextnewname('submit');
      setdynamiccountvalue(dynamiccountvalue + 1);
    }
    if (dynamiccountvalue == 2) {
      navigation.navigate('Game');
    }
  }
  //api
  useEffect(() => {
    fetch(
      'https://gj7xu81f.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20%22post%22%5D%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20title%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20slug%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20body%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20mainImage%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20asset%20-%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20_id%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22categories%22%3A%20categories%5B%5D-%3Etitle%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(response => {
        // console.log(response);

        setdynamicvalues(getthedynamicvalue(response.result));
        setloading(false);
      });
  }, []);
  //end

  function getthedynamicvalue(res) {
    const arr2 = res.filter(function (caaavalue) {
      return caaavalue.categories[0] == 'Animation-2';
    });
    return arr2;
  }
  return (
    <>
      {loading == true ? (
        <View>
          <Image
            style={{width: '100%', height: '80%', marginLeft: 5, marginTop: 90}}
            source={require('../../assets/Loding/gif.gif')}
          />
        </View>
      ) : (
        <ImageBackground
          style={{height: '100%'}}
          source={require('../../assets/gameback.png')}>
          <ScrollView>
            <View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#ffffff',
                  borderColor: 'rgba(140, 90, 160, .01)',
                  marginTop: '5%',
                }}>
                <ImageBackground
                  style={{
                    height: 300,
                    width: '90%',
                    marginLeft: '1%',
                  }}
                  source={require('../../assets/GameFont/bnr.png')}>
                  <View>
                    {dynamicvalues && dynamiccountcondition == false ? (
                      <AutoTypingText
                        style={styles.btn1}
                        text={dynamicvalues[0].title}
                        charMovingTime={80}
                        delay={0}
                        onComplete={() => {
                          setshowbutton(false),
                            setrendervalue(false),
                            setdynamiccountvalue(1);
                        }}
                      />
                    ) : (
                      dynamicvalues && (
                        <Text
                          style={{
                            color: '#ffffff',
                            fontFamily: 'Oswald-Bold',
                            fontSize: 15,
                            borderWidth: 1,
                            height: '80%',
                            width: '81%',
                            marginLeft: '3%',
                            alignItems: 'center',
                            borderColor: 'rgba(140, 90, 160, .01)',
                            display: 'flex',
                            marginTop: '23%',
                          }}>
                          {dynamicvalues[0].title}
                        </Text>
                      )
                    )}
                  </View>
                </ImageBackground>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#ffffff',
                  borderColor: 'rgba(140, 90, 160, .01)',
                  display: 'flex',
                }}>
                <ImageBackground
                  style={{
                    height: 300,
                    width: '90%',
                    marginLeft: '19%',
                  }}
                  source={require('../../assets/GameFont/bnr.png')}>
                  {rendervalue == true ? null : (
                    <View>
                      {dynamiccountcondition1 == false
                        ? dynamicvalues && (
                            <AutoTypingText
                              style={styles.btn}
                              text={dynamicvalues[1].title}
                              charMovingTime={80}
                              delay={0}
                              onComplete={() => {
                                // console.log('compleated'),
                                setnewrendervalue(true),
                                  settextnewname('submit'),
                                  setdynamiccountvalue(dynamiccountvalue + 1);
                              }}
                            />
                          )
                        : dynamicvalues && (
                            <Text
                              style={{
                                color: '#ffffff',
                                fontFamily: 'Oswald-Bold',
                                fontSize: 15,
                                borderWidth: 1,
                                height: '80%',
                                width: '81%',
                                marginLeft: '3%',
                                alignItems: 'center',
                                borderColor: 'rgba(140, 90, 160, .01)',
                                display: 'flex',
                                marginTop: '20%',
                              }}>
                              {dynamicvalues[1].title}
                            </Text>
                          )}
                    </View>
                  )}
                </ImageBackground>
              </View>

              <View style={{display: 'flex', alignItems: 'center'}}>
                <TouchableOpacity onPress={changethevalue8}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 8,
                      height: 45,
                      width: 150,
                      borderColor: '#FF1A72',
                      alignItems: 'center',
                      marginTop: '5%',
                    }}>
                    <Text
                      style={{
                        color: '#ffffff',
                        fontSize: 20,
                        fontFamily: 'Oswald-Bold',
                      }}>
                      {textnewname}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      )}
    </>
  );
};

export default Animation1;

const styles = StyleSheet.create({
  btn: {
    color: '#ffffff',
    fontFamily: 'Oswald-Bold',
    fontSize: 15,
    borderWidth: 1,
    height: 165,
    width: '81%',
    marginLeft: '3%',
    alignItems: 'center',
    borderColor: 'rgba(140, 90, 160, .01)',
    display: 'flex',
    marginTop: '23%',
  },
  btn1: {
    color: '#ffffff',
    fontFamily: 'Oswald-Bold',
    fontSize: 15,
    borderWidth: 1,
    height: 165,
    width: '81%',
    marginLeft: '3%',
    alignItems: 'center',
    borderColor: 'rgba(140, 90, 160, .01)',
    display: 'flex',
    marginTop: '23%',
  },
});
