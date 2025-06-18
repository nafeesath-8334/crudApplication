import { baseUrl } from "./baseurl"
import { commonApi } from "./commonApi"


export const login = async (body) => {
    return await commonApi("POST", `${baseUrl}login`, body)
}
export const register = async (body) => {
    return await commonApi("POST", `${baseUrl}register`, body)
}
export const getUserDetails = async (userId) => {
    return await commonApi("GET", `${baseUrl}getUserDetails/${userId}`, "")
}
export const editUserDetails = async (userId, userData, headers) => {
    console.log(userData)
    console.log(userId)
    return await commonApi("PUT", `${baseUrl}editUserDetails/${userId}`, userData, headers);
}
export const addAds = async (data, headers) => {
    console.log(data)
    // console.log(UserId)
    return await commonApi("POST", `${baseUrl}addAds/`, data, headers)
}
export const getAllAds = async (body) => {
    return await commonApi("GET", `${baseUrl}getAllAds`, body)
}
export const getUserAds = async (userId) => {
    return await commonApi("GET", `${baseUrl}getAds/${userId}`, "")
}
export const getAdById = async (adId) => {
    return await commonApi("GET", `${baseUrl}getAdById/${adId}`, "")
}
export const updateAd = async (adId, data, headers) => {
    console.log(adId)
    console.log("data on updateAd", data)
    return await commonApi("PUT", `${baseUrl}updateAd/${adId}`, data, headers)
}
export const search = async (query) => {

    return await commonApi("GET", `${baseUrl}searchItem/${query}`, "")
}
export const searchLocation = async (query) => {

    return await commonApi("GET", `${baseUrl}searchLocation/${query}`, "")
}
export const getforgotpswd = async (data) => {

    console.log(data)
    return await commonApi("POST", `${baseUrl}forgotPassword/`, data);
}
export const deleteAd = async (adId, headers) => {
    return await commonApi("DELETE", `${baseUrl}deleteAd/${adId}`, {}, headers);
};
export const resetPassword = async (token, data) => {
    console.log("token", token)
    console.log("data", data)
    return await commonApi("POST", `${baseUrl}resetPassword/${token}`, data);
}

export const getUserFavorites = async (userId) => {
console.log("USERID",userId);

    return await commonApi("GET", `${baseUrl}getUserFavorites/${userId}`, "")
    
}
export const addToFavorites = async (body) => {
//   console.log("Sending favorite request with:", { userId, adId });

//   const body = { userId, adId };
  return await commonApi("POST", `${baseUrl}addToFavorites`, body, "");
};
export const removeFromFavorites = async (body) => {
    //  const { userId, adId } = body;
    // console.log("Sending favorite request with:", { userId, adId });
    return await commonApi("DELETE", `${baseUrl}removeFromFavorites`,body,"")
}
