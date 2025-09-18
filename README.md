# Portfolio Website

This is a personal portfolio website built with Eleventy and Tailwind CSS. It's designed to be a modern, responsive, and customizable showcase of your work, blog, and personal brand.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Styling and Theme](#styling-and-theme)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Cloning the Repository](#cloning-the-repository)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Deployment](#deployment)
  - [GitHub Pages](#github-pages)
  - [Netlify](#netlify)
- [Summary](#summary)

---

## Features

- **Portfolio and Blog**: Showcase your projects and write articles with a clean and organized layout.
- **Responsive Design**: The website is fully responsive and looks great on all devices.
- **Dark Mode**: A theme switcher allows users to toggle between light and dark mode.
- **Contact Form**: A functional contact form to allow visitors to get in touch with you.
- **SEO Optimized**: The site includes meta tags, a sitemap, and a `robots.txt` file for search engine optimization.
- **Animations**: Subtle scroll animations to enhance the user experience.

---

## Folder Structure

The project has a well-organized folder structure to keep the code clean and maintainable.

- `_site/`: The output directory for the generated website.
- `src/`: The source directory where you'll do most of your work.
  - `_includes/`: Reusable components like the header, footer, and SEO.
  - `_layouts/`: The main HTML templates for the pages.
  - `css/`: Stylesheets for the website.
  - `img/`: Images for the website, organized into subfolders.
  - `js/`: JavaScript files for interactive features.
  - `posts/`: Your blog posts in Markdown format.
  - `projects/`: Your portfolio projects in Markdown format.
- `_templates/`: Starter templates for new posts and projects.

---


## Styling and Theme

The website uses Tailwind CSS for styling and has a custom theme called "Kyoto Ink".

- **Typography**: "Poppins" for headings and "Inter" for body text.
- **Color Palette**:
  - **Light Mode**: Stone White, Ink Black, Tori Red.
  - **Dark Mode**: Charcoal, Bone White, Vibrant Red.
- **UI Components**: Consistent UI elements like buttons and "glassmorphism"-style cards.

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm installed on your machine.

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Cloning the Repository


git clone [https://github.com/farman-khan-space/portfolio-website.git](https://github.com/farman-khan-space/portfolio-website.git)
cd portfolio-website


### Installation
Install the dependencies using npm:

**npm install**

### Running Locally
To start the development server, run the following command:

**npm start**

This will start a local server, and you can view the website in your browser at http://localhost:8080.  
The browser will automatically reload when you make changes to the source file



---

### Part 4: Deployment & Summary


## Deployment

You can deploy this website to any static hosting service. Here are instructions for two popular options:

### GitHub Pages

To deploy to GitHub Pages, you can use the `deploy.yaml` workflow provided in the `_templates/.github/workflows/` directory. You will need to configure your repository to use GitHub Actions for deployment.

### Netlify

You can also deploy to Netlify. The `netlify.toml` file in the root directory is already configured for deployment.

1. Create a new site on Netlify and connect it to your GitHub repository.
2. Netlify will automatically detect the build settings from the `netlify.toml` file.
3. Your site will be deployed automatically when you push changes to your repository.

---

## Summary

This portfolio website is a powerful and flexible platform to showcase your work and build your online presence. With its modern features, clean design, and easy-to-use structure, you can create a professional and engaging portfolio that stands out. The combination of Eleventy and Tailwind CSS makes it a fast, efficient, and enjoyable development experience.
