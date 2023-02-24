import React from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');

const COLORS = {primary: '#282534', white: '#fff'};

const slides = [
  {
    id: '1',
    image: require('../assets/Slides/news.png'),
    title: 'Best Digital Solution',
    subtitle: 'Stay updated with whats happening in the world!',
  },
  {
    id: '2',
    image: require('../assets/Slides/game.png'),
    title: 'Achieve Your Goals',
    subtitle: 'Be ready. Be smart! Give correct answers, and earn rewards!',
  },
  {
    id: '3',
    image: require('../assets/Slides/post.png'),
    title: 'Increase Your Value',
    subtitle:
      'Share images/videos, and earn points by getting likes & comments!',
  },
];

const Slide = ({item}) => {
  const navigation = useNavigation();
  return (
    <View style={{alignItems: 'center'}}>
      <Image
        source={item?.image}
        style={{height: '75%', width, resizeMode: 'contain'}}
      />
      <View>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const OnboardingScreen = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  // const skip = () => {
  //   const lastSlideIndex = slides.length - 1;
  //   const offset = lastSlideIndex * width;
  //   ref?.current.scrollToOffset({offset});
  //   setCurrentSlideIndex(lastSlideIndex);
  // };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 0,
          }}>
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: COLORS.white,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{marginBottom: 20}}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{height: 100}}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  navigation.navigate('Method');
                }}>
                <Text
                  style={{fontWeight: 'bold', fontSize: 15, color: '#ffffff'}}>
                  GO TO LOGIN PAGE
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn1}
                onPress={() => {
                  navigation.navigate('News');
                }}>
                <Text
                  style={{fontWeight: 'bold', fontSize: 15, color: '#ffffff'}}>
                  GO TO NEWS
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <View />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={styles.btn}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: '#ffffff',
                  }}>
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primary}}>
      <StatusBar backgroundColor={COLORS.primary} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height: height * 0.75}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.white,
    fontSize: 13,

    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',

    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: '#FF3366',
    marginHorizontal: 3,
    borderRadius: 15,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#FF3366',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn1: {
    flex: 1,
    marginTop: 10,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#FF3366',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default OnboardingScreen;
