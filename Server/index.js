//requires
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const port = process.env.PORT || 3000;

//middlewares
const app = express();
app.use(cookieParser());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
    credentials: true,
  }
});
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
}));
app.use(express.json());

//verify json web token middleware
const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: 'unauthorized' })
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'unauthorized' })
    }
    if (decoded) {
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
    app.get('/users', verifyToken, async (req, res) => {
      let query = {};
      if (req.query?.UserEmail) {
        query = { UserEmail: req.query.UserEmail };
        console.log('data chaitest: ', query);
        const result = await usersCollection.find(query).toArray();
        res.send(result);
      }
      else {
        const cursor = usersCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      }
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
        .cookie('token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'none'
        })
        .send({ success: true, status: 201 });

    })

  } finally {

  }
}
run().catch(console.dir);


//message via socket io handle
io.on('connection', (socket) => {
  console.log('user connected to server : ', socket.id);

  socket.on('joinRoom',(room)=>{
    socket.join(room);
  })

  socket.on('chat', (data) => {
    socket.to(data.room).emit('msg', data.message);
  })


  socket.on('disconnect', () => {
    console.log('user disconnected from server: ', socket.id);
  });
})




server.listen(port, () => {
  console.log('Server is running on port ', port);
})