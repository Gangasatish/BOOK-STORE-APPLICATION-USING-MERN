import { useState, useEffect, useSyncExternalStore } from 'react';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ─── Backend Status Store (vanilla, framework-agnostic) ───────────
// Status: 'checking' → 'waking' → 'ready' | 'error'
let status = 'checking';
let listeners = new Set();
let initialized = false;
let pollTimer = null;

const POLL_INTERVAL = 3000; // 3 seconds
const HEALTH_TIMEOUT = 10000; // 10s timeout for health pings

const notify = () => {
    listeners.forEach((fn) => fn());
};

const setStatus = (newStatus) => {
    if (status !== newStatus) {
        status = newStatus;
        notify();
    }
};

const getStatus = () => status;

const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
};

// ─── Health Check Logic ───────────────────────────────────────────
const pingBackend = async () => {
    try {
        await axios.get(`${baseURL}/books?limit=1`, {
            timeout: HEALTH_TIMEOUT,
        });
        return true;
    } catch (error) {
        // If we got a response (even an error response), the server is awake
        if (error.response) {
            return true;
        }
        return false;
    }
};

const startPolling = () => {
    if (pollTimer) return;

    pollTimer = setInterval(async () => {
        const alive = await pingBackend();
        if (alive) {
            setStatus('ready');
            stopPolling();
        }
    }, POLL_INTERVAL);
};

const stopPolling = () => {
    if (pollTimer) {
        clearInterval(pollTimer);
        pollTimer = null;
    }
};

// ─── Init Function (call once at app startup) ─────────────────────
export const initBackendWakeUp = async () => {
    if (initialized) return;
    initialized = true;

    setStatus('checking');

    const alive = await pingBackend();
    if (alive) {
        setStatus('ready');
    } else {
        setStatus('waking');
        startPolling();
    }
};

// ─── React Hook ───────────────────────────────────────────────────
/**
 * Hook to get backend status: 'checking' | 'waking' | 'ready' | 'error'
 */
export const useBackendStatus = () => {
    return useSyncExternalStore(subscribe, getStatus);
};

/**
 * Returns true when the backend is confirmed ready.
 */
export const useBackendReady = () => {
    const s = useBackendStatus();
    return s === 'ready';
};

/**
 * Returns true when the backend is in the process of waking up.
 */
export const useBackendWaking = () => {
    const s = useBackendStatus();
    return s === 'waking' || s === 'checking';
};
