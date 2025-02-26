import axios from "axios";
import {getToken} from "./TokenService";

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
    async patchApiCall(url:string,data:any){
        const token = await getToken()
        try {
            return await this.api.patch(url,data,{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
        }catch (err){
            return err;
        }
    }
    async deleteApiCall(url:string,id:string){
        const token = await getToken()
        try {
            return await this.api.delete(url,{
                params : {
                    id : id
                },
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
        }catch (err){
            return err;
        }
    }
    async getApiCall(url:string,data:string){
        const token = await getToken()
        try {
            return await this.api.get(url,{
                params:{
                    email : data
                },
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });
        }catch (err) {
            return err;
        }
    }
    async postApiCallWithToken(url:string,data:any){
        const token = await getToken()
        try {
            return await this.api.post(url,data,{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });
        }catch (err){
            return err;
        }
    }

}
const Api_call = new ApiCall();
export default Api_call;