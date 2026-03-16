# C-Connect 💬

Real-time chat web application built with Node.js, Socket.io, and React.

🔗 **Live Demo:** https://c-connect-seven.vercel.app/

---

# 📌 Overview

C-Connect is a real-time chat platform where users can join a room with a username and start messaging instantly.

It uses **WebSockets (Socket.io)** to deliver messages in real time and a **Node.js backend** to manage connections, rooms, and events.

---

# 🚀 Features

- 🔐 Join chat with a custom **username and room**
- 💬 **Real-time messaging** powered by Socket.io
- 👥 **Online users list** for each room
- 📢 **System messages** when users join or leave
- ⚠️ **Basic validation and error handling** on join
- 🌐 **Deployed frontend and backend** for public access

---

# 🛠 Tech Stack

**Frontend**
- React
- JavaScript
- CSS

**Backend**
- Node.js
- Express
- Socket.io

**Deployment**
- Vercel (Frontend)
- Node Server Host (Backend)

**Package Manager**
- npm

---

# 📂 Project Structure

c-connect/
│
├── backend/ # Node.js + Socket.io server
│
├── frontend/
│ └── Cconnect/ # React frontend application
│
├── package.json # Root configuration
├── package-lock.json
└── LICENSE # MIT License


---

# ⚙️ Getting Started (Local Setup)

## 1️⃣ Clone the repository

```bash
git clone https://github.com/Chhavi001/c-connect.git
cd c-connect
```
2️⃣ Backend Setup
```
cd backend
npm install
npm run dev
```

or
```

npm start
```
The backend server will start on:

http://localhost:5000
3️⃣ Frontend Setup

Open a new terminal window and run:
```
cd frontend/Cconnect
npm install
npm start
```

The React app will start on:

http://localhost:3000

and will connect to the backend server.

##🔑 Environment Variables
```
Backend .env (inside backend/)
PORT=5000

Add other variables if required (for example CORS origin).

Frontend .env (inside frontend/Cconnect/)
REACT_APP_BACKEND_URL=http://localhost:5000

Update this value according to your backend deployment.
```

## 📸 Screenshots
### Signup Page
![Signup Page](frontend/Cconnect/public/signupPage.png)

### Chat Room
![Chat Room](frontend/Cconnect/public/Chat.png)

⚡ How It Works

User enters a username and room name and submits the join form.

Frontend connects to the Socket.io server and emits a join event.

Backend validates the data and adds the user to the selected room.

When a user joins or leaves, a system message is broadcast to the room.

Messages sent by users are delivered instantly to all users in the same room.


## 📜 Available Scripts
```
Backend (inside backend/)
npm run dev      # Start server in development mode
npm start        # Start server in production mode
Frontend (inside frontend/Cconnect/)
npm start        # Run React development server
npm run build    # Create production build
```
🔮 Future Improvements
```
⌨️ Typing indicators

📷 Image / file sharing

🔐 Authentication system

🔒 Private chat rooms

📱 Better mobile responsiveness

🕒 Message timestamps

✔️ Read receipts
```
📄 License
```
This project is licensed under the MIT License.
See the LICENSE file for details.
```
👩‍💻 Author
```
Chhavi Gautam

GitHub: https://github.com/Chhavi001

⭐ If you found this project helpful, consider giving it a star!
```
