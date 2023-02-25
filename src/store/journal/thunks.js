import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {  fileUpload, loadNotes } from "../../helpers";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById } from "./journalSlice";



export const startNewNote= ()=>{
    return async(dispatch, getState)=>{

        //dispatch 
        dispatch(savingNewNote())
        // console.log('startNewNote')
        // console.log(getState())
        const storesAuth = getState().auth;
        const storesJournal = getState().journal;
        const {uid} = storesAuth;
        // console.log(storesAuth);
        // console.log(uid);
        //uid

        const newNote = {
            title: '',
            body: '',
            imgURL: [],
            date: new Date().getTime(),

        }

        const newDoc = doc(collection( FirebaseDB, `${uid}/journal/notas`));
        // const setDocResp=await setDoc(newDoc, newNote);
        // console.log({newDoc, setDocResp})
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id
        // console.log(newNote, newDoc)


        //dispatch
        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))
        //dispatch(newNote)
        //dispatch(activeNote)
    }
}

export const startLoadingNotes = ()=>{
    return async(dispatch, getState)=>{
        const storesJournal = getState().journal;
        const {uid} = getState().auth;
        // console.log({uid})
        if(!uid) throw new Error('El UID del usuario no existe');

        // await loadNotes(uid);
        const notesCharge = await loadNotes(uid);
        dispatch(setNotes(notesCharge))
    }
}

export const startSavingNote = ()=>{
    return async (dispatch, getState)=>{
        dispatch(setSaving());

        const {uid}= getState().auth;
        const {active: activeNote} = getState().journal;

        const noteToFirestore = {...activeNote};
        delete noteToFirestore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notas/${activeNote.id}`)
        await setDoc(docRef, noteToFirestore, {merge: true});
        // console.log(noteToFirestore)
        // console.log(activeNote)

        dispatch(updateNote(activeNote))
    }
}

export const startUploadingFiles = (files=[])=>{
    return async(dispatch, getState)=>{
        //Despacha el setSaving(journalSilce.js) que cambia el state.isSaving=true;
        dispatch(setSaving());
        console.log(files)
        // await fileUpload(files[0])
        //Crea un array vacio y le introduce la función fileUpload(fileUpload.js) con cada archivo recibido por un for Of; el fileUpload recibe los archivos y los sube a la pág de cloudinary retornando así su URLimg
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        const photosURLS = await Promise.all(fileUploadPromises);
        // console.log(photosURLS)

        dispatch(setPhotosToActiveNote(photosURLS));
    }
}


export const startDeletingNote=()=>{
    return async(dispatch, getState)=>{
        const {uid} = getState().auth;
        const {active: activeNote}= getState().journal;
        // console.log({uid, activeNote})

        const docRef = doc(FirebaseDB, `${uid}/journal/notas/${activeNote.id}`);

        await deleteDoc(docRef);

        dispatch(deleteNoteById(activeNote.id))
    }
}
// export const activeNoteOk = (note)=>{
//     return async(dispatch, getState)=>{
//         const storesJournal = getState().journal;
        
//         const {notes} = storesJournal;
//         console.log(notes);
//         console.log(note);

//         const activateNote = await note;
//         dispatch(setActiveNote(activateNote))
        
//     }
// }