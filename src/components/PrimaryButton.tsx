import React, {FunctionComponent, useState} from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {theme} from '../theme';
import {Neumorphism} from './Neumorphism';

export interface Props {
  onPress?(event: GestureResponderEvent): void;
  style?: StyleProp<ViewStyle>;
}

export const PrimaryButton: FunctionComponent<Props> = ({
  children,
  onPress,
  style,
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
        style={[styles.button, style]}>
        <Text style={styles.text}>{children}</Text>
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
