# Human Traces

Wide Angle: cities, buildings, people — my lens on PropTech & ConTech

## Project Overview

Human Traces is a website exploring the intersection between real estate, construction technology, and capital flows. It examines why data dies between construction sites and boardrooms, and how we can fix it.

## Project Structure

```
Humantraces/
├── index.html                      # Main landing page
├── css/
│   └── style.css                   # Minimal elegant styling (Inter font, light/dark theme)
├── js/
│   └── main.js                     # Theme toggle and navigation functionality
└── pages/
    ├── breaking-the-silos.html     # Core manifesto: Layer 0-3 framework
    ├── proptech-vs-contech.html    # Mapping the two ecosystems
    ├── investment-categories.html  # Capital flows and analytical roles
    └── cities.html                 # Milano, Berlin, and market insights
```

## Features

- **Minimal, elegant design** matching portfolio_v2 aesthetic
- **Light/Dark theme toggle** with localStorage persistence
- **Responsive navigation** with mobile menu support
- **Clean typography** using Inter font family
- **Smooth animations** and transitions

## Content Pages

### 1. Breaking the Silos (Manifesto)
The core thesis explaining why the PropTech/ConTech ecosystem is broken and introducing the Layer 0-3 framework:
- Layer 0: Physical Operations (Construction Site)
- Layer 1: Asset Management (Building as Product)
- Layer 2: Financial Layer (Capital Flows)
- Layer 3: Strategic Intelligence (Market Analysis)

### 2. PropTech vs ConTech
Comparative analysis of the two ecosystems, including:
- Core categories and tools
- Key players and buyers
- Fundamental differences
- The integration gap

### 3. Investment & Categories
Deep dive into capital flows, covering:
- Investment vehicles (REITs, PE, Core funds, etc.)
- Asset classes and data needs
- Analytical roles in the sector
- Integration opportunities

### 4. Cities
Ground-truth analysis of specific markets:
- Milano: Italy's ambitious capital
- Berlin: Europe's experimental lab
- Cross-city patterns and insights

## Technologies Used

- Pure HTML5, CSS3, JavaScript (no frameworks)
- CSS custom properties for theming
- LocalStorage for theme persistence
- Responsive grid and flexbox layouts
- SVG icons for theme toggle

## Color Scheme

**Light Theme:**
- Background: #f5f1e8
- Text: #2a2a2a
- Accent: #1a1a1a
- Border: #d4cfc4

**Dark Theme:**
- Background: #1a1a1a
- Text: #d4d4d4
- Accent: #e8e8e8
- Border: #2d2d2d

## Running Locally

Simply open `index.html` in a web browser. No build process required.

For development with live reload, you can use any local server:
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## License

© 2026 Human Traces. All rights reserved.
