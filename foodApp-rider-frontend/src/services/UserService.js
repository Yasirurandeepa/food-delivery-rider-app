import axios from "axios";

class UserService {

    loadUserDetails(){
        return new Promise(resolve => {
            axios({
                method: 'get',
                url: 'http://localhost:8080/rider/'+localStorage.getItem("uid"),
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": localStorage.getItem("jwtToken")
                }
            }).then(
                resolve
            )
        })
    }
}

export default new UserService();