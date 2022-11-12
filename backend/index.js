require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

const { MongoClient, ServerApiVersion, CURSOR_FLAGS } = require('mongodb');
const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const db = client.db("mso")


app.get('/api/search', async (req, res) => {
    const query = req.query.query;
    const collection = db.collection('ads');
    let queries = [];


    if(query instanceof Array) {
        query.forEach((q) => {
            if(q) {
                queries.push({ "primaryText": new RegExp(q.trim(), "gi") });
                queries.push({ "headline": new RegExp(q.trim(), "gi") });
                queries.push({ "description": new RegExp(q.trim(), "gi") });
                queries.push({ "company.name": new RegExp(q.trim(), "gi") });
            }
        })
        companyQuery = query.join(" ")
    } else {
        queries.push({ "primaryText": new RegExp(query.trim(), "gi") });
        queries.push({ "headline": new RegExp(query.trim(), "gi") });
        queries.push({ "description": new RegExp(query.trim(), "gi") });
        queries.push({ "company.name": new RegExp(query.trim(), "gi") });
    }

    try {
        const cursor = collection.aggregate(
            [
                
                { $lookup: {
                    from: 'companies',
                    localField: 'companyId',
                    foreignField: '_id',
                    // pipeline: [
                    //     {
                    //         "$match": {
                    //             "company.name": new RegExp(companyQuery, "gi")
                    //         },
                    //     },
                    // ],
                    as: 'company'
                }},
                { $unwind: '$company' },
                // { $match: {
                //     "company.name": query
                // }}
    
                { $match: { 
                    $or: queries
                }},
            ],
        );
        const data = await cursor.toArray();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.json(error);
    }
    // res.json the cursor data
    
});


app.listen(8000, () => {
    try {
        client.connect();
        console.log("Connected to MongoDB");
    } catch (e) {
        console.error(e);
    }
    console.log('Server started on port 8000');
})