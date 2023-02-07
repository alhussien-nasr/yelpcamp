
export type authorTypes = { _id: string; email: string; username: string };
export type reviewTypes = {
  _id: string;
  body: string;
  rating: number;
  author: authorTypes;
};
export type imageType = {
  url: string;
  filename: string;
};

export type campTypes = {
  _id: string;
  title: string;
  images: imageType[];
  price: number;
  describtion: string;
  location: string;
  author: authorTypes;
  reviews: reviewTypes[];
  geometry: [number, number];
};
