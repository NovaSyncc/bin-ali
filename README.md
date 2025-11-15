# Bin Ali Hotel Website

A modern, responsive website for Bin Ali Hotel in Eastleigh, Nairobi. Built with React, Tailwind CSS, and Vite for optimal performance.

## Features

- **Fully Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- **WhatsApp Booking Integration** - Instant booking requests via WhatsApp
- **Fast Performance** - Optimized for speed with lazy loading and code splitting
- **SEO Optimized** - Structured data and meta tags for better search visibility
- **Modern UI** - Clean, professional design with smooth animations
- **Mobile-First** - Optimized for mobile users with bottom sticky CTA
- **Scalable Architecture** - Ready for future dashboard integration

## Sections

1. **Hero** - Eye-catching banner with hotel image and CTA
2. **Rooms** - Room types, pricing, and amenities
3. **About** - Hotel information and features
4. **Events** - Wedding and event venue information
5. **Gallery** - Photo gallery with lightbox
6. **Restaurant** - On-site dining amenities
7. **Contact** - Location, phone, WhatsApp, and map
8. **Booking Form** - WhatsApp-integrated booking request form

## Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool for fast development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Framer Motion** - Animation library

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd bin-ali-hotel
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your actual values
```

4. Start development server
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_WHATSAPP_NUMBER=254745386007
VITE_HOTEL_PHONE=0745386007
VITE_HOTEL_EMAIL=info@binalihotel.com
VITE_HOTEL_ADDRESS=Eighth St, Nairobi
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Updating Content

### Room Information

Edit `src/data/rooms.js` to update room types, prices, and amenities:

```javascript
export const rooms = [
  {
    id: 1,
    type: "Room Type Name",
    price: 2500, // Price per night in KES
    amenities: ["WiFi", "AC", "Hot Water", "TV"],
    capacity: 2,
    description: "Room description here",
    image: "/path/to/image.jpg"
  }
];
```

### Contact Information

Update contact details in:
- `.env` file - Phone numbers and email
- `src/components/Contact.jsx` - Contact section
- `src/components/Footer.jsx` - Footer contact info

### Gallery Images

Replace placeholder images in `src/components/Gallery.jsx` with actual hotel photos from Google Maps:

```javascript
const galleryImages = [
  {
    id: 1,
    url: '/path/to/actual/image.jpg',
    category: 'Rooms',
    alt: 'Description'
  }
];
```

### Restaurant Hours

Update operating hours in `src/components/Restaurant.jsx`:

```javascript
<p><span className="font-medium">Breakfast:</span> 6:00 AM - 10:30 AM</p>
```

## Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI
```bash
npm install -g vercel
```

2. Login to Vercel
```bash
vercel login
```

3. Deploy
```bash
vercel --prod
```

4. Set environment variables in Vercel dashboard:
   - Go to Project Settings > Environment Variables
   - Add all variables from `.env` file

### Custom Domain Setup

1. In Vercel dashboard, go to Project Settings > Domains
2. Add your custom domain (e.g., binalihotel.com)
3. Update DNS settings as instructed by Vercel
4. SSL certificate will be automatically generated

## Future Enhancements (Phase 2)

The website is architected to support future dashboard integration:

### Planned Features
- Admin authentication with Supabase
- Booking management dashboard
- Real-time availability calendar
- Customer database
- Analytics and reporting

### Integration Points
All components are marked with comments for future integration:
- `// TODO: Replace WhatsApp with Supabase when dashboard requested`
- `// SUPABASE_INTEGRATION: Add booking to database here`

See `src/services/bookingService.js` for prepared integration points.

## Performance

Target Lighthouse scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 90+

Current optimizations:
- Image lazy loading
- Code splitting
- Minified CSS/JS
- Optimized fonts
- Compressed assets

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Support

For technical support or questions:
- Email: developer@example.com
- WhatsApp: Developer contact

## Project Structure

```
bin-ali-hotel/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Rooms.jsx
│   │   ├── About.jsx
│   │   ├── Events.jsx
│   │   ├── Gallery.jsx
│   │   ├── BookingForm.jsx
│   │   ├── Restaurant.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── pages/           # Page components
│   │   └── Home.jsx
│   ├── data/            # Data files
│   │   └── rooms.js
│   ├── services/        # Business logic
│   │   └── bookingService.js
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── .env.example         # Environment variables template
├── index.html           # HTML template
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js       # Vite configuration
└── vercel.json          # Vercel deployment config
```

## License

Copyright © 2025 Bin Ali Hotel. All rights reserved.

---

Built with ❤️ for Bin Ali Hotel
