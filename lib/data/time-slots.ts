export function generateTimeSlots(
  date: Date | undefined,
  durationMin: number,
): { time: string; available: boolean }[] {
  if (!date) return [];

  const day = date.getDay();
  if (day === 0) return [];

  const closeHour = day === 6 ? 18 : 20;
  const openHour = 8;
  const stepMin = 30;

  const slots: { time: string; available: boolean }[] = [];
  const seed = date.getDate() * 31 + date.getMonth() * 17 + date.getFullYear();

  for (let h = openHour; h < closeHour; h++) {
    for (let m = 0; m < 60; m += stepMin) {
      const slotEndMin = h * 60 + m + durationMin;
      const closeMin = closeHour * 60;
      if (slotEndMin > closeMin) continue;

      const time = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      const hash = (seed * 1009 + h * 137 + m * 53) % 100;
      const available = hash > 35;
      slots.push({ time, available });
    }
  }

  return slots;
}
