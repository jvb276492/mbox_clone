import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';

const { width } = Dimensions.get('window');

const MovieScreen = ({ route }) => {
  const { movie } = route.params;

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: movie.videoUrl }}
        style={styles.video}
        controls
        resizeMode="contain"
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.description}>{movie.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  video: { width, height: 300 },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold', margin: 10 },
  description: { color: 'gray', fontSize: 16, margin: 10 }
});

export default MovieScreen;
