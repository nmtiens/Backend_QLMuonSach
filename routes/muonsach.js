const express = require('express');
const router = express.Router();
const MuonSach = require('../models/TheoDoiMuonSach');
const Sach = require('../models/Sach');

router.post('/', async (req, res) => {
  try {
    const muonSach = new MuonSach(req.body);
    await muonSach.save();
    res.status(201).send(muonSach);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// API to get all borrowing records 
router.get('/', async (req, res) => {
  try {
    const muonSachs = await MuonSach.find(); // Fetch all borrowing records

    // Use Promise.all to fetch book titles concurrently
    const booksWithTitles = await Promise.all(
      muonSachs.map(async (muonSach) => {
        const sach = await Sach.findOne({ MaSach: muonSach.MaSach }); // Find book by MaSach

        return {
          ...muonSach.toObject(),
          TenSach: sach ? sach.TenSach : 'Tên sách không tìm thấy', // Add the book title, with fallback
        };
      })
    );

    // Return the list of borrowed books with their titles
    res.status(200).json(booksWithTitles);
  } catch (error) {
    console.error("Error fetching borrowed books:", error);
    res.status(500).send({ error: error.message });
  }
});

// API to get a specific borrowing record by ID
router.get('/:MaDocGia', async (req, res) => {
  try {
    // Tìm danh sách sách đã mượn cho độc giả theo MaDocGia
    const muonSachList = await MuonSach.find({ MaDocGia: req.params.MaDocGia });
    
    // Kiểm tra xem có sách nào đã mượn không
    if (!muonSachList.length) {
      return res.status(404).json({ message: "Không tìm thấy sách mượn cho độc giả này" });
    }

    // Lấy tên sách cho từng sách mượn
    const booksWithDetails = await Promise.all(
      muonSachList.map(async (muonSach) => {
        // Tìm sách trong collection Sach bằng MaSach (kiểu String)
        const sach = await Sach.findOne({ MaSach: muonSach.MaSach });

        return {
          ...muonSach.toObject(),
          TenSach: sach ? sach.TenSach : 'Tên sách không tìm thấy', // Nếu tìm thấy sách thì lấy tên
        };
      })
    );

    // Trả về danh sách sách đã mượn cùng với tên sách
    res.status(200).json(booksWithDetails);
  } catch (error) {
    console.error("Error fetching borrowed books:", error);
    res.status(500).json({ message: 'Lỗi khi lấy thông tin sách mượn cho độc giả' });
  }
});


  
// API to update a borrowing record by ID
router.put('/:id', async (req, res) => {
  try {
    const muonSach = await MuonSach.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!muonSach) return res.status(404).send("Không tìm thấy bản ghi mượn sách để cập nhật");
    res.send(muonSach);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// API to delete a borrowing record by ID
router.delete('/:id', async (req, res) => {
  try {
    const muonSach = await MuonSach.findByIdAndDelete(req.params.id);
    if (!muonSach) return res.status(404).send("Không tìm thấy bản ghi mượn sách để xóa");
    res.send(muonSach);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


module.exports = router;
