import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const countryOptions = [
  { label: 'United States', value: 'United States' },
  { label: 'United Kingdom', value: 'United Kingdom' },
  { label: 'Canada', value: 'Canada' },
  { label: 'Australia', value: 'Australia' },
  { label: 'Ghana', value: 'Ghana' },
  { label: 'Nigeria', value: 'Nigeria' },
  { label: 'Kenya', value: 'Kenya' },
  { label: 'South Africa', value: 'South Africa' },
  { label: 'India', value: 'India' },
  { label: 'Brazil', value: 'Brazil' },
  { label: 'France', value: 'France' },
  { label: 'Germany', value: 'Germany' },
  { label: 'Italy', value: 'Italy' },
  { label: 'Spain', value: 'Spain' },
  { label: 'Mexico', value: 'Mexico' },
  { label: 'China', value: 'China' },
  { label: 'Japan', value: 'Japan' },
  { label: 'South Korea', value: 'South Korea' },
  { label: 'Egypt', value: 'Egypt' },
  { label: 'Turkey', value: 'Turkey' },
];

const CountrySelector = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select your country</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedCountry(value)}
        items={countryOptions}
        placeholder={{ label: 'Select a country...', value: null }}
        style={{
          inputIOS: styles.inputIOS,
          inputAndroid: styles.inputAndroid,
          placeholder: styles.placeholder,
        }}
        useNativeAndroidPickerStyle={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  inputIOS: {
    height: 50,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    height: 50,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingHorizontal: 10,
  },
  placeholder: {
    color: 'gray',
  },
});

export default CountrySelector;
