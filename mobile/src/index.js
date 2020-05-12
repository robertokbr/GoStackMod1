import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
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
            <Text style={styles.project} >{project.title}</Text>
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
    backgroundColor: '#7159c1',

  },

  project: {
    color: '#fff',
    fontSize: 25,

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