const express = require('express');
const router = express.Router();
const DocGia = require('../models/DocGia');

// API để tạo độc giả mới
router.post('/', async (req, res) => {
  const docGia = new DocGia(req.body);
  await docGia.save();
  res.send(docGia);
});

// API để lấy thông tin tất cả độc giả
router.get('/', async (req, res) => {
  const docGia = await DocGia.find();
  res.send(docGia);
});

router.put('/:id', async (req, res) => {
  try {
    const docGia = await DocGia.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!docGia) return res.status(404).send("Không tìm thấy độc giả");
    res.send(docGia);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const docGia = await DocGia.findByIdAndDelete(req.params.id);
    if (!docGia) return res.status(404).send("Không tìm thấy độc giả để xóa");
    res.send(docGia);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
