import {useNavigation as useNav} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {TV} from '../services/tvService';
import {DiscoveredTV} from './searchTV/types';

export type StackParamList = {
  Welcome: undefined;
  SearchTV: undefined;
  AddTV: DiscoveredTV;
  Home: TV;
};

export const useNavigation = () =>
  useNav<NativeStackNavigationProp<StackParamList>>();

export type AddTVRoute = NativeStackScreenProps<StackParamList, 'AddTV'>;
export type HomeRoute = NativeStackScreenProps<StackParamList, 'Home'>;
