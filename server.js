const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { PropertyModel } = require('./models/property');
const { UserModel } = require('./models/user');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));

mongoose.connect("mongodb+srv://harshprasad669:DlrEvHBznVir0uSf@properties.jmfqh1l.mongodb.net/?retryWrites=true&w=majority&appName=properties", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const Property = PropertyModel
const User = UserModel

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/houses', require('./routes/propertyRoutes'));

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server running on port ${port}`));
