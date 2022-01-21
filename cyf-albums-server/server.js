const SERVER_PORT = process.env.PORT || 4000;
const express = require("express");
const cors = require("cors");

// get the full list of albums
const albumsData = require("./albums");
const { request } = require("express");

const app = express();

app.use(express.json());
app.use(cors());

// Get an ID number that hasn't already been used in albums
function newID() {
    // Get list of IDs
    let ids = albumsData.map(el => el.albumId).sort();
    let nextId = 1;
    // check if id string is taken
    while(ids.includes(`${nextId}`)) {
        nextId++;
    }
    return nextId;
}

app.post("/albums", function (request, response) {
    const newAlbum = request.body;
    newAlbum.albumId = 1 + Math.max(...albumsData.map(album => album.albumId))
    albumsData.push(newAlbum);
    response.status(200).send("data received");
});

app.delete("/albums/:albumId", function (request, response) {
    let id = request.params.albumId;
    const indexToDel = albumsData.findIndex(album => album.albumId == id);
    albumsData.splice(indexToDel, 1);
    response.status(200).send("album removed");
});

app.put("/albums/:albumId", function (request, response) {
    let id = request.params.albumId;
    const album = request.body;
    const indexToUpd = albumsData.findIndex(album => album.albumId == id);
    if(id !== undefined && indexToUpd > -1) {
        albumsData[indexToUpd] = album;
        response.status(200).send("updated album");
    } else {
        response.status(404).send("album not found");
    }
});

app.get("/albums", (request, response) => {
    let id = request.query.id;
    if(id == undefined) {
        response.status(200).send(albumsData);
    } else {
        response.status(200).send(albumsData.filter(album => id == album.albumId));
    }
});

app.get("/albums/:albumId", function (request, response) {
    let id = request.params.albumId;
    response.status(200).send(albumsData.filter(album => id == album.albumId));
});

app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));
