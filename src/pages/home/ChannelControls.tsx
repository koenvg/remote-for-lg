import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Neumorphism} from '../../components/Neumorphism';
import {TransparentButton} from '../../components/TransparentButton';
import {theme} from '../../theme';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export interface Props {}

export const ChannelControls: FunctionComponent<Props> = () => {
  return (
    <Neumorphism
      lightColor={theme.primary[100]}
      darkColor={theme.primary[300]}
      shapeType={'flat'}
      radius={9999}>
      <View style={styles.container}>
        <TransparentButton>
          <MaterialCommunityIcons
            name="chevron-up"
            color={theme.primary[600]}
            size={24}
          />
        </TransparentButton>
        <Text>Ch</Text>
        <TransparentButton>
          <MaterialCommunityIcons
            name="chevron-down"
            color={theme.primary[600]}
            size={24}
          />
        </TransparentButton>
      </View>
    </Neumorphism>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    height: 150,
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
});
ChannelControls.displayName = 'ChannelControls';