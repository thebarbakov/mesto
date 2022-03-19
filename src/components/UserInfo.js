class UserInfo{
    constructor({selectorName, selectorJob}) {
        this._selectorName = selectorName
        this._selectorJob = selectorJob
    }

    getUserInfo(){
        this._userInfo = {};
        this._userInfo = {
            profileName: document.querySelector(this._selectorName).textContent,
            profileJob: document.querySelector(this._selectorJob).textContent
        }
        return this._userInfo;
    }

    setUserInfo({profileName, profileJob}){
        document.querySelector(this._selectorName).textContent = profileName
        document.querySelector(this._selectorJob).textContent = profileJob
    }
}

export {UserInfo}