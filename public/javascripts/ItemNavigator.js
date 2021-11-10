export default class ItemNavigator {
    items = []
    index = 0

    constructor(items) {
        this.items = items
    }

    restart() {
        this.index = 0
    }

    get done() {
        return this.index >= this.items.length
    }

    get item() {
        return this.items[this.index]
    }

    next() {
        this.index = Math.min(this.items.length, this.index + 1)
        return this
    }

    previous() {
        this.index = Math.max(0, this.index - 1)
        return this
    }
}