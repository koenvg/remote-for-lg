import {task, taskEither, array, either, readonlyArray} from 'fp-ts';
import {flow, pipe} from 'fp-ts/lib/function';
import AnimatedLottieView from 'lottie-react-native';
import React, {FunctionComponent} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {useQuery} from 'react-query';
import {
  discoverServices,
  fetchDeviceDescription,
} from '../../api/networkDiscovery';
import {MyText} from '../../components/MyText';
import {colorScheme, theme} from '../../theme';
import {keepFirst} from '../../utils/array-utils';
import {useNavigation} from '../navigation';
import {DiscoveredTV} from './types';
import searchAnimation from './searchDevices.json';

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

  if (isFetching) {
    return (
      <View style={styles.loadingContainer}>
        <MyText style={styles.loadingText}>Scanning network...</MyText>
        <AnimatedLottieView
          style={styles.loadingAnimation}
          autoPlay
          loop
          source={searchAnimation}
          colorFilters={[
            {
              keypath: 'searching',
              color:
                colorScheme === 'light'
                  ? theme.primary[400]
                  : theme.primary[100],
            },
          ]}
        />
      </View>
    );
  }

  if (!data) return null;

  if (either.isLeft(data)) return <MyText>Error {data.left}</MyText>;

  if (data.right.length === 0) {
    return (
      <View style={{margin: 20}}>
        <MyText>Sorry, I can't seem to find your tv.</MyText>
        <MyText>- Check if your tv is on and connected to the wifi</MyText>
        <MyText>- Check if you are on the same network as your tv</MyText>
        <Button
          onPress={() => refetch()}
          color={
            colorScheme === 'light' ? theme.primary[700] : theme.primary[900]
          }
          title="Retry"
        />
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
              color={theme.primary[700]}
              onPress={() => addTV(tv)}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
  loadingText: {
    fontSize: 26,
  },
  loadingAnimation: {
    width: '100%',
  },
  container: {
    margin: 30,
  },
});

SearchTV.displayName = 'SearchTV';
