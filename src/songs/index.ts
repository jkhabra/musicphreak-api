import { Router } from 'express';
import db from '../db'

const routes = Router();

routes.get('/:id', async(req, res) => {
    const id = parseInt(req.params.id)
    try{
        const result = await db.query('select * from musicphreak.song where id = $1',[id]);
        const count = await db.query('select count(*) from musicphreak.song');

        res.send([result.rows, count.rows])
    }
    catch(err){
        res.send(err)
    }
})

routes.get('/', async (req, res) => {
    const result = await db.query('select * from musicphreak.song');
    const count = await db.query('select count(*) from musicphreak.song');

    res.send([result.rows, count.rows]);
});


routes.put('/:id', async(req, res) => {
    const id = parseInt(req.params.id)
    const name = req.param('name');
    const lyrics = req.param('lyrics');

    try{
        const result = await db.query('update musicphreak.song set name=$1, lyrics=$2 where id = $3',[name,lyrics,id]);
        res.status(200).send(`song's name is updated with ID:${id}`)
    }
    catch(err){
        res.send(err)
    }
});

routes.post('/', async(req, res) => {
    const name = req.param('name')
    const poster = req.params.name//req.param('poster')
    console.log(poster)
    try{
        console.log('in try')
        const result = await db.query('insert into musicphreak.song(name, poster_url) values($1, $2)',[name, poster]);
        res.status(201).send(`Song is added`)
    }
    catch(err){
        res.send(err)
    }
});

routes.delete('/:id', async(req, res) => {
    const id = parseInt(req.params.id);
    try{
        const result = await db.query('delete from musicphreak.song where id = $1',[id]);
        res.status(200).send(`Song deleted with ID: ${id}`);
    }
    catch(err){
        res.send(err)
    }
});

export default routes;
