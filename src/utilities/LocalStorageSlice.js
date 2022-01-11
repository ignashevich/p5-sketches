
export class LocalStorageSlice {

    constructor(key) {
        this.key = key;
    }

    set(id) {
        localStorage.setItem(this.key, id);
    }

    get() {
        return localStorage.getItem(this.key);
    }

}
