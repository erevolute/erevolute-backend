const express = require('express');
const app = express();
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()
const fileUpload = require('express-fileupload')


app.use(cors({ origin: 'https://erevolute.com/' }))
app.use(express.json())
app.use(fileUpload())

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@erevolute.ic1pzat.mongodb.net/?retryWrites=true&w=majority`;

// const uri = `mongodb+srv://@cluster0.is333.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const portfolioCollection = client.db("eRevolute").collection('portfolioCollection');
    const blogsCollection = client.db("eRevolute").collection('blogsCollection');


    //  find all portfolio
    app.get('/portfolio', async (req, res) => {
      const query = {}
      const result = await portfolioCollection.find(query).toArray()
      res.send(result)
    })

    //  find portfolio by id 
    app.get('/portfolio/:id', async (req, res) => {
      const id = req.params.id;

      const query = { _id: ObjectId(id) }
      const result = await portfolioCollection.findOne(query)
      res.send(result)
    })

    //  find blogs 
    app.get('/blogs', async (req, res) => {
      const query = {}
      const result = await blogsCollection.find(query).toArray()
      res.send(result)
    })

    // find blog by id 
    app.get('/blogs/:id', async (req, res) => {
      const id = req.params.id;

      const query = { _id: ObjectId(id) }
      const result = await blogsCollection.findOne(query)
      res.send(result)
    })

    // add  blog 
    app.post('/add', async (req, res) => {
      const title = req.body.title;
      const description = req.body.description;
      const catagory = req.body.catagory;
      const date = req.body.date;
      const metaKeywords = req.body.metaKeywords;
      const metaDescription = req.body.metaDescription;

      const image = req.files.img;
      const imgData = image.data;
      const encodedImg = imgData.toString('base64');
      const imgBuffer = Buffer.from(encodedImg, 'base64')

      const query = {
        title: title,
        description: description,
        catagory: catagory,
        date: date,
        metaDescription: metaDescription,
        metaKeywords: metaKeywords,
        img: imgBuffer,
      };
      const result = await blogsCollection.insertOne(query);

      res.send(result)
    })

    // add portfolio
    app.post('/add-portfolio', async (req, res) => {

      const name = req.body.name;
      const description = req.body.description;
      const catagory = req.body.catagory;
      const siteLink = req.body.siteLink;
      const date = req.body.date;
      const metaKeywords = req.body.metaKeywords;
      const metaDescription = req.body.metaDescription;

      const image = req.files.img;
      const imgData = image.data;
      const encodedImg = imgData.toString('base64');
      const imgBuffer = Buffer.from(encodedImg, 'base64')

      const image2 = req.files.img2;
      const imgData2 = image2.data;
      const encodedImg2 = imgData2.toString('base64');
      const imgBuffer2 = Buffer.from(encodedImg2, 'base64')

      const image3 = req.files.img3;
      const imgData3 = image3.data;
      const encodedImg3 = imgData3.toString('base64');
      const imgBuffer3 = Buffer.from(encodedImg3, 'base64')


      const query = {
        name: name,
        description: description,
        catagory: catagory,
        siteLink: siteLink,
        date: date,
        metaDescription: metaDescription,
        metaKeywords: metaKeywords,
        img: imgBuffer,
        img2: imgBuffer2,
        img3: imgBuffer3
      };
      const result = await portfolioCollection.insertOne(query);

      res.send(result)
    })

    // potfolio delete 
    app.delete('/portfolio/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const result = await portfolioCollection.deleteOne(query);
      res.send(result)
    })

    // blog delete 
    app.delete('/blogs/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const result = await blogsCollection.deleteOne(query);
      res.send(result)
    })

    // update portfolio 

    app.patch('/portfolio/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const date = req.body.date;
      const description = req.body.description;
      const image = req.files.img;
      const imgData = image.data;
      const encodedImg = imgData.toString('base64');
      const imgBuffer = Buffer.from(encodedImg, 'base64')
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          date: date,
          description: description,
          img: imgBuffer,
        },
      };
      const result = await portfolioCollection.updateMany(query, updateDoc, options);
      res.send(result)
    });

    app.put('/portfolio/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const name = req.body.name;
      const catagory = req.body.catagory;
      const siteLink = req.body.siteLink;
      const metaKeywords = req.body.metaKey;
      const metaDescription = req.body.metaDes;
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          metaDescription: metaDescription,
          metaKeywords: metaKeywords,
          name: name,
          catagory: catagory,
          siteLink: siteLink
        },
      };
      const result = await portfolioCollection.updateMany(query, updateDoc, options);
      res.send(result)
    });

    app.patch('/blogs/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const blogdescription = req.body.description;
      const blogdate = req.body.date;
      const image = req.files.img;

      const imgData = image.data;
      const encodedImg = imgData.toString('base64');
      const imgBuffer = Buffer.from(encodedImg, 'base64')
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          img: imgBuffer,
          date: blogdate,
          description: blogdescription,
        },
      };
      const result = await blogsCollection.updateMany(query, updateDoc, options);
      res.send(result)
    });

    app.put('/blogs/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const blogtitle = req.body.title;
      const blogcatagory = req.body.metaCat;
      const metaKeywords = req.body.metaKey;
      const metaDescription = req.body.metaDes;
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          title: blogtitle,
          catagory: blogcatagory,
          metaDescription: metaDescription,
          metaKeywords: metaKeywords
        },
      };
      const result = await blogsCollection.updateOne(query, updateDoc, options);
      res.send(result)
    });



  } finally {
    //  await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('eRevolute is running')
})
app.listen(port, () => {
  console.log(port, 'eRevolute is running')
})