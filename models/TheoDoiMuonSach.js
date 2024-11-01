const mongoose = require('mongoose');

const muonSachSchema = new mongoose.Schema({
  MaDocGia: String,
  MaSach: String,
  NgayMuon: Date,
  NgayTra: Date
});

module.exports = mongoose.model('TheoDoiMuonSach', muonSachSchema);
