export type BarberId = "marko" | "luka" | "ante" | "duje";

export type Barber = {
  id: BarberId;
  initials: string;
  available: boolean;
};

export const barbers: Barber[] = [
  { id: "marko", initials: "MK", available: true },
  { id: "luka", initials: "LK", available: true },
  { id: "ante", initials: "AT", available: true },
  { id: "duje", initials: "DJ", available: true },
];
