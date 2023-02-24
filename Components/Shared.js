import {View, Text, Share, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Shared = () => {
  const buildLink = async ({}) => {
    let link = await axios({
      method: 'POST',
      url: `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyCjWjlbrWTjiU1vxD2IOhKh35IIWB1PGWo`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        dynamicLinkInfo: {
          domainUriPrefix: 'https://metavypre.page.link/ezHe',
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
      console.log(shareURL);
    } catch (error) {
      console.log(error);
    }
    try {
      if (shareURL !== '') {
        await Share.share({
          message: `Here check out this news, ${shareURL}`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          shareLink();
        }}>
        <AntDesign
          name="sharealt"
          size={35}
          color="black"
          style={{top: 5, left: -15}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Shared;
