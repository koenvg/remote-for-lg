import React, {FunctionComponent} from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {LGTVProvider} from '../api/LGTVProvider';

export interface Props {}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  button: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
});

export const Home: FunctionComponent<Props> = () => {
  return (
    <LGTVProvider>
      <View style={styles.container}>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.linearGradient}>
          {/* <TouchableOpacity style={styles.button}> */}
          <Text style={styles.button}>Up</Text>
          {/* </TouchableOpacity> */}
        </LinearGradient>

        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.linearGradient}>
          <Text style={styles.button}>Sign in with Facebook</Text>
        </LinearGradient>
        <Text style={styles.button}>Sign in asdasd Facebook</Text>
      </View>
    </LGTVProvider>
  );
};

Home.displayName = 'Home';
