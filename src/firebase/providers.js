import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile,  } from "firebase/auth";
import { FirebaseApp, FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async ()=>{
    try{
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        // console.log({credetials})
        
        const user = result.user;
        console.log({user});

        const {displayName, email, photoURL, uid} = user;
        return {
            ok: true,
            //User info
            displayName, email, photoURL, uid
        }
    } catch(error){
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        return{
            ok: false,
            errorMessage,            
        }
    }
}


export const registerUserWithEmailPassword = async({ email, password, displayName })=>{
    try{
        console.log({email, password, displayName}, email)
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);

        const {uid, photoURL} = resp.user;
        
        //Actualizar el usuario y displayName en Firebase
        await updateProfile(FirebaseAuth.currentUser, {
           displayName: displayName, 
        });
        console.log(resp)
        // console.log(resp.user)
        // console.log(uid, photoURL)

        return{
            ok: true, 
            uid, photoURL, email, displayName,
        }

    }catch(error){
        // console.log(error)
        return {ok: false, errorMessage: error.message}
    }
}

export const loginWithEmailPassword = async ({email, password})=>{
    //La función de Firebasee se llama singInWithEmailPassword
    try{

        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        
        const {uid, photoURL, displayName} = resp.user;
        console.log(uid, photoURL, displayName, resp)
        return{
            ok: true, 
            uid, photoURL, email, displayName
        }
    }catch(error){
        return{ ok: false, errorMessage: error.message}
    }
}

export const logoutFirebase = async ()=>{
    return await FirebaseAuth.signOut();
}