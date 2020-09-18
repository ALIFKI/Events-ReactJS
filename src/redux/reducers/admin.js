const initialState = {
    isLoading : false,
    isError : false,
    errorMsg : '',
    events : [],
    totalEvents : 0
}


const admin = (state = initialState,action) =>{
    switch (action.type) {
        case "GET_EVEN_PENDING": 
            return {
            ...state,
            isloading : true,
        }
        case "GET_EVEN_REJECTED":
            return {
                ...state,
                isLoading : false,
                errorMsg : ''
        }
        case "GET_EVEN_FULFILLED" :
        return {
            ...state,
            isLoading : false,
            events : action.payload.data.data,
            totalEvents : action.payload.data.data.length
        }
        case "DELETE_EVEN_PENDING":
            return {
            ...state,
            isloading : true,
        }
        case "DELETE_EVEN_REJECTED":
            return {
                ...state,
                isLoading : false,
                errorMsg : ''
        }
        case "DELETE_EVEN_FULFILLED" :
            if(action.payload.data.success){

                console.log(action)
                var arr = state.books
                arr.splice(action.meta, 1);
                return {
                    ...state,
                    isLoading : false,
                    books : arr
                }
            }
            else{
                return {
                    ...state
                }
            }
        case "ADD_EVEN_PENDING": 
            return {
            ...state,
            isloading : true,
        }
        case "ADD_EVEN_REJECTED":
            return {
                ...state,
                isLoading : false,
                errorMsg : ''
        }
        case "ADD_EVEN_FULFILLED" :
            console.log(action.payload) 
        return {
            ...state,
            isLoading : false,
        }
        default:
            return{
                ...state
            }
    }
}

export default admin