import { RootState } from '@/redux/store';
import { createSlice } from '@reduxjs/toolkit';


export type TUser = {
    _id:string
    username:string
    email:string
    userId:string
    role:string
    currentStep:string
    iat:number
    progressStatus:string
    exp:number
    certifications:object
    balance:number
    avatar?:string
}

type TAuthState = {
    user: TUser | null;
    token: string | null;
};

const initialState: TAuthState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            
            
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;

        },
    },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;


export const useToken = (state: RootState) => (state.auth as TAuthState).token;
export const currentUser = (state: RootState) => (state.auth as TAuthState).user;