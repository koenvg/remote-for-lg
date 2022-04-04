import React, {FunctionComponent} from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

export interface Props {
  onPress?(event: GestureResponderEvent): void;
  style?: StyleProp<ViewStyle>;
}

export const TransparentButton: FunctionComponent<Props> = ({
  style,
  onPress,
  children,
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
TransparentButton.displayName = 'TransparentButton';
