# Food Ordering App

![React](https://img.shields.io/badge/-React-red?logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-blue?logo=tailwindcss&logoColor=white)

A food ordering application built with React, Vite, and Tailwind CSS. This project features a seamless shopping cart experience, real-time checkout process, and persistent configuration management.

## 🚀 Features

- **Dynamic Menu**: Fetches and displays categorized food items with descriptions, prices, and tags.
- **Integrated Shopping Cart**: Centralized state management for adding, removing, and clearing items.
- **Checkout Flow**: 
  - Choice between delivery and pick-up.
  - Scheduled delivery time slots.
  - Multiple payment methods (Cash or Card).
  - Validation for contact information and privacy policy agreement.
- **Smart App Context**:
  - Automatically fetches restaurant metadata.
  - Caches configuration in `localStorage` for instant subsequent loads.
  - Displays a polished loading shell during the initial bootstrap.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop screens using Tailwind CSS.
- **Custom UI Components**: Reusable, accessible components including Modals, Buttons, and Inputs.

## 🛠️ Tech Stack

- **Frontend**:
  - React 19 (Hooks, Context API)
  - Vite (Build tool)
  - Tailwind CSS 4 (Styling)
  - Lucide React (Icons)
- **Backend**:
  - Node.js
  - Express
  - Body-parser

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd react-sushi
   ```

2. **Install Frontend Dependencies**:
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   cd ..
   ```

### Running the Application

1. **Start the Backend Server**:
   ```bash
   cd backend
   npm start
   ```
   The backend will typically run on `http://localhost:3001`.

2. **Start the Frontend (Vite)**:
   In a new terminal window:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.
