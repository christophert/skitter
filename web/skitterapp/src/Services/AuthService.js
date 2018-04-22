import React from 'react'

let AuthService = {
    isAuthenticated: function() {
        fetch('/auth/isAuthenticated', {
            method: 'GET',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
            }
        })
        .then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                localStorage.removeItem("userInfo");
                throw new Error("is not authenticated");
            }
        })
        .then((data) => {
            localStorage.setItem("userInfo", JSON.stringify(data));
            return true;
        })
        .catch((error) => { return error; });
    }
}

export default AuthService
