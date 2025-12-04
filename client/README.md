# E-Learning Platform - Client

A modern, responsive React-based learning management system (LMS) frontend built with Vite, Tailwind CSS, and Redux Toolkit for state management.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Key Components](#key-components)
- [API Integration](#api-integration)
- [Styling](#styling)
- [Performance Optimizations](#performance-optimizations)

## ✨ Features

### Student Features
- **Course Discovery**: Browse and search courses with filters
- **Course Purchase**: Secure payment integration with Razorpay
- **Learning Progress**: Track course progress with lecture completion
- **Course Details**: View detailed course information, syllabus, and instructor info
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode**: Built-in dark/light theme toggle
- **User Authentication**: Secure login and signup with role-based access
- **My Learning**: Personal dashboard showing enrolled courses

### Instructor Features
- **Course Management**: Create, edit, and publish courses
- **Lecture Management**: Add, edit, and manage course lectures with video uploads
- **Student Analytics**: View enrolled students and course statistics
- **Course Dashboard**: Admin panel for course administration

### General Features
- **Role-Based Access Control**: Separate access for students and instructors
- **Video Playback**: Integrated video player with controls
- **Search Functionality**: Search courses by title, category, or description
- **User Profile**: Edit profile and manage account settings
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Skeleton loading for better UX

## 🛠 Tech Stack

### Core Framework
- **React 18**: Modern UI library with hooks
- **Vite**: Next-generation build tool for fast development
- **React Router v6**: Client-side routing

### State Management
- **Redux Toolkit**: Simplified Redux state management
- **Redux Toolkit Query**: Data fetching and caching
- **React Redux**: Official Redux bindings for React

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS transformation
- **Google Fonts**: Custom typography (Inter, Poppins)

### UI Components & Libraries
- **Shadcn UI**: High-quality React components
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library
- **Class Variance Authority (CVA)**: Type-safe component variants
- **clsx**: Utility for conditional className merging

### Features & Integrations
- **React Player**: Video player component
- **Axios**: HTTP client for API requests
- **Sonner**: Toast notification library
- **Razorpay**: Payment gateway integration
- **Rich Text Editor**: Course description editor

### Development Tools
- **ESLint**: Code linting
- **Babel**: JavaScript compiler for JSX

## 📁 Project Structure

```
client/
├── src/
│   ├── app/              # Redux store configuration
│   │   ├── rootReducer.js
│   │   └── store.js
│   ├── components/       # Reusable components
│   │   ├── BuyCourseButton.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoutes.jsx
│   │   ├── PurchaseCourseProtectedRoute.jsx
│   │   ├── RichTextEditor.jsx
│   │   ├── ThemeProvider.jsx
│   │   └── ui/          # UI components (shadcn)
│   ├── features/        # Feature slices and API
│   │   ├── authSlice.js
│   │   ├── courseSlice.js
│   │   └── api/
│   │       ├── authApi.js
│   │       ├── courseApi.js
│   │       ├── courseProgressApi.js
│   │       └── purchaseApi.js
│   ├── layout/          # Layout components
│   │   └── MainLayout.jsx
│   ├── lib/             # Utilities
│   │   └── utils.js
│   ├── pages/           # Page components
│   │   ├── Login.jsx
│   │   ├── admin/       # Admin pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── course/
│   │   │   └── lecture/
│   │   └── student/     # Student pages
│   │       ├── AllCourses.jsx
│   │       ├── Course.jsx
│   │       ├── CourseDetail.jsx
│   │       ├── CourseProgress.jsx
│   │       ├── HeroSection.jsx
│   │       ├── MyLearning.jsx
│   │       ├── Profile.jsx
│   │       └── SearchPage.jsx
│   ├── App.jsx          # Main app component with routing
│   ├── App.css          # Global styles
│   ├── DarkMode.jsx     # Dark mode toggle
│   ├── main.jsx         # Entry point
│   └── index.css        # Base styles
├── public/              # Static assets
├── index.html           # HTML template with Razorpay script
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── eslint.config.js     # ESLint configuration
```

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm/yarn
- Git

### Steps

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd lms/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   # Create .env file in client root
   ```

## 🔧 Environment Variables

Create a `.env` file in the `client` root directory:

```env
VITE_RAZORPAY_KEY_ID=rzp_test_82tcRjiekBQz8k
```

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_RAZORPAY_KEY_ID` | Razorpay public key for payment integration | `rzp_test_*` |

**Note**: Vite requires environment variables to start with `VITE_` prefix to be exposed to the client.

## 🚀 Running the Application

### Development Server
```bash
npm run dev
```
- Starts Vite dev server (usually on `http://localhost:5173`)
- Hot Module Replacement (HMR) enabled
- Fast refresh for React components

### Build for Production
```bash
npm run build
```
- Creates optimized production build in `dist/` folder
- Tree-shaking and minification enabled

### Preview Production Build
```bash
npm run preview
```
- Serves the production build locally for testing

### Lint Code
```bash
npm run lint
```
- Runs ESLint to check code quality

## 🎯 Key Components

### Authentication
- **Login.jsx**: User login and signup with role selection
- **ProtectedRoutes.jsx**: Route protection for authenticated users
- **AuthenticatedUser**: Redirects logged-in users from login page
- **ProtectedRoute**: Wraps student-only pages
- **AdminRoute**: Wraps instructor-only pages
- **PurchaseCourseProtectedRoute**: Ensures only purchased courses are accessible

### Course Management
- **Courses.jsx**: Display all published courses with pagination
- **CourseDetail.jsx**: Detailed view with video preview and enrollment
- **SearchPage.jsx**: Search and filter courses by category and price
- **AllCourses.jsx**: Dedicated page for browsing all courses

### Student Dashboard
- **MyLearning.jsx**: Shows enrolled courses and progress
- **CourseProgress.jsx**: Track lecture completion with progress percentage
- **Profile.jsx**: User profile management

### Admin Dashboard
- **Dashboard.jsx**: Overview of instructor's courses and students
- **CourseTable.jsx**: List and manage all courses
- **AddCourse.jsx**: Create new course
- **EditCourse.jsx**: Edit course details
- **CreateLecture.jsx**: Add lectures to course
- **EditLecture.jsx**: Edit lecture with video upload

### Payment
- **BuyCourseButton.jsx**: Triggers Razorpay payment modal
- **purchaseApi.js**: API integration for order creation and verification

## 🔌 API Integration

### Endpoints Used

**Authentication**
- `POST /api/v1/user/register` - User registration
- `POST /api/v1/user/login` - User login
- `POST /api/v1/user/logout` - User logout
- `GET /api/v1/user/profile` - Get user profile

**Courses**
- `GET /api/v1/course` - Get all published courses
- `GET /api/v1/course/:id` - Get course details
- `POST /api/v1/course` - Create course (instructor)
- `PUT /api/v1/course/:id` - Update course
- `DELETE /api/v1/course/:id` - Delete course
- `GET /api/v1/course/search` - Search courses

**Purchases**
- `POST /api/v1/purchase/create-order` - Create Razorpay order
- `POST /api/v1/purchase/verify-payment` - Verify payment
- `GET /api/v1/purchase` - Get purchased courses

**Progress**
- `GET /api/v1/progress/:courseId` - Get course progress
- `POST /api/v1/progress/:courseId/lecture/:lectureId/view` - Mark lecture viewed
- `POST /api/v1/progress/:courseId/complete` - Mark course complete
- `POST /api/v1/progress/:courseId/incomplete` - Mark course incomplete

## 🎨 Styling

### Tailwind CSS
- Utility-first approach for rapid UI development
- Responsive breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`
- Dark mode support with `dark:` prefix

### Custom Global Styles
Located in `src/App.css`:
- `.card-hover` - Smooth hover effect with elevation
- `.hero-cta` - Hero section CTA button shadow
- `.gradient-text` - Blue to purple gradient text
- `.page-container` - Centered container with max-width

### Theme
- **Light Mode**: Clean white background with blue accents
- **Dark Mode**: Dark gray background (#020817) with gray borders

## 📱 Responsive Design

- **Mobile First**: Designed for mobile, scales up
- **Breakpoints**:
  - `sm` (640px): Small phones
  - `md` (768px): Tablets
  - `lg` (1024px): Small laptops
  - `xl` (1280px): Desktops

## ⚡ Performance Optimizations

1. **Code Splitting**: Route-based code splitting with React Router
2. **Lazy Loading**: Components load on demand
3. **Image Optimization**: Responsive images with Tailwind
4. **Caching**: Redux Toolkit Query caches API responses
5. **Build Optimization**: Vite's tree-shaking and minification
6. **Bundle Analysis**: Monitor build size with Vite plugins

## 🔐 Security Features

1. **Protected Routes**: Authentication checks on sensitive routes
2. **CSRF Protection**: Cookies with credentials
3. **Secure Payment**: Razorpay integration with signature verification
4. **Environment Variables**: Sensitive data in `.env` files
5. **User Role Validation**: Instructor-only routes protected

## 🐛 Debugging

### Redux DevTools
- Install Redux DevTools browser extension
- View Redux state and actions in real-time

### React DevTools
- Install React DevTools browser extension
- Profile components and identify performance issues

### Network Tab
- Check API requests and responses
- Monitor payment flow

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [Shadcn UI](https://ui.shadcn.com)
- [Razorpay Documentation](https://razorpay.com/docs)

## 📝 Notes

- The client communicates with the backend at `http://localhost:8080`
- Razorpay is configured for test mode
- Video uploads are handled by Cloudinary
- Course descriptions support rich text formatting

## 👨‍💻 Development Tips

1. Use React DevTools to debug component issues
2. Check Redux state with Redux DevTools
3. Monitor network requests in browser DevTools
4. Use `console.log` for debugging (removed in production build)
5. Test with dark mode enabled to catch styling issues

---

**Last Updated**: December 2024
**Version**: 1.0.0
