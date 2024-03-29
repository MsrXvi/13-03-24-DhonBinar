const fs = require("fs")
const express = require('express')

const app = express()
const PORT = 8000;

app.use(express.json())

const customers = JSON.parse(
    fs.readFileSync(`${__dirname}/data/dummy.json`)
)

//localhost : 8000
app.get('/',(req,res,next) => {
    res.send ('<p>Hello</p>')
})

app.get('/api/v1/customers',(req,res,next) => {
    res.status(200).json({
        status: "success",
        totalData: customers.length,
        data: {
            customers,        
        },
    })
})

app.post("/api/v1/customers", (req, res)=>{
    
    const newCustomer = req.body;
    customers.push(req.body);
    fs.writeFile(`${__dirname}/data/dummy.json`, JSON.stringify(customers), err => {
        res.status(201).json({
            status: 'success',
            data: {
                customers : newCustomer

            }
        })
    })

    res.send("oke udah");
})

app.listen(PORT, () => {
    console.log(`APP running on port : ${PORT}`)
})