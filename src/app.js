/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const listRepo = repositories;
  return response.json(listRepo);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const newRepository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(newRepository);

  return response.json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex((repository) => repository.id === id);
  if (repositoryIndex === -1) {
    return response.status(400).json({ error: 'Repository does not exist' });
  }
  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes,
  };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex((repository) => repository.id === id);
  if (repositoryIndex === -1) {
    return response.status(400).json({ error: 'repository does not exists' });
  }
  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryFindIndex = repositories.findIndex((repository) => repository.id === id);

  if (repositoryFindIndex === -1) {
    return response.status(400).json({ error: 'repository does not exists' });
  }
  repositories[repositoryFindIndex].likes += 1;

  return response.json(repositories[repositoryFindIndex]);
});

module.exports = app;
