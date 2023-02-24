import {firebase} from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import react, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import supabase from '../Portfolio/Supabase';

function Game() {
  const [value, setvalue] = useState([]);
  const [count, setcount] = useState(0);
  const [Options, setoptions] = useState([]);
  const [getoptions, setgetoptions] = useState(null);
  const [score, setscore] = useState(0);
  const [correctoption, setcorrectoption] = useState(null);
  const [incorrectoption1, setincorrectoption1] = useState(null);
  const [incorrectoption2, setincorrectoption2] = useState(null);
  const [incorrectoption3, setincorrectoption3] = useState(null);
  const [incorrectoption4, setincorrectoption4] = useState(null);
  const [primarycolor1, setprimarycolor1] = useState(false);
  const [primarycolor2, setprimarycolor2] = useState(false);
  const [primarycolor3, setprimarycolor3] = useState(false);
  const [primarycolor4, setprimarycolor4] = useState(false);
  const [spinner, setspinner] = useState(true);
  const [Disabled, setdisabled] = useState(true);
  const [submit, setsubmit] = useState(true);
  const [finalsubmit, setfinalsubmit] = useState(false);
  const navigation = useNavigation();
  const [loading, setloading] = useState(true);
  const [quizees, setQuizzes] = useState();
  const [Points, setpoints] = useState(0);
  const [correctpoint, setcorrectpoint] = useState(0);
  const [incorrectpoint, setincorrectpoint] = useState(0);
  const [originalpoints, setoriginalpoints] = useState(0);

  //quiz
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState('');
  //end
  useEffect(() => {
    async function getthedata() {
      const userId = firebase.auth().currentUser.uid;
      const {data: data1, error: error1} = await supabase
        .from('Android_Auth')
        .select('Points')
        .eq('UID', userId);

      if (error1) {
        // console.log('Could not fetch data from the table  ');
        //setQuizzes(null)
      }
      if (data1) {
        const data = data1[0].Points;
        setpoints(data);
      }
    }
    getthedata();
  }, [Points]);

  const fetchQuiz = async () => {
    const {data: quizData} = await supabase
      .from('quiz')
      .select()
      .eq('id', quizees[count].id);
    // console.log(quizData);
    if (quizData) {
      const correctAns = quizData[0].correct;
      setIsLoading;
      const {data, error} = await supabase.from('blocklist').insert([
        {
          user: firebase.auth().currentUser.uid,
          quiz: quizees[count].id,
          correct_ans: correctAns,
        },
      ]);

      if (error) {
        // console.log(error);
      }
      if (data) {
        // console.log(data);
      }
    }
  };

  //fetchQuiz()

  //update total_token in points table for userId
  const updatePoints = async () => {
    const userId = firebase.auth().currentUser.uid;
    const {data: data1, error: error1} = await supabase
      .from('Android_Auth')
      .select('Points')
      .eq('UID', userId);

    if (error1) {
      // console.log('Could not fetch data from the table  ');
      //setQuizzes(null)
    }
    if (data1) {
      //setQuizzes(data)
      // alert('updated1');
      // console.log(data1);
      const user_have_total_token = data1[0].Points;

      // updatePoints(user_have_total_token)
      // console.log('user_have_total_token', user_have_total_token);

      // console.log(user_have_total_token);
      const {data, error} = await supabase
        .from('Android_Auth')
        .update({Points: user_have_total_token - 1})

        .eq('UID', firebase.auth().currentUser.uid);

      if (error) {
        // console.log(error);
      }
      if (data) {
        // console.log(data);
        // alert('points updated');
      }
    }

    // call in next button updatePoints()
    //updatePoints()
  };
  // End update total_token in points table for userId

  //progressbar
  const [index, setindex] = useState(0);
  useEffect(() => {
    const fetchSmoothies = async doubledItems => {
      if (doubledItems) {
        // console.log(doubledItems);
      }
      const {data, error} = await supabase
        .from('quiz')
        .select(`id,question,a,b,c,d,correct`);

      if (error) {
        setFetchError('Could not fetch data from the table ');
        setQuizzes(null);
      }
      if (data) {
        const selectedItems = [];

        for (let i = 0; i < data.length; i++) {
          if (!doubledItems.includes(data[i]['id'])) {
            selectedItems.push(data[i]);
          }
        }
        setQuizzes(selectedItems);
        setloading(false);
        // console.log('selectedItems', selectedItems);
        setoptions(generateoptionsuffle(selectedItems[0]));
        //setFetchError(null)
      }
    };

    const fetchBlocklist = async userId => {
      const {data: latestIdData, error: latestIdError} = await supabase
        .from('blocklist')
        .select('quiz')
        .like('user', firebase.auth().currentUser.uid);

      if (latestIdError) {
        // console.log(latestIdError);
      }
      if (latestIdData) {
        // console.log(latestIdData.length)
        const doubledItems = [];

        for (let i = 0; i < latestIdData.length; i++) {
          doubledItems.push(latestIdData[i]['quiz']);
        }
        // console.log(doubledItems)
        fetchSmoothies(doubledItems);
      }
    };
    //
    const userId = firebase.auth().currentUser.uid;
    // console.log(userId)
    if (userId) {
      fetchBlocklist(userId);
      // console.log(userId);
      setUserId(userId);
    }
  }, []);
  const progressbar = Math.floor((index / 10) * 100);
  //end
  // console.log('quizees', quizees);

  // function Pointsdata() {
  //   if (Points == 0) {
  //     navigation.navigate('Result', {
  //       paramkey: score,
  //       paramkey1: correctpoint,
  //       paramkey2: incorrectpoint,
  //       paramkey3: originalpoints,
  //     });
  //   }
  // }

  // useEffect(() => {
  //   fetch(`https://final-file.vercel.app/all/get/api/v1?num=${count}`, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(response => {
  //       console.log(response);
  //       setloading(false);

  //       setvalue(response);
  //       setoptions(generateoptionsuffle(response));

  //       setspinner(false);
  //     });
  // }, [count]);
  function generateoptionsuffle(_question) {
    const option_a = _question.a;
    const option_b = _question.b;
    const option_c = _question.c;
    const option_d = _question.d;
    const options = [option_a, option_b, option_c, option_d];
    return options;
  }
  // console.log(value);
  function gettheoptions(res) {
    setgetoptions(res);
    if (getoptions == res) {
      setdisabled(true);
    } else setdisabled(false);

    setdisabled(false);
    setgetoptions(res);
    if (res == 'a') {
      setprimarycolor1(true);
      setprimarycolor2(false);
      setprimarycolor3(false);
      setprimarycolor4(false);
    }
    if (res == 'b') {
      setprimarycolor1(false);
      setprimarycolor2(true);
      setprimarycolor3(false);
      setprimarycolor4(false);
    }
    if (res == 'c') {
      setprimarycolor1(false);
      setprimarycolor2(false);
      setprimarycolor3(true);
      setprimarycolor4(false);
    }
    if (res == 'd') {
      setprimarycolor1(false);
      setprimarycolor2(false);
      setprimarycolor3(false);
      setprimarycolor4(true);
    }
  }
  function changethevalue() {
    // if (Points <= 1) {
    //   navigation.navigate('Result',{
    //    paramkey: score,
    //   paramkey1: correctpoint,
    //   paramkey2: incorrectpoint,
    //   paramkey3: originalpoints,});
    // }
    setdisabled(true);
    setprimarycolor1(false);
    setprimarycolor2(false);
    setprimarycolor3(false);
    setprimarycolor4(false);
    setindex(index + 1);
    setcount(count + 1);
    fetchQuiz();
    updatePoints();
    setpoints(Points - 1);

    if (quizees[count].correct == getoptions) {
      setscore(score + 10);
      setcorrectpoint(correctpoint + 1);
      setoriginalpoints(originalpoints + 5);

      // updatePoints();
      setcorrectoption(getoptions);
    } else {
      setincorrectpoint(incorrectpoint + 1);
    }
    if (getoptions == 'a') {
      setincorrectoption1(getoptions);
    }
    if (getoptions == 'b') {
      setincorrectoption2(getoptions);
    }
    if (getoptions == 'c') {
      setincorrectoption3(getoptions);
    }
    if (getoptions == 'd') {
      setincorrectoption4(getoptions);
    }
    // Pointsdata();
    // if (Points == 0) {
    //   navigation.navigate('Result', {
    //     paramkey: score,
    //     paramkey1: correctpoint,
    //     paramkey2: incorrectpoint,
    //     paramkey3: originalpoints,
    //   });
    // }
    // updatePoints();
    setTimeout(() => {
      if (count < 9) {
        setdisabled(true);
        setcount(count + 1);
        setcorrectoption(null);
        setincorrectoption1(null);
        setincorrectoption2(null);
        setincorrectoption3(null);
        setincorrectoption4(null);
        setspinner(true);
        setgetoptions(null);
        setoptions(generateoptionsuffle(quizees[count + 1]));
      } else setsubmit(false), setfinalsubmit(true);
      if (Points == 0) {
        setsubmit(false), setfinalsubmit(true);
      }
    }, 1000);
  }
  // console.log(score);
  return loading == true ? (
    <View>
      <Image
        style={{width: '100%', height: '80%', marginLeft: 5, marginTop: 90}}
        source={require('../../assets/Loding/gif.gif')}
      />
    </View>
  ) : (
    <View>
      <ImageBackground
        style={{
          height: '100%',
        }}
        source={require('../../assets/Game/gameback.png')}>
        <View>
          <View
            style={{
              backgroundColor: 'white',
              width: '98%',
              flexDirection: 'row',
              alignItems: 'center',
              height: 1,
              borderRadius: 20,
              justifyContent: 'center',
              marginTop: '4%',
              marginLeft: '1%',
            }}>
            <Text
              style={{
                backgroundColor: '#FF3366',
                borderRadius: 12,
                position: 'absolute',
                left: 0,
                height: 4,
                right: 0,
                width: `${progressbar}%`,
              }}
            />
          </View>
          <View
            style={{
              display: 'flex',
              height: '55%',
              width: '100%',
              alignItems: 'center',
            }}>
            <ImageBackground
              style={{
                height: '98%',
                width: '98%',
                alignSelf: 'center',
                alignItems: 'center',
              }}
              source={require('../../assets/Game/question.png')}>
              {quizees && (
                <View
                  style={{
                    height: '58%',
                    width: '80%',
                    // borderColor: '#ffffff',
                    borderColor: 'rgba(140, 90, 160, .01)',
                    borderWidth: 1,
                    alignItems: 'center',
                    marginTop: '15%',
                    marginLeft: '12%',
                  }}>
                  <Text style={{color: '#ffffff', fontSize: 18}}>
                    {quizees[count].question}
                  </Text>
                </View>
              )}
              <View
                style={{
                  marginTop: '10%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  height: 400,
                }}>
                <ImageBackground
                  style={{height: 130, width: 300}}
                  source={require('../../assets/Game/answ.png')}>
                  <TouchableOpacity
                    onPress={() => gettheoptions('a')}
                    disabled={finalsubmit}>
                    <View
                      style={{
                        height: '46%',
                        width: '75%',
                        // borderColor: '#ffffff',
                        borderColor: 'rgba(140, 90, 160, .01)',
                        borderWidth: 1,
                        alignItems: 'center',
                        marginTop: '15%',
                        marginLeft: '12%',
                      }}>
                      <Text
                        style={{
                          color:
                            primarycolor1 == true
                              ? '#f9ef38'
                              : correctoption == 'a'
                              ? 'green'
                              : incorrectoption1 == null
                              ? '#ffffff'
                              : 'red',
                          textAlign: 'center',
                          fontSize: 20,
                          fontFamily: 'RobotoCondensed-Regular',
                        }}>
                        {Options[0]}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
                <ImageBackground
                  style={{height: 130, width: 300}}
                  source={require('../../assets/Game/answ.png')}>
                  <TouchableOpacity
                    onPress={() => gettheoptions('b')}
                    disabled={finalsubmit}>
                    <View
                      style={{
                        height: '38%',
                        width: '75%',
                        // borderColor: '#ffffff',
                        borderColor: 'rgba(140, 90, 160, .01)',
                        borderWidth: 1,
                        alignItems: 'center',
                        marginTop: '15%',
                        marginLeft: '12%',
                      }}>
                      <Text
                        style={{
                          color:
                            primarycolor2 == true
                              ? '#f9ef38'
                              : correctoption == 'b'
                              ? 'green'
                              : incorrectoption2 == null
                              ? '#ffffff'
                              : 'red',
                          textAlign: 'center',
                          fontSize: 20,
                          fontFamily: 'RobotoCondensed-Regular',
                        }}>
                        {Options[1]}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
                <ImageBackground
                  style={{height: 130, width: 300}}
                  source={require('../../assets/Game/answ.png')}>
                  <TouchableOpacity
                    onPress={() => gettheoptions('c')}
                    disabled={finalsubmit}>
                    <View
                      style={{
                        height: '38%',
                        width: '75%',
                        // borderColor: '#ffffff',
                        borderWidth: 3,
                        borderColor: 'rgba(140, 90, 160, .01)',
                        borderWidth: 1,
                        alignItems: 'center',
                        marginTop: '15%',
                        marginLeft: '12%',
                      }}>
                      <Text
                        style={{
                          color:
                            primarycolor3 == true
                              ? '#f9ef38'
                              : correctoption == 'c'
                              ? 'green'
                              : incorrectoption3 == null
                              ? '#ffffff'
                              : 'red',
                          textAlign: 'center',
                          fontSize: 20,
                          fontFamily: 'RobotoCondensed-Regular',
                        }}>
                        {Options[2]}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
                <ImageBackground
                  style={{height: 130, width: 300}}
                  source={require('../../assets/Game/answ.png')}>
                  <TouchableOpacity
                    onPress={() => gettheoptions('d')}
                    disabled={finalsubmit}>
                    <View
                      style={{
                        height: '38%',
                        width: '75%',
                        // borderColor: '#ffffff',
                        borderWidth: 3,
                        borderColor: 'rgba(140, 90, 160, .01)',
                        borderWidth: 1,
                        alignItems: 'center',
                        marginTop: '15%',
                        marginLeft: '12%',
                      }}>
                      <Text
                        style={{
                          color:
                            primarycolor4 == true
                              ? '#f9ef38'
                              : correctoption == 'd'
                              ? 'green'
                              : incorrectoption4 == null
                              ? '#ffffff'
                              : 'red',

                          textAlign: 'center',
                          fontSize: 20,
                          fontFamily: 'RobotoCondensed-Regular',
                        }}>
                        {Options[3]}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: '10%',
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Animation', {
                        paramkey: score,
                      })
                    }>
                    <ImageBackground
                      style={{height: 50, width: 110}}
                      source={require('../../assets/Game/answ.png')}>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingTop: 15,
                          fontWeight: 'bold',
                          color: '#ffffff',
                        }}>
                        Exit
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                  {submit == true ? (
                    <View>
                      {Disabled == true ? (
                        <View>
                          <TouchableOpacity disabled={Disabled}>
                            <ImageBackground
                              style={{height: 50, width: 110}}
                              source={require('../../assets/Game/answ.png')}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  paddingTop: 15,
                                  fontWeight: 'bold',
                                  color: '#ffffff',
                                }}>
                                Submit
                              </Text>
                            </ImageBackground>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View>
                          <TouchableOpacity
                            onPress={changethevalue}
                            disabled={Disabled}>
                            <ImageBackground
                              style={{height: 50, width: 110}}
                              source={require('../../assets/Game/ans2.png')}>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  paddingTop: 15,
                                  fontWeight: 'bold',
                                  color: '#cdff33',
                                }}>
                                Submit
                              </Text>
                            </ImageBackground>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  ) : (
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Result', {
                            paramkey: score,
                            paramkey1: correctpoint,
                            paramkey2: incorrectpoint,
                            paramkey3: originalpoints,
                          })
                        }>
                        <ImageBackground
                          style={{height: 50, width: 110}}
                          source={require('../../assets/Game/answ.png')}>
                          <Text
                            style={{
                              textAlign: 'center',
                              paddingTop: 15,
                              fontWeight: 'bold',
                              color: '#cdff33',
                            }}>
                            Final Submit
                          </Text>
                        </ImageBackground>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
export default Game;
