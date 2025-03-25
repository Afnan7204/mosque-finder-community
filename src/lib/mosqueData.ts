import { Mosque, PrayerTimes, Announcement } from "./types";

export const mockMosques: Mosque[] = [
  {
    id: "m1",
    name: "Jamia Masjid",
    address: "Mosque Road, Near Clock Tower",
    city: "Surathkal",
    state: "Karnataka",
    country: "India",
    coordinates: {
      latitude: 13.0068,
      longitude: 74.7944,
    },
    school: "Shafi'i",
    facilities: ["Parking", "Wudu Area", "Women's Section", "Library"],
    contactNumber: "+91 9876543210",
    email: "info@jamiamasjidsurathkal.org",
    image: "https://images.unsplash.com/photo-1438783122414-7a37f6ad02fd?q=80&w=2924&auto=format&fit=crop",
    distance: 0.5,
  },
  {
    id: "m2",
    name: "Masjid Al-Noor",
    address: "NITK Campus, Inside University",
    city: "Surathkal",
    state: "Karnataka",
    country: "India",
    coordinates: {
      latitude: 13.0108,
      longitude: 74.7942,
    },
    school: "Hanafi",
    facilities: ["Parking", "Wudu Area", "Classroom"],
    image: "https://images.unsplash.com/photo-1542293787-6225b53208c1?q=80&w=2832&auto=format&fit=crop",
    distance: 0.8,
  },
  {
    id: "m3",
    name: "Central Juma Masjid",
    address: "Main Street, Market Area",
    city: "Surathkal",
    state: "Karnataka",
    country: "India",
    coordinates: {
      latitude: 13.0016,
      longitude: 74.7955,
    },
    school: "Shafi'i",
    facilities: ["Parking", "Wudu Area", "Women's Section", "Islamic Center", "Quran Classes"],
    contactNumber: "+91 9876543211",
    email: "contact@centraljumamasjid.org",
    website: "https://www.centraljumamasjid.org",
    image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=3474&auto=format&fit=crop",
    distance: 1.2,
  },
  {
    id: "m4",
    name: "Bilal Masjid",
    address: "Coastal Road, Near Beach",
    city: "Surathkal",
    state: "Karnataka",
    country: "India",
    coordinates: {
      latitude: 13.0145,
      longitude: 74.8012,
    },
    school: "Shafi'i",
    facilities: ["Parking", "Wudu Area"],
    image: "https://images.unsplash.com/photo-1591878362077-3721cb85682c?q=80&w=2940&auto=format&fit=crop",
    distance: 1.5,
  },
  {
    id: "m5",
    name: "Muhiyuddin Juma Masjid",
    address: "Old Town, Heritage Area",
    city: "Surathkal",
    state: "Karnataka",
    country: "India",
    coordinates: {
      latitude: 13.0023,
      longitude: 74.7902,
    },
    school: "Maliki",
    facilities: ["Parking", "Wudu Area", "Women's Section", "Library", "Community Hall"],
    contactNumber: "+91 9876543212",
    website: "https://www.muhiyuddinjumamasjid.org",
    image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=2940&auto=format&fit=crop",
    distance: 1.8,
  },
  {
    id: "m6",
    name: "Masjid Al-Rahma",
    address: "Green Park Avenue, Central District",
    city: "Mangalore",
    state: "Karnataka",
    country: "India",
    coordinates: {
      latitude: 12.9148,
      longitude: 74.8501,
    },
    school: "Hanafi",
    facilities: ["Parking", "Wudu Area", "Women's Section", "Islamic School", "Conference Room"],
    contactNumber: "+91 9876543213",
    email: "info@alrahmamasjid.org",
    website: "https://www.alrahmamasjid.org",
    image: "https://images.unsplash.com/photo-1566033735341-4601ff3a3265?q=80&w=2786&auto=format&fit=crop",
    distance: 5.3,
  },
  {
    id: "m7",
    name: "Grand Sultan Mosque",
    address: "Heritage Street, Old City Center",
    city: "Mangalore",
    state: "Karnataka",
    country: "India",
    coordinates: {
      latitude: 12.8723,
      longitude: 74.8421,
    },
    school: "Shafi'i",
    facilities: ["Parking", "Wudu Area", "Women's Section", "Library", "Community Kitchen"],
    contactNumber: "+91 9876543214",
    email: "info@grandsultanmosque.org",
    image: "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?q=80&w=2940&auto=format&fit=crop",
    distance: 7.2,
  },
  {
    id: "m8",
    name: "Masjid Al-Taqwa",
    address: "University Road, Education District",
    city: "Manipal",
    state: "Karnataka",
    country: "India",
    coordinates: {
      latitude: 13.3525,
      longitude: 74.7868,
    },
    school: "Hanafi",
    facilities: ["Parking", "Wudu Area", "Women's Section", "Student Center"],
    contactNumber: "+91 9876543215",
    email: "contact@altaqwa.org",
    image: "https://images.unsplash.com/photo-1494949389233-c499ab5f30a3?q=80&w=2852&auto=format&fit=crop",
    distance: 35.6,
  },
  {
    id: "m9",
    name: "Masjid Al-Falah",
    address: "Market Road, Commercial District",
    city: "Udupi",
    state: "Karnataka",
    country: "India",
    coordinates: {
      latitude: 13.3347,
      longitude: 74.7461,
    },
    school: "Shafi'i",
    facilities: ["Parking", "Wudu Area", "Women's Section", "Community Hall", "Library"],
    contactNumber: "+91 9876543216",
    email: "info@alfalahmasjid.org",
    website: "https://www.alfalahmasjid.org",
    image: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=2792&auto=format&fit=crop",
    distance: 38.2,
  },
  {
    id: "m10",
    name: "Masjid Al-Aqsa",
    address: "Riverside Drive, Scenic Area",
    city: "Kundapur",
    state: "Karnataka",
    country: "India",
    coordinates: {
      latitude: 13.6206,
      longitude: 74.6950,
    },
    school: "Maliki",
    facilities: ["Parking", "Wudu Area", "Women's Section", "Riverside Garden"],
    contactNumber: "+91 9876543217",
    image: "https://images.unsplash.com/photo-1598357906956-8010f74fbc19?q=80&w=2650&auto=format&fit=crop",
    distance: 72.5,
  },
];

