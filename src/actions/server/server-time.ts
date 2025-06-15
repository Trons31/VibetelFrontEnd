'use server';

export const serverTime = () => {
  const now = new Date();
  const colombiaTime = new Date(
    now.toLocaleString('en-US', { timeZone: 'America/Bogota' })
  );
  return { colombiaTime: colombiaTime.toISOString() };
};
