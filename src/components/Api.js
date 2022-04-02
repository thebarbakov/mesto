class Api{
    constructor(config){
        this._urlRequest = config.urlRequest
        this._headers = config.headers
        this._loadingStart
        this._disableButton = config.disableButton
        this._enableButton = config.enableButton
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Error: ${res.status}`)
    }

    renderLoading(isLoading, validateForm){
        if(validateForm.buttonElement.textContent !== 'Сохранение...') {
            this._loadingStart = validateForm.buttonElement.textContent
        }
        if(isLoading){
            this._disableButton(validateForm)
            validateForm.disableSubmitButton()
            validateForm.buttonElement.textContent = 'Сохранение...'
        } else {
            this._enableButton(validateForm)
            validateForm.buttonElement.textContent = this._loadingStart
        }
      }

    getUserInfo(){
        return fetch(`${this._urlRequest}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then( res => this._checkResponse(res))
        .catch(rej => console.error((`Error: ${rej.status}`)))
    }

    getInitialCards(){
        return fetch(`${this._urlRequest}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        .then( res => this._checkResponse(res))
        .catch(rej => console.error((`Error: ${rej.status}`)))
        
    }

    getInitialInfo(){
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }

    setUserInfo(newUserInfo, validateForm){
        this.renderLoading(true, validateForm)
        return fetch(`${this._urlRequest}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(newUserInfo)
        })
        .then( res => {return this._checkResponse(res)})
        .catch(rej => console.error((`Error: ${rej.status}`)))
        .finally(this.renderLoading(false, validateForm))
    }

    setUserAvatar(newAvatar, validateForm){
        this.renderLoading(true, validateForm)
        return fetch(`${this._urlRequest}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(newAvatar)
        })
        .then( res => {return this._checkResponse(res)})
        .catch(rej => console.error((`Error: ${rej.status}`)))
        .finally(this.renderLoading(false, validateForm))
    }

    addCard(cardData, validateForm){
        this.renderLoading(true, validateForm)
        return fetch(`${this._urlRequest}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(cardData)
        })
        .then( res => {return this._checkResponse(res)})
        .catch(rej => console.error((`Error: ${rej.status}`)))
        .finally(this.renderLoading(false, validateForm))
    }

    deleteCard(cardId, validateForm){
        this.renderLoading(true, validateForm)
        return fetch(`${this._urlRequest}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
        })
        .then( res => {
            return this._checkResponse(res)
        })
        .catch(rej => console.error((`Error: ${rej.status}`)))
        .finally(this.renderLoading(false, validateForm))
    }

    setCardLike(cardId){
        return fetch(`${this._urlRequest}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
            })
            .then(res => {
                return this._checkResponse(res)
            })
            .catch(rej => console.error((`Error: ${rej.status}`)))
    }

    setRemoveLike(cardId){
        return fetch(`${this._urlRequest}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
            })
            .then(res => {
                return this._checkResponse(res)
            })
            .catch(rej => console.error((`Error: ${rej.status}`)))
    }
    
}

export {Api};