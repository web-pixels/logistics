const express = require('express');
const cors = require('cors');
const {Pool} = require('pg');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config({path:'.env.production'}); 

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;

const pool = new Pool({
   
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// API to get delivery data by tracking code
app.get('/data/:trackingNumber', async (req, res) => {
    const { trackingNumber } = req.params;
    if(!trackingNumber || trackingNumber.length < 5){
        return res.status(404).json({error: 'incorrect tracking number'})
        
    }
    
    try { 
        const result = await pool.query('SELECT * FROM courier_info WHERE tracking_code = $1', [trackingNumber]);

  
    if (result.rows.length > 0) {
        res.json(result.rows[0]);
    } else {
        res.status(404).json({ message: "Tracking code not found in DB" });
    }}
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});


 app.put('/update/:trackingNunber', async(req, res)=>{
    const {trackingNumber} = req.params;
    const {senderName, recieverName, Deliverytime, Deliverystatus, recieverAddress, } = req.body;
    if (!tracking_code || tracking_code.length < 5) {
        return res.status(400).json({ error: 'Tracking code must be at least 5 characters' });
    
    }

   try {
        const result = await pool.query(
         'UPDATE courier_info SET senderName = $1, recieverName =$2, Deliverytime = $3, Deliverystatus = $4, recieverAdress = $5 WHERE trackingNumber = $6 RETURNING *',
         [senderName, recieverName, Deliverytime, Deliverystatus, recieverAddress])


         if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Courier not found' });
          }
      
          res.json({ message: 'Courier updated successfully', courier: result.rows[0] });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Database update failed' });
        }}

      );

      app.post( '/Post/', async(req,res)=>{
        const {tracking_code, sender_name, receiver_name, delivery_status, delivery_time}  = req.body;
        if (!tracking_code || tracking_code.length < 5) {
            return res.status(400).json({ error: 'Tracking code must be at least 5 characters' });
        
      }
      

      try {
        const result = await pool.query(
          `INSERT INTO courier_info (tracking_code, sender_name, receiver_name, delivery_status, delivery_time)
           VALUES ($1, $2, $3, $4)
           RETURNING *`,
          [tracking_code, sender_name, receiver_name, delivery_status]
        );
    
        res.status(201).json({
          message: 'Courier created successfully',
          data: result.rows[0]
        });
      } catch (error) {
        console.error('Error inserting courier:', error.message);
        res.status(500).json({ error: 'Database error during creation' });
      }
    });

    app.delete('/delete/:trackingCode', async (req, res) => {
        const { trackingCode } = req.params;
      
        try {
          const result = await pool.query(
            'DELETE FROM courier_info WHERE tracking_code = $1 RETURNING *',
            [trackingCode]
          );
      
          if (result.rows.length > 0) {
            res.json({
              message: 'Courier deleted successfully',
              data: result.rows[0]
            });
          } else {
            res.status(404).json({ error: 'Tracking code not found' });
          }
        } catch (error) {
          console.error('Error deleting courier:', error.message);
          res.status(500).json({ error: 'Server error during deletion' });
        }
      });
      
    
      

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
