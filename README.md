# Zonta Club of Naples Website

### Group Members: Dennis Ray, Brian Velazquez, Esmir Ramirez, Joshua Martin, Suhaib Farah

## File Structure

```
zonta-website/
├── client/ # Frontend (React + Vite + Tailwind)
│ ├── public/
│ │ └── vite.svg
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ │ ├── Header.jsx
│ │ │ ├── Footer.jsx
│ │ │ ├── Navbar.jsx
│ │ │ └── DonateButton.jsx
│ │ ├── pages/ # Page components
│ │ │ ├── HomePage.jsx
│ │ │ ├── AboutPage.jsx
│ │ │ ├── ScholarshipPage.jsx
│ │ │ ├── MembershipPage.jsx
│ │ │ └── NotFoundPage.jsx
│ │ ├── hooks/ # Custom React hooks
│ │ │ └── useFetch.js
│ │ ├── utils/
│ │ │ └── api.js # API client configuration
│ │ ├── config/
│ │ │ └── constants.js # App constants & endpoints
│ │ ├── styles/
│ │ │ └── global.css
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ ├── .gitignore
│ ├── eslint.config.js
│ ├── index.html
│ ├── package.json
│ ├── vite.config.js
│ └── README.md
│
├── server/ # Backend (Express + Node.js)
│ ├── config/
│ │ ├── db.js # Database configuration
│ │ └── env.js # Environment variables
│ ├── controllers/ # Request handlers
│ │ ├── memberController.js
│ │ ├── scholarshipController.js
│ │ ├── eventController.js
│ │ └── donationController.js
│ ├── models/ # Data models/schemas
│ │ ├── Member.js
│ │ ├── Scholarship.js
│ │ ├── Event.js
│ │ └── Donation.js
│ ├── routes/ # API routes
│ │ ├── index.js # Main route aggregator
│ │ ├── members.js
│ │ ├── scholarships.js
│ │ ├── events.js
│ │ └── donations.js
│ ├── middleware/ # Custom middleware
│ │ ├── corsMiddleware.js
│ │ ├── errorHandler.js
│ │ └── authMiddleware.js
│ ├── utils/
│ │ ├── helpers.js
│ │ └── validators.js
│ ├── tests/ # Test files (future)
│ │ ├── unit/
│ │ └── integration/
│ ├── .env.example
│ ├── .gitignore
│ ├── app.js # Express app configuration
│ ├── server.js # Server entry point
│ ├── package.json
│ └── README.md
│
├── docs/ # Project documentation
│ ├── SETUP.md # Setup instructions
│ └── API.md # API documentation
│
├── .gitignore # Root gitignore
├── README.md # Main project overview
├── CONTRIBUTING.md # Contribution guidelines
└── package.json # Root package.json (optional)
```

---

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zonta-website
   ```

2. **Install dependencies**
   
   For the **client**:
   ```bash
   cd client
   npm install
   ```
   
   For the **server**:
   ```bash
   cd ../server
   npm install
   ```

3. **Set up environment variables**
   
   In the `server` directory, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Update the values in `.env` as needed.

4. **Run the development servers**
   
   In separate terminal windows:
   
   **Terminal 1 - Backend:**
   ```bash
   cd server
   node server.js
   # Server runs on http://localhost:3000
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   cd client
   npm run dev
   # Client runs on http://localhost:5173
   ```

---

## File Descriptions

### Backend Key Files

- **`app.js`** - Express application setup, middleware, and route configuration
- **`server.js`** - Server startup and port configuration
- **`routes/index.js`** - Aggregates all API routes
- **`controllers/`** - Business logic for handling requests
- **`models/`** - Database schemas and data models
- **`middleware/`** - Custom middleware functions (CORS, auth, error handling)

### Frontend Key Files

- **`App.jsx`** - Main React component with routing
- **`main.jsx`** - React app entry point
- **`pages/`** - Full page components
- **`components/`** - Reusable UI components
- **`utils/api.js`** - Axios configuration for API calls
- **`config/constants.js`** - Application constants and API endpoints

---

## Git Workflow

### Workflow Steps

1. **Create a new branch**
   ```bash
   git checkout -b your-feature-name
   ```

2. **Make your changes and commit**
   ```bash
   git add .

   git commit -m "Add scholarship application form"
   ```

3. **Push your branch**
   ```bash
   git push origin your-feature-name
   ```

4. **Open a Pull Request on GitHub**
   - Add a descriptive title
   - Request for review

---

## Linting

Run ESLint before committing:
```bash
cd client

npm run lint
```

---

## Available Scripts

### Client (Frontend)
```bash
npm run dev # Start development server
npm run build # Build for production
npm run preview # Preview production build
npm run lint # Run ESLint
```

### Server (Backend)
```bash
node server.js # Start the server
npm test # Run tests (when implemented)
```

---

## Useful Links

- [React Documentation](https://react.dev/)
- [Express Documentation](https://expressjs.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

---

## License

This project is licensed under the MIT License.
