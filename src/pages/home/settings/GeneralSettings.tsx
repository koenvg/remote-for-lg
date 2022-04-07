import {MyText} from 'components/MyText';
import {useNavigation} from 'pages/navigation';
import React, {FunctionComponent} from 'react';
import {StyleSheet, Switch, TouchableOpacity, View} from 'react-native';
import {colorScheme, theme} from 'theme';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export interface Props {}

export const GeneralSettings: FunctionComponent<Props> = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.setting}
        onPress={() => navigation.navigate('TVSettings')}>
        <MyText>Manage tvs</MyText>
        <MaterialCommunityIcons
          name="chevron-right"
          color={theme.iconColor}
          size={18}
        />
      </TouchableOpacity>
      <View style={styles.setting}>
        <MyText>Dark mode</MyText>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={colorScheme === 'dark' ? theme.accent : '#f4f3f4'}
          ios_backgroundColor={theme.primary[600]}
          // onValueChange={}
          value={colorScheme === 'dark'}
        />
      </View>
    </View>
  );
};

GeneralSettings.displayName = 'GeneralSettings';

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  setting: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
});
