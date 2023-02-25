import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Google } from '@mui/icons-material'
import {Link as RouterLink} from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { checkingAuthentication, startGoogleSingIn, startLoginWithEmailPassword, } from '../../store/auth'
import { useMemo } from 'react'

const formData = {
  email: '',
  password: ''
  // email: 'collo9823@gmail.com',
  // password: '1234567'
}
export const LoginPage = () => {

  const dispatch = useDispatch();
  const {status, errorMessage} = useSelector((state)=>state.auth);
  console.log({status, errorMessage})
  // const storeee = useSelector((state)=>state.auth);
  // console.log({storeee})
  
  const isAuthenticating = useMemo(()=> status === 'checking', [status] ) 

  const {email, password, onInputChange, formState}=useForm(formData)

  // const {status, errorMessage} = useSelector(state=>state.auth)
  const onSubmitLog = (event)=>{
    event.preventDefault();
    console.log(formState, {email, password})
    //! No es la accion a despachar
    // dispatch(checkingAuthentication())

    // console.log(isFormValid)
    dispatch(startLoginWithEmailPassword(formState))
  }

  const onGoogleSingIn = ()=>{
    console.log('onGoogleSingIn')
    dispatch(startGoogleSingIn())
  }

  return (
    <AuthLayout title='Login'>

        <form onSubmit={(e)=>onSubmitLog(e)} className='animate__animated animate__fadeIn animate__faster'>
          <Grid container >
            <Grid item xs={12} md={6} sx={{mt: 2}}>
              <TextField label='Correo' type='email' placeholder='correo@e-mail.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
            />
            </Grid>

            <Grid item xs={12} md={6} sx={{mt: 2}}>
              <TextField label='Contraseña' type='password' placeholder='******'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
            />
            </Grid>

              <Grid container spacing= { 2 } alignItems='center' justifyContent={'center'} sx={{mb: 2, mt: 0}} >
                <Grid 
                  item   
                  xs={12}   
                  md={6}
                  display={!!errorMessage ? '' : 'none'}
                >
                  <Alert 
                    severity='error'
                  >
                    {errorMessage}
                  </Alert>
                </Grid>
                <Grid item   xs={12}   sm={6} md={6}>
                  <Button 
                    disabled={ isAuthenticating }
                    type='submit'
                    variant='contained' 
                    fullWidth 
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item    xs={12}   sm={6} md={6}>
                  <Button 
                    disabled={ isAuthenticating }
                    onClick={onGoogleSingIn} 
                    variant='contained' 
                    sx={{backgroundColor: '#E23C2E'}} 
                    fullWidth 
                  >
                    <Google/>
                    <Typography sx={{ml: 1}}>Google</Typography>
                  </Button>
                </Grid>

              </Grid>
              <Grid container direction='row' justifyContent={'end'}>
                <Link component={RouterLink} color='inherit' to='/auth/register'>
                  Crear una cuenta
                </Link>
                
              </Grid>
          </Grid>
        </form>
    </AuthLayout>


  )
}
