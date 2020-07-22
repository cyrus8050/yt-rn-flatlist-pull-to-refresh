import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

import axios from 'axios'
export default function App() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)

  const getPhotos = () => {
    setLoading(true)
    var url = 'https://jsonplaceholder.typicode.com/photos'
    axios.get(url).then(res => {
      console.log(res.data)
      setPhotos(res.data)
      setLoading(false)
    })
  }
  // useEffect(() => {
  //   getPhotos()

  // }, [])
  const renderItem = photo => (
    <Card
      title={photo.title}
      image={{ uri: photo.thumbnailUrl }}
    ></Card>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderItem(item)}
        refreshing={loading}
        onRefresh={getPhotos}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#FAFAFA',
  },
  item: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 24,
    padding: 30,
    fontSize: 24,
  },

});
