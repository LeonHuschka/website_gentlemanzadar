export type ServiceId = "haircut" | "beard" | "combo" | "kids" | "hotTowel" | "buzz";

export type Service = {
  id: ServiceId;
  durationMin: number;
  priceEur: number;
};

export const services: Service[] = [
  { id: "haircut", durationMin: 40, priceEur: 18 },
  { id: "beard", durationMin: 30, priceEur: 15 },
  { id: "combo", durationMin: 60, priceEur: 28 },
  { id: "kids", durationMin: 30, priceEur: 12 },
  { id: "hotTowel", durationMin: 45, priceEur: 20 },
  { id: "buzz", durationMin: 20, priceEur: 10 },
];

export function getService(id: ServiceId): Service | undefined {
  return services.find((s) => s.id === id);
}
