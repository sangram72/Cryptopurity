import {View, Text, StyleSheet, Share, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';

const refer = ({phoneNumber}) => {
  const buildLink = async () => {
    let link = await axios({
      method: 'POST',
      url: 'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyAxzg6pZ8mkzd9u1Pz04OWqeKQDorcoTBs',
      headers: {
        'Content-Type': ' application/json',
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
      link.data.shortLink;
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
          message: `Here check out this cool anime bruh, ${shareURL}`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>refer</Text>
    </View>
  );
};

export default refer;
