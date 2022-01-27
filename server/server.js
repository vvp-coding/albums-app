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
                albumId: card.id,
                genreName: card.genre_name
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
        pool.query("UPDATE albums SET artist_name=$1, collection_name=$2, genre_id=$3, release_date=$4, url=$5 WHERE id=$6", 
                [request.body.artistName, request.body.collectionName, request.body.genreId, request.body.releaseDate, request.body.url, id])
            .then(() => response.send(`Updated data`))
            .catch((e) => console.error(e));
    } else {
        response.status(404).send("album not found");
    }
});

app.get("/albums", (request, response) => {
    const id = request.query.id;
    const query = `select 
            a.id
        ,   a.release_date
        ,   a.artist_name
        ,   a.collection_name
        ,   a.url
        ,   g."name" as genre_name
        from albums a
        left join genre g
        on g.id = a.genre_id
        order by a.artist_name, a.collection_name, a.release_date`;
    
    if(id == undefined) {
        pool.query(query, (error, result) => {
            response.status(200).send(result.rows.map(card => {
                return {
                    artistName: card.artist_name,
                    collectionName: card.collection_name,
                    releaseDate: card.release_date,
                    url: card.url,
                    albumId: card.id,
                    genreName: card.genre_name
                };
            }));
        });
    } else {
        pool.query( query + '\n WHERE id = $1', [id])
        .then(result => response.status(200).send(result.rows.map(card => {
            return {
                artistName: card.artist_name,
                collectionName: card.collection_name,
                releaseDate: card.release_date,
                url: card.url,
                albumId: card.id,
                genreName: card.genre_name
            }
        })))
    }
});

app.get("/albums/:albumId", function (request, response) {
    const id = request.params.albumId;
    const query = `select 
        a.id
        ,   a.release_date
        ,   a.artist_name
        ,   a.collection_name
        ,   a.url
        ,   g."name" as genre_name
        from albums a
        left join genre g
        on g.id = a.genre_id 
        where 0=0
        and a.id = $1`;

    pool.query(query, [id])
        .then(result => response.status(200).send(result.rows.map(card => {
            return {
                artistName: card.artist_name,
                collectionName: card.collection_name,
                releaseDate: card.release_date,
                url: card.url,
                albumId: card.id,
                genreName: card.genre_name
            }
        })))
});

app.get("/genre", function (request, response){
    pool.query("select * from genre")
        .then(result => response.status(200).send(result.rows))
})

app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));
