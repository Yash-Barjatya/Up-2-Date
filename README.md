# Welcome to our Notes Taking App:  [UP-2-DATE](https://up-2-date.onrender.com/ "UP-2-DATE: Notes-taking-Website")

Our notes-taking app is a powerful tool built with React.js, Node.js (Express), and MongoDB, designed to empower you in efficiently managing your notes while providing a secure and personalized experience.

## Features:

1. **Add, Edit, and Delete Notes:** With our user-friendly interface, you can effortlessly create new notes, update existing ones, and delete notes you no longer need. Stay organized and keep track of your thoughts, tasks, and ideas easily.

2. **Authentication for Enhanced Privacy:** Your privacy is our top priority. Our app utilizes robust authentication to ensure that only you can access and view your notes. Feel confident knowing that your sensitive information remains safe and secure.

3. **Effortless User Experience:** We've designed our app with simplicity in mind. Our intuitive interface allows you to focus on capturing your ideas without any distractions. Enjoy a seamless experience as you manage your notes effortlessly.

4. **Cloud-Based Storage:** Powered by MongoDB, your notes are securely stored in the cloud. Never worry about losing your notes, even if you switch devices. Access your notes from anywhere, anytime.

5. **Responsive Design:** Our app is fully responsive, making it accessible on various devices, including desktops, tablets, and mobile phones. Whether you're on the go or at your desk, your notes are always within reach.

6. **Real-Time Updates:** Collaborate easily by seeing real-time updates across your devices. When you edit a note on one device, the changes are instantly reflected on all your connected devices.

## Getting Started with the Project

To get started with the project, follow these steps:

1. **Download the Source Code:**
   Download the source code zip folder from the repository.

2. **Setting up the Backend:**
   - Open a terminal or command prompt and navigate to the "backend" directory.
   - Install the required Node.js modules by running the command:
     ```
     npm install
     ```
   - Start the backend server using the command:
     ```
     npm run dev
     ```

3. **Setting up the Frontend:**
   - Open another terminal or command prompt and navigate to the "frontend" directory.
   - Install the required Node.js modules by running the command:
     ```
     npm install
     ```
   - Start the frontend development server using the command:
     ```
     npm run start
     ```

Make sure to provide the following configuration in an environment file:

- **MongoDB URL:** Replace `<YOUR_MONGODB_URL>` with the actual URL of your MongoDB database.

- **JWT Secret Token:** Set a secret token for JSON Web Token (JWT) authentication.

- **Backend Server Host Name:** Replace `<YOUR_BACKEND_SERVER_HOST>` with the hostname of your backend server. This is required to connect the frontend with the backend APIs.

**Note:** Ensure that your MongoDB server is running and accessible before starting the backend. Additionally, verify that the backend and frontend servers are using the appropriate configuration to communicate with each other.

**You are now ready to explore the project and begin your development journey!**

# Future Updates

- [ ] Write the about page
- [ ] Create a profile page and allow users to change details of their profile, including deletion of the profile.
- [ ] Search Functionality: Implement a search feature that allows users to search for specific keywords or tags within their notes, making it easier to find relevant information quickly.
- [ ] Allow users to pin important notes.
- [ ] Allow users to share their notes.
- [ ] Allow collaboration 
- [ ] Dark Mode: Provide a dark mode option for users who prefer a more visually comfortable experience, especially during low-light conditions.
