import React, {FunctionComponent} from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
TransparentButton.displayName = 'TransparentButton';
