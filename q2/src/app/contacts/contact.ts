export type Contact = {
  _id: string;
  name: ContactName;
  email: string;
  picture: string;
  location: LatLng;
};

export type ContactName = {
  last: string;
  first: string;
};

export type LatLng = {
  latitude: number | null;
  longitude: number | null;
};
