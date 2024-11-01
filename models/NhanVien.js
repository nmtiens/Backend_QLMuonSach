const mongoose = require('mongoose');

const nhanVienSchema = new mongoose.Schema({
  MSNV: String,
  HoTenNV: String,
  Password: String,
  Chucvu: String,
  Diachi: String,
  SoDienThoai: String
});

module.exports = mongoose.model('NhanVien', nhanVienSchema);
