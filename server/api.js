import { Router } from "express";
import db from "./db";

const router = new Router();

router.get("/", (_, res) => {
	res.json({ message: "Hello from vvp-coging/albums!" });
});

router.post("/albums", function (request, response) {
    db.query("INSERT INTO albums (artist_name, collection_name, release_date, url, genre_id) VALUES ($1, $2, $3, $4, $5)",
            [request.body.artistName, request.body.collectionName, request.body.releaseDate, request.body.url, request.body.genreId])
        .then((result) => {
            response.status(200).send(result.rows.map((card) => {
                return {
                    artistName: card.artist_name,
                    collectionName: card.collection_name,
                    releaseDate: card.release_date,
                    url: card.url,
                    albumId: card.id,
                    genreName: card.genre_name,
                };
            }));
        })
        .catch((e) => response.status(400).send({ error: e.message }));
});

router.delete("/albums/:albumId", function (request, response) {
    const id = request.params.albumId;
    db.query("DELETE FROM albums WHERE id=$1", [id])
        .then(() => response.send("album removed"))
        .catch((e) => console.error(e));

});

router.put("/albums/:albumId", function (request, response) {
    const id = request.params.albumId;
    if(id !== undefined) {
        db.query("UPDATE albums SET artist_name=$1, collection_name=$2, genre_id=$3, release_date=$4, url=$5 WHERE id=$6",
                [request.body.artistName, request.body.collectionName, request.body.genreId, request.body.releaseDate, request.body.url, id])
            .then(() => response.send("Updated data"))
            .catch((e) => console.error(e));
    } else {
        response.status(404).send("album not found");
    }
});

router.get("/albums", (request, response) => {
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

        db.query(query)
            .then((result) => {
                response.status(200).send(result.rows.map((card) => {
                    return {
                        artistName: card.artist_name,
                        collectionName: card.collection_name,
                        releaseDate: card.release_date,
                        url: card.url,
                        albumId: card.id,
                        genreName: card.genre_name,
                    };
                }));
            })
            .catch((error) => console.error(error));
});

router.get("/albums/:albumId", (request, response) => {
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

    db.query(query, [id])
        .then((result) => response.status(200).send(result.rows.map((card) => {
            return {
                artistName: card.artist_name,
                collectionName: card.collection_name,
                releaseDate: card.release_date,
                url: card.url,
                albumId: card.id,
                genreName: card.genre_name,
            };
        })))
		.catch((error) => console.error(error));
});

router.get("/genre", function (request, response){
    db.query("select * from genre")
        .then((result) => response.status(200).send(result.rows))
		.catch((e) => console.error(e));
});

router.get("/search", function (request, response){
    const search = request.query.search;
    const query = `
            select 
            a.id
        ,   a.release_date
        ,   a.artist_name
        ,   a.collection_name
        ,   a.url
        ,   g."name" as genre_name
        from albums a
        left join genre g
        on g.id = a.genre_id
        where lower(artist_name) like lower('%' || $1 || '%')
	    or lower(collection_name) like lower('%' || $1 || '%')
        order by a.artist_name, a.collection_name, a.release_date`;

    db.query(query, [search])
        .then((result) => response.status(200).send(result.rows.map(card => {
                return {
                    artistName: card.artist_name,
                    collectionName: card.collection_name,
                    releaseDate: card.release_date,
                    url: card.url,
                    albumId: card.id,
                    genreName: card.genre_name
                }
        })))
        .catch((error) => console.error(error));
        
});

export default router;
