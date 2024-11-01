const express = require('express');
const router = express.Router();
const NhaXuatBan = require('../models/NhaXuatBan');

router.post('/', async (req, res) => {
  const nxb = new NhaXuatBan(req.body);
  await nxb.save();
  res.send(nxb);
});

router.get('/', async (req, res) => {
  const nxb = await NhaXuatBan.find();
  res.send(nxb);
});

router.put('/:id', async (req, res) => {
  try {
    const nxb = await NhaXuatBan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!nxb) return res.status(404).send("Không tìm thấy nhà xuất bản");
    res.send(nxb);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Xóa thông tin nhà xuất bản
router.delete('/:id', async (req, res) => {
  try {
    const nxb = await NhaXuatBan.findByIdAndDelete(req.params.id);
    if (!nxb) return res.status(404).send("Không tìm thấy nhà xuất bản để xóa");
    res.send(nxb);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
