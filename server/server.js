const SERVER_PORT = process.env.PORT || 4000;
const express = require("express");
const cors = require("cors");
const { Pool } = require('pg');

const app = express();

app.use(express.json());
app.use(cors());

const pool = new Pool({
    user: 'postgres',
    host: '192.168.0.10',
    database: 'albums',
    password: 'postgres',
    port: 5432
});

app.post("/albums", function (request, response) {
    pool.query("INSERT INTO albums (artist_name, collection_name, release_date, url) VALUES ($1, $2, $3, $4)", 
        [request.body.artistName, request.body.collectionName, request.body.releaseDate, request.body.url])
    .then(result => {
        response.status(200).send(result.rows.map(card => {
            return {
                artistName: card.artist_name,
                collectionName: card.collection_name,
                releaseDate: card.release_date,
                url: card.url,
                albumId: card.id
            };
        }));
    })
    .catch(e => response.status(400).send({error: e.message}));
});

app.delete("/albums/:albumId", function (request, response) {
    const id = request.params.albumId;
    pool.query("DELETE FROM albums WHERE id=$1", [id])
        .then(() => response.send(`album removed`))
        .catch((e) => console.error(e));

});

app.put("/albums/:albumId", function (request, response) {
    const id = request.params.albumId;
    if(id !== undefined) {
        pool.query("UPDATE albums SET artist_name=$1, collection_name=$2, release_date=$3, url=$4 WHERE id=$5", 
                [request.body.artistName, request.body.collectionName, request.body.releaseDate, request.body.url, id])
            .then(() => response.send(`Updated data`))
            .catch((e) => console.error(e));
    } else {
        response.status(404).send("album not found");
    }
});

app.get("/albums", (request, response) => {
    const id = request.query.id;
    
    if(id == undefined) {
        pool.query('SELECT * FROM albums', (error, result) => {
            response.status(200).send(result.rows.map(card => {
                return {
                    artistName: card.artist_name,
                    collectionName: card.collection_name,
                    releaseDate: card.release_date,
                    url: card.url,
                    albumId: card.id
                };
            }));
        });
    } else {
        pool.query('SELECT * FROM albums WHERE id = $1', [id])
        .then(result => response.status(200).send(result.rows.map(card => {
            return {
                artistName: card.artist_name,
                collectionName: card.collection_name,
                releaseDate: card.release_date,
                url: card.url,
                albumId: card.id
            }
        })))
    }
});

app.get("/albums/:albumId", function (request, response) {
    const id = request.params.albumId;
    pool.query('SELECT * FROM albums WHERE id = $1', [id])
        .then(result => response.status(200).send(result.rows.map(card => {
            return {
                artistName: card.artist_name,
                collectionName: card.collection_name,
                releaseDate: card.release_date,
                url: card.url,
                albumId: card.id
            }
        })))
});

app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));
