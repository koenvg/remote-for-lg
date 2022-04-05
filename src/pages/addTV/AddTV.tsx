import {useRoute} from '@react-navigation/native';
import {taskEither} from 'fp-ts';
import {pipe} from 'fp-ts/lib/function';
import React, {FunctionComponent, useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {useMutation} from 'react-query';
import {authorizeApp} from '../../api/lg/LGAPI';
import {MyText} from '../../components/MyText';
import {tvService} from '../../services/tvService';
import {theme} from '../../theme';
import {AddTVRoute, useNavigation} from '../navigation';

export interface Props {}

export const AddTV: FunctionComponent<Props> = ({}) => {
  const {params: tv} = useRoute<AddTVRoute['route']>();
  const [name, setName] = useState(tv.description.friendlyName);
  const navigation = useNavigation();
  const {isLoading, isError, mutate} = useMutation({
    mutationFn: () => {
      return pipe(
        taskEither.tryCatch(
          () => authorizeApp(tv.info.address),
          e => new Error((e as any).error),
        ),
        taskEither.chain(auth =>
          tvService.registerTV({
            clientKey: auth['client-key'],
            ip: tv.info.address,
            name,
          }),
        ),
        taskEither.map(registeredTV =>
          navigation.navigate('Home', registeredTV),
        ),
        taskEither.mapLeft(e => {
          throw e;
        }),
      )();
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <MyText>Name: </MyText>
        <TextInput onChangeText={setName} value={name} style={styles.input} />
      </View>
      <MyText style={styles.info}>
        Once you press the button, the app will try to request access from your
        TV. Please press ok on the tv.
      </MyText>

      <Button
        disabled={isLoading}
        color={theme.primary[600]}
        title="Authorize and save"
        onPress={() => mutate()}
      />

      <View style={styles.extraInfo}>
        {isLoading ? (
          <MyText style={styles.connectingInfo}>
            Please accept the connection request on your tv
          </MyText>
        ) : null}
        {isError ? (
          <MyText style={styles.error}>
            Something went wrong authorizing the app.
          </MyText>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  extraInfo: {
    marginTop: 10,
  },
  connectingInfo: {
    color: '#16a34a',
  },
  error: {
    color: '#dc2626',
  },
  container: {
    margin: 20,
  },
  info: {
    marginVertical: 10,
  },
  input: {
    borderColor: theme.primary[800],
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  formGroup: {
    display: 'flex',
  },
});

AddTV.displayName = 'AddTV';
