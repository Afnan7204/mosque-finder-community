
export interface Mosque {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  school: string;
  facilities: string[];
  contactNumber?: string;
  email?: string;
  website?: string;
  image?: string;
  distance?: number; // calculated field
}

export interface PrayerTimes {
  mosqueId: string;
  date: string; // ISO date string
  fajr: {
    adhan: string; // 24-hour format "HH:MM"
    iqamah: string; // 24-hour format "HH:MM"
  };
  dhuhr: {
    adhan: string;
    iqamah: string;
  };
  asr: {
    adhan: string;
    iqamah: string;
  };
  maghrib: {
    adhan: string;
    iqamah: string;
  };
  isha: {
    adhan: string;
    iqamah: string;
  };
  jummah?: {
    khutbah: string;
    prayer: string;
  }[];
}

export interface Announcement {
  id: string;
  mosqueId: string;
  title: string;
  content: string;
  datePosted: string; // ISO date string
  expiryDate?: string; // ISO date string
  type: "general" | "event" | "eid" | "ramadan";
  eventDate?: string; // ISO date string
  eventTime?: string; // 24-hour format "HH:MM"
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  mosqueId: string;
  isVerified: boolean;
  role: "admin" | "superadmin";
}

export interface UserPreference {
  notificationEnabled: boolean;
  favoriteMosqueIds: string[];
  defaultMosqueId?: string;
}
