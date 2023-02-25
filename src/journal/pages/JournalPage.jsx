import { IconButton, Typography } from '@mui/material'
import { AddOutlined, MailOutline } from '@mui/icons-material'
import React, { useMemo } from 'react'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'
import { fontSize } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal'

export const JournalPage = () => {
  const dispatch = useDispatch()
  const state = useSelector(state=>state.auth);
  const {status, uid} = state;
  // console.log(state.uid, uid);

  const stateJournal = useSelector(state=>state.journal);
  const {isSaving, active} = stateJournal;
  const isSavingCheck = useMemo(() => isSaving == true, [isSaving])
  // console.log(active)
  const isActiveNote = useMemo(()=>active !== null, [active]);
  // console.log(isActiveNote)
  
  const onClickNewNote = ()=>{
    dispatch(startNewNote());
  }
  return (
    <JournalLayout>
        {/* <Typography >Incididunt cupidatat aliqua mollit id dolor aliqua culpa.</Typography> */}
        {
          isActiveNote 
          ? <NoteView/>
          : <NothingSelectedView/>
        }
        



        <IconButton
         disabled={isSavingCheck}
         onClick={onClickNewNote}
         size='large'
         sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': {backgroundColor: 'error.main', opacity: 0.9},
          position: 'fixed',
          right: 50,
          bottom: 50
         }}
        
        >
          <AddOutlined sx={{fontSize: 30}}/>
        </IconButton>
    </JournalLayout>
  )
}
