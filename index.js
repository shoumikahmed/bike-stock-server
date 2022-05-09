const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
app.use(cors())
app.use(express.json())
// const jwt = require('jsonwebtoken');

require('dotenv').config()

const port = process.env.PORT || 5000


// const collection = client.db("test").collection("devices");

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.ntttb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {

    try {
        await client.connect()
        const bikeCollection = client.db("bike").collection("bikeCollection");
        console.log('connected')



        app.post('/inventory', async (req, res) => {
            const newItem = req.body
            const result = await bikeCollection.insertOne(newItem);
            res.send(result)

        })



        app.get('/inventory', async (req, res) => {
            const query = {};
            const cursor = bikeCollection.find(query);
            const result = await cursor.toArray()
            res.send(result)
        })



        app.get('/inventory/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) };
            const result = await bikeCollection.findOne(query)
            res.send(result)
        })


    }
    finally {

    }

}

run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Running assignment 11')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// USER_NAME=bike
// USER_PASS=bnwg6VdqHbY640gW

// node_modules
// .env