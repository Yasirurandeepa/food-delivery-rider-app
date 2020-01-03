import axios from "axios";
import {message} from "antd";

class AuthService {

    userSignIn(username, password){
        return new Promise(resolve => axios({
            method: 'post',
            url: 'http://localhost:8080/token/generate-token',
            data: {
                username: username,
                password: password
            },
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        }).then( (data) => {
            // localStorage.setItem("uid", data.data.result.id);
            // localStorage.setItem("username", data.data.result.username);
            // localStorage.setItem("jwtToken", "Bearer " + data.data.result.token);
            // message.success("You have successfully Logged In!!!");
            // localStorage.setItem("isUserLoggedIn", true);
            resolve(data);
        }));
    }

    isLoggedIn() {
        if(localStorage.getItem("uid")){
            return true;
        }else{
            return false;
        }
        // return localStorage.getItem("isUserLoggedIn");
    }

}

export default new AuthService();
