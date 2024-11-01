const express = require('express');
const router = express.Router();
const NhanVien = require('../models/NhanVien');

router.post('/', async (req, res) => {
  const nhanVien = new NhanVien(req.body);
  await nhanVien.save();
  res.send(nhanVien);
});

router.get('/', async (req, res) => {
  const nhanVien = await NhanVien.find();
  res.send(nhanVien);
});

router.put('/:id', async (req, res) => {
  try {
    const nhanVien = await NhanVien.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!nhanVien) return res.status(404).send("Không tìm thấy nhân viên");
    res.send(nhanVien);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Xóa thông tin nhân viên
router.delete('/:id', async (req, res) => {
  try {
    const nhanVien = await NhanVien.findByIdAndDelete(req.params.id);
    if (!nhanVien) return res.status(404).send("Không tìm thấy nhân viên để xóa");
    res.send(nhanVien);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


module.exports = router;
