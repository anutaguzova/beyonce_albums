const express = require('express');
const app = express();

let albums = require('./albums.json');

const middleware = express.json()

app.use(middleware)

app.get('/', (req, res) => {
    res.send('Hello Express')
});

app.get('/albums', (req, res) => {
    res.send(albums)
});

app.get('/albums/:id', (req, res) => {
    const id = req.params.id;
    const album = albums.find(album => album.albumId == id);

    res.send(album)
});

app.post('/albums', (req, res) => {
    const album = req.body;

    albums.push(album);

    res.status(201).send({success: true})
});

app.put('/albums/:id', (req, res) => {
    const id = req.params.id;
    albums = albums.map((album) => {
        if (album.albumId == id) {
          return {
                albumId: id,
                ...req.body 
          }
        } else {
          return album
        }
      })
    
    res.send({success: true})
  })

app.delete('/albums/:id',(req, res) => {
    const id = req.params.id
    const albumsFiltered = albums.filter((album) => album.albumId != id)

    albums = albumsFiltered
  
    res.send({success: true})
  })

app.listen(3001, () => console.log("Server is up and running"))