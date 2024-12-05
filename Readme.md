# VideoHut - Backend System

A robust backend system combining the best features of YouTube and Twitter, enabling users to share video-based tweets and engage through comments, likes, and other social interactions.

## 📖 Project Concept

VideoHut is a platform designed for seamless sharing and interaction with video-based tweets. It supports content creation, social engagement, and efficient video management to redefine video-centric social interactions.

---

## ✨ Features

### 1. **User Authentication**
- Secure JWT-based login system.
- Email verification for user access.

### 2. **Content Management**
- Handles video uploads and tweets with attachments.
- Facilitates comments, likes, and interactions on tweets and videos.

### 3. **Database Management**
- Powered by **MongoDB**, storing:
  - User profiles
  - Video metadata
  - Tweets
  - Comments and likes

### 4. **API Development**
- Provides **RESTful APIs** for:
  - CRUD operations on tweets
  - Video management
  - Handling user interactions

### 5. **Engagement Features**
- Manages likes and comments to enhance user engagement.

### 6. **File Handling**
- Supports uploading and processing of:
  - Images
  - Videos
  - Other media types

### 7. **Security & Error Handling**
- Input validation and secure API endpoints.
- Comprehensive error handling for smooth operation.

---

## 💻 Technology Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Cloudinary**

---

## 🚀 How to Run

Follow the steps below to set up and run the project:

### 1. Clone the Repository
```bash
git clone https://github.com/Pawan8620/VideoHut.git
cd VideoHut
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the project root and configure it with the following variables:

# MongoDB Setup
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.wfwpisi.mongodb.net

# Server Configuration
PORT=3000
CORS_ORIGIN=*

# Authentication
SALT_ROUNDS=<salt_value>
ACCESS_TOKEN_SECRET=<secret_key>
ACCESS_TOKEN_EXPIRY=<expiry_time>
REFRESH_TOKEN_SECRET=<secret_key>
REFRESH_TOKEN_EXPIRY=<expiry_time>

# Cloudinary
CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_SECRET_KEY=<secret_key>

# (Optional) API Environment Variable
CLOUDINARY_URL=<cloudinary_url>

# Resend API
RESEND_API_KEY=<api_key>

### 4. Start the Server
Run the development server using the following command:
```bash
npm run dev
```

If you're using another package manager like **yarn** or **pnpm**, replace `npm` with the appropriate command.

---

## 📂 Folder Structure

```
VideoHut/
├── src/
│   ├── controllers/       # Contains all route controllers
│   ├── models/            # Database models
│   ├── routes/            # API route definitions
│   ├── middleware/        # Middleware for validation and security
│   ├── utils/             # Utility functions
├── config/                # Configuration files
├── .env                   # Environment variables (not included in repo)
├── package.json           # Project metadata and dependencies
├── README.md              # Documentation
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push the branch (`git push origin feature-branch`).
5. Open a pull request.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 📧 Contact

If you have any questions or need assistance, feel free to reach out:
- **Author**: Pawankumar Pandey
- **Email**: pawanpandey86.20@gmail.com
- **GitHub**: [Pawan8620](https://github.com/Pawan8620)
