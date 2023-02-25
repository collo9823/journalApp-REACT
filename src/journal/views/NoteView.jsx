import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo, useRef } from 'react'
import  Swal  from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'
import { ImageGallery } from '../components'
import {useForm} from '../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveNote, startDeletingNote, startSavingNote, startUploadingFiles } from '../../store/journal'

export const NoteView = () => {

    const dispatch = useDispatch();
    const state = useSelector(state=>state.journal);
    const {active: activeNote, savedMessage, isSaving} = state;
    const {title, body, onInputChange, formState, date} = useForm(activeNote)

    const imgPreset = activeNote.imgURL;
    // console.log(imgPreset);
    const dateString = useMemo(()=>{
        const newDate = new Date (date);
        return newDate.toUTCString();
    }, [date])

    const fileInputRef = useRef()
    useEffect(()=>{
        dispatch(setActiveNote(formState))
    }, [formState])

    useEffect(()=>{
        if(savedMessage.length>0){
            Swal.fire(
                // 'Nota actualizada', savedMessage, 'success'
                {
                    icon: 'success',
                    title: `${savedMessage}`,
                    showConfirmButton: false,
                    timer: 1500
                }
            )
        }
    }, [savedMessage])

    const onSaveNote=()=>{
        dispatch(startSavingNote())
    }

    // Recibe como argumentos las iágenes del <input type='file'>;
    const onFileInputChange = ({target})=>{
        if(target.files === 0) return;
        //Despacha el startUploadingFiles(thunks.js) enviandolé los argumentos(archivos)
        dispatch(startUploadingFiles(target.files))
        console.log(target.files)
        console.log('subiendo archivos')
    }
    const onDelete=()=>{
        dispatch(startDeletingNote())
    }

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{mb: 1}}
    className='animate__animated animate__fadeIn animate__faster'
    >
        <Grid item>
            <Typography fontSize={38} fontWeight='light'>{dateString}</Typography>
        </Grid>
        <Grid item>
            <input 
                //2- este input permite subir las imágenes, está oculto por el display: 'none'; Y cuando cambia llama a onFileInputChange enviandolé como argumentos los archivos subidos
                type="file"
                multiple
                onChange={onFileInputChange}
                style={{display: 'none'}}
                ref={fileInputRef}
            />
            <IconButton
                color='primary'
                disabled={isSaving}
                //1-el onClick hace referencia al fileInputRef del input de arriba
                onClick={()=>fileInputRef.current.click()}
            >
                <UploadOutlined/>
            </IconButton>
            <Button 
            disabled={isSaving}
            onClick={onSaveNote}
            className='box-shadow'
            color='primary'
            sx={{padding: 2, backgroundColor: '#477BF7', '&:hover': {background:'#3265D4'}}}>
                <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField
                type='text'
                variant='filled'
                fullWidth
                placeholder='Ingrese un título'
                label='Título'
                sx={{mb: 1, border: 'none'}}
                name='title'
                value={title}
                onChange={onInputChange}
            />
            <TextField
                type='text'
                variant='filled'
                fullWidth
                multiline
                placeholder='¿Que sucedió hoy?'
                minRows={3}
                name='body'
                value={body}
                onChange={onInputChange}
            />
        </Grid>
        <Grid
            container justifyContent='end'
        >
            <Button
                onClick={onDelete}
                sx={{mt:2}}
                color='error'
            >
                <DeleteOutline/>
                Borrar
            </Button>

        </Grid>
        
        <ImageGallery images={activeNote.imgURL}/>

    </Grid>
  )
}
