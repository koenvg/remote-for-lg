import React, {FunctionComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {Neumorphism} from 'components/Neumorphism';
import {TransparentButton} from 'components/TransparentButton';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useLGConnected} from 'api/lg/LGTVProvider';
import {MyText} from 'components/MyText';
import {useMyTheme} from 'theme';

export interface Props {}

export const ArrowControls: FunctionComponent<Props> = () => {
  const {api} = useLGConnected();
  const {theme} = useMyTheme();
  return (
    <Neumorphism
      lightColor={theme.neumorphismLight}
      darkColor={theme.neumorphismDark}
      shapeType={'flat'}
      radius={9999}
      style={{margin: 7}}>
      <View style={styles.circle}>
        <TransparentButton onPress={() => api?.press('UP')}>
          <MaterialCommunityIcons
            name="chevron-up"
            color={theme.iconColor}
            size={theme.iconSize}
          />
        </TransparentButton>
        <View style={styles.middleRow}>
          <TransparentButton onPress={() => api?.press('LEFT')}>
            <MaterialCommunityIcons
              name="chevron-left"
              color={theme.iconColor}
              size={theme.iconSize}
            />
          </TransparentButton>
          <TransparentButton onPress={() => api?.click()}>
            <Neumorphism
              radius={999}
              shapeType="basin"
              lightColor={theme.neumorphismLight}
              darkColor={theme.neumorphismDark}>
              <View style={styles.clickButton}>
                <MyText style={{fontSize: 18}}>Ok</MyText>
              </View>
            </Neumorphism>
          </TransparentButton>
          <TransparentButton onPress={() => api?.press('RIGHT')}>
            <MaterialCommunityIcons
              name="chevron-right"
              color={theme.iconColor}
              size={theme.iconSize}
            />
          </TransparentButton>
        </View>
        <TransparentButton onPress={() => api?.press('DOWN')}>
          <MaterialCommunityIcons
            name="chevron-down"
            color={theme.iconColor}
            size={theme.iconSize}
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
