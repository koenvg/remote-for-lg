import {MyText} from 'components/MyText';
import {Neumorphism} from 'components/Neumorphism';
import {TransparentButton} from 'components/TransparentButton';
import {either} from 'fp-ts';
import React, {FunctionComponent} from 'react';
import {Button, ScrollView, StyleSheet, View} from 'react-native';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {TV, tvService} from 'services/tvService';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from 'pages/navigation';
import {useMyTheme} from 'theme';

export interface Props {}

export const TVSettings: FunctionComponent<Props> = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const {theme} = useMyTheme();
  const {data} = useQuery('tvs', tvService.getRegisteredTVs);

  const {mutateAsync: updateDefault} = useMutation<void, unknown, TV>(
    'updateDefault',
    {
      mutationFn: async tv => {
        await tvService.setDefaultTV(tv)();
      },
      onSuccess: () => {
        queryClient.invalidateQueries('tvs');
      },
    },
  );

  const {mutateAsync: deleteTV} = useMutation<void, unknown, TV>('deleteTV', {
    mutationFn: async tv => {
      await tvService.deleteTV(tv)();
    },
    onSuccess: () => {
      queryClient.invalidateQueries('tvs');
    },
  });

  if (!data) return null;
  if (either.isLeft(data)) return null;

  return (
    <View style={styles.container}>
      <ScrollView>
        {data.right.map(tv => {
          return (
            <Neumorphism
              key={tv.name}
              shapeType="pressed"
              style={{marginBottom: 20}}
              lightColor={theme.neumorphismLight}
              darkColor={theme.neumorphismDark}>
              <View style={styles.tv}>
                <MyText style={{flex: 1}}>{tv.name}</MyText>
                {tv.default ? (
                  <MyText style={{color: theme.accent}}>Default</MyText>
                ) : (
                  <TransparentButton onPress={() => updateDefault(tv)}>
                    <MyText>Make default</MyText>
                  </TransparentButton>
                )}
                <TransparentButton onPress={() => deleteTV(tv)}>
                  <MaterialCommunityIcons
                    name="delete"
                    color={theme.iconColor}
                    size={18}
                  />
                </TransparentButton>
              </View>
            </Neumorphism>
          );
        })}
      </ScrollView>
      <Button
        title="Add tv"
        onPress={() => navigation.navigate('SearchTV')}
        color={theme.button.background}
      />
    </View>
  );
};

TVSettings.displayName = 'TVSettings';

const styles = StyleSheet.create({
  tv: {
    paddingHorizontal: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 30,
    marginHorizontal: 20,
  },
  tvList: {
    flex: 1,
  },
});
