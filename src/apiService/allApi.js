import { baseUrl } from "./baseurl"
import { commonApi } from "./commonApi"


export const login = async(body)=>{
    return await commonApi("POST",`${baseUrl}login`,body)
   

}
export const register=async(body)=>{
    return await commonApi("POST",`${baseUrl}register`,body)
}
export const getUserDetails=async(userId)=>{
    return await commonApi("GET",`${baseUrl}getUserDetails/${userId}`,"")
}
export const editUserDetails = async (userId, userData,headers) => {
    console.log(userData)
    console.log(userId)
    return await commonApi("PUT", `${baseUrl}editUserDetails/${userId}`, userData,headers);
}
export const addAds=async(UserId,data,headers)=>{
    console.log(data)
    console.log(UserId)
    return await commonApi("POST",`${baseUrl}addAds/${UserId}`,data,headers)
}
