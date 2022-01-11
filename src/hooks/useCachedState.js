const {useState} = require("react");

export const useCachedState = (cacheId, defaultValue) => {
    let cachedValue = localStorage.getItem(cacheId);

    const [value, setValue] = useState((cachedValue != "undefined" && JSON.parse(cachedValue) || defaultValue));

    const setValueWithCache = (value) => {
        setValue(value);
        value && localStorage.setItem(cacheId, JSON.stringify(value));
    }

    return [value, setValueWithCache];
}
