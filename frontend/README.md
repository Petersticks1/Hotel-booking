# The Max Luxury Hotel Website

A premium hotel website template built with HTML, CSS, and JavaScript. Features room listings, booking system, restaurant & spa pages, gallery, blog, and contact form.

## Structure

```
frontend/
├── index.html          # Homepage
├── about.html          # About the hotel
├── rooms.html          # Rooms listing
├── room-details.html   # Room detail page
├── restaurant.html     # Restaurant page
├── spa.html            # Spa & wellness
├── facilities.html     # Hotel facilities
├── gallery.html        # Image gallery
├── blog.html           # Blog listing
├── blog-details.html   # Blog post
├── contact.html        # Contact form
├── booking.html        # Full booking form
├── css/                # Stylesheets
├── js/                 # JavaScript
├── img/                # Images
├── fonts/              # Web fonts
└── api/                # PHP endpoints
    ├── send-booking.php
    └── send-contact.php
```

## Running Locally

### Static Only (no forms)

Open `index.html` directly in a browser or use a simple HTTP server:

```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve .
```

Then visit http://localhost:8000

### With PHP (for booking & contact forms)

Use a PHP-enabled server:

```bash
php -S localhost:8000
```

Then visit http://localhost:8000

Configure the admin email in `api/send-booking.php` and `api/send-contact.php` (default: hello@altair-attic.com).

## Features

- **Booking System**: Full form with validation, submits to `api/send-booking.php`
- **Contact Form**: Submits to `api/send-contact.php`
- **Responsive**: Mobile-first design
- **Luxury UI**: Based on The Max template with simplified navigation

## Deployment

- **Netlify/Vercel**: Deploy the static files. Forms require a serverless function or external service for email.
- **Shared hosting**: Upload all files including the `api/` folder. Ensure PHP is enabled.
