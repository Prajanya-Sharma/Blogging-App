# Blog Application

This is a simple blog application where users can create accounts, log in, create blog posts, comment on posts, and delete their own comments. Below is an overview of the project structure and how to set up and run the application.

## Project Structure

### `/middleware/authentication.js`
This middleware is used to protect routes that require authentication. It ensures that users are logged in before they can access certain pages or perform actions such as creating a blog post or commenting.

### `/models/blog.js`
This file defines the Blog model schema using Mongoose. A blog post contains a title, body, cover image URL, and the ID of the user who created it. It also timestamps when a blog is created or updated.

### `/models/comment.js`
Defines the Comment model schema using Mongoose. A comment is associated with a blog post and contains the content of the comment, the ID of the user who created the comment, and the ID of the blog post it is related to.

### `/models/user.js`
This file defines the User model schema. It stores user details such as `fullName`, `email`, `password`, and `profileImageURL`. It also hashes user passwords before saving them to the database.

### `/routes/blog.js`
Handles all blog-related routes:
- **`/add-new`**: Displays the form to create a new blog post.
- **`/:id`**: Fetches a specific blog post by its ID and displays it along with the comments.
- **`/comment/:blogID`**: Handles the submission of comments on a blog post.
- **`/comment/:id`**: Deletes a comment based on its ID.

### `/routes/user.js`
Manages user authentication and account management:
- **`/signin`**: Handles user login.
- **`/signup`**: Handles user registration.
- **`/logout`**: Logs out the current user.

### `/services/authentication.js`
This service handles user authentication logic, including password hashing and comparing hashed passwords for login validation.

### `/views`

This folder contains all the EJS templates used to render the UI:

- **`addBlog.ejs`**: A form for adding new blog posts.
- **`blog.ejs`**: Displays a single blog post and its associated comments.
- **`home.ejs`**: The home page showing a list of all blog posts.
- **`signin.ejs`**: The sign-in form.
- **`signup.ejs`**: The sign-up form.
- **`partials/head.ejs`**: Contains meta tags and links to external stylesheets or scripts.
- **`partials/navbar.ejs`**: The navigation bar displayed at the top of the pages.
- **`partials/script.ejs`**: External JavaScript files included at the bottom of the pages.

### `index.js`
The main entry point of the application. It sets up the Express server, connects to the MongoDB database, and configures middleware for session handling, authentication, and routing.

### `package.json`
Contains project dependencies and scripts. It is used by npm to manage the project, including installing required libraries.

### `package-lock.json`
Tracks the exact versions of dependencies installed to ensure consistent environments across different installations.

### `/images/profile_image.png`
A default placeholder image for user profiles if they haven't uploaded a profile image.

## Installation and Setup

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v12 or later)
- [MongoDB](https://www.mongodb.com/) (running locally or in the cloud)

### Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
Install dependencies:

bash
Copy code
npm install
Set up the environment variables: Create a .env file in the root of the project and add the following:

bash
Copy code
MONGO_URI=<your_mongodb_connection_string>
SESSION_SECRET=<your_session_secret>
Run the server:

bash
Copy code
npm start
Open your browser and go to http://localhost:3000 to see the app.

Features
User Authentication: Users can sign up, log in, and log out.
Blog Creation: Authenticated users can create blog posts with images.
Commenting: Users can comment on blog posts.
Comment Deletion: Users can delete their own comments.
Responsive UI: The application has a clean and responsive UI.
Technologies Used
Node.js: JavaScript runtime for building the server-side of the application.
Express.js: Web framework for Node.js.
MongoDB & Mongoose: NoSQL database and ORM for managing data.
EJS: Embedded JavaScript templates for rendering views.
Multer: Middleware for handling file uploads (e.g., blog cover images).
bcryptjs: For hashing and validating user passwords.
Express-session: Middleware for handling user sessions.
Screenshots
Home Page
