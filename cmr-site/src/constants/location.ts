/**
 * Campus location for maps (approximate pin — replace with exact coordinates from Google Maps if needed).
 * Address: Survey No. 69, CMR Marg, Medchal Road, Hyderabad, Telangana 500043
 */
export const CAMPUS_MAP = {
  lat: 17.6283,
  lng: 78.4768,
  zoom: 16,
  /** Search query for Google Maps when coordinates are not preferred */
  placeQuery: "CMR Engineering College Medchal Road Hyderabad",
} as const;

export function getGoogleMapsEmbedUrl(): string {
  const { lat, lng, zoom } = CAMPUS_MAP;
  return `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
}

export function getGoogleMapsOpenUrl(): string {
  const { placeQuery } = CAMPUS_MAP;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeQuery)}`;
}
