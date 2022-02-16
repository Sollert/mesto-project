export default class UserInfo {
    constructor(nameSelector, statusSelector, avatarSelector) {
        this._name = document.querySelector(nameSelector)
        this._status = document.querySelector(statusSelector)
        this._avatar = document.querySelector(avatarSelector)
    }

    getUserId() {
        return this.id
    }

    getUserInfo() {
        return {
            userName: this._name.textContent,
            userStatus: this._status.textContent,
            userAvatar: this._avatar.src
        }
    }

    setUserInfo(data) {
        this._name.textContent = data.name
        this._status.textContent = data.about
        this._avatar.src = data.avatar
    }
}