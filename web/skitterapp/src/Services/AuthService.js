let AuthService = {
    isAuthenticated: function(callback) {
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
                if(callback) {callback(false)} ;
                throw new Error("erro");
            }
        })
        .then((data) => {
            localStorage.setItem("userInfo", JSON.stringify(data));
            if(callback) {
                callback(true);
            }
        })
        .catch((error) => {  return error; });
    }
}

export default AuthService
