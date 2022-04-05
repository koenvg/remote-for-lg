import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {colorScheme, theme} from '../theme';

export interface Props {}

export const MyText: FunctionComponent<TextProps> = ({style, ...props}) => {
  return <Text style={[styles.text, style]} {...props} />;
};

MyText.displayName = 'MyText';

const styles = StyleSheet.create({
  text: {
    color: colorScheme === 'light' ? theme.primary[800] : theme.primary[100],
    fontFamily: 'Poppins-Medium',
  },
});
