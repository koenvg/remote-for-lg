import React, {FunctionComponent} from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from '../theme';

export interface Props {
  onPress?(event: GestureResponderEvent): void;
  style?: StyleProp<ViewStyle>;
}

export const GradientButton: FunctionComponent<Props> = ({
  children,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity style={[{minHeight: 50}, style]} onPress={onPress}>
      <LinearGradient
        colors={[theme[800], theme[900]]}
        style={[styles.gradient]}>
        <Text style={styles.text}>{children}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

GradientButton.displayName = 'GradientButton';
