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
        const bangladeshCompaniesCollection = client.db("jobSearch").collection("bangladeshCompanies");

        const worldwideCompaniesCollection = client.db("jobSearch").collection("worldwideCompanies");

        const usersCollection = client.db("jobSearch").collection("users");



        app.get('/freshersjobs', async (req, res) => {
            const query = {};
            const freshersJobs = await freshersJobsCollection.find(query).toArray();
            res.send(freshersJobs);
        })

        app.get('/experiencedJobs', async (req, res) => {
            const query = {};
            const experiencedJobs = await experiencedJobsCollection.find(query).toArray();
            res.send(experiencedJobs);
        })

        app.get('/bangladeshCompanies', async (req, res) => {
            const filter = {};
            const bangladeshCompanies = await bangladeshCompaniesCollection.find(filter).toArray();
            res.send(bangladeshCompanies)
        })
        app.get('/worldwideCompanies', async (req, res) => {
            const filter = {};
            const worldwideCompanies = await worldwideCompaniesCollection.find(filter).toArray();
            res.send(worldwideCompanies)
        })

        app.post('/users', async (req, res) => {
            const user = req.body
            const userQuery = { email: req.body.email }
            const storedUser = await usersCollection.findOne(userQuery);
            if (storedUser) {
                return
            }
            const result = await usersCollection.insertOne(user);
            res.send(result);
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