import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {useMyTheme} from 'theme';

export interface Props {}

export const MyText: FunctionComponent<TextProps> = ({style, ...props}) => {
  const {theme} = useMyTheme();
  return (
    <Text style={[styles.text, {color: theme.textColor}, style]} {...props} />
  );
};

MyText.displayName = 'MyText';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-Medium',
  },
});
