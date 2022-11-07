import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();
const globalScreenOptions = {
  headerStyle:{backgroundColor:"#2c6bed"},
  headerTitleStyle:{color:"white"},
  //icon colors
  headerTintColor:"white",
}
export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator  screenOptions={globalScreenOptions}>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Register' component={Register}/>
        <Stack.Screen name='Home' component={Home}/>

      </Stack.Navigator>
      
    </NavigationContainer>
  
  );
}

const styles = StyleSheet.create({
  container: {
 
  },
});
