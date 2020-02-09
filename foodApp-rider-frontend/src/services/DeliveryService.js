import axios from 'axios';

class DeliveryService{

    listDeliveriesByRiderId() {
        return new Promise(resolve => {
            axios({
                method: 'get',
                url: 'http://localhost:8080/deliver/'+localStorage.getItem("uid"),
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

export default new DeliveryService();