import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Btn = ({bgcolor, btnLabel, textColor, Press}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={Press}
        style={{
          backgroundColor: bgcolor,
          borderRadius: 100,
          alignItems: 'center',
          width: 300,
          paddingVertical: 5,
          marginVertical: 10,
        }}>
        <Text style={{color: textColor, fontSize: 25, fontWeight: 'bold'}}>
          {btnLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Btn;
