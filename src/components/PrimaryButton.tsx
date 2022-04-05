import React, {FunctionComponent, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {theme} from '../theme';
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
      lightColor={theme.neumorphismLight}
      darkColor={theme.neumorphismDark}
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
});

PrimaryButton.displayName = 'PrimaryButton';
