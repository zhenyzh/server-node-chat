export const TOKEN = {
  ACCESS: {
    MILLISECONDS: 30 * 60 * 1000, // 30 минут
    STRING: "30m",
  },
  REFRESH: {
    MILLISECONDS: 24 * 60 * 60 * 1000, // 1 день
    STRING: "1d",
  },
  NAMESPACE: {
    ACCESS_TOKEN: "accessToken",
    REFRESH_TOKEN: "refreshToken",
  },
} as const;
