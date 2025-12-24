import { vi } from 'vitest';

// Mock localStorage
const localStorageMock = {
    getItem: vi.fn((key) => {
        return localStorageMock.store[key] || null;
    }),
    setItem: vi.fn((key, value) => {
        localStorageMock.store[key] = value;
    }),
    removeItem: vi.fn((key) => {
        delete localStorageMock.store[key];
    }),
    clear: vi.fn(() => {
        localStorageMock.store = {};
    }),
    store: {}
};

global.localStorage = localStorageMock;

// Mock Notification API
global.Notification = vi.fn(function (title, options) {
    this.title = title;
    this.options = options;
    this.onclick = null;
    this.close = vi.fn();
});

global.Notification.permission = 'granted';
global.Notification.requestPermission = vi.fn(() => Promise.resolve('granted'));

// Mock Audio API
global.Audio = vi.fn(function (src) {
    this.src = src;
    this.play = vi.fn(() => Promise.resolve());
    this.pause = vi.fn();
    this.volume = 1;
    this.currentTime = 0;
});

// Reset mocks before each test
beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
});
