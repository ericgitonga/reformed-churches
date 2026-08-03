import churchesData from "@/data/churches.json";

export type Church = {
  id: string;
  name: string;
  address: string | null;
  lat: number;
  lng: number;
  website: string | null;
  phone: string | null;
  email: string | null;
  pastor: string | null;
  placeId: string | null;
};

export function getChurches(): Church[] {
  return (churchesData as Church[]).slice().sort((a, b) => a.name.localeCompare(b.name));
}

export function mapsUrl(church: Church): string {
  return `https://www.google.com/maps/search/?api=1&query=${church.lat},${church.lng}`;
}
