A task management application built with React for the frontend, Node.js and Express for the backend, and MongoDB for the database. The app allows users to register, log in, and manage tasks by organizing them into stages: To Do, In Progress, and Done. Users can add, edit, update, and delete tasks, and manage their task statuses.

Features
User Authentication: Users can register, log in, and manage their session using JWT tokens.

Task Management:

Add new tasks with a title, description, and default status.

View tasks grouped into three stages: To Do, In Progress, and Done.

Edit tasks, update their status, or delete them.

Responsive UI: The app is built to be fully responsive, ensuring a smooth experience across all devices.

Protected Routes: Users need to be logged in to manage tasks.

Technologies Used
Frontend:

React.js

React Router for navigation

Tailwind CSS for styling

Axios for API calls

Backend:

Node.js

Express.js

MongoDB for storing tasks and user data

JWT for authentication

Axios for making API requests from the frontend

Database:

MongoDB (using Mongoose for ORM)

Setup Instructions
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/task-management-app.git
cd task-management-app
2. Install dependencies
Backend (Server)
Navigate to the backend directory:

bash
Copy
Edit
cd server
npm install
Frontend (React)
Navigate to the frontend directory:

bash
Copy
Edit
cd frontend
npm install
3. Configuration
Create a .env file in the server directory to store the environment variables:

bash
Copy
Edit
MONGODB_URI=<your-mongo-database-uri>
JWT_SECRET=<your-jwt-secret-key>
PORT=5000
4. Run the App
Start the Backend (Server)
In the server directory, run:

bash
Copy
Edit
npm start
This will start the backend server on http://localhost:5000.

Start the Frontend (React)
In the frontend directory, run:

bash
Copy
Edit
npm start
This will start the React development server on http://localhost:3000.

5. Access the App
Once both the backend and frontend servers are running, you can open your browser and visit http://localhost:3000 to interact with the app.

Application Flow
1. Home Page
Unauthenticated Users: The home page is available for users who have not logged in. They can register or log in.

2. Dashboard
Logged-in Users: After login, users are redirected to their Dashboard. This page shows three sections for tasks:

To Do

In Progress

Done

Users can click on tasks to edit their status, edit task details, or delete tasks.

3. Your Tasks Page
Users can also view all their tasks without filtering them by stage. They can click on each task to update its status or edit its details.

4. Task Management
Users can:

Add tasks with title and description.

Set the task status to one of three stages: To Do, In Progress, or Done.

Update the task status at any time.

Delete tasks.

