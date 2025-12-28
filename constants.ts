
import { ItineraryDay, PackingItem } from './types';

export const ITINERARY: ItineraryDay[] = [
  {
    day: 1,
    date: "Dec 29, 2025",
    location: "Berlin, Germany",
    activities: ["Flight from Washington, DC (IAD) to Berlin"]
  },
  {
    day: 2,
    date: "Dec 30, 2025",
    location: "Berlin, Germany",
    hotel: "MEININGER Hotel Berlin Central Station",
    activities: ["Arrival in Berlin", "Lunch at Curry 61", "Museum Island", "TV Tower", "Bebelplatz", "Christmas Markets"]
  },
  {
    day: 3,
    date: "Dec 31, 2025",
    location: "Berlin, Germany",
    activities: ["Brandenburg Gate", "Hitler's Bunker", "Checkpoint Charlie", "Axel Springer Visit", "Burgermeister Lunch", "Berliner Zeitung Rooftop", "NYE Dinner at Hofbräuhaus"]
  },
  {
    day: 4,
    date: "Jan 1, 2026",
    location: "Berlin, Germany",
    activities: ["Free Day", "Explore Museums", "New Year's Concert at Konzerthaus"]
  },
  {
    day: 5,
    date: "Jan 2, 2026",
    location: "Berlin, Germany",
    activities: ["Company Visit (TBD)", "Lunch at KaDeWe", "Guided walking tour City West", "Kaiser-Wilhelm-Gedächtnis-Kirche"]
  },
  {
    day: 6,
    date: "Jan 3, 2026",
    location: "Potsdam / Night Train",
    activities: ["Train to Potsdam", "Sanssouci Palace", "Dutch Quarter", "Group Lunch in Dortu17", "Overnight train to Vienna"]
  },
  {
    day: 7,
    date: "Jan 4, 2026",
    location: "Vienna, Austria",
    hotel: "JO&JOE Wien",
    activities: ["Luggage drop-off", "Café Central & Sacher crawl", "Historic walking tour", "Free explore time"]
  },
  {
    day: 8,
    date: "Jan 5, 2026",
    location: "Vienna, Austria",
    activities: ["Schloss Belvedere", "Vienna State Opera", "Austrian National Library", "Marionette Theatre"]
  },
  {
    day: 9,
    date: "Jan 6, 2026",
    location: "Vienna, Austria",
    activities: ["Winery tour", "Ice-skating at City Hall", "Group dinner at Centimeter"]
  },
  {
    day: 10,
    date: "Jan 7, 2026",
    location: "Salzburg, Austria",
    hotel: "MEININGER Hotel Salzburg City Center",
    activities: ["Train to Salzburg", "City of Mozart walking tour", "Fortress visit"]
  },
  {
    day: 11,
    date: "Jan 8, 2026",
    location: "Salzburg, Austria",
    activities: ["Marionette Theatre backstage", "Business lunch with Dominic Benning", "Pharma industry presentation"]
  },
  {
    day: 12,
    date: "Jan 9, 2026",
    location: "Salzburg, Austria",
    activities: ["Berchtesgaden Salt Mine", "Gondola lift (optional)"]
  },
  {
    day: 13,
    date: "Jan 10, 2026",
    location: "Munich, Germany",
    hotel: "H2 Hotel München Olympiapark",
    activities: ["Train to Munich", "Munich walking tour", "Residenz Museum", "Football game (optional)"]
  },
  {
    day: 14,
    date: "Jan 11, 2026",
    location: "Munich, Germany",
    activities: ["Dachau Concentration Camp visit", "University visit"]
  },
  {
    day: 15,
    date: "Jan 12, 2026",
    location: "Munich, Germany",
    activities: ["Siemens Mobility visit", "Lunch at Steinheil 16", "Brewery experience"]
  },
  {
    day: 16,
    date: "Jan 13, 2026",
    location: "Bavarian Alps / Munich",
    activities: ["Neuschwanstein & Linderhof Castles tour", "Lunch in Schwangau", "Evening free in Munich"]
  },
  {
    day: 17,
    date: "Jan 14, 2026",
    location: "Munich, Germany",
    activities: ["BMW Museum visit", "Farewell dinner at München 72"]
  },
  {
    day: 18,
    date: "Jan 15, 2026",
    location: "Departure",
    activities: ["Hotel checkout", "Transfer to Munich Airport", "Flight to Washington, DC"]
  }
];

export const INITIAL_PACKING_LIST: PackingItem[] = [
  { id: '1', name: 'Insulated winter jacket', category: 'Outerwear', checked: false, note: '' },
  { id: '2', name: 'Lightweight fleece', category: 'Outerwear', checked: false, note: '' },
  { id: '3', name: 'Beanie', category: 'Outerwear', checked: false, note: '' },
  { id: '4', name: 'Neck gaiter', category: 'Outerwear', checked: false, note: '' },
  { id: '5', name: 'Gloves', category: 'Outerwear', checked: false, note: '' },
  { id: '6', name: 'Long-sleeve shirts (4)', category: 'Tops', checked: false, note: '' },
  { id: '7', name: 'Short-sleeve shirts (2)', category: 'Tops', checked: false, note: '' },
  { id: '8', name: 'Sweater/Quarter-zip', category: 'Tops', checked: false, note: '' },
  { id: '9', name: 'Jeans/Heavy pants (2)', category: 'Bottoms', checked: false, note: '' },
  { id: '10', name: 'Travel pants/Chinos', category: 'Bottoms', checked: false, note: '' },
  { id: '11', name: 'Joggers/Gym pants', category: 'Bottoms', checked: false, note: '' },
  { id: '12', name: 'Sleep pants', category: 'Bottoms', checked: false, note: '' },
  { id: '13', name: 'Underwear (9-10 pairs)', category: 'Underwear & Socks', checked: false, note: '' },
  { id: '14', name: 'Thick/Wool socks (4+ pairs)', category: 'Underwear & Socks', checked: false, note: '' },
  { id: '15', name: 'AirForce 1s', category: 'Shoes', checked: false, note: '' },
  { id: '16', name: 'Nicer Shoes', category: 'Shoes', checked: false, note: '' },
  { id: '17', name: 'Passport', category: 'Tech & Travel', checked: false, note: '' },
  { id: '18', name: 'Wallet/Cash/Cards', category: 'Tech & Travel', checked: false, note: '' },
  { id: '19', name: 'Universal power adapter', category: 'Tech & Travel', checked: false, note: '' },
  { id: '20', name: 'Portable battery', category: 'Tech & Travel', checked: false, note: '' }
];
