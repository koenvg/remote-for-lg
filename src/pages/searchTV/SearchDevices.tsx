import {task, taskEither, array, either, readonlyArray} from 'fp-ts';
import {flow, pipe} from 'fp-ts/lib/function';
import React, {FunctionComponent} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useQuery} from 'react-query';
import {
  discoverServices,
  fetchDeviceDescription,
} from '../../api/networkDiscovery';
import {MyText} from '../../components/MyText';
import {theme} from '../../theme';
import {keepFirst} from '../../utils/array-utils';
import {useNavigation} from '../navigation';
import {DiscoveredTV} from './types';
export interface Props {}

const discoverTVS = () => {
  return pipe(
    taskEither.tryCatch(discoverServices, String),
    taskEither.chainTaskK(
      flow(
        array.filter(service => service.response.server.includes('WebOS')),
        keepFirst(s => s.info.address),
        array.map(service =>
          pipe(
            taskEither.tryCatch(
              () => fetchDeviceDescription(service.response),
              String,
            ),
            taskEither.map(description => ({info: service.info, description})),
          ),
        ),
        task.sequenceArray,
        task.map(readonlyArray.rights),
      ),
    ),
  );
};

export const SearchTV: FunctionComponent<Props> = () => {
  const {data, isFetching, refetch} = useQuery('devices', discoverTVS());
  const navigation = useNavigation();
  const addTV = (tv: DiscoveredTV) => {
    navigation.navigate('AddTV', tv);
  };

  if (isFetching) return <MyText>Fetching...</MyText>;

  if (!data) return null;

  if (either.isLeft(data)) return <MyText>Error {data.left}</MyText>;

  if (data.right.length === 0) {
    return (
      <View style={{margin: 20}}>
        <MyText>Sorry, I can't seem to find your tv.</MyText>
        <MyText>- Check if your tv is on and connected to the wifi</MyText>
        <MyText>- Check if you are on the same network as your tv</MyText>
        <Button onPress={() => refetch()} title="Retry" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {data.right.map(tv => {
        return (
          <View key={tv.info.address}>
            <Button
              title={tv.description.friendlyName}
              color={theme.primary[600]}
              onPress={() => addTV(tv)}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
});

SearchTV.displayName = 'SearchTV';
