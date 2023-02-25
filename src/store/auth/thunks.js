import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers"
import { clearNotesLogout } from "../journal"
import { checkingCredentials, login, logout } from "./authSlice"


export const checkingAuthentication = (email, password) =>{
    return async( dispatch) =>{
        dispatch(checkingCredentials())
    }
}

export const startGoogleSingIn = ()=>{
    return async( dispatch)=>{
        dispatch(checkingCredentials())
        const result = await singInWithGoogle()
        console.log({result})
        console.log(result)

        if (!result.ok) return  dispatch(logout(result.errorMessage))


        dispatch(login(result))
        console.log(login(result))
    }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName})=>{
    return async(dispatch) =>{
        dispatch(checkingCredentials())
        // const result = await registerUserWithEmailPassword({email, password, displayName})
        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName});

        if(!ok) return dispatch(logout({errorMessage}))
        
        dispatch(login({uid, displayName, email, photoURL}));

        // console.log({result})
    }
}

export const startLoginWithEmailPassword = ({email, password})=>{
    return async(dispatch)=>{
        dispatch(checkingCredentials())

        const result = await loginWithEmailPassword({email, password})
        console.log(result)
        const {uid, displayName, photoURL, ok, errorMessage} = result;

        if(!ok) return dispatch(logout({errorMessage}));

        dispatch(login({ok, uid, displayName, email, photoURL}));
    }
}

export const startLogAuth = ()=>{
    return async (dispatch)=>{

        await logoutFirebase();
        dispatch(clearNotesLogout());
        dispatch(logout({}))
    }
}