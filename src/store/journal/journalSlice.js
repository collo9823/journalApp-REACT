import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
        name: 'journal',
        initialState: {
            isSaving: false,
            savedMessage: '',
            notes: [],
            active: null,
            // active: {
            //     id: 'ABC123',
            //     title: '',
            //     body: '',
            //     date: 1234567,
            //     imgURL: [], //https://foto1.jpg, https://foto2.jpg, https://foto3.jpg

            // }
    },
    reducers: {
        savingNewNote:(state)=>{
            state.isSaving = true
        },
        addNewEmptyNote: (state,  action ) => {
            state.notes.push(action.payload);
            // state.notes = [(action.payload), ...state.notes ];

            state.isSaving = false;
        },
        setActiveNote: (state, action)=>{
            state.active = action.payload;
            state.savedMessage = '';
        },
        setNotes: (state, action)=>{
            state.notes = action.payload
        },
        setSaving: (state)=>{
            state.isSaving = true;
            state.savedMessage = '';
        },
        updateNote: (state, action)=>{
            state.isSaving = false;
            state.notes = state.notes.map(note=>{
                if(note.id === action.payload.id){
                    return action.payload;
                }
                
                return note
            })

            state.savedMessage = `${action.payload.title}, actualizada correctamente`
        },

        setPhotosToActiveNote: (state, action)=>{
            state.active.imgURL = [...(state.active.imgURL?.length ? state.active.imgURL : []), ...action.payload];
            state.isSaving = false;
        },
        clearNotesLogout: (state)=>{
            state.isSaving = false;
            state.savedMessage = '';
            state.notes = [];
            state.active = null;



        }
        ,
        deleteNoteById: (state, action)=>{
            state.active = null;
            state.notes = state.notes.filter(note=>note.id!== action.payload);
            console.log(action)
        }
    }
});


export const { 
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
 } = journalSlice.actions;