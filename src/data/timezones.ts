export interface Timezone {
  id: string;
  label: string;
  gmt: string;
  hours: string;
  city: string; // e.g., "Erzurum" for TR
  locator: {
    x: number; // percentage relative to globeCircle (marker referans alanı globeCircle'dır)
    y: number; // percentage relative to globeCircle (marker referans alanı globeCircle'dır)
  };
}

export const timezones: Timezone[] = [
  {
    id: 'tr',
    label: 'TURKEY',
    gmt: 'GMT+3',
    hours: '09:00–18:00',
    city: 'Erzurum',
    locator: { x: 56, y: 46 }, // Calibrated for Turkey/Erzurum region (marker referans alanı globeCircle'dır)
  },
  {
    id: 'eu',
    label: 'EUROPE',
    gmt: 'GMT+1',
    hours: '09:00–17:00',
    city: 'Central Europe',
    locator: { x: 48, y: 42 },
  },
  {
    id: 'us',
    label: 'USA',
    gmt: 'GMT-5',
    hours: '09:00–17:00',
    city: 'Eastern US',
    locator: { x: 28, y: 44 },
  },
];

export function getTimezoneById(id: string): Timezone | undefined {
  return timezones.find((tz) => tz.id === id);
}

