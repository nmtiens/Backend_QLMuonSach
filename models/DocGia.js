const mongoose = require('mongoose');

const docGiaSchema = new mongoose.Schema({
  MaDocGia: String,
  HoLot: String,
  Ten: String,
  NgaySinh: Date,
  Phai: String,
  DiaChi: String,
  DienThoai: String
});

module.exports = mongoose.model('DocGia', docGiaSchema);
