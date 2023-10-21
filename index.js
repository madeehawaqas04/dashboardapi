require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./model/books');
const { error } = require('console');


const app = express();
const PORT = process.env.PORT || 3001;

//mongoose.set('StrictQuery', false);
// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI);
//         console.log(`MongoDB Connected:${conn.connection.host}`);
//     }
//     catch (error) {
//         console.log(error);
//         process.exit(1);
//     }
// }
const DB = process.env.MONGO_URI;
mongoose.connect(DB).then(() => {
    console.log("connected to mongoDB");
}).catch((err) => console.log(`no connection`));

app.get('/', (req, res) => {
    res.send({ title: 'Books' });
});

app.get('/add-note', async (req, res) => {
    try {
        await Book.insertMany([
            {
                title: "game 1",
                body: "body text 1"
            },
            {
                title: "game 2",
                body: "body text 2"}
        ])
    }
    catch (error) {
        console.log('error', + error)
    }
})


app.get('/books',async(req,res)=>{
const book=await Book.find();

if(book){
res.json(book);
} else {
res.send("something went wrong.");
}


});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});

// connectDB().then(() => {
//     app.listen(PORT, () => {
//         console.log(`Listening on port ${PORT}`)
//     })
// });

