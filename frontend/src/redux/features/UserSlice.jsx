import { createSlice } from "@reduxjs/toolkit";
let initialState = {
    user: null,
    isAuthenticated: false,
    loading: true,
}
export let userSlice = createSlice({
    initialState,
    name: "userSlice",
    reducers: {
        setUser(state, action) {
         state.user =  action.payload
        },
        setIsAuthenticated(state, action) {
         state.isAuthenticated =  action.payload
        },
         setLoding(state, action) {
         state.loading =  action.payload
        }
    }

})
export default userSlice.reducer;
export let {setIsAuthenticated,setUser,setLoding} = userSlice.actions