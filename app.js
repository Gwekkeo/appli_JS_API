"use strict";

const express = require('express')
// const bodyParser = require('body-parser')
const app = express()
const defaultRoutes = require('./routes/default.js')
const apiRoutes = require('./routes/api.js')

app.set('view engine', 'pug')

// Route vers les ressources static
app.use(express.static('public'))

// Routes par defaut
app.use('/', defaultRoutes);
app.use('/', apiRoutes);

// Routes pour /projects
// app.use('/projects', projectsRoutes);



app.listen(process.env.PORT || 5000, () => {
  console.log('Example app listening on port 3000!')
})
