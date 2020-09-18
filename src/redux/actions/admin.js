import axios from 'axios';


export const getEvents = (data) =>{
    const { page,search,limit,sort,by,order } = data
    return {
        type : "GET_EVEN",
        payload : axios({
            method: 'GET',
            url : `${process.env.REACT_APP_URL_API}api/events?search=${search}&page=${page}&limit=${limit}&sort=${sort}&by=${by}&order=${order}`
        })
    }
}
export const addEvents = (data)=>{
    return {
        type : "ADD_EVEN",
        payload : 
        axios({
            method : 'POST',
            url : `${process.env.REACT_APP_URL_API}api/events`,
            data : data,
          })
    }

}
