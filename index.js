const express = require('express');
const cors = require('cors');
const { config } = require('dotenv');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require ('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0h8zi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const postCollection = client.db('media-server').collection('posts');

        app.get('/posts', async(req, res) =>{
            const query = {}
            const cursor = postCollection.find(query);
            const posts = await cursor.toArray();
            res.send(posts);
        });

        app.get('/posts/:id', async(req, res) =>{
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            
            const post = await postCollection.findOne(query);
            res.send(post);
        })

    }
    finally{

    }

}

run().catch(err => console.error(err));


app.get('/', (req, res) => {
    res.send('media server is running')
})

app.listen(port, () =>{
    console.log(`media server running on ${port}`);
})