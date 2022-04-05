import React, {FunctionComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {Neumorphism} from '../../components/Neumorphism';
import {TransparentButton} from '../../components/TransparentButton';
import {theme} from '../../theme';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useLGTVapi} from '../../api/lg/LGTVProvider';
import {MyText} from '../../components/MyText';

export interface Props {}

export const ArrowControls: FunctionComponent<Props> = () => {
  const {api} = useLGTVapi();
  return (
    <Neumorphism
      lightColor={theme.primary[100]}
      darkColor={theme.primary[300]}
      shapeType={'flat'}
      radius={9999}
      style={{margin: 7}}>
      <View style={styles.circle}>
        <TransparentButton onPress={() => api?.press('UP')}>
          <MaterialCommunityIcons
            name="chevron-up"
            color={theme.primary[600]}
            size={24}
          />
        </TransparentButton>
        <View style={styles.middleRow}>
          <TransparentButton onPress={() => api?.press('LEFT')}>
            <MaterialCommunityIcons
              name="chevron-left"
              color={theme.primary[600]}
              size={24}
            />
          </TransparentButton>
          <TransparentButton onPress={() => api?.click()}>
            <Neumorphism
              radius={999}
              shapeType="basin"
              lightColor={theme.primary[100]}
              darkColor={theme.primary[300]}>
              <View style={styles.clickButton}>
                <MyText style={{fontSize: 18}}>Ok</MyText>
              </View>
            </Neumorphism>
          </TransparentButton>
          <TransparentButton onPress={() => api?.press('RIGHT')}>
            <MaterialCommunityIcons
              name="chevron-right"
              color={theme.primary[600]}
              size={24}
            />
          </TransparentButton>
        </View>
        <TransparentButton onPress={() => api?.press('DOWN')}>
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
  circle: {
    width: 200,
    height: 200,

    display: 'flex',
    overflow: 'hidden',
  },
  middleRow: {
    flexDirection: 'row',
    display: 'flex',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    alignContent: 'stretch',
  },
  clickButton: {
    width: 70,
    height: 70,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

ArrowControls.displayName = 'ArrowControls';
