import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ─── Axios Instance ───────────────────────────────────────────────
const api = axios.create({
    baseURL,
    timeout: 60000, // 60s — enough for Render cold starts
});

// ─── User-Friendly Error Messages ─────────────────────────────────
const FRIENDLY_MESSAGES = {
    timeout: 'The server is taking longer than expected. Please try again.',
    network: 'Unable to connect to the server. Please check your internet connection.',
    server: 'Something went wrong on our end. We\'re working to fix it.',
    generic: 'An unexpected error occurred. Please try again later.',
};

/**
 * Classify an Axios error and return a user-friendly message.
 */
export const getFriendlyError = (error) => {
    if (!error) return FRIENDLY_MESSAGES.generic;

    // Timeout
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        return FRIENDLY_MESSAGES.timeout;
    }

    // Network error (no response at all)
    if (error.code === 'ERR_NETWORK' || !error.response) {
        return FRIENDLY_MESSAGES.network;
    }

    // Server error (5xx)
    if (error.response && error.response.status >= 500) {
        return FRIENDLY_MESSAGES.server;
    }

    // 4xx — pass through the server message if available
    if (error.response?.data?.message) {
        return error.response.data.message;
    }

    return FRIENDLY_MESSAGES.generic;
};

// ─── Retry Logic ──────────────────────────────────────────────────
const MAX_RETRIES = 3;
const BASE_DELAY = 2000; // 2 seconds

const isRetryable = (error) => {
    // Timeout
    if (error.code === 'ECONNABORTED') return true;
    // Network error
    if (error.code === 'ERR_NETWORK' || !error.response) return true;
    // 5xx server error
    if (error.response && error.response.status >= 500) return true;
    return false;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error.config;

        // Don't retry if it's not retryable or we've exhausted retries
        if (!isRetryable(error)) {
            // Attach friendly message
            error.friendlyMessage = getFriendlyError(error);
            return Promise.reject(error);
        }

        // Initialize retry count
        config.__retryCount = config.__retryCount || 0;

        if (config.__retryCount >= MAX_RETRIES) {
            error.friendlyMessage = getFriendlyError(error);
            return Promise.reject(error);
        }

        config.__retryCount += 1;

        // Exponential backoff: 2s, 4s, 8s
        const delay = BASE_DELAY * Math.pow(2, config.__retryCount - 1);
        await sleep(delay);

        // Retry the request
        return api(config);
    }
);

// ─── GET Request Caching ──────────────────────────────────────────
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Cached GET request. Returns cached data if available and fresh.
 * @param {string} url - API endpoint
 * @param {object} options - Axios config
 * @returns {Promise}
 */
export const cachedGet = async (url, options = {}) => {
    const cacheKey = url + JSON.stringify(options.params || {});
    const cached = cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return { data: cached.data, fromCache: true };
    }

    const response = await api.get(url, options);
    cache.set(cacheKey, { data: response.data, timestamp: Date.now() });
    return response;
};

/**
 * Clear all cached responses.
 */
export const clearCache = () => cache.clear();

// ─── Request Deduplication ────────────────────────────────────────
const pendingRequests = new Map();

/**
 * Deduplicated GET request. If an identical request is already in-flight,
 * returns the same promise instead of firing a new one.
 * @param {string} url - API endpoint
 * @param {object} options - Axios config
 * @returns {Promise}
 */
export const deduplicatedGet = async (url, options = {}) => {
    const key = url + JSON.stringify(options.params || {});

    if (pendingRequests.has(key)) {
        return pendingRequests.get(key);
    }

    const promise = cachedGet(url, options).finally(() => {
        pendingRequests.delete(key);
    });

    pendingRequests.set(key, promise);
    return promise;
};

export default api;
