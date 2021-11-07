export default class SessionStorage {
    storeNumber(key, num) {
        sessionStorage.setItem(key, num)
    }

    readInt(key) {
        const snum = sessionStorage.getItem(key)
        return Number.parseInt(snum)
    }

    storeArray(key, arr) {
        const json = JSON.stringify(arr)
        sessionStorage.setItem(key, json)
    }

    readArray(key) {
        const arr = sessionStorage.getItem(key)
        return JSON.parse(arr)
    }
}