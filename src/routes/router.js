import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ResultScreen from '../screens/ResultScreen';
import InstructionsScreen from '../screens/InstructionsScreen';

const Stack = createStackNavigator();

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode={false}
        initialRouteName="Home"
        screenOptions={{
          cardStyle: { backgroundColor: 'rgb(248, 248, 248)' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Instructions" component={InstructionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;