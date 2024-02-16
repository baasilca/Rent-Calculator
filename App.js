import React, {useState} from 'react';
import Main from './Main';
import store from './src/redux/store';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';

import {lightTheme} from './src/config/themes/colors';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  const [theme, setTheme] = useState(lightTheme);

  

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
