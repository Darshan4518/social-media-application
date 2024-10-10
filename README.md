<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>📱 D-Media</h1>
    <p><strong>D-Media</strong> is a social media mobile app built using <strong>React Native</strong> and a robust backend with <strong>Node.js</strong> and <strong>MongoDB</strong>. It offers real-time features like chat and notifications, powered by <strong>Socket.io</strong> and <strong>Redis</strong>. Users can post, comment, like, and follow/unfollow other users, while managing their profiles with media uploads to <strong>Cloudinary</strong>.</p>

   <h2>🚀 Tech Stack</h2>
    <h3>Frontend:</h3>
    <ul>
        <li>⚛️ <strong>React Native</strong></li>
        <li>🛠️ <strong>Redux Toolkit</strong> / <strong>Redux</strong></li>
        <li>🔗 <strong>Axios</strong></li>
        <li>🎨 <strong>NativeWind</strong> (for styling)</li>
        <li>📷 <strong>Expo Image Picker</strong> (for media uploads)</li>
        <li>💬 <strong>Socket.io</strong> (for real-time communication)</li>
    </ul>
    <h3>Backend:</h3>
    <ul>
        <li>🔧 <strong>Node.js</strong> with <strong>Express.js</strong></li>
        <li>💾 <strong>MongoDB</strong> (Database)</li>
        <li>☁️ <strong>Cloudinary</strong> (Media uploads)</li>
        <li>⚡ <strong>Socket.io</strong> and <strong>Redis</strong> (Real-time communication & notifications)</li>
    </ul>
    <h2>🌟 Features</h2>
    <ul>
        <li>🔐 <strong>User Authentication</strong>: Secure login and registration system for all users.</li>
        <li>📝 <strong>Posting & Commenting</strong>: Users can create, update, delete posts, and comment on others' posts.</li>
        <li>❤️ <strong>Like System</strong>: Users can like posts and see the total number of likes on each post.</li>
        <li>🔄 <strong>Follow/Unfollow</strong>: Follow or unfollow other users to stay updated on their posts.</li>
        <li>💬 <strong>Real-time Chat</strong>: Engage in real-time conversations with other users, with the ability to delete messages.</li>
        <li>🔔 <strong>Real-time Notifications</strong>: Get instant notifications for new likes, comments, and chat messages.</li>
        <li>👤 <strong>Profile Management</strong>: Users can update their profile picture and bio, making it easy to personalize their profiles.</li>
        <li>📷 <strong>Media Uploads</strong>: Upload images using <strong>Cloudinary</strong> and manage them easily within the app.</li>
    </ul>


<h3> ScreenShots</h3> 

![Screenshot 2024-10-04 085123](https://github.com/user-attachments/assets/dea2887e-3bb3-49aa-b4e2-c11d96530f99)

![Screenshot 2024-10-04 085139](https://github.com/user-attachments/assets/3cd845ab-a533-466d-b27a-fa48b60ecff4)

![Screenshot 2024-10-04 085246](https://github.com/user-attachments/assets/8504f937-5f5d-4c4a-a644-78e11ef9af96)

![Screenshot 2024-10-04 085300](https://github.com/user-attachments/assets/3949a754-8518-4745-aabd-6e669ca17b14)

![Screenshot 2024-10-04 085345](https://github.com/user-attachments/assets/26e66e59-b529-4d4b-b128-05c0a7ad9292)

![Screenshot 2024-10-04 085405](https://github.com/user-attachments/assets/c88e89b3-033a-4712-b654-45fcf36bd82d)

![Screenshot 2024-10-04 085432](https://github.com/user-attachments/assets/f1622d1d-b983-442d-af58-ba9b5012bef5)

![Screenshot 2024-10-04 085441](https://github.com/user-attachments/assets/3af8260a-42e4-4c99-9142-7fb92e67c345)

![Screenshot 2024-10-04 085506](https://github.com/user-attachments/assets/367096a8-d0af-41bd-9197-dcb03edda7b0)

![Screenshot 2024-10-04 085527](https://github.com/user-attachments/assets/01a0befa-f39b-455f-8df3-4f0672f2e315)

  <h2>🛠️ Installation and Setup</h2>
    <h3>Prerequisites:</h3>
    <ul>
        <li>Node.js</li>
        <li>MongoDB (locally or cloud-based like MongoDB Atlas)</li>
        <li>Expo CLI (for running React Native)</li>
    </ul>
    <h3>1. Clone the Repository:</h3>
    <pre><code>git clone https://github.com/Darshan4518/d-media.git
cd d-media
</code></pre>
    <h3>2. Install Frontend Dependencies:</h3>
    <pre><code>cd frontend
npm install
</code></pre>
    <h3>3. Install Backend Dependencies:</h3>
    <pre><code>cd backend
npm install
</code></pre>
    <h3>4. Set Up Environment Variables:</h3>
    <p>Create a <code>.env</code> file in the <code>backend</code> folder and add your MongoDB URI, Cloudinary credentials, and other necessary environment variables.</p>
    <pre><code>MONGO_URI=your_mongo_uri
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret
REDIS_URL=your_redis_url
</code></pre>
    <h3>5. Run the Backend Server:</h3>
    <pre><code>cd backend
npm start
</code></pre>
    <h3>6. Run the Mobile App (Expo):</h3>
    <pre><code>cd frontend
expo start
</code></pre>
    <h2>📄 API Documentation</h2>
    <h2>🔗 Project Links</h2>
    <ul>
        <li><a href="https://github.com/Darshan4518/social-media-webapp/tree/main/backend">Backend Repository</a></li>
    </ul>
    <h2>🤝 Contributing</h2>
    <p>Feel free to open issues or submit pull requests if you'd like to improve the project.</p>
</body>
</html>
