import {LGAPI} from 'api/lg/LGAPI';
import {useLGConnected} from 'api/lg/LGTVProvider';
import {MyText} from 'components/MyText';
import {PrimaryButton} from 'components/PrimaryButton';
import {array, either, taskEither} from 'fp-ts';
import {flow, pipe} from 'fp-ts/lib/function';
import React, {FunctionComponent} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useQuery} from 'react-query';

export interface Props {}

function listApps(api: LGAPI) {
  return pipe(
    taskEither.tryCatch(() => api.listApps(), String),
    taskEither.map(
      flow(
        array.filter(app => app.visible && app.defaultWindowType === 'card'),
      ),
    ),
  );
}

export const TVApps: FunctionComponent<Props> = () => {
  const {api} = useLGConnected();

  const {data} = useQuery('tv_apps', listApps(api));
  if (!data) return null;
  if (either.isLeft(data)) return null;

  return (
    <ScrollView>
      <View style={styles.appContainer}>
        {data.right.map(app => {
          return (
            <PrimaryButton
              key={app.id}
              containerStyle={styles.button}
              onPress={() => api?.launchApp(app.id)}>
              <MyText>{app.title}</MyText>
            </PrimaryButton>
          );
        })}
      </View>
    </ScrollView>
  );
};

TVApps.displayName = 'TVApps';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  button: {
    margin: '5%',
    width: '40%',
  },
});
