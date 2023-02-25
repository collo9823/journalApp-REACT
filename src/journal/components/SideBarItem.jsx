import { TurnedInNot } from '@mui/icons-material'
import { ListItem, Grid, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useMemo } from 'react'
import { setActiveNote } from '../../store/journal';
import { useDispatch, useSelector } from 'react-redux'

export const SideBarItem = ({title, body, imgURL = [], id, date}) => {
    // const {body, imgURL = [], title, id, date} = note;
    const newTitle = useMemo(() => {
        return title.length >17 
        ? title.substring(0,17) + '...'
        : title
    }, [title])
    
    
    const dispatch = useDispatch();

    const activeNote = (event)=>{
        event.preventDefault()
        const setActive = setActiveNote({title, body, imgURL, id, date});
        dispatch(setActive)
    }


  return (
    <ListItem disablePadding>
        <ListItemButton onClick={(event)=>activeNote(event)}>
            <ListItemIcon>
                <TurnedInNot/>
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={newTitle}/>
                <ListItemText secondary={body == '' ? 'Pariatur eu id commodo fugiat dolore adipisicing magna dolor veniam amet Lorem.': body}/>
            </Grid>
        </ListItemButton>
    </ListItem>

    )
}
