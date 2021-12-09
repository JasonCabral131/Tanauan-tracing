import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  PixelRatio,
  Image,
} from 'react-native';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {getTimeInUser} from '../../redux/actions/timein.action';
import {Subheading, DataTable, Badge} from 'react-native-paper';
import {toCapitalized} from '../../helpers/reusable';

const HistoryTimeIn = props => {
  const {container} = styles;
  const {user} = useSelector(state => state.auth);
  const [Loading, setLoading] = useState(false);
  const {timeInUsers} = useSelector(state => state.timeinUser);
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();
  const fetch = async () => {
    setRefreshing(true);
    const res = await dispatch(getTimeInUser({branch_Id: user._id}));
    setRefreshing(false);
    return res;
  };
  const onRefresh = useCallback(async () => {
    fetch();
  }, []);

  useEffect(() => {
    fetch();
  }, [user]);
  const {width, height} = Dimensions.get('window');
  const color = ['#ffb6c1', '#ffc34c'];
  return (
    <SafeAreaView style={container}>
      <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
        <MIcons size={34} name="arrow-left" />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {timeInUsers.length < 1 ? (
          <View style={styles.historyContainer}>
            <Image
              source={require('./../../assets/icons/history.png')}
              style={{height: 100, width: 100}}
            />
            <Subheading style={{color: 'red', marginTop: 10}}>
              No History Found
            </Subheading>
          </View>
        ) : (
          timeInUsers.map((data, index) => {
            return (
              <View
                style={{width: '100%', padding: 10, borderTopColor: '#c0c0c0'}}>
                <Badge
                  style={{
                    padding: 10,
                    width: 100,
                    height: 50,

                    backgroundColor: index % 2 === 0 ? color[0] : color[1],
                    justifySelf: 'flex-start',
                    alignSelf: 'flex-start',
                  }}>
                  <Subheading>{data.date}</Subheading>
                </Badge>

                <ScrollView horizontal contentContainerStyle={{width: width}}>
                  <DataTable
                    style={{
                      marginTop: 10,
                      width: width,
                      elevation: 2,
                    }}>
                    <DataTable.Header>
                      <DataTable.Title>Name</DataTable.Title>
                      <DataTable.Title numeric>Vaccinated</DataTable.Title>
                    </DataTable.Header>
                    {data.value.map(datainfo => {
                      return (
                        <DataTable.Row>
                          <DataTable.Cell>
                            <View style={{width: '100%'}}>
                              <Text
                                style={{
                                  justifyContent: 'center',
                                  textAlign: 'center',
                                }}>
                                {' '}
                                {toCapitalized(
                                  `${datainfo.user.name} ${datainfo.user.middleName} ${datainfo.user.lastName}`,
                                )}
                              </Text>
                            </View>
                          </DataTable.Cell>
                          <DataTable.Cell numeric>
                            {toCapitalized(
                              `${datainfo.user.isVaccinated.Vaccinated}`,
                            )}
                          </DataTable.Cell>
                        </DataTable.Row>
                      );
                    })}
                  </DataTable>
                </ScrollView>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default HistoryTimeIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollView: {
    flex: 1,
    width: '100%',
    padding: 1,
  },
  historyContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
