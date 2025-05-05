export const convertToUTC = (localTime: string): string => {
  const date = new Date(localTime);
  return date.toISOString(); // จะได้เวลาในรูปแบบ ISO เช่น "2025-05-05T23:49:00.000Z"
};
