const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// Kết nối tới MongoDB
mongoose.connect('mongodb://localhost:27017/LibraryDB', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Import các route
const docgiaRoutes = require('./routes/docgia');
const sachRoutes = require('./routes/sach');
const nxbRoutes = require('./routes/nhaxuatban');
const muonsachRoutes = require('./routes/muonsach');
const nhanvienRoutes = require('./routes/nhanvien');

// Sử dụng các route
app.use('/api/docgia', docgiaRoutes);
app.use('/api/sach', sachRoutes);
app.use('/api/nxb', nxbRoutes);
app.use('/api/muonsach', muonsachRoutes);
app.use('/api/nhanvien', nhanvienRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server đang chạy trên cổng ${PORT}`));
