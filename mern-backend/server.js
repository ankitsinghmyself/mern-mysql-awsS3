const express = require('express');
var fileupload = require('express-fileupload');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const recordsRoutes = require('./routes/recordsRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(fileupload());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/records', recordsRoutes);
app.use('/', (req, res) => {
  res.send('MERN Server API');
});
// Start server
const PORT = process.env.PORT || 3300;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
