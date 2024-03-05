// Function to set an item in session storage
export const setSessionStorageItem = (key, value) => {
    if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(key, value);
    }
};

// Function to get an item from session storage
export const getSessionStorageItem = (key) => {
    if (typeof window !== 'undefined') {
        const storedItem = window.sessionStorage.getItem(key);
        return storedItem ? storedItem : null;
    }
};

// Function to remove an item from session storage
export const removeSessionStorageItem = (key) => {
    if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem(key);
    }
};