export default class UserInfo {
    constructor(nameSelector, statusSelector) {
        this._name = document.querySelector(nameSelector)
        this._status = document.querySelector(statusSelector)
    }

    getUserInfo() {
        return {
            userName: this._name.textContent,
            userStatus: this._status.textContent
        }
    }

    setUserInfo(data) {
        this._name = data.name
        this._status = data.about
    }
}