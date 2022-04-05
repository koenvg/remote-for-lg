import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colorScheme, theme} from '../theme';
import {PrimaryButton} from './PrimaryButton';

export interface Props {}

export const MyTabBar: FunctionComponent<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true} as any);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const color = isFocused
          ? theme.accent
          : colorScheme === 'light'
          ? theme.primary[800]
          : theme.primary[200];

        return (
          <PrimaryButton
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <Text style={{color}}>
              {typeof label === 'function'
                ? label({focused: isFocused, color, position: 'below-icon'})
                : label}
            </Text>
          </PrimaryButton>
        );
      })}
    </View>
  );
};

MyTabBar.displayName = 'MyTabBar';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor:
      colorScheme === 'light' ? theme.primary[200] : theme.primary[800],
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
