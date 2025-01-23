// SESSION STORAGE HELPERS
// DATA MUST ALWAYS BE STORED IN AN ARRAY

export const ssWrite = (key: string, data: any) => {
  return sessionStorage.setItem(key, JSON.stringify(data));
};

export const ssRead = <T>(key: string): T | null => {
  const data = sessionStorage.getItem(key);
  if (!data) return null;
  return JSON.parse(data) as T;
};