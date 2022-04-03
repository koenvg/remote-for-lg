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
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <LinearGradient
        colors={[theme.primary[800], theme.primary[900]]}
        style={[styles.gradient]}>
        <Text style={styles.text}>{children}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 50,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

GradientButton.displayName = 'GradientButton';
