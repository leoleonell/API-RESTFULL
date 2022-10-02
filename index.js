const express = require('express');
const bodyParser = require('body-parser');


const app = express()
const port = process.env.PORT || 3000

//
const studentRoutes = require('./routes/utlisateur');
const publicationRoutes = require('./routes/publication');
const commentaireRoutes = require('./routes/commentaire');
const messageRoutes = require('./routes/message');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())




app.use('/utilisateurs', studentRoutes);
app.use('/publications', publicationRoutes);
app.use('/commentaires',commentaireRoutes);
app.use('/messages',messageRoutes);

// Listen on environment port or 3000
app.listen(port, () => console.log(`Listen on port ${port}`)) 