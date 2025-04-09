
import axios from "axios"


export const commonApi = async ( method,url,data,headers) => {
    const requstConfig = {
        method ,
        url ,
        data ,
        headers:headers?headers:{"Content-Type":"application/json"}

    }
    try {
        const result = await axios(requstConfig)
        return result
    } catch (error) {
        return error

    }

}