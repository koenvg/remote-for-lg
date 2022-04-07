import {MyText} from 'components/MyText';
import {Neumorphism} from 'components/Neumorphism';
import {TransparentButton} from 'components/TransparentButton';
import {either} from 'fp-ts';
import React, {FunctionComponent} from 'react';
import {Button, ScrollView, StyleSheet, View} from 'react-native';
import {useQuery} from 'react-query';
import {tvService} from 'services/tvService';
import {colorScheme, theme} from 'theme';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from 'pages/navigation';

export interface Props {}

export const TVSettings: FunctionComponent<Props> = () => {
  const navigation = useNavigation();
  const {data} = useQuery('tvs', tvService.getRegisteredTVs);

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
                  <TransparentButton>
                    <MyText>Make default</MyText>
                  </TransparentButton>
                )}
                <TransparentButton>
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
        color={
          colorScheme === 'light' ? theme.primary[700] : theme.primary[900]
        }
      />
    </View>
  );
};

TVSettings.displayName = 'TVSettings';

const styles = StyleSheet.create({
  tv: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
