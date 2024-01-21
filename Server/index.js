const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Live Chat server is running');
})






const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://aiarnob23:${process.env.MONGO_PASS}@cluster0.vvmqsfs.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const usersCollection = client.db('LiveChat').collection('Users');

    //Post a user to DB
    app.post('/users',async(req,res)=>{
        const newUser = req.body;
        const result = await usersCollection.insertOne(newUser);
        res.send(result);
    })

    //get users from DB
    app.get('/users', async(req,res)=>{
        const cursor = usersCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })
 
  } finally {
  
  }
}
run().catch(console.dir);







app.listen(port, ()=>{
    console.log('Server is running on port ', port);
})