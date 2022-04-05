import React, {FunctionComponent, useState} from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {theme} from '../theme';
import {MyText} from './MyText';
import {Neumorphism} from './Neumorphism';

export const PrimaryButton: FunctionComponent<TouchableOpacityProps> = ({
  children,
  onPress,
  style,
  ...rest
}) => {
  const [pressed, setPressed] = useState(false);
  return (
    <Neumorphism
      lightColor={theme.primary[100]}
      darkColor={theme.primary[300]}
      style={[styles.container]}
      shapeType={pressed ? 'pressed' : 'flat'}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={[styles.button, style]}
        {...rest}>
        {children}
      </TouchableOpacity>
    </Neumorphism>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 9999,
  },
  text: {
    color: theme.primary[800],
    fontSize: 16,
  },
});

PrimaryButton.displayName = 'PrimaryButton';
