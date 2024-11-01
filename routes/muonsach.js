const express = require('express');
const router = express.Router();
const TheoDoiMuonSach = require('../models/TheoDoiMuonSach');

router.post('/', async (req, res) => {
  const muonSach = new TheoDoiMuonSach(req.body);
  await muonSach.save();
  res.send(muonSach);
});

router.get('/:MaDocGia', async (req, res) => {
    const { MaDocGia } = req.params;
    try {
        const borrowedBooks = await MuonSach.find({ MaDocGia }).populate('MaSach'); // Giả sử MaSach là reference tới sách
        res.status(200).json(borrowedBooks);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin sách mượn.' });
    }
});

router.put('/:id', async (req, res) => {
  try {
    const muonSach = await TheoDoiMuonSach.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!muonSach) return res.status(404).send("Không tìm thấy thông tin mượn sách");
    res.send(muonSach);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// Xóa thông tin mượn sách
router.delete('/:id', async (req, res) => {
  try {
    const muonSach = await TheoDoiMuonSach.findByIdAndDelete(req.params.id);
    if (!muonSach) return res.status(404).send("Không tìm thấy thông tin mượn sách để xóa");
    res.send(muonSach);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


module.exports = router;
