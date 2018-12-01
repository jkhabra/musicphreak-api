import { Router } from 'express';
import db from '../db'
import { text } from 'body-parser';

const routes = Router();

routes.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try{
        const result = await db.query('select * from musicphreak.artist where id = $1', [id]);
        const count = await db.query('select count(*) from musicphreak.artist');
        res.send([result.rows, count.rows]);
    }
    catch(err){
        res.send(err)
    }
});


routes.get('/', async (req, res) => {
    const result = await db.query('select * from musicphreak.artist');
    const count = await db.query('select count(*) from musicphreak.artist');

    res.send([result.rows, count.rows]);
});

routes.put('/:id', async(req, res) => {
    const id = parseInt(req.params.id)
    const name = req.param('name');

    try{
        const result = await db.query('update musicphreak.artist set name=$1 where id = $2',[name,id]);
        res.status(200).send(`Artist's name is updated with ID:${id}`)
    }
    catch(err){
        res.send(err)
    }
});

routes.post('/', async(req, res) => {
    const name = req.param('name')

    try{
        const result = await db.query('insert into musicphreak.artist(name) values($1)',[name]);
        res.status(201).send(`Artist is added`)
    }
    catch(err){
        res.send(err)
    }
});

routes.delete('/:id', async(req, res) => {
    const id = parseInt(req.params.id);
    try{
        const result = await db.query('delete from musicphreak.artist where id = $1',[id]);
        res.status(200).send(`artist deleted with ID: ${id}`);
    }
    catch(err){
        res.send(err)
    }
});

export default routes;
