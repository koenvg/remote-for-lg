import React, {FunctionComponent} from 'react';
import {StyleSheet, View} from 'react-native';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {MyText} from 'components/MyText';
import {Neumorphism} from 'components/Neumorphism';
import {TransparentButton} from 'components/TransparentButton';
import {useMyTheme} from 'theme';

export interface Props {}

export const VolumeControls: FunctionComponent<Props> = () => {
  const {theme} = useMyTheme();
  return (
    <Neumorphism
      lightColor={theme.primary[100]}
      darkColor={theme.primary[300]}
      shapeType={'flat'}
      radius={9999}>
      <View style={styles.container}>
        <TransparentButton>
          <MaterialCommunityIcons
            name="volume-plus"
            color={theme.primary[600]}
            size={24}
          />
        </TransparentButton>
        <MyText>Vol</MyText>
        <TransparentButton>
          <MaterialCommunityIcons
            name="volume-minus"
            color={theme.primary[600]}
            size={24}
          />
        </TransparentButton>
      </View>
    </Neumorphism>
  );
};

VolumeControls.displayName = 'VolumeControls';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    height: 150,
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
});
