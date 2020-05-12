const express = require("express");
const cors = require('cors');
const server = express();
const { uuid, isUuid } = require('uuidv4')

server.use(express.json());
server.use(cors());

const projects = [];

function logRequests(request, response, next) {
  const { method, url } = request;
  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);

   next();
  console.timeEnd(logLabel);
}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: "Invalid ID." });

  }
  return next();

}



//Global Function
server.use(logRequests);

server.use( '/projects/:id' ,validateProjectId);

// -/-



server.get("/projects", (request, response) => {
  const { title } = request.query;
  const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects;



  return response.json(results);
});

server.post("/projects", (request, response) => {
  const { title, owner } = request.body;


  const project = { id: uuid(), title, owner };

  projects.push(project);

  return response.json(project);
});

server.put("/projects/:id", (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id === id);
  if (projectIndex < 0) {

    return response.status(400).json({
      error: "Project not found"

    });
  }

  const project = {
    id,
    title,
    owner

  };

  projects[projectIndex] = project;


  return response.json(project);
})


server.delete("/projects/:id", (request, response) => {

  const { id } = request.params;
  const projectIndex = projects.findIndex(project => project.id === id);



  if (projectIndex < 0) {

    return response.status(400).json({
      error: "Project not found"

    });
  }

  projects.splice(projectIndex, 1);


  return response.status(204).send();
});



//ligando o server na porta 3333
server.listen(3333, () => {
  console.log(" iniciei o server");
});
