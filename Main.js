import React, {useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

import PreAuthNavigator from './src/navigation/PreAuthNavigator';

function Main() {
  const {colors} = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor={colors.primary} />
      <PreAuthNavigator />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Main;
