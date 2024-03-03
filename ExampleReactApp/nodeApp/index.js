const express=require('express')
const bodyParser = require('body-parser');
const cors=require('cors');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'customerDB',
    password: 'root',
    port: 5432,
});

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.post('/customers/insert', async (req, res) => {
    console.log(req.body)
    const { customer_name, age, phone, location } = req.body;
    try {
        await pool.query(`INSERT INTO customers (customer_name, age, phone, location, created_at)
                          VALUES ($1, $2, $3, $4, NOW())`, [customer_name, age, phone, location]);
        res.json({ message: 'Record inserted successfully' });
    }
    catch (error) {
        console.error('Error creating records:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/customers', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM customers');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/customers/getbyname/:name',async (req,res)=>{
    const name=req.params.name;
    try{
        const {rows}=await pool.query('select * from customers where customer_name=$1',[name]);
        res.json(rows);
    }catch(err){
        console.error(err);
        res.json("Internal error");
    }
})

app.get('/customers/getbylocation/:location',async(req,res)=>{
    const location=req.params.location;
    try{
        const {rows}=await pool.query('select * from customers where location=$1 ',[location]);
        res.json(rows);
    }catch(err){
        console.error(err);
        res.json("Internal error");
    }
})
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
console.log("Hello node js"); 