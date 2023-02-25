import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";


export const loadNotes = async (uid = '')=>{
    if(!uid) throw new Error('El UID no existe');
    
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notas`);
    // console.log(collectionRef)

    
    const docs = await getDocs(collectionRef);
    
    const notesSinId = [];
    const notes = [];

    console.log(docs)
    docs.forEach(doc=>{
        notes.push({id: doc.id, ...doc.data()})
        // console.log([doc.data()])
        notesSinId.push(doc.data())
    })
    // console.log(notesSinId)
    // console.log(notes)
    return notes;

    // const docMap = docs['_docs'].map(async(docum) =>{
        
    //     console.log(docum.id)
    //     const docRef = doc(FirebaseDB, `${uid}/journal/notas/${docum.id}`);
    //     const document = await getDoc(docRef)
    //     console.log(document)
        
    // })

}