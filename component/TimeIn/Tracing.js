import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert, Text} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import RNSystemSounds from '@dashdoc/react-native-system-sounds';
import {RNCamera} from 'react-native-camera';
import {
  Subheading,
  Caption,
  Headline,
  Avatar,
  ActivityIndicator,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {toCapitalized} from '../../helpers/reusable';
import axiosInstance from './../../helpers/axiosInstance';
import {getTimeInUser} from '../../redux/actions/timein.action';
const Tracing = props => {
  const {qrcodeContainer, addContainerView, constainerLoading} = styles;
  const [Loading, setLoading] = useState(false);
  const [cameratype, setCameraType] = useState(false);
  const {user, token} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const ifScanneed = async data => {
    try {
      RNSystemSounds.beep();
      setLoading(true);
      RNSystemSounds.beep();
      if (typeof data == 'object') {
        const userId = data.data;
        const obj = {token, user: userId};
        const res = await axiosInstance.post(
          '/api/timein/time-in-user-to-branch',
          obj,
        );
        if (res.status === 200) {
          console.log(res.data);

          await dispatch(getTimeInUser({branch_Id: user._id}));
          Alert.alert('Success', res.data.msg);
          setLoading(false);
          return;
        }
        setLoading(false);
        Alert.alert('Success', res.data.msg);
        console.log(res.data);
      } else {
        setLoading(false);
        Alert.alert('Warning', 'Invalid Token');
      }
    } catch (e) {
      console.log(e.response.data);
      Alert.alert('Warning', res.response.data.msg);
      setLoading(false);
    }
  };

  return Loading ? (
    <View style={constainerLoading}>
      <ActivityIndicator animating={true} color={'#ffb247'} size="50" />
      <Caption>Authenticating ...</Caption>
      <Subheading>wait for response</Subheading>
    </View>
  ) : (
    <View style={addContainerView}>
      <View style={qrcodeContainer}>
        <QRCodeScanner
          containerStyle={{
            backgroundColor: '#ffffff',
            height: '100%',
          }}
          onRead={ifScanneed}
          permissionDialogMessage="Need Permission To Access Camera"
          flashMode={RNCamera.Constants.FlashMode.on}
          reactivate={true}
          reactivateTimeout={1500}
          showMarker={true}
          fadeIn={true}
          cameraType={cameratype ? 'front' : 'back'}
          cameraStyle={{
            width: '100%',
            height: '100%',
          }}
          markerStyle={{borderColor: '#fff', borderRadius: 10}}
        />

        <TouchableOpacity
          onPress={() => setCameraType(!cameratype)}
          style={styles.changingCamera}>
          <Icon size={30} name="camera-retake-outline" color={'#ffffff'} />
        </TouchableOpacity>
      </View>
      <View style={styles.headingContainer}>
        <LinearGradient
          start={{x: 0.6, y: 0.35}}
          end={{x: 0.5, y: 2.0}}
          locations={[0.4, 1, 0.6]}
          colors={['#fafc77', '#47e2ed', '#192f6a']}
          style={{width: 100, height: 10, marginTop: 10}}
        />
        <Headline style={{textAlign: 'left', display: 'flex'}}>
          Tanauan Contact Tracing
        </Headline>
        <View style={styles.vaccinatorContainer}>
          <View style={{marginLeft: 5}}>
            <Subheading>
              {' '}
              {user ? toCapitalized(`${user.branchName}`) : ''}
            </Subheading>
            <Caption style={{textAlign: 'center', display: 'flex'}}>
              Exclusive in Tanuan
            </Caption>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Tracing;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: 0,
    padding: 0,
  },
  addContainerView: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  qrcodeContainer: {
    height: '80%',
    width: '100%',
    position: 'relative',
  },
  changingCamera: {
    position: 'absolute',
    bottom: 50,
    left: '45%',
    color: '#ffffff',
  },
  constainerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  headingContainer: {
    paddingLeft: '10%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    height: '20%',
  },
  vaccinatorContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  yourVaccine: {
    textAlign: 'center',
    display: 'flex',
    fontSize: 10,
    borderTopColor: '#b1bb97',
    borderTopWidth: 1,
    padding: 5,
  },
});
