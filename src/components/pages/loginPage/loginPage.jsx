import {useState} from 'react';
import {Box, Button, Container, Paper, TextField, Typography} from '@mui/material';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {LOGIN_FIELDS} from '../../../constants/login';
import {schemaLogin} from '../../../utills/schema';
import {Spinner} from '../../spinner';
import {useNavigate} from 'react-router-dom';
import AuthService from "../../../service/authService";

import './loginPage.css';

export const LogInPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const {
        register, handleSubmit, formState: {errors}, reset
    } = useForm({
        mode: 'onChange', resolver: yupResolver(schemaLogin),
    });

    const onSubmit = (data) => {
        setLoading(true);
        AuthService.authUser(data)
            .then(() => {
                navigate('/todos');
            })
            .catch(() => {
                setError("Invalid credentials! Try again...")
                setLoading(false);
                reset();
            });
    };

    const errorMessage = () => {
        return error ? (<p className='modalDescription errorMessage'>{error}</p>) : null;
    }

    return (<Container sx={{mt: 2, display: 'flex', flexDirection: 'column'}}>
            {isLoading ? (<Box>
                    <Spinner/>
                </Box>) : (<Box>
                    <Paper className="paper" elevation={3}>
                        <Box className='formWrapper'>
                            <p className='modalHeader'>Log In</p>
                            <p className='modalDescription'>Create your account to get full access</p>

                            {errorMessage()}

                            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                                {LOGIN_FIELDS.map(({type, label, registerValue}) => (<TextField
                                        className='textField'
                                        key={label}
                                        label={`Enter ${label}`}
                                        {...register(registerValue)}
                                        type={type}
                                        required
                                        error={!!errors[registerValue]}
                                        helperText={errors?.[registerValue]?.message}
                                    />))}
                                <Button variant={'contained'} type="submit">
                                    Log In
                                </Button>
                            </form>
                            <Typography className='modalDescription'>Don’t have an account?</Typography>
                            <Typography className='modalDescription link' onClick={() => navigate('/signup')}
                                        sx={{cursor: 'pointer'}}>
                                Sign Up here
                            </Typography>
                        </Box>
                    </Paper>
                </Box>)}
        </Container>);
};
