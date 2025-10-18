# Job Application Portal

A full-stack web application where users can register as either **Recruiters** or **Applicants**.  
Recruiters can post and manage job listings, while Applicants can browse and apply for jobs, managing their own applications seamlessly.

---

## Features

### Recruiter
- Create, Read, Update, and Delete (CRUD) operations on **own job posts**.
- Manage job listings efficiently through a simple UI.

### Applicant
- View **all active job listings** posted by recruiters.
- Submit job applications for desired roles.
- Perform CRUD operations on their **own applications** only.

### Authentication & Security
- Secure authentication using **JWT (JSON Web Token)**.
- **Password reset functionality** via email.
- **Google OAuth** for easy login/signup.
- Protected routes for both recruiters and applicants.

---

## Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | JWT, Google OAuth |
| Deployment | Render |

---
## Postman API Documentation:
Link: https://documenter.getpostman.com/view/48451096/2sB3QQJStn

## Installation and Setup

Follow these steps to set up the project locally:

```bash
# Clone the repository
git clone https://github.com/Naman354/Job-Application-Portal-Backend.git

# Navigate to the project directory
cd Job-Application-Portal-Backend

# Install dependencies
npm install

# Run the development server
npm run dev
# OR
npm start

Create a .env file in the root directory and add the following variables:

PORT=
JWT_SECRET=
MONGO_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
SESSION_SECRET=
NODE_ENV=
Note: The .env file is listed in .gitignore and should not be pushed to GitHub.

Folder Structure
Job-Application-Portal/
├── config/
├── controllers/
├── middlewares/
├── frontend/
├── model/
├── routes/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js

Deployment: The project is live on Render: https://job-application-portal-backend-07uw.onrender.com/

Author: Naman Srivastava
🔗 GitHub Profile: https://github.com/Naman354/Job-Application-Portal-Backend

📝 Notes:
Both npm run dev and npm start scripts are supported.
Environment variables are safely excluded from version control.
The frontend is contained within the frontend directory and can be connected seamlessly to the backend.