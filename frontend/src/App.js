import React, { useState, useEffect } from 'react';
import api from './services/api';
import './App.css';
import Header from './components/Header';


export default function App() {


  //const and function
  const [projects, setProjects ] = useState([]);
  
  useEffect( ()=> {
    api.get('projects').then(response => {
      setProjects(response.data);
    })


  }, [] );
  
  async function handleAddProject() {

    //projects.push(`novo projeto ${Date.now()}`);
    
    //setProjects([...projects, `novo projeto ${Date.now()}` ]);
    
    const response = await api.post('projects', {
      title: `New project ${Date.now()}`,
      owner: "roberto  junior"
    })
    const project = response.data;

    setProjects([...projects, project]);
  }


  //end



  return (

    <>
      <Header title=' React JS' /> 

    
      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}

      </ul>

      <button id='button' onClick={handleAddProject} >Add project</button>
    </>

  );
}