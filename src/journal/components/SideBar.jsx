import { TurnedInNot } from '@mui/icons-material'
import { Drawer, Box, Toolbar, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, Grid, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { SideBarItem } from './SideBarItem';

export const SideBar = ({drawerWidth = 240}) => {
    const status = useSelector(state=>state.auth);
    // console.log(status)
    const {notes} = useSelector(state=>state.journal);
  return (
    <Box
      component='nav'
      sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
    >
        <Drawer
          variant='permanent' // temporary
          open
          sx={{
            display: {xs: 'block'},
            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}
          }}
        >
            <Toolbar>
                <Typography variant='h6' noWrap component='div'>
                    {status.displayName}
                </Typography>
            </Toolbar>
            <Divider/>

            <List>
                {
                    notes.map(note =>(
                        <SideBarItem {...note} key={note.id}/>
                    ))
                }
            </List>
        </Drawer>
    </Box>
  )
}
