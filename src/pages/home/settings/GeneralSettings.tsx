import {MyText} from 'components/MyText';
import {TransparentButton} from 'components/TransparentButton';
import {useNavigation} from 'pages/navigation';
import React, {FunctionComponent} from 'react';
import {TouchableOpacity, View} from 'react-native';

export interface Props {}

export const GeneralSettings: FunctionComponent<Props> = () => {
  const navigation = useNavigation();
  return (
    <View>
      <TransparentButton onPress={() => navigation.navigate('TVSettings')}>
        <MyText>Manage tvs</MyText>
      </TransparentButton>
    </View>
  );
};

GeneralSettings.displayName = 'GeneralSettings';
