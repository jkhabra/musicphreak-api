import { Router } from "express";
import db from "../db";

const routes = Router();

routes.get("/:id", async(req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await db.query("select * from musicphreak.song where id = $1", [id]);
        const count = await db.query("select count(*) from musicphreak.song");

        res.send([result.rows, count.rows]);
    }
    catch (err) {
        res.send(err);
    }
});

routes.get("/", async (req, res) => {
    const qua = req.param("quality");
    const q = typeof qua !== "undefined" ? qua : "48";

    const result = await db.query("SELECT song.id, song.name, song.lyrics, song.poster_url AS thumb, song.release_date, song.youtube_id, song.language, artist.name AS artistName, mp3.quality, mp3.urls FROM musicphreak.song INNER JOIN musicphreak.artist_songs ON artist_songs.song_id = song.id INNER JOIN musicphreak.artist ON artist.id = artist_songs.artist_id INNER JOIN musicphreak.mp3 on mp3.song_id = song.id WHERE musicphreak.mp3.quality = $1", [q]);
    const count = await db.query("select count(*) from musicphreak.song");

    res.send({"songs": result.rows, "total": count.rows});
});


routes.put("/:id", async(req, res) => {
    const id = parseInt(req.params.id);
    const name = req.body.name;
    const lyrics = req.body.lyrics;

    try {
        const result = await db.query("update musicphreak.song set name=$1, lyrics=$2 where id = $3", [name, lyrics, id]);
        res.status(200).json(`song's name is updated with ID:${id}`);
    }
    catch (err) {
        res.send(err);
    }
});

routes.post("/", async(req, res) => {
    const name = req.body.name;
    const poster = req.body.name;

    try {
        const result = await db.query("insert into musicphreak.song(name, poster_url) values($1, $2)", [name, poster]);
        res.status(201).json(`Song is added`);
    }
    catch (err) {
        res.send(err);
    }
});

routes.delete("/:id", async(req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await db.query("delete from musicphreak.song where id = $1", [id]);
        res.status(200).json(`Song deleted with ID: ${id}`);
    }
    catch (err) {
        res.send(err);
    }
});

export default routes;
