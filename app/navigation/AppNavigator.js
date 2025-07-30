import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UploadScreen from '../screens/UploadScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import QuizCreateScreen from '../screens/QuizCreateScreen';
import QuizTakeScreen from '../screens/QuizTakeScreen';
import StudyPlannerScreen from '../screens/StudyPlannerScreen';
import ForumScreen from './screens/ForumScreen';
import ViewUploadsScreen from './screens/ViewUploadsScreen';




const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Upload" component={UploadScreen} />
        <Stack.Screen name="CreateQuiz" component={QuizCreateScreen} />
        <Stack.Screen name="TakeQuiz" component={QuizTakeScreen} />
        <Stack.Screen name="Planner" component={StudyPlannerScreen} />
        <Stack.Screen name="Forum" component={ForumScreen} />
        <Stack.Screen name="Downloads" component={ViewUploadsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
