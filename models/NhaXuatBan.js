const mongoose = require('mongoose');

const nxbSchema = new mongoose.Schema({
  MaNXB: String,
  TenNXB: String,
  DiaChi: String
});

module.exports = mongoose.model('NhaXuatBan', nxbSchema);
