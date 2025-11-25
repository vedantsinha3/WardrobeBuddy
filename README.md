# Wardrobe Companion

A modern web application to help you organize your wardrobe, create outfits, and track what you wear.

## Features

### 1. Clothing Management
- Add new clothing items with photos, names, categories, colors, styles, and weather suitability
- Edit clothing item details
- Delete clothing items
- Mark items as favorites
- Upload photos for each item

### 2. Closet View & Filtering
- Display all clothing items in a beautiful grid view
- Filter by:
  - Category (top, bottom, jacket, shoes, accessory)
  - Color
  - Style (casual, streetwear, formal, sporty, business, bohemian)
  - Weather (hot, cold, mild)
  - Favorites
- Search items by name
- Grid layout with hover effects and quick actions

### 3. Outfit Builder
- Manually select items to create an outfit
- Choose:
  - Top
  - Bottom
  - Jacket (optional)
  - Shoes (optional)
  - Multiple accessories (optional)
- Live preview of your outfit as you build it
- Save outfits with custom names and notes

### 4. Outfit Library
- View all saved outfits in a grid
- See outfit details including all pieces
- Edit outfits (change pieces or name)
- Delete outfits
- View last worn date for each outfit
- Quick "Wear Today" action

### 5. Wear Tracking
- Mark outfits as "worn today"
- Automatically updates outfit's last worn date
- History view showing:
  - Outfit name
  - Date and time worn
  - Days since worn
  - Chronological list of all wear records

### 6. Dashboard
- Quick glance summary with:
  - Total clothing items
  - Number of outfits
  - Items categorized by type
- Visual statistics with gradient cards
- Quick filter chips for categories and weather
- Shortcut buttons to:
  - Add new item
  - Create outfit
- Wardrobe breakdown by category

## Tech Stack

- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Tailwind CSS** - Beautiful, responsive styling
- **React Router** - Navigation
- **Lucide React** - Beautiful icons
- **LocalStorage** - Data persistence

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn installed

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage Guide

### Adding Your First Item

1. Click "Add Item" from the Dashboard or navigation
2. Upload a photo of the clothing item
3. Fill in the details (name, category, color, style, weather)
4. Click "Save Item"

### Creating an Outfit

1. Navigate to "Outfits" → "Create Outfit"
2. Select items from each category by clicking on them
3. Preview your outfit in the sidebar
4. Give it a name and optional notes
5. Click "Save Outfit"

### Tracking Wear

1. Go to your Outfit Library
2. Click the "Wear" button on any outfit
3. The outfit will be marked as worn today
4. View your history in the "History" page

### Filtering Your Closet

1. Navigate to "Closet"
2. Use the search bar to find items by name
3. Click "Show Filters" to filter by:
   - Category
   - Style
   - Weather
   - Color
4. Toggle "Show Favorites Only" to see only favorite items

## Data Storage

All data is stored locally in your browser's LocalStorage. Your data:
- Persists across browser sessions
- Stays private on your device
- Can be cleared by clearing browser data

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari

## Mobile Responsive

The app is fully responsive and works great on:
- Desktop computers
- Tablets
- Mobile phones

## Future Enhancements

Possible features for future versions:
- Cloud storage and sync
- AI outfit suggestions
- Weather-based recommendations
- Export/import data
- Photo editing tools
- Outfit sharing
- Calendar integration

## License

This project is open source and available for personal use.

## Support

If you encounter any issues, please check:
1. Browser console for errors
2. LocalStorage is enabled
3. JavaScript is enabled
4. Images are in supported formats (PNG, JPG, GIF)

---

Enjoy organizing your wardrobe! 👕👗👔

# WardrobeBuddy
