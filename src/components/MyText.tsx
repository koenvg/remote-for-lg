import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {theme} from '../theme';

export interface Props {}

export const MyText: FunctionComponent<TextProps> = ({style, ...props}) => {
  return <Text style={[styles.text, style]} {...props} />;
};

MyText.displayName = 'MyText';

const styles = StyleSheet.create({
  text: {
    color: theme.primary[800],
    fontFamily: 'Poppins-Medium',
  },
});
