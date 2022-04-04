import {task, taskEither, array, either, readonlyArray} from 'fp-ts';
import {flow, pipe} from 'fp-ts/lib/function';
import React, {FunctionComponent} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useQuery} from 'react-query';
import {
  discoverServices,
  fetchDeviceDescription,
} from '../../api/networkDiscovery';
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

export const SearchDevices: FunctionComponent<Props> = () => {
  const {data, isFetching, refetch} = useQuery('devices', discoverTVS());
  const navigation = useNavigation();
  const addTV = (tv: DiscoveredTV) => {
    navigation.navigate('AddTV', tv);
  };

  if (isFetching) return <Text>Fetching...</Text>;

  if (!data) return null;

  if (either.isLeft(data)) return <Text>Error {data.left}</Text>;

  if (data.right.length === 0) {
    return (
      <View style={{margin: 20}}>
        <Text>Sorry, I can't seem to find your tv.</Text>
        <Text>- Check if your tv is on and connected to the wifi</Text>
        <Text>- Check if you are on the same network as your tv</Text>
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

SearchDevices.displayName = 'SearchDevices';
