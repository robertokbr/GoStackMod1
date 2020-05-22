import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity, View } from 'react-native';
import api from './services/api';
export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);

    });
  }, [])

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `New Repo ${Date.now()}`,
      owner: "Roberto Junior"

    })
    const project = response.data;
    setProjects([...projects, project]);

  }



  return (

    <>
      <StatusBar barStyle='light-content' backgroundColor='#7159c1' />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <View style={styles.projectContainer}>
            <Text style={styles.project} >{project.title}</Text>
            </View>
          )}

        />

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={handleAddProject}
        >

          <Text style={styles.buttonText}>Add project</Text>

        </TouchableOpacity>

      </SafeAreaView>


    </>

  );



}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#7159c1'
      },
    
  projectContainer:{
    backgroundColor: '#fff',
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    padding: 15,
    borderRadius: 5,


  },

  project: {
    color: 'black',
    fontSize: 20,
    fontWeight: "bold",

  },

  button: {
    backgroundColor: '#ffff',
    margin: 28,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,


  }



});