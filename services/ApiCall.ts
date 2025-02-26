import axios from "axios";

class ApiCall{
    base_url = 'http://192.168.8.158:3000/api/v1'
    api = axios.create({
        baseURL : this.base_url
    })
    async postApiCallWithOutToken(url:string,data:any){
        try {
            return await this.api.post(url,data);
        }catch (err){
            return err;
        }
    }
    async postApiCallWithToken(url:string,data:any){
        try {
            return await this.api.post(url,data);
        }catch (err){
            return err;
        }
    }

}
const Api_call = new ApiCall();
export default Api_call;