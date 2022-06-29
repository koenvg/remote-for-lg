/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {MyText} from 'components/MyText';
import {PrimaryButton} from 'components/PrimaryButton';
import {FunctionComponent} from 'react';
import {View} from 'react-native';
import {useRegisteredTVs} from 'services/useRegisteredTVs';
import {useNavigation} from 'pages/navigation';
import {TV} from 'services/tvService';

export const SelectTV: FunctionComponent = () => {
  const {data: tvs} = useRegisteredTVs();
  const navigate = useNavigation();

  const handleClick = (tv: TV) => () => {
    navigate.navigate('Home', tv);
  };
  if (!tvs) {
    return null;
  }
  return (
    <View
      style={{
        margin: 40,
        display: 'flex',
      }}>
      {tvs.map(tv => {
        return (
          <PrimaryButton
            key={tv.name}
            containerStyle={{marginVertical: 20}}
            onPress={handleClick(tv)}>
            <MyText>{tv.name}</MyText>
          </PrimaryButton>
        );
      })}
    </View>
  );
};

SelectTV.displayName = 'SelectTV';
