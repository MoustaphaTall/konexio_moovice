class LocalStorage {
    save(key, value) {
        const currentKeyContent = this.get(key) || [];
        const updatedKeyContent = [...currentKeyContent, value];

        if (currentKeyContent.includes(value)) {
            return;
        }

        return localStorage.setItem(key, JSON.stringify(updatedKeyContent));
    }

    get(key) {        
        return JSON.parse(localStorage.getItem(key));
    }
}

export default new LocalStorage();