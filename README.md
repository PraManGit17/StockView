# 📊 StockView

**StockView** is a full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to **add** and **view** categorized stock items with rich UI and dynamic animations. It supports image uploads (with Cloudinary), responsive design, and smooth routing.

---

## 🔗 Live Demo

- Frontend: https://stock-view-puce.vercel.app
- Backend : https://stockview-backend-b4gx.onrender.com 


## 🚀 Features

### ✅ Frontend (React + Vite)
- Add new items with:
  - Name, type, and description
  - Single cover image + multiple additional images
- View all items (fetched from backend API)
- Smooth animations using GSAP
- Modern responsive UI using TailwindCSS
- Email integration via EmailJS (optional)
- Swiper.js for carousel/image preview

### 🛠 Backend (Node.js + Express + MongoDB)
- REST API to handle item CRUD operations
- File/image upload support using `multer` and `cloudinary`
- CORS enabled for frontend-backend communication
- MongoDB for data persistence via Mongoose
- Environment-based configuration using `.env`

---

## 🧩 Project Structure

```bash
StockView/
├── backend/
│   ├── models/            
│   ├── routes/           
│   ├── server.js          
│   └── .env              
│
├── frontend/
│   ├── public/            
│   ├── src/
│   │   ├── components/    
│   │   │   ├── Post.jsx  
│   │   │   └── View.jsx   
│   └── vite.config.js     



---

## ⚙️ Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/stockview.git
cd StockView

cd backend
npm install

PORT=5000
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

npm run dev
cd ../frontend
npm install
npm run dev
