import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Google } from '@mui/icons-material'
import {Link as RouterLink} from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailPassword } from '../../store/auth'



const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [(value)=>value.includes('@'), 'El correo no es valido'],
  password: [(value)=>value.length>=6, 'El password debe tener 6 o mas caracteres'],
  displayName: [(value)=>value.length>=4, 'El nombre debe teer 4 letras mínimo']
}


export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted]= useState(false);
  
  const {status, errorMessage} = useSelector(state=>state.auth);

  const isCheckingAuthentication = useMemo(()=> status === 'checking', [status]);


  const {
    displayName, email, password, onInputChange, formState, isFormValid, displayNameValid ,emailValid, passwordValid
  }=useForm(formData, formValidations);

  // console.log(displayNameValid)

  const onSubmit =(event)=>{
    event.preventDefault()
    console.log(formState)
    setFormSubmitted(true)
    
    if(!isFormValid) return;
    // displayNameIsValid() 
    dispatch(startCreatingUserWithEmailPassword(formState));

    
  }
    // const displayNameIsValid = ()=>displayName.length>=4 ? true : false;
    // console.log(['DISPLAYNAME'], displayNameIsValid)
  
    
  
  


  



  // const [nameValids, setNameValid] = useState(false);
  // useEffect(()=>{
  //   console.log({Valid})
  //   if(displayName.length>=6){
  //     setNameValid(true)
  //   }else{
  //     setNameValid(false)
  //   }
  //   console.log(displayName.length)
  //   console.log(nameValids)
  // }, [onInputChange])
  

  return (
    <AuthLayout title='Register'>
        <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
          <Grid container direction={'column'} >
            <Grid item xs={12} md={6} sx={{mt: 2}}>
              <TextField 
                label='Name' 
                type='text' 
                placeholder='ej: Leonardo Collado'
                fullWidth 
                name='displayName'
                value={displayName}
                onChange={onInputChange}
                error={ !!displayNameValid && formSubmitted}
                helperText={formSubmitted ? displayNameValid : '' }
            />

            {/* {!nameValids ? <h6 className='errorColor'>El nombre debe tener 6 o mas caracteres</h6>: ''} */}
            {/* {!displayNameIsValid ? <h6 className='errorColor'>El nombre debe tener 4 o mas caracteres</h6>: ''} */}
            </Grid>
            <Grid item xs={12} md={6} sx={{mt: 2}}>
              <TextField 
                label='Email' 
                type='email' 
                placeholder='correo@e-mail.com'
                fullWidth 
                name='email' 
                value={email}
                onChange={onInputChange}
                error={ !!emailValid && formSubmitted}
                helperText={formSubmitted ? emailValid : ''}
            />
            </Grid>

            <Grid item xs={12} md={6} sx={{mt: 2}}>
              <TextField 
                label='Password' 
                type='password' 
                placeholder='******'
                fullWidth 
                name='password'
                value={password}
                onChange={onInputChange}
                error={ !!passwordValid && formSubmitted}
                helperText={ formSubmitted ? passwordValid : ''}
            />
            </Grid>

              <Grid container spacing= { 2 } alignItems='center' justifyContent={'center'} sx={{mb: 2, mt: 0}} >
                <Grid 
                  item   
                  xs={12} 
                  md={6}
                  display={!!errorMessage ? '' : 'none'}
                >
                  <Alert severity='error'>{errorMessage}
                  
                  </Alert> 
                </Grid>
                
                <Grid item   xs={12}   sm={6} md={6}>
                  <Button 
                    disabled={isCheckingAuthentication}
                    variant='contained' 
                    fullWidth
                    type='submit'
                  >
                    Register
                  </Button>
                </Grid>
                <Grid item    xs={12}   sm={6} md={6}>
                  
                    <Link 
                      component={RouterLink}
                      sx={{ml: 1}} color='white'
                      underline='none'
                      to='/auth/login'
                    >
                      <Button variant='contained' sx={{backgroundColor: '#E23C2E'}} fullWidth >
                        Login
                      </Button>
                    </Link>
                </Grid>

              </Grid>
              {/* <Grid container direction='row' justifyContent={'end'}>
                <Typography sx={{mr: 1}}>¿Ya tienes cuenta?</Typography>
                <Link component={RouterLink} color='inherit' to='/auth/register'>
                  INGRESAR
                </Link>
                
              </Grid> */}
          </Grid>
        </form>
    </AuthLayout>


  )
}
