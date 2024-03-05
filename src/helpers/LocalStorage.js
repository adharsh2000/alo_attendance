// Function to set an item in local storage
export const setLocalStorageItem = (key, value) => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, value);
    }
};

// Function to get an item from local storage
export const getLocalStorageItem = (key) => {
    if (typeof window !== 'undefined') {
        const storedItem = window.localStorage.getItem(key);
        return storedItem ? storedItem : null;
    }
};

// Function to remove an item from local storage
export const removeLocalStorageItem = (key) => {
    if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
    }
};
