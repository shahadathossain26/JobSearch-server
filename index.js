const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.g42knj4.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const freshersJobsCollection = client.db("jobSearch").collection("freshersJobs");
        const experiencedJobsCollection = client.db("jobSearch").collection("experiencedJobs");

        app.get('/freshersjobs', async (req, res) => {
            const query = {};
            const freshersJobs = await freshersJobsCollection.find(query).toArray();
            console.log(freshersJobs);
            res.send(freshersJobs);
        })
    }

    finally {

    }
}
run().catch(console.log)




app.get('/', async (req, res) => {
    res.send("Job Search Server is Running")
})

app.listen(port, () => console.log(`Job Search Server is Running on port ${port}`))