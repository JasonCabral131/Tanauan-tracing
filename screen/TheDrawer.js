import React from 'react';

import {StyleSheet, View} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Title, Caption, Drawer} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {logout} from '../redux/actions/auth.actions';
import {useSelector} from 'react-redux';
const TheDrawerScreen = props => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.DrawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <Avatar.Image
                source={require('./../assets/icons/logo.png')}
                size={90}
              />
              <View style={{justifyContent: 'center', alignContent: 'center'}}>
                <Title style={{textAlign: 'center', padding: 5}}>
                  {' '}
                  Tanauan Contact Tracing
                </Title>
                <Caption style={{textAlign: 'center'}}>
                  {user ? user.branchName : ''}
                </Caption>
              </View>
            </View>
            <View style={styles.row}></View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />

            <DrawerItem
              icon={({color, size}) => {
                return (
                  <Icon
                    name="transit-connection-variant"
                    color={color}
                    size={size}
                  />
                );
              }}
              label="Tracer"
              onPress={() => {
                props.navigation.navigate('tracer');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="history" color={color} size={size} />
              )}
              label="History"
              onPress={() => {
                props.navigation.navigate('history');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}></Drawer.Section>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Logout"
          onPress={() => handleLogout()}
        />
      </Drawer.Section>
    </View>
  );
};
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    borderTopWidth: 1,
    marginHorizontal: 20,
  },
  bottomDrawerSection: {
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default TheDrawerScreen;
