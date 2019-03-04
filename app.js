// "use strict";

const express = require('express')
// const bodyParser = require('body-parser')
const app = express()
const defaultRoutes = require('./routes/default.js')
// const projectsRoutes = require('./routes/projects.js')
// const contactRoutes = require('./routes/contact.js')

app.set('view engine', 'pug')

// Route vers les ressources static
app.use(express.static('public'))

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }));

// Routes par defaut
app.use('/', defaultRoutes);

// Routes pour /projects
// app.use('/projects', projectsRoutes);


app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})