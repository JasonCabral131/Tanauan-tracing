import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TheDrawerScreen from './TheDrawer';
import {DasboardStackScreen} from './TheScreenStack';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';

import Tracing from '../component/TimeIn/Tracing';
import HistoryTimeIn from '../component/TimeIn/TimeIn';
const Drawer = createDrawerNavigator();
const TheNavigation = props => {
  const {container} = styles;
  return (
    <NavigationContainer options={{title: 'Vaccinator'}}>
      <Drawer.Navigator
        drawerContent={props => <TheDrawerScreen {...props} />}
        screenOptions={{
          headerShown: false,
        }}>
        <Drawer.Screen name="Dashboard" component={DasboardStackScreen} />
        <Drawer.Screen name="tracer" component={Tracing} />
        <Drawer.Screen name="history" component={HistoryTimeIn} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default TheNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
console.disableYellowBox = true;
