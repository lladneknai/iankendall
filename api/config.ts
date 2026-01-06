// Storage
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const IMAGE_STORAGE_PATH = "projects";
export const IMAGE_CACHE_MAX_AGE = 31536000; // 1 year

// Data store keys
export const ABOUT_KEY = "about:main";
export const PROJECT_KEY_PREFIX = "project";

// Email
export const EMAIL_SERVICE = "gmail";
export const EMAIL_SUBJECT = "New message from iankendall.me";

// Dev
export const DEV_MOCK_DELAY_MS = 2000;

// Environment
export const isDevelopment = () => {
  return (
    process.env.NODE_ENV === "development" || process.env.AMPT_ENV === "dev"
  );
};
