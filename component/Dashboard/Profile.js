import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';

const Profile = props => {
  const {container} = styles;
  return (
    <ImageBackground
      source={require('./../../assets/icons/profilebackgroun.png')}
      resizeMode="stretch"
      style={container}>
      <Text>Profile</Text>
    </ImageBackground>
  );
};
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
