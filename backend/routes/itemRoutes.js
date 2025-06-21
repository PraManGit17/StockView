
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const Item = require('../models/Item');

const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'item-images',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});
const upload = multer({ storage });

router.get('/viewitems', async (req, res) => {
  try {
    const items = await Item.find();

    if (items.length === 0) {
      return res.status(404).json({ msg: 'No Items Present' });
    } else {
      return res.status(200).json(items);
    }

  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});


router.post('/postitems', upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'additionalImages', maxCount: 5 }
]), async (req, res) => {

  try {
    console.log("FILES:", req.files);
    console.log("BODY:", req.body);

    const { name, type, description } = req.body;
    const coverImage = req.files['coverImage']?.[0].path;
    const additionalImages = req.files['additionalImages']?.map(file => file.path || file.url);

    console.log(additionalImages);
    const newItem = new Item({
      name,
      type,
      description,
      coverImage,
      additionalImages
    });

    await newItem.save();

    res.status(201).json({ message: 'Item successfully added', item: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
