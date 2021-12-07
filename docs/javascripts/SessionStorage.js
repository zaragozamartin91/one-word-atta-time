const SESSION_KEY = "oneWordAttaTime"
const CONFIG_KEY = "oneWordAttaTimeConfig"

export default class SessionStorage {
    storeNumber(key, num) {
        sessionStorage.setItem(key, num)
    }

    readInt(key) {
        const snum = sessionStorage.getItem(key)
        return Number.parseInt(snum)
    }

    storeObject(key, obj) {
        const json = JSON.stringify(obj)
        sessionStorage.setItem(key, json)
    }

    readObject(key) {
        const obj = sessionStorage.getItem(key)
        return JSON.parse(obj)
    }

    storeAppSession(obj) {
        this.storeObject(SESSION_KEY, obj)
    }

    readAppSession() {
        return this.readObject(SESSION_KEY)
    }

    storeAppConfig(obj) {
        this.storeObject(CONFIG_KEY, obj)
    }

    readAppConfig() {
        return this.readObject(CONFIG_KEY)
    }
}