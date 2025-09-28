# NeoDB Authentication Demo

A teaching-friendly Next.js project that demonstrates how to build a modern authentication system backed by MongoDB. The goal is to help new students understand **every moving piece**—from database modelling to UI components—so they can read the code, run the project, and extend it with confidence.

> **Who is this for?**
> Students who know a bit of HTML/CSS/JS but are new to frameworks, databases, or authentication. Every section below breaks down the concepts in plain language.

---

## � Table of contents

- [📚 What you will learn](#-what-you-will-learn)
- [🧱 Tech stack at a glance](#-tech-stack-at-a-glance)
- [🗂️ Project tour](#-project-tour)
- [🚀 Getting started (Windows-friendly)](#-getting-started-windows-friendly)
- [🔐 Environment variables](#-environment-variables)
  - [Generating a secret](#generating-a-secret)
- [🗄️ Database deep dive](#-database-deep-dive)
  - [Key vocabulary](#key-vocabulary-no-prior-knowledge-needed)
  - [Create a free MongoDB Atlas database](#step-by-step-create-a-free-mongodb-atlas-database-recommended)
  - [Run MongoDB locally](#option-b-run-mongodb-locally-offline-learning)
  - [Plug the database into this project](#plug-the-database-into-this-project)
  - [How the code connects](#how-the-code-connects-no-magic-involved)
  - [User schema](#user-schema-modelsuserjs)
  - [Inspect your data visually](#inspect-your-data-visually)
  - [Lifecycle of a request](#lifecycle-of-a-request-how-data-flows)
  - [Use the same database from other languages](#using-the-same-database-from-other-languages)
- [🔒 Authentication flow explained](#-authentication-flow-explained)
- [🌐 API reference](#-api-reference)
- [🎨 Frontend walkthrough](#-frontend-walkthrough)
- [✅ Development checklist](#-development-checklist)
- [🛠️ Troubleshooting](#-troubleshooting)
- [🌱 Ideas for student extensions](#-ideas-for-student-extensions)
- [📎 Further reading](#-further-reading)

## �📚 What you will learn

- How the App Router in Next.js organises pages, layouts, and API routes.
- How MongoDB + Mongoose store user accounts and why we hash passwords.
- How JWT (JSON Web Tokens) enable stateless authentication via secure cookies.
- How the UI switches between “guest” and “signed-in” states using shared helpers.

## 🧱 Tech stack at a glance

| Layer | Technology | Why we use it |
| --- | --- | --- |
| UI | React 19 + Tailwind-style utility classes | Reactive components with modern styling |
| Framework | Next.js 15 App Router | File-system routing, server components, API routes |
| Database | MongoDB + Mongoose | Flexible document store with schema validation |
| Auth | `jose` (JWT) + HttpOnly cookies | Secure, stateless sessions that work on the Edge runtime |
| Utilities | `bcryptjs`, `lucide-react` | Password hashing, icons |

## 🗂️ Project tour

```
database-demo/
├─ app/
│  ├─ layout.js            # Root layout, injects <NavBar /> and global styles
│  ├─ page.js              # Public landing page with conditional CTA
│  ├─ login/, signup/      # Client components with forms calling API routes
│  └─ profile/page.js      # Server component that renders protected data
├─ app/api/auth/           # The authentication API (signup, login, logout, me)
├─ components/             # Reusable UI pieces (NavBar, GlowButton, Card, etc.)
├─ lib/
│  ├─ mongodb.js           # Mongoose connection helper
│  ├─ auth.js              # `getCurrentUser()` helper shared by server components
│  └─ zodiac.js            # Fun enrichment logic used on the profile page
├─ models/User.js          # Mongoose schema that defines a user document
├─ middleware.js           # Guards the /profile route by checking the JWT cookie
├─ package.json            # Scripts + dependencies (we default to pnpm)
└─ README.md               # You are here ❤
```

## 🚀 Getting started (Windows-friendly)

1. **Install prerequisites**
   - [Node.js 20 LTS](https://nodejs.org/) (includes `npm`)
   - [pnpm](https://pnpm.io/installation) (run `npm install -g pnpm` once)
   - A MongoDB deployment: [MongoDB Atlas free tier](https://www.mongodb.com/cloud/atlas) or a local MongoDB server

2. **Clone the project**

```powershell
git clone https://github.com/your-org/database-demo.git
cd database-demo
```

3. **Install packages**

```powershell
pnpm install
```

4. **Configure environment variables** (see the next section)

5. **Run the development server**

```powershell
pnpm dev
```

6. Visit <http://localhost:3000> in your browser. The landing page will adapt depending on the signed-in state.

> 💡 Tip: leave the terminal open; the dev server watches for file changes and reloads instantly.

## 🔐 Environment variables

Create a file named `.env.local` in the project root. This file is **not** committed to Git, so it is safe to place secrets here locally.

```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
JWT_SECRET=generate-a-long-random-string-here
```

| Variable | Where it is used | Description |
| --- | --- | --- |
| `MONGO_URI` | `lib/mongodb.js` | Connection string for your MongoDB cluster. Includes credentials and the database name. |
| `JWT_SECRET` | `app/api/auth/*`, `middleware.js`, `lib/auth.js` | Secret key used to sign and verify JWT tokens. Generate at least 64 random characters. |

### Generating a secret

In PowerShell:

```powershell
[Guid]::NewGuid().ToString("N") + [Guid]::NewGuid().ToString("N")
```

Run the command twice and combine the output for a 64-character value.

## 🗄️ Database deep dive

### Key vocabulary (no prior knowledge needed)

- **Cluster** – the server (in the cloud or on your laptop) that stores all MongoDB databases.
- **Database** – a container inside the cluster; think of it as a folder for related data.
- **Collection** – like a table in SQL. Holds many **documents**.
- **Document** – one record stored as JSON (key/value pairs). Example: a single student profile.

### Step-by-step: create a free MongoDB Atlas database (recommended)

1. **Create an account** at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and choose the free tier.
2. **Create a new project** (give it any name, e.g. “NeoDB Demo”).
3. **Build a cluster**
  - Pick the free Shared tier (`M0`) and a region close to you.
  - Name the cluster (e.g. `Cluster0`).
4. **Create a database user**
  - Click **“Database Access” → “+ Add New Database User”**.
  - Choose “Password” authentication.
  - Set a username (e.g. `student`) and a strong password (store it somewhere safe).
  - Grant role **“Atlas Admin”** for learning purposes (read & write access to everything).
5. **Allow your IP address**
  - Go to **“Network Access” → “Add IP Address”**.
  - Choose “Allow access from anywhere” (`0.0.0.0/0`) while learning. You can tighten later.
6. **Create your first database + collection**
  - Click **“Browse Collections” → “Add My Own Data”**.
  - Database name: `neodb-demo` (or anything you like).
  - Collection name: `users`.
  - Atlas will create the database for you—no extra steps needed.
7. **Copy the connection string**
  - From the cluster view, click **“Connect” → “Drivers”**.
  - Choose **Driver: Node.js**, Version `v5` or later.
  - Copy the URI. It looks like `mongodb+srv://student:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`.
  - Replace `<password>` with the user password you set in step 4, and append your database name at the end, e.g. `...mongodb.net/neodb-demo?retryWrites=true&w=majority`.

> 📌 Keep the URI secret. Anyone with this string can access your database.

### Option B: run MongoDB locally (offline learning)

1. Download the Community Server from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community) and install with default options.
2. After installation, start the **MongoDB Server** (usually via the MongoDB Compass app or the Windows Services panel).
3. The default connection string is `mongodb://127.0.0.1:27017`.
4. Create the database by connecting with [MongoDB Compass](https://www.mongodb.com/products/compass) and clicking **“Create Database”** → Name `neodb-demo`, collection `users`.

Local databases are great for experimentation but are accessible only on your machine.

### Plug the database into this project

1. Copy `.env.example` to `.env.local` in the project root.
2. Paste your connection string into `MONGO_URI`.
  - Atlas example: `mongodb+srv://student:YourPassword@cluster0.../neodb-demo?retryWrites=true&w=majority`
  - Local example: `mongodb://127.0.0.1:27017/neodb-demo`
3. Set `JWT_SECRET` to a long random string (see the “Environment variables” section above).
4. Restart your dev server if it was running: `Ctrl + C` to stop, then `pnpm dev`.
5. Visit <http://localhost:3000/signup>, create a user, then confirm the new document appears in your database (use Atlas “Browse Collections” or Compass).

### How the code connects (no magic involved)

```mermaid
flowchart LR
  NextAPI[[Next.js API Route]] --> dbConnect
  dbConnect -->|Uses| Mongoose
  Mongoose -->|Connects with| MongoDB[(MongoDB Cluster)]
```

The `dbConnect()` helper in `lib/mongodb.js`:

- Reads `MONGO_URI` from `.env.local`.
- Opens a single connection and reuses it (important during hot reloads).
- Gives that connection to the API route, middleware, or server component that asked for it.

### User schema (`models/User.js`)

| Field | Type | Required? | Notes |
| --- | --- | --- | --- |
| `name` | String | ✅ | Display name shown on the profile and navbar |
| `email` | String | ✅ | Must be unique; stored in lowercase so lookups are consistent |
| `password` | String | ✅ | Stores the **hashed** password (never the raw password) |
| `dob` | Date | ✅ | Date of birth, used for age and zodiac info |
| `fieldOfStudy` | String | ✅ | Student’s area of study |
| `address` | String | Optional | Free-text field for location |
| `createdAt`, `updatedAt` | Date | Auto | Added by the `{ timestamps: true }` option |

Example document stored in MongoDB:

```json
{
  "_id": "6735b2a1f08d39f2134ad901",
  "name": "Ava Johnson",
  "email": "ava@example.com",
  "password": "$2a$10$7O0l...hashed...",
  "dob": "2005-04-17T00:00:00.000Z",
  "fieldOfStudy": "Biology",
  "address": "Nairobi, Kenya",
  "createdAt": "2025-09-01T10:15:33.812Z",
  "updatedAt": "2025-09-01T10:15:33.812Z"
}
```

Notice that passwords are stored as long hashed strings using `bcryptjs`.

### Inspect your data visually

- **Atlas UI:** click “Browse Collections” to see live documents, edit them, or delete them.
- **MongoDB Compass (desktop app):** paste your `MONGO_URI`, connect, and explore documents with a GUI.

### Lifecycle of a request (how data flows)

1. A user submits a form (signup or login).
2. The API route (`app/api/auth/...`) calls `dbConnect()`.
3. Mongoose talks to MongoDB and returns a document.
4. The route sends a JSON response and may set a cookie (for login).

If the database connection fails, the API returns a 500 response—check the terminal output for clues (wrong password, IP not whitelisted, server offline, etc.).

### Using the same database from other languages

- MongoDB provides official drivers for Python, Java, C#, Go, and more. Visit <https://www.mongodb.com/docs/drivers/>.
- Reuse the exact same `MONGO_URI`; only the code that opens the connection changes.
- Example: in Python you would install `pymongo` and call `MongoClient(MONGO_URI)`; in Java you would use the `mongo-java-driver`.
- This means you can prototype in Next.js and later build CLI tools, bots, or mobile backends that all talk to the same database.

## 🔒 Authentication flow explained

| Step | What happens | Relevant file |
| --- | --- | --- |
| 1 | **Sign Up:** validate inputs, hash password, save user | `app/api/auth/signup/route.js` |
| 2 | **Log In:** verify password, sign JWT, set `auth_token` cookie | `app/api/auth/login/route.js` |
| 3 | **Read Current User:** verify cookie, return profile data | `app/api/auth/me/route.js` |
| 4 | **Protected Pages:** middleware checks for a valid token before loading `/profile` | `middleware.js` |
| 5 | **Server Components:** `getCurrentUser()` reads the cookie inside layouts/pages | `lib/auth.js` |

Important security choices:

- The JWT cookie is **HttpOnly**. JavaScript in the browser cannot read or modify it, protecting against XSS.
- Tokens expire after 7 days. Expired or missing tokens trigger a redirect to `/login`.
- Passwords are hashed with a 10-round bcrypt salt. Even if the database leaks, raw passwords remain secret.

To log out we simply overwrite the cookie with an empty value (`app/api/auth/logout/route.js`).

## 🌐 API reference

| Method | Route | Purpose | Body example |
| --- | --- | --- | --- |
| `POST` | `/api/auth/signup` | Create a new user | `{ "name": "Sam", "email": "sam@uni.edu", "password": "secret123", "dob": "2004-12-12", "fieldOfStudy": "Physics" }` |
| `POST` | `/api/auth/login` | Authenticate and receive a cookie | `{ "email": "sam@uni.edu", "password": "secret123" }` |
| `POST` | `/api/auth/logout` | Clear the auth cookie | _No body needed_ |
| `GET` | `/api/auth/me` | Fetch the currently signed-in user | _Cookie only_ |

All responses are JSON. Errors are returned as `{ "error": "message" }` with meaningful HTTP status codes (400 for bad input, 401 for bad credentials, etc.).

## 🎨 Frontend walkthrough

| Page | Behaviour |
| --- | --- |
| `/` | Landing page. Uses `getCurrentUser()` to decide whether to show “Get Started / Log In” or “Go to Profile”. |
| `/signup` | Client component with controlled form inputs. Calls the signup API, shows inline errors, and redirects to `/login` on success. |
| `/login` | Similar form that calls the login API, then navigates to `/profile`. |
| `/profile` | Server component that reads the cookie, fetches user data, calculates age & zodiac, and renders a dashboard. Redirects to `/login` if unauthenticated. |

Reusable components:

- `NavBar.jsx` adapts its links (Profile vs Log In / Sign Up) based on the `user` prop provided by `app/layout.js`.
- `GlowButton.jsx` standardises button styling and variants.
- `AnimatedBackground.jsx` draws an ambient particle field behind the hero section.

## ✅ Development checklist

- `pnpm lint` — run ESLint to keep code style consistent.
- `pnpm build` — compiles the production bundle (optional during learning, required before deployment).
- Use the browser dev tools’ **Application → Cookies** panel to inspect the `auth_token` cookie during testing.

## 🛠️ Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `Error: Please define the MONGO_URI...` | `.env.local` missing or misnamed | Ensure the file exists and restart `pnpm dev`. |
| Login always fails | Incorrect password or hashing mismatch | Check that `bcryptjs` is installed and that you created the user via `/signup`. |
| Redirect loop on `/profile` | JWT secret changed while cookie still valid | Clear browser cookies or log in again. |

## 🌱 Ideas for student extensions

- Add form validation hints (password strength, confirm password).
- Store extra profile fields (e.g., phone number) and render them in the dashboard.
- Implement role-based access (e.g., admin vs student) by adding a `role` field to the schema.
- Integrate a third-party auth provider (Google, GitHub) once the basic flow is understood.

## 📎 Further reading

- [Next.js App Router documentation](https://nextjs.org/docs/app)
- [MongoDB University free courses](https://learn.mongodb.com/)
- [Introduction to JSON Web Tokens](https://jwt.io/introduction)

Happy hacking and teaching! 🎓
