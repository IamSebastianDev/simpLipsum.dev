/** @format */

// import & setup express
import express from 'express';
const app = express();

// import lispum middleware
import { lorem } from './generator/lipsum.mjs';

// set Port variable
const PORT = process.env.PORT || 5000;

// set api redirect to envoke lorem function
app.get('/generator/', (req, res) => lorem(req, res));

// set redirect to public folder
app.use(express.static('./public/'));

// start server
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
