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
    console.log(album)
    albums.push(album)

    res.status(201).send({success: true})
});

app.put('/albums/:id', (req, res) => {
    const id = req.params.id;
    albums = albums.map(function (album) {
        if (album.albumId == id) {
          return {
                albumId: id,
                artistName: req.body.artistName,
                collectionName: req.body.collectionName,
                artworkUrl100:req.body.artworkUrl100,
                releaseDate: req.body.releaseDate,
                primaryGenreName:  req.body.primaryGenreName,
                url:  req.body.url  
          }
        } else {
          return album
        }
      })
    
    res.send({success: true})
  })

app.delete('/albums/:id',(req, res) => {
    const id = req.params.id
    const albumsFiltered = albums.filter(function (album) {
      return album.albumId != id
    })

    albums = albumsFiltered
  
    res.send({success: true})
  })

app.listen(3001, () => console.log("Server is up and running"))