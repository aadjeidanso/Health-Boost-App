import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

const ProfilePage = ({ navigation }) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [age, setAge] = useState('');
  const [goal, setGoal] = useState('lose');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [isLoading]);

  const handleSubmit = () => {
    const bmi = calculateBMI(weight, height);
    const calorieIntake = calculateCalorieIntake(weight, goalWeight, height, age, goal);
    setIsLoading(true);
    // Save profile data, then navigate to the Workout page
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Workout', { calorieIntake, bmi });
    }, 3000);
  };

  const handleDietaryPlan = () => {
    const calorieIntake = calculateCalorieIntake(weight, goalWeight, height, age, goal);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('DietaryPlan', { calorieIntake });
    }, 3000);
  };

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  };

  const calculateCalorieIntake = (weight, goalWeight, height, age, goal) => {
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    const dailyCalorieIntake = bmr * 1.2;

    if (goal === 'gain') {
      return dailyCalorieIntake + 500;
    } else if (goal === 'lose') {
      return dailyCalorieIntake - 500;
    } else {
      return dailyCalorieIntake;
    }
  };

  const renderLoadingIndicator = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#00bfa5" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Work Out Plans</Text>
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Goal Weight (kg)"
        keyboardType="numeric"
        value={goalWeight}
        onChangeText={setGoalWeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setGoal('lose');
        }}
      >
        <Text style={[styles.buttonText, goal === 'lose' && styles.activeGoal]}>Lose Weight</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}onPress={() => {
            setGoal('gain');
            }}
            >
            <Text style={[styles.buttonText, goal === 'gain' && styles.activeGoal]}>Gain Weight</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Create Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleDietaryPlan}>
            <Text style={styles.submitButtonText}>Get Dietary Plan</Text>
            </TouchableOpacity>
            {isLoading ? (
            renderLoadingIndicator()
            ) : (
            <>
            {weight && height ? (
            <Text style={styles.bmiText}>Your BMI: {calculateBMI(weight, height).toFixed(2)}</Text>
            ) : null}
            </>
            )}
            </View>
            );
            };
      
      const styles = StyleSheet.create({
      container: {
      flex: 1,
      backgroundColor: '#003f5c',
      justifyContent: 'center',
      paddingHorizontal: 20,
      },
      title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#fb5b5a',
      marginBottom: 20,
      },
      input: {
      backgroundColor: '#f2f2f2',
      borderRadius: 25,
      paddingHorizontal: 20,
      paddingVertical: 5,
      marginBottom: 10,
      color: '#424242',
      },
      button: {
      backgroundColor: '#00bfa5',
      padding: 10,
      borderRadius: 25,
      marginBottom: 10,
      },
      buttonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
      },
      activeGoal: {
      backgroundColor: '#fb5b5a',
      },
      submitButton: {
      backgroundColor: '#00bfa5',
      padding: 10,
      borderRadius: 25,
      marginTop: 20,
      },
      submitButtonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
      },
      bmiText: {
      color: 'white',
      textAlign: 'center',
      marginTop: 10,
      fontSize: 16,
      },
      });
      
      export default ProfilePage;