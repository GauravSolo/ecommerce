# E-Commerce Landing Page

A modern and responsive e-commerce landing page built with HTML, CSS, Bootstrap, jQuery, and PHP.

## Features

- Responsive design that works on all devices
- Dynamic category display
- Smooth scrolling and animations
- Mobile-friendly navigation
- Featured products section
- Modern UI with hover effects
- Database integration for categories and products

## Requirements

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Web server (Apache/Nginx)
- Modern web browser

## Installation

1. Clone or download this repository to your web server directory
2. Create a MySQL database using the provided `database.sql` file:
   ```bash
   mysql -u root -p < database.sql
   ```
3. Configure your database connection in `config.php`:
   ```php
   $host = 'localhost';
   $dbname = 'ecommerce';
   $username = 'root';
   $password = '';
   ```
4. Make sure your web server has write permissions for the assets directory

## Directory Structure

```
ecommerce/
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── config.php
├── categories.php
├── database.sql
├── index.php
└── README.md
```

## Usage

1. Start your web server
2. Access the website through your browser:
   ```
   http://localhost/ecommerce
   ```

## Customization

- Edit `assets/css/style.css` to modify the styling
- Edit `assets/js/main.js` to modify the JavaScript functionality
- Update the database content in `database.sql` to add your own categories and products
- Modify `index.php` to change the layout and content

## Contributing

Feel free to submit issues and enhancement requests! 