
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
    image: "https://images.unsplash.com/photo-1545109290-9c9b9a99d48e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW9zcXVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
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
    image: "https://images.unsplash.com/photo-1542293787-6225b53208c1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bW9zcXVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
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
    image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bW9zcXVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
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
    image: "https://images.unsplash.com/photo-1591878362077-3721cb85682c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1vc3F1ZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
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
    image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG1vc3F1ZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    distance: 1.8,
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

// Helper function to get prayer times for a specific mosque
export const getMosquePrayerTimes = (mosqueId: string): PrayerTimes | undefined => {
  return mockPrayerTimes.find(pt => pt.mosqueId === mosqueId);
};

// Helper function to get announcements for a specific mosque
export const getMosqueAnnouncements = (mosqueId: string): Announcement[] => {
  return mockAnnouncements.filter(a => a.mosqueId === mosqueId);
};

// Helper function to get a mosque by ID
export const getMosqueById = (mosqueId: string): Mosque | undefined => {
  return mockMosques.find(m => m.id === mosqueId);
};

// Helper function to search mosques
export const searchMosques = (query: string, school?: string): Mosque[] => {
  const lowerCaseQuery = query.toLowerCase();
  return mockMosques.filter(mosque => {
    const matchesQuery = mosque.name.toLowerCase().includes(lowerCaseQuery) || 
                         mosque.address.toLowerCase().includes(lowerCaseQuery) ||
                         mosque.city.toLowerCase().includes(lowerCaseQuery);
    
    const matchesSchool = school ? mosque.school === school : true;
    
    return matchesQuery && matchesSchool;
  });
};

// Helper function to get nearest mosques
export const getNearestMosques = (latitude: number, longitude: number, limit: number = 5): Mosque[] => {
  // In a real app, we would calculate actual distances
  // For now, we'll just return the mock mosques with their pre-set distances
  return mockMosques.slice(0, limit);
};
