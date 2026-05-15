# Super Store - React E-Commerce Frontend

A modern, blazing-fast Single Page Application (SPA) built with React. This project serves as a dynamic product catalog, pulling real-time data from a REST API and focusing heavily on premium UI/UX design and frontend performance optimization.

## Key Features

* **Advanced Search & Filtering:** Features a custom `useDebounce` hook that delays search execution by 300ms, preventing unnecessary re-renders and keeping the app lightning fast while typing.
* **Category Filtering:** Users can instantly filter products by specific categories (e.g., electronics, jewelery, clothing).
* **Premium Loading States:** * Replaces boring "loading..." text with a modern CSS spinner during initial API fetches.
  * Uses **Skeleton Loading Animations** on product cards and detail pages while high-resolution images are downloading in the background.
* **Modern CSS Architecture:** Built purely with custom CSS using `:root` variables for strict design system consistency (colors, shadows, spacing, and transitions).
* **Fully Responsive Grid:** Utilizes CSS Grid and Flexbox to create a layout that gracefully collapses from a strict 3-column desktop view down to a single-column mobile view.
* **Robust Error Handling:** API calls are wrapped in `try...catch` blocks to gracefully handle network failures and display user-friendly error messages instead of crashing the application.
* **Dynamic Routing:** Uses `react-router-dom` to instantly swap between the main catalog and dynamic product detail pages (`/product/:id`) without full page reloads.

## Tech Stack

* **Framework:** React 18 (via Vite)
* **Routing:** React Router v6 (`react-router-dom`)
* **Styling:** Custom CSS3 (CSS Variables, Grid, Flexbox, Keyframe Animations)
* **API:** [FakeStore API](https://fakestoreapi.com/)
* **State Management:** React Hooks (`useState`, `useEffect`)

## Project Structure

```text
src/
├── assets/             # Static assets and icons
├── components/         
│   └── ProductCard.jsx # Reusable UI component for individual products
├── hooks/
│   └── useDebounce.js  # Custom hook for performance optimization
├── pages/
│   ├── ProductList.jsx # Main catalog page with search and filters
│   └── ProductDetail.jsx # Dynamic single product view
├── App.jsx             # Main application layout and Router setup
├── App.css             # Global premium stylesheet
├── index.css           # Base browser resets and typography
└── main.jsx            # Application entry point