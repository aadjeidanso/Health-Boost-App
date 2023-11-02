import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const WorkoutPage = ({ route }) => {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('https://workout-planner1.p.rapidapi.com/', {
          headers: {
            'X-RapidAPI-Key': '6810c91e18msh781d690588d932ep13c04fjsn73d625e5fdc1',
            'X-RapidAPI-Host': 'workout-planner1.p.rapidapi.com',
          },
          params: {
            time: '30',
            muscle: 'biceps, chest, cardio',
            location: 'gym',
            equipment: 'dumbbells'
          },
        });

        // Get the response data
        const data = response.data;

        // Flatten the data
        let flattenedData = [];
        ["Warm Up", "Exercises", "Cool Down"].forEach((key) => {
          data[key].forEach((item) => {
            flattenedData.push({
              id: data._id,
              type: key,
              ...item
            });
          });
        });

        console.log('Flattened data:', flattenedData);
        setExercises(flattenedData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setExercises([]);
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const renderItem = ({ item }) => {
    console.log(item); // Log the item
    return (
      <TouchableOpacity style={itemContainerStyle}>
        <Text style={itemTitleStyle}>{item.type}: {item.Exercise}</Text>
        <Text style={itemDescriptionStyle}>{item.Time || `${item.Sets} sets of ${item.Reps}`}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={containerStyle}>
      {isLoading ? (
        <Text style={loadingTextStyle}>Loading...</Text>
      ) : (
        <FlatList
          data={exercises}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const containerStyle = {
  flex: 1,
  justifyContent: 'center',
  padding: 16,
};

const loadingTextStyle = {
  textAlign: 'center',
  marginBottom: 10,
};

const itemContainerStyle = {
  borderWidth: 1,
  borderColor: '#ddd',
  padding: 10,
  borderRadius: 2,
  marginBottom: 10,
};

const itemTitleStyle = {
  fontSize: 18,
  marginBottom: 4,
};

const itemDescriptionStyle = {
  fontSize: 16,
  color: '#444',
};

export default WorkoutPage;