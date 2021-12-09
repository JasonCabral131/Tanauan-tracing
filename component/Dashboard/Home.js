import React, {useState, useEffect, useCallback} from 'react';
import {RefreshControl, View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Card, Title, DataTable, Caption} from 'react-native-paper';

import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {getTimeInUser} from '../../redux/actions/timein.action';
import {toCapitalized} from '../../helpers/reusable';
const optionsPerPage = [10, 10, 10];
const Home = props => {
  const {container} = styles;
  const {user} = useSelector(state => state.auth);
  const {timeInUsers} = useSelector(state => state.timeinUser);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  const onRefresh = useCallback(async () => {
    fetch();
  }, []);
  const dispatch = useDispatch();
  const fetch = async () => {
    setRefreshing(true);
    const res = await dispatch(getTimeInUser({branch_Id: user._id}));
    setRefreshing(false);
    return res;
  };
  useEffect(() => {
    fetch();
  }, [user]);
  const currentDate = () => {
    const date = new Date();
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };
  const WhoEnterToday = () => {
    const List = timeInUsers
      .filter(data => data.date === currentDate())
      .map(data => {
        return data;
      });
    if (List.length > 0) {
      return {List: List[0]};
    }
    return {List: null};
  };
  return (
    <SafeAreaView style={container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Card>
          <Card.Title title="Visited Today" />
          <Card.Content style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={{color: '#59c3c3', fontSize: 18, margin: 1}}>
              {WhoEnterToday().List
                ? WhoEnterToday().List.value.length.toString()
                : ''}
            </Text>
            <Caption style={{marginLeft: 5, marginTop: 5}}>
              {WhoEnterToday().List
                ? WhoEnterToday().List.value.length > 1
                  ? ' User that enter your Branch'
                  : ' Users that enter your Branch'
                : 'No one enter your branch'}
            </Caption>
          </Card.Content>
        </Card>
        <DataTable style={{marginTop: 10}}>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>

            <DataTable.Title numeric>Vaccinated</DataTable.Title>
          </DataTable.Header>
          {WhoEnterToday().List
            ? WhoEnterToday().List.value.map(data => {
                return (
                  <DataTable.Row>
                    <DataTable.Cell>
                      <View style={{width: '100%'}}>
                        <Caption
                          style={{
                            justifyContent: 'center',
                            textAlign: 'center',
                          }}>
                          {' '}
                          {toCapitalized(
                            `${data.user.name} ${data.user.middleName} ${data.user.lastName}`,
                          )}
                        </Caption>
                      </View>
                    </DataTable.Cell>

                    <DataTable.Cell numeric>
                      {toCapitalized(`${data.user.isVaccinated.Vaccinated}`)}
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })
            : null}
        </DataTable>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: '100%',
    padding: 10,
  },
});
