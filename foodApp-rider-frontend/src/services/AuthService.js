class AuthService {

    isLoggedIn() {
        if(localStorage.getItem("uid")){
            return true
        }else{
            return false;
        }
    }

}

export default new AuthService();
