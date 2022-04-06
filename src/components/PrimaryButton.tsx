import React, {FunctionComponent, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {theme} from '../theme';
import {Neumorphism} from './Neumorphism';

interface Props extends TouchableOpacityProps {
  containerStyle?: ViewStyle;
  radius?: number;
}

export const PrimaryButton: FunctionComponent<Props> = ({
  children,
  onPress,
  style,
  containerStyle,
  radius,
  ...rest
}) => {
  const [pressed, setPressed] = useState(false);
  return (
    <Neumorphism
      lightColor={theme.neumorphismLight}
      darkColor={theme.neumorphismDark}
      style={[styles.container, containerStyle]}
      radius={radius}
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
