// Room data with actual prices and images from src/assets/images

// Import images
import single1 from '../assets/images/Single/sing1.jpg';
import single2 from '../assets/images/Single/2.jpg';
import single3 from '../assets/images/Single/3.jpg';

import standardJing1 from '../assets/images/Standard Jing/Stand.jpg';
import standardJing2 from '../assets/images/Standard Jing/2.jpg';
import standardJing3 from '../assets/images/Standard Jing/23.jpg';

import standardDouble1 from '../assets/images/Standard double/standarddouble1.jpg';
import standardDouble2 from '../assets/images/Standard double/stand d2.jpg';
import standardDouble3 from '../assets/images/Standard double/stn_d1.jpg';
import standardDouble4 from '../assets/images/Standard double/stnd_d3.jpg';

import twin1 from '../assets/images/twin/Twin1.jpg';
import twin2 from '../assets/images/twin/twin2.jpg';
import twin3 from '../assets/images/twin/twin3.jpg';
import twin4 from '../assets/images/twin/twin4.jpg';
import twin5 from '../assets/images/twin/twin 5.jpg';

import family1 from '../assets/images/family/family1.jpg';
import family2 from '../assets/images/family/family2.jpg';
import family3 from '../assets/images/family/family3.jpg';
import family4 from '../assets/images/family/family4.jpg';
import family5 from '../assets/images/family/family5.jpg';

import studio1 from '../assets/images/studio/Studio_apartment1.jpg';
import studio2 from '../assets/images/studio/Studio_appartment2.jpg';
import studio3 from '../assets/images/studio/Studio_appartment3.jpg';
import studio4 from '../assets/images/studio/studio_appartment4.jpg';
import studio5 from '../assets/images/studio/studio_appartment5.jpg';

export const rooms = [
  {
    id: 1,
    type: "Single Room",
    price: 1500,
    amenities: ["WiFi", "TV", "Hot Water"],
    capacity: 1,
    description: "Cozy single room perfect for solo travelers",
    image: single1,
    images: [single1, single2, single3]
  },
  {
    id: 2,
    type: "Standard Room",
    price: 2500,
    amenities: ["WiFi", "AC", "Hot Water", "TV"],
    capacity: 2,
    description: "Comfortable standard room with modern amenities",
    image: standardJing1,
    images: [standardJing1, standardJing2, standardJing3]
  },
  {
    id: 3,
    type: "Standard Double",
    price: 2500,
    amenities: ["WiFi", "AC", "Hot Water", "TV"],
    capacity: 2,
    description: "Room with a comfortable double bed",
    image: standardDouble1,
    images: [standardDouble1, standardDouble2, standardDouble3, standardDouble4]
  },
  {
    id: 4,
    type: "Standard Twin",
    price: 2500,
    amenities: ["WiFi", "AC", "Hot Water", "TV"],
    capacity: 2,
    description: "Room with two comfortable single beds",
    image: twin1,
    images: [twin1, twin2, twin3, twin4, twin5]
  },
  {
    id: 5,
    type: "Family Room (2BR)",
    price: 4500,
    amenities: ["WiFi", "AC", "Hot Water", "TV", "Mini Fridge", "Seating Area"],
    capacity: 4,
    description: "Spacious family room with 2 bedrooms for families",
    image: family1,
    images: [family1, family2, family3, family4, family5]
  },
  {
    id: 6,
    type: "Studio Apartment",
    price: 4000,
    amenities: ["WiFi", "AC", "Hot Water", "TV", "Mini Fridge", "Kitchenette"],
    capacity: 2,
    description: "Self-contained studio apartment with kitchenette",
    image: studio1,
    images: [studio1, studio2, studio3, studio4, studio5]
  }
];

// Amenity icons mapping (for UI display)
export const amenityIcons = {
  "WiFi": "Wifi",
  "AC": "Wind",
  "Hot Water": "Droplet",
  "TV": "Tv",
  "Mini Fridge": "Refrigerator",
  "Room Service": "BellRing",
  "Kitchenette": "CookingPot",
  "Seating Area": "Armchair"
};
