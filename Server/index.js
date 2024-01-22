//requires
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const port = process.env.PORT || 3000;

//middlewares
const app = express();
app.use(cookieParser());
app.use(cors({
  origin:['http://localhost:5173'],
  credentials:true,
}));
app.use(express.json());

//verify json web token middleware
const verifyToken = async(req,res,next)=>{
   const token = req.cookies?.token;
   if(!token){
    return res.status(401).send({message:'unauthorized'})
   }
   jwt.verify(token, process.env.JWT_SECRET,(err,decoded)=>{
     if(err){
      return res.status(401).send({message:'unauthorized'})
     }
     if(decoded){
       
      console.log(decoded);
      next();
     }
   })
}


app.get('/', (req, res) => {
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
    app.post('/users', async (req, res) => {
      const newUser = req.body;
      const result = await usersCollection.insertOne(newUser);
      res.send(result);
    })

    //get users from DB
    app.get('/users',verifyToken, async (req, res) => {
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      await res.send(result);
    })

    //Json Web Token 
    app.post('/jwt', async (req, res) => {
      const user = req.body;
      const token = jwt.sign({
        data: user,
      },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
     console.log(token);
      res
      .cookie('token', token,{
        httpOnly:true,
        secure:true,
        sameSite:'none'
      })
      .send({success:true, status:201});

    })

  } finally {

  }
}
run().catch(console.dir);






app.listen(port, () => {
  console.log('Server is running on port ', port);
})