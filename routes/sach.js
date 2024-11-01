const express = require('express');
const router = express.Router();
const Sach = require('../models/Sach');

router.post('/', async (req, res) => {
  const sach = new Sach(req.body);
  await sach.save();
  res.send(sach);
});

router.get('/', async (req, res) => {
  const sach = await Sach.find();
  res.send(sach);
});

router.put('/:id', async (req, res) => {
  try {
    const sach = await Sach.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sach) return res.status(404).send("Không tìm thấy sách");
    res.send(sach);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Xóa thông tin sách
router.delete('/:id', async (req, res) => {
  try {
    const sach = await Sach.findByIdAndDelete(req.params.id);
    if (!sach) return res.status(404).send("Không tìm thấy sách để xóa");
    res.send(sach);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


module.exports = router;
