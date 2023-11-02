import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './src/pages/LoginPage';
import ProfilePage from './src/pages/ProfilePage';
import WorkoutPage from './src/pages/WorkoutPage';
import DietaryPlanPage from './src/pages/DietaryPlanPage';
import RecipeDetailsPage from './src/pages/RecipeDetailsPage';
import ErrorBoundary from './src/pages/ErrorBoundary';

import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCu6LjFrRKGdV5vYc7sU8kFfkOH-vrk8Gw",
  authDomain: "basicfitnessapp-756e0.firebaseapp.com",
  projectId: "basicfitnessapp-756e0",
  storageBucket: "basicfitnessapp-756e0.appspot.com",
  messagingSenderId: "739873438530",
  appId: "1:739873438530:web:f3a62fbbcd19f9e32326db",
  measurementId: "G-KJJTBWDG1L"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={props => <ErrorBoundary><LoginPage {...props} /></ErrorBoundary>} />
        <Stack.Screen name="Profile" component={props => <ErrorBoundary><ProfilePage {...props} /></ErrorBoundary>} />
        <Stack.Screen name="Workout" component={props => <ErrorBoundary><WorkoutPage {...props} /></ErrorBoundary>} />
        <Stack.Screen name="DietaryPlan" component={props => <ErrorBoundary><DietaryPlanPage {...props} /></ErrorBoundary>} />
        <Stack.Screen name="RecipeDetails" component={props => <ErrorBoundary><RecipeDetailsPage {...props} /></ErrorBoundary>} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
