class UserInfo{
    constructor({selectorName, selectorJob, selectorAvatar}) {
        this._name = document.querySelector(selectorName)
        this._job = document.querySelector(selectorJob)
        this._avatar = document.querySelector(selectorAvatar)
    }

    getUserInfo(){
        this._userInfo = {};
        this._userInfo = {
            profileName: this._name.textContent,
            profileJob: this._job.textContent,
            profileAvatar: this._avatar.getAttribute('src')
        }
        return this._userInfo;
    }

    setUserAvatar({avatar}) {
        this._avatar.setAttribute('src', avatar)
    }

    setUserInfo({name, about}){
        this._name.textContent = name
        this._job.textContent = about
    }
}

export {UserInfo}