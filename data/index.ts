export interface BundleI {
  id: number;
  amount: number;
  size: string;
  price: number;
  inUsd: number;
}

export const bundles: BundleI[] = [
  {
    id: 1,
    amount: 70,
    size: "MB",
    price: 500,
    inUsd: 0.13,
  },
  {
    id: 2,
    amount: 160,
    size: "MB",
    price: 1000,
    inUsd: 0.27,
  },
  {
    id: 3,
    amount: 500,
    size: "MB",
    price: 2000,
    inUsd: 0.53,
  },
  {
    id: 4,
    amount: 2,
    size: "GB",
    price: 5000,
    inUsd: 1.34,
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
