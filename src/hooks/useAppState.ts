import {useEffect, useState} from 'react';
import {AppState} from 'react-native';

export const useAppState = () => {
  const [appStateVisible, setAppStateVisible] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      setAppStateVisible(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return appStateVisible;
};
