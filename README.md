# E-Commerce Storefront

Arrowstack Frontend Internship, Project 1.

## Live Demo
https://ecommerce-storefront-6a5q.vercel.app

## Project Overview
A responsive e-commerce storefront with product discovery, a cart and a validated checkout. Built for a small online retailer who wants shoppers to browse, filter and buy products with a simple, accessible interface.

## Features
- Product grid with category filters and live search (URL search params)
- Product detail page with rating, stock status and add to cart
- Shopping cart with quantity controls, item removal and order summary
- Checkout form with client-side validation and per-field error messages
- Order success confirmation
- Out-of-stock handling and empty states
- Accessibility: labelled inputs, role="alert" errors, aria-label on buttons, keyboard navigation

## Tech Stack
React, TypeScript, Vite, React Router DOM, Lucide React

## How to Run
```bash
npm install --legacy-peer-deps
npm run dev
```
Open http://localhost:5173

## Decisions
- Used React with Vite instead of Next.js for simplicity and faster iteration
- Used Context API for cart state instead of Redux, which is enough for this scope
- Kept search in URL params so searches can be shared and the back button works
- Used --legacy-peer-deps because of a typescript-eslint peer dependency conflict

## Known Limitations
- No real payment processing and no backend; product data is simulated
- Cart is not saved after a page refresh
- Checkout and product detail layouts are not yet fully optimised for small phones

## Next Improvements
- Persist the cart in localStorage
- Improve the mobile layout of checkout and product detail
- Add a loading state and connect to a real products API
- Add automated tests and a Lighthouse accessibility audit