export const mockPrayerTimes: PrayerTimes[] = [
  {
    mosqueId: "m1",
    date: new Date().toISOString().split('T')[0],
    fajr: {
      adhan: "05:15",
      iqamah: "05:30",
    },
    dhuhr: {
      adhan: "12:30",
      iqamah: "13:00",
    },
    asr: {
      adhan: "15:45",
      iqamah: "16:15",
    },
    maghrib: {
      adhan: "18:45",
      iqamah: "18:55",
    },
    isha: {
      adhan: "20:00",
      iqamah: "20:30",
    },
    jummah: [
      {
        khutbah: "13:15",
        prayer: "13:45",
      },
    ],
  },
  {
    mosqueId: "m2",
    date: new Date().toISOString().split('T')[0],
    fajr: {
      adhan: "05:10",
      iqamah: "05:25",
    },
    dhuhr: {
      adhan: "12:30",
      iqamah: "12:50",
    },
    asr: {
      adhan: "15:45",
      iqamah: "16:10",
    },
    maghrib: {
      adhan: "18:45",
      iqamah: "18:50",
    },
    isha: {
      adhan: "20:00",
      iqamah: "20:20",
    },
    jummah: [
      {
        khutbah: "13:00",
        prayer: "13:30",
      },
    ],
  },
  {
    mosqueId: "m3",
    date: new Date().toISOString().split('T')[0],
    fajr: {
      adhan: "05:15",
      iqamah: "05:35",
    },
    dhuhr: {
      adhan: "12:30",
      iqamah: "13:00",
    },
    asr: {
      adhan: "15:45",
      iqamah: "16:15",
    },
    maghrib: {
      adhan: "18:45",
      iqamah: "19:00",
    },
    isha: {
      adhan: "20:00",
      iqamah: "20:30",
    },
    jummah: [
      {
        khutbah: "13:30",
        prayer: "14:00",
      },
    ],
  },
  {
    mosqueId: "m4",
    date: new Date().toISOString().split('T')[0],
    fajr: {
      adhan: "05:20",
      iqamah: "05:40",
    },
    dhuhr: {
      adhan: "12:30",
      iqamah: "13:00",
    },
    asr: {
      adhan: "15:45",
      iqamah: "16:15",
    },
    maghrib: {
      adhan: "18:45",
      iqamah: "19:00",
    },
    isha: {
      adhan: "20:00",
      iqamah: "20:30",
    },
    jummah: [
      {
        khutbah: "13:15",
        prayer: "13:45",
      },
    ],
  },
  {
    mosqueId: "m5",
    date: new Date().toISOString().split('T')[0],
    fajr: {
      adhan: "05:15",
      iqamah: "05:30",
    },
    dhuhr: {
      adhan: "12:30",
      iqamah: "13:00",
    },
    asr: {
      adhan: "15:45",
      iqamah: "16:15",
    },
    maghrib: {
      adhan: "18:45",
      iqamah: "19:00",
    },
    isha: {
      adhan: "20:00",
      iqamah: "20:30",
    },
    jummah: [
      {
        khutbah: "13:30",
        prayer: "14:00",
      },
    ],
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: "a1",
    mosqueId: "m1",
    title: "Ramadan Taraweeh Prayers",
    content: "Join us for Taraweeh prayers during Ramadan. The prayers will begin 20 minutes after Isha prayers every night.",
    datePosted: "2023-03-10T00:00:00Z",
    type: "ramadan",
  },
  {
    id: "a2",
    mosqueId: "m1",
    title: "Eid ul-Fitr Prayer",
    content: "Eid prayer will be held at the mosque ground at 7:30 AM. Please come early to secure your place.",
    datePosted: "2023-04-15T00:00:00Z",
    type: "eid",
    eventDate: "2023-04-22",
    eventTime: "07:30",
  },
  {
    id: "a3",
    mosqueId: "m2",
    title: "Weekly Quran Class",
    content: "Weekly Quran class will be held every Saturday after Maghrib prayer. All are welcome to attend.",
    datePosted: "2023-02-28T00:00:00Z",
    type: "general",
  },
  {
    id: "a4",
    mosqueId: "m3",
    title: "Mosque Renovation",
    content: "The mosque will be undergoing renovation starting next week. Prayers will continue as usual but please excuse any inconvenience.",
    datePosted: "2023-03-25T00:00:00Z",
    type: "general",
    expiryDate: "2023-05-01T00:00:00Z",
  },
  {
    id: "a5",
    mosqueId: "m4",
    title: "Iftar Gathering",
    content: "Daily iftar will be served at the mosque during Ramadan. Please join us for breaking the fast together.",
    datePosted: "2023-03-20T00:00:00Z",
    type: "ramadan",
  },
];

