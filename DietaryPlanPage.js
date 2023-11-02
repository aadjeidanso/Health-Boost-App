import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const DietaryPlanPage = ({ route, navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const calorieIntake = route.params.calorieIntake;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=7879384fcdd5455899c08cb0d9984d45&addRecipeInformation=true&maxCalories=${calorieIntake}`);
        setRecipes(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipes();
  }, [calorieIntake]);

  const renderItem = ({ item }) => {
    const handlePress = () => {
      navigation.navigate('RecipeDetails', { recipe: item });
    };

    return (
      <TouchableOpacity style={styles.itemContainer} onPress={handlePress}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemCalories}>Calories: {item.nutrition.nutrients[0].amount} kcal</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingVertical: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#424242',
  },
  itemCalories: {
    color: '#424242',
  },
});

export default DietaryPlanPage;
