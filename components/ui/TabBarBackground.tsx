
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function TabBarBackground() {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: 'rgba(255, 255, 255, 0.85)', 
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        },
      ]}
    />
  );
}
