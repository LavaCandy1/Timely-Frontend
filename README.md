# Timely - University Timetable Management System (Frontend)

Timely is a modern, responsive web application built with **Angular 17+** designed to manage and display university timetables. It serves as the frontend client for the Timely ecosystem, interfacing with a Spring Boot backend to provide role-based access for Students, Teachers, and Administrators.

This application features a dynamic, grid-based timetable view, authentication handling, and specific administrative controls for managing class schedules in real-time.

Backend Repository: [Timely Backend (Spring Boot)](https://github.com/LavaCandy1/Timely)
## Features

### General
* **JWT Authentication:** Secure login and signup functionality integrating with the backend security layer.
* **Responsive Design:** Built with SCSS and CSS Grid to handle complex timetable layouts across devices.
* **Role-Based Access Control (RBAC):** Distinct UI experiences and capabilities for Students, Teachers, and Admins.

### Student Portal
* **Personalized View:** Automatically fetches and displays the timetable based on the student's enrollment number and batch.
* **Visual Indicators:** distinct colors for Lectures, Labs, and Tutorials.

### Teacher Portal
* **Schedule Management:** View teaching schedules based on assigned courses.
* **Class Cancellation:** Ability to cancel upcoming classes (visually marked as cancelled).
* **Rescheduling:** Options to revert cancellations or reschedule slots.

### Admin Portal
* **Global Search:** Search functionality to view timetables for any **Teacher** or **Student Batch/Year**.
* **Slot Management:**
    * **Add Class:** A form to insert new class slots with conflict handling.
    * **Delete Class:** Remove existing slots directly from the grid.
* **Data Visualization:** View aggregate schedules across the university.

## Tech Stack

* **Framework:** Angular 17+ (Standalone Components, Signals)
* **Language:** TypeScript
* **Styling:** SCSS (Sass), CSS Grid
* **State Management:** RxJS (BehaviorSubjects for search state)
* **Routing:** Angular Router with Auth Guards
* **HTTP:** Angular HttpClient (Interceptors for JWT)

## Project Structure

The project follows a modular Angular structure:

```
src/app
├── components/
│   ├── home/           # Landing page
│   ├── login/          # Login form with validation
│   ├── signup/         # Student registration
│   ├── sidebar/        # Navigation and Admin Search logic
│   └── timetable/      # Core grid component (renders slots)
├── dashboard/          # Main layout container
├── models/             # Interfaces (ClassSlot, TeacherSlot, AdminSlot)
├── services/
│   ├── auth/           # Login, Signup, Token decoding
│   ├── guard/          # Route protection (CanActivate)
│   └── timetable/      # API calls for fetching/modifying schedules
└── environments/       # API URL configuration
```

## Installation & Setup

### Prerequisites
* **Node.js** (v18 or higher recommended)
* **Angular CLI**
* The **Timely Backend** (Spring Boot) running on port 8000 (default).

### 1. Clone the Repository
```
git clone https://github.com/yourusername/timely-frontend.git
cd timely-frontend
```

### 2. Install Dependencies
```
npm install
```

### 3. Configure Environment
Ensure the backend API URL is correctly set. Open ``` src/environments/environment.ts ```:

```
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api', // Update if your backend runs elsewhere
};
```

### 4. Run the Development Server
```
ng serve
```

Navigate to ``` http://localhost:4200/ ```. The application will automatically reload if you change any of the source files.

## Usage Guide

### Logging In
* **Students:** Use your college email (e.g., `E22CSEU...@bennett.edu.in`).
* **Teachers/Admins:** Use registered credentials.
* *Note: New accounts can be created via the Signup page (defaults to Student role).*

### Admin Dashboard Controls
1. **Toggle Search:** Click the search icon in the sidebar.
2. **Select Type:** Choose between "Teacher" or "Batch".
3. **View Results:** The main grid updates to show the requested schedule.
4. **Add Class:** Click the **"+ Add Class"** button in the header (only visible to Admins) to open the creation form.
5. **Delete Class:** Hover over a slot and click the "Delete" trash icon.

## Components Overview

### Timetable Component (``` app-timetable ```)
This is the heart of the application. It dynamically calculates grid positions using CSS variables (``` --i ```) based on the day and time of the slot. It handles:
* **Student View:** Simple display.
* **Teacher View:** Hover effects to show batch details and cancel buttons.
* **Admin View:** Full control to add/delete and view metadata.

### Sidebar (``` app-sidebar ```)
Contains the user profile summary, date display, logout functionality, and the expandable Admin Search panel.

## Contributing

1. Fork the repository.
2. Create a new branch (``` git checkout -b feature/AmazingFeature ```).
3. Commit your changes (``` git commit -m 'Add some AmazingFeature' ```).
4. Push to the branch (``` git push origin feature/AmazingFeature ```).
5. Open a Pull Request.

## License

Distributed under the MIT License. See `LICENSE` for more information.