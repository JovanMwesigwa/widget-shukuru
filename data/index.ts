export interface BundleI {
  id: number;
  amount: number;
  size: string;
  price: number;
}

export const bundles: BundleI[] = [
  {
    id: 1,
    amount: 70,
    size: "MB",
    price: 500,
  },
  {
    id: 2,
    amount: 160,
    size: "MB",
    price: 1000,
  },
  {
    id: 3,
    amount: 500,
    size: "MB",
    price: 2000,
  },
  {
    id: 4,
    amount: 2,
    size: "GB",
    price: 5000,
  },
];

export interface NetworkProviderI {
  image: string;
  name: string;
}

export const networkProvider: NetworkProviderI[] = [
  {
    image: "/mtn.jpeg",
    name: "MTN",
  },
  {
    image: "/airtel.jpeg",
    name: "Airtel",
  },
];
