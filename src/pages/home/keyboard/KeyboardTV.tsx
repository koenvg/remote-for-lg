/* eslint-disable react-native/no-inline-styles */
import {useFocusEffect} from '@react-navigation/native';
import {useLGConnected} from 'api/lg/LGTVProvider';
import {MyText} from 'components/MyText';
import React, {FunctionComponent, useRef} from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';

export interface Props {}

export const KeyboardTV: FunctionComponent<Props> = () => {
  const {api} = useLGConnected();

  const input = useRef<TextInput>(null);

  useFocusEffect(() => {
    if (!input.current) {
      return;
    }

    input.current.focus();
  });

  const handleKeyPress = async (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    try {
      await api.type(event.nativeEvent.key);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={{alignItems: 'center', marginTop: 20}}>
      <MyText style={{fontSize: 24}}>Start typing</MyText>
      <MyText style={{marginHorizontal: 16, opacity: 0.7}}>
        Make sure the keyboard is enabled and visible on the tv
      </MyText>
      <TextInput
        ref={input}
        style={{opacity: 0}}
        value=""
        onKeyPress={handleKeyPress}
        autoFocus
      />
    </View>
  );
};

KeyboardTV.displayName = 'KeyboardTV';
