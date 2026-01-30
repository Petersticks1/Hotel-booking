

# **cursor.md**

## Purpose

This document serves as a **personal implementation and development guide** for building the **Cappa Luxury Hotel Website** using **HTML, CSS, and Vanilla JavaScript only**.

POSTAL = *Personal Operational Steps and Technical Action Log*

This guide explains **how to translate the Cappa PRD into real code**, page by page, feature by feature.

---

## 1. Project Setup

### Step 1: Create Project Folder

```
cappa-hotel-website/
```

### Step 2: Create Required Files

```
index.html
about.html
rooms.html
room-details.html
restaurant.html
spa.html
facilities.html
gallery.html
blog.html
blog-details.html
contact.html
booking.html

assets/
 ├── css/
 │    └── style.css
 ├── js/
 │    ├── main.js
 │    ├── slider.js
 │    └── booking.js
 └── images/
      └── (hotel images)
```

---

## 2. Global Layout Structure

### Common Layout (All Pages)

Each page must include:

* Header

  * Hotel logo
  * Navigation menu
  * Book Now button
  * Mobile hamburger menu
* Main content
* Footer

  * Address
  * Phone
  * Email
  * Social links
  * Copyright

**Rule:**
Header and footer structure must remain identical across all pages.

---

## 3. Homepage Implementation (index.html)

### Sections

* Hero / Banner slider
* Booking availability form
* About hotel
* Rooms preview
* Services highlights
* Promotional video section
* Facilities overview
* Testimonials slider
* Blog preview
* Footer CTA

**Primary Goal:**
Introduce the hotel brand and encourage room booking.

---

## 4. Hero Slider Logic

### slider.js Responsibilities

* Auto-slide background images
* Manual next / previous navigation
* Fade or slide animation
* Pause on hover

Implementation flow:

1. Load hero images
2. Start interval auto-slide
3. Update active slide class
4. Animate transitions using CSS

---

## 5. Booking Availability System

### booking.html

Booking form fields:

* Full name
* Email
* Phone number
* Check-in date
* Check-out date
* Adults
* Children
* Room type
* Special requests

### booking.js Responsibilities

* Client-side validation
* Date logic validation

  * Check-out must be after check-in
* Submit booking data to server
* Display success or error message

Example flow:

1. User submits booking form
2. JavaScript validates inputs
3. Data sent using `fetch()` POST
4. Server responds with JSON
5. Success or error message displayed

---

## 6. Booking Email Integration (Server-Side PHP)

### PHP Endpoint Example

```
api/send-booking.php
```

Responsibilities:

* Receive POST data
* Sanitize inputs
* Send booking email to hotel admin
* Return JSON response

Example response:

```json
{
  "success": true,
  "message": "Booking request received successfully"
}
```

This allows the hotel to receive booking requests without exposing credentials on the frontend.

---

## 7. Rooms Page (rooms.html)

### Structure

* Room listing grid
* Each room card contains:

  * Image
  * Room name
  * Price per night
  * Short description
  * View details button

### Logic

* Static HTML room cards
* Styled using CSS Grid
* Buttons link to `room-details.html`

---

## 8. Room Details Page

### Content Includes

* Image gallery
* Room description
* Amenities list
* Price
* Booking CTA button

Optional enhancement:

* Image gallery slider using JS
* Sticky booking summary

---

## 9. Facilities Page

Facilities include:

* Free Wi-Fi
* Parking
* Swimming pool
* Airport pickup
* Restaurant
* Spa
* Gym

Implementation:

* Icon-based grid
* Hover animations
* Clean minimal layout

---

## 10. Restaurant & Spa Pages

### Restaurant Page

* Dining introduction
* Menu preview
* Opening hours
* Reservation CTA

### Spa Page

* Wellness services
* Spa packages
* Relaxation description

These pages are **informational**, not transactional.

---

## 11. Gallery Page

### Layout

* Masonry or grid image layout
* Images stored in:

```
assets/images/gallery/
```

### JavaScript Enhancement (Optional)

* Lightbox modal on image click
* Next / previous navigation

---

## 12. Testimonials Section

### Implementation Options

* Static testimonials
* Or JS-powered slider

Fields:

* Guest name
* Country
* Rating stars
* Comment

Display testimonials dynamically using JavaScript array mapping.

---

## 13. Blog System

### blog.html

* Blog card layout
* Each post contains:

  * Image
  * Title
  * Short excerpt
  * Read more button

### blog-details.html

* Full article content
* Static HTML-based blog system
* Future upgrade: CMS or API

---

## 14. Contact Page

Includes:

* Contact form
* Hotel address
* Phone number
* Email
* Embedded map

### Contact Form Fields

* Name
* Email
* Subject
* Message

Uses same PHP mail logic as booking system.

---

## 15. Map Integration

Options:

* Google Maps embed
* OpenStreetMap iframe

Steps:

1. Get hotel coordinates
2. Embed iframe
3. Style responsively

---

## 16. Styling Guide

### Design Principles

* Luxury feel
* Minimal clutter
* Large imagery
* Elegant typography

### CSS Rules

* Use CSS variables for colors
* Mobile-first design
* Reusable utility classes
* Smooth transitions and hover states

---

## 17. JavaScript Responsibilities

### main.js

* Mobile menu toggle
* Sticky header
* Scroll animations
* Back-to-top button

### slider.js

* Hero slider
* Testimonials slider
* Image gallery slider

### booking.js

* Booking validation
* Date logic
* Form submission handling
* Success/error messages

---

## 18. Testing Checklist

* Navigation works on all devices
* Booking validation correct
* Slider transitions smooth
* Forms submit correctly
* Emails received successfully
* Mobile responsiveness verified

---

## 19. Deployment

Recommended options:

* Netlify
* Vercel
* Shared hosting (for PHP email support)

Steps:

1. Push project to GitHub
2. Configure environment
3. Upload PHP API files
4. Deploy frontend
5. Test booking emails live

---

## 20. Personal Notes Section

Use this section to document:

* Bugs encountered
* Fixes applied
* Performance improvements
* UI refinements
* Feature ideas

---

## End

This `cursor.md` acts as your **personal implementation handbook** for building, maintaining, and extending the **Cappa Luxury Hotel HTML template** using pure frontend technologies.

---


