/** @format */

// import & setup express
const express = require('express');
const app = express();

// set Port variable
const PORT = process.env.PORT || 5000;

// set redirect to public folder
app.use(express.static('./public/'));

// start server
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
