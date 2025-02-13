import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movies</Text>
      <FlatList
        data={movies}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Movie', { movie: item })}>
            <View style={styles.movieItem}>
              <Image source={{ uri: item.thumbnail }} style={styles.image} />
              <Text style={styles.movieTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  movieItem: { flexDirection: 'row', marginVertical: 10 },
  image: { width: 100, height: 150, borderRadius: 5 },
  movieTitle: { marginLeft: 10, fontSize: 18 }
});

export default HomeScreen;
