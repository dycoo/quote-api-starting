const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// Declare the port
app.listen(PORT,()=>{
    console.log('Server is listening port: ' + PORT);
});

// Create a quotes Router


// Set GET for Random quotes
app.get('/api/quotes/random',(req,res)=>{

    res.send(getRandomElement(quotes));
});

// Set GET for quotes
app.get('/api/quotes',(req,res)=>{
    const filters = req.query;
    console.log('filters');
    console.log(filters);
    console.log(Object.keys(filters).length);
    console.log('filters.person');
    console.log(filters.person);

// validate exist of filters
if (Object.keys(filters).length !== 0){
    // validate person filter
    if(filters.person){
    res.status(200).send(quotes.filter(quote=>{
        if(quote.person=== filters.person)
        {
            return quote;
        }
    
        }
    ));
    }else{
        //incorrect filters then return error message
        res.send('Invalid filter used');
    }

}else{
    // no filters , then return all the quotes
    res.status(200).send(quotes);
}
    
});

//Set POST new quote
app.post('/api/quotes/',(req,res)=>{
    const filters = req.query;
    if (Object.keys(filters).length !== 0){

        if(filters.person && filters.quote){
            const newQuote ={
                person:filters.person,
                quote:filters.quote
                };

            quotes.push(newQuote);
            res.status(201).send(newQuote);

        }
        else{
            res.status(400).send('Missing quote or person paramenters, object not created');    
        }

    }else{
        res.status(400).send('Missing parameters, object not created');
    }

    
    
});


// Set DELETE quote
app.delete('/api/quotes/',(req,res)=>{
    
        
});

