import axios from "axios"

export default async function fetchData() {
    try{
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/Appoinments`);
        return response.data;
    }catch(error){
        console.log(error);
        return [];
    }
}

