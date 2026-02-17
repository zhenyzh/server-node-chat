export const TOKEN_LIFETIME = {
  ACCESS: {
    MILLISECONDS: 30 * 60 * 1000, // 30 минут
    STRING: "30m",
  },
  REFRESH: {
    MILLISECONDS: 24 * 60 * 60 * 1000, // 1 день
    STRING: "1d",
  },
} as const;
