import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Title,
  Text,
  Provider,
  ActivityIndicator,
  Caption,
} from 'react-native-paper';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Io from 'react-native-vector-icons/Ionicons';
import RNSystemSounds from '@dashdoc/react-native-system-sounds';
import {useDispatch, useSelector} from 'react-redux';
import {loginBranch} from '../redux/actions/auth.actions';
const {width} = Dimensions.get('window');
const TheLogin = props => {
  const {authenticating} = useSelector(state => state.auth);
  const [cameraView, setCameraView] = useState(false);
  const dispatch = useDispatch();
  const ifScanneed = e => {
    RNSystemSounds.beep();
    const branch_id = typeof e == 'object' ? e.data : e;
    dispatch(loginBranch({_id: branch_id}));
  };

  return (
    <Provider>
      {authenticating ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator animating={true} size={90} color={'#ffd700'} />
          <Caption>Authenticating...</Caption>
        </View>
      ) : (
        <KeyboardAvoidingView
          style={{
            flex: 1,
            margin: 0,
            padding: 0,
            width: '100%',
            height: '100%',
          }}>
          <ImageBackground
            source={require('./../assets/icons/hall.jpg')}
            style={styles.imgBackground}
            resizeMode="stretch">
            <View style={styles.boxLogin}>
              <View style={styles.circleBox}>
                <Image
                  source={require('./../assets/icons/logo.png')}
                  style={styles.imgStyle}
                />
                <Title style={styles.tstyle}>Branch QRCODE</Title>
              </View>

              <View style={styles.qrcode_container}>
                <QRCodeScanner
                  containerStyle={{
                    backgroundColor: '#009387',
                    height: '100%',
                    position: 'relative',
                  }}
                  onRead={ifScanneed}
                  permissionDialogMessage="Need Permission To Access Camera"
                  flashMode={RNCamera.Constants.FlashMode.on}
                  reactivate={true}
                  reactivateTimeout={1500}
                  showMarker={true}
                  fadeIn={true}
                  cameraType={cameraView ? 'back' : 'front'}
                  cameraStyle={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                  }}
                  markerStyle={{borderColor: '#fff', borderRadius: 10}}
                  bottomContent={
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        left: '35%',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        setCameraView(!cameraView);
                      }}>
                      <Text
                        style={{
                          fontSize: 21,
                          color: 'white',
                        }}>
                        <Io
                          name="camera-reverse-outline"
                          color={'white'}
                          size={30}
                        />{' '}
                      </Text>
                    </TouchableOpacity>
                  }
                />
              </View>
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      )}
    </Provider>
  );
};
export default TheLogin;
const styles = StyleSheet.create({
  imgBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: '100%',
  },
  boxLogin: {
    width: '90%',
    height: 500,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    shadowColor: '#e4eeed',
    position: 'relative',
    opacity: 0.9,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circleBox: {
    padding: 10,
    position: 'absolute',
    top: -50,
    left: '30%',
    width: 150,
    height: 150,
    backgroundColor: '#ffffff',
    borderRadius: 150 / 2,
    shadowColor: '#e4eeed',
    elevation: 40,
  },
  tstyle: {
    marginTop: 20,
    display: 'flex',
    alignSelf: 'center',
    fontSize: 15,
    textAlign: 'center',
    width: width,

    letterSpacing: 5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#ffffff',
  },
  imgStyle: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
  },
  qrcode_container: {
    borderWidth: 0.5,
    borderColor: '#3b3a39',
    width: '90%',
    height: 400,

    position: 'relative',
    overflow: 'hidden',
    marginTop: 60,
  },
  Modalcontainer: {
    backgroundColor: 'white',
    padding: 20,
    width: '95%',
    display: 'flex',
    justifySelf: 'center',
    alignSelf: 'center',
    zIndex: 2,
  },
});