export const getMosquePrayerTimes = (mosqueId: string): PrayerTimes | undefined => {
  return mockPrayerTimes.find(pt => pt.mosqueId === mosqueId);
};

export const getMosqueAnnouncements = (mosqueId: string): Announcement[] => {
  return mockAnnouncements.filter(a => a.mosqueId === mosqueId);
};

export const getMosqueById = (mosqueId: string): Mosque | undefined => {
  return mockMosques.find(m => m.id === mosqueId);
};

export const searchMosques = (
  query: string, 
  schoolFilter?: string,
  womensSectionFilter?: boolean
): Mosque[] => {
  const normalizedQuery = query.toLowerCase();
  
  return mockMosques.filter(mosque => {
    const matchesQuery = !query || 
      mosque.name.toLowerCase().includes(normalizedQuery) ||
      mosque.address.toLowerCase().includes(normalizedQuery) ||
      mosque.city.toLowerCase().includes(normalizedQuery) ||
      mosque.state.toLowerCase().includes(normalizedQuery) ||
      mosque.country.toLowerCase().includes(normalizedQuery);
    
    const matchesSchool = !schoolFilter || 
      mosque.school === schoolFilter;
    
    const matchesWomensSection = !womensSectionFilter || 
      (mosque.facilities && mosque.facilities.includes("Women's Section"));
    
    return matchesQuery && matchesSchool && matchesWomensSection;
  });
};

export const getNearestMosques = (latitude: number, longitude: number, limit: number = 5): Mosque[] => {
  return mockMosques.slice(0, limit);
};

