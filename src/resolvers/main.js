const express = require('express'),
    { graphqlHTTP } = require('express-graphql'),
    app = express(),
    schema = require('../schema.js'),
    cors = require('cors');

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema: schema,   
    graphiql: true
}));     

const Port = 4000; 

app.listen(Port, ()=>{
    console.log(`Listening on port ${Port}`);
});