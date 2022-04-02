class UserInfo{
    constructor({selectorName, selectorJob, selectorAvatar}) {
        this._selectorName = selectorName
        this._selectorJob = selectorJob
        this._selectorAvatar = selectorAvatar
    }

    getUserInfo(){
        this._userInfo = {};
        this._userInfo = {
            profileName: document.querySelector(this._selectorName).textContent,
            profileJob: document.querySelector(this._selectorJob).textContent,
            profileAvatar: document.querySelector(this._selectorAvatar).getAttribute('src')
        }
        return this._userInfo;
    }

    setUserAvatar({avatar}) {
        document.querySelector(this._selectorAvatar).setAttribute('src', avatar)
    }

    setUserInfo({name, about}){
        document.querySelector(this._selectorName).textContent = name
        document.querySelector(this._selectorJob).textContent = about
    }
}

export {UserInfo}