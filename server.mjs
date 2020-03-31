/** @format */

// import & setup express
import express from 'express';
import cors from 'cors';
const app = express();

// import lorem
import lorem from './api/index';

// set Port variable
const PORT = process.env.PORT || 5000;

// set redirect to public folder
app.use(express.static('./public/'));

// invoke api on request
app.get('/api', cors(), (req, res) => lorem(req, res));

// start server
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
