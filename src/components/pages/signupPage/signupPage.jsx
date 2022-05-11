import {Box, Button, Container, Paper, TextField, Typography} from '@mui/material';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {SIGNUP_FIELDS} from '../../../constants/signUp';
import {schemaSignUp} from '../../../utills/schema';
import {Spinner} from '../../spinner';
import {useNavigate} from 'react-router-dom';
import AuthService from "../../../service/authService";
import {useState} from "react";
import './signupPage.css';

export const SignUpPage = () => {

    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schemaSignUp),
    });

    const onSubmit = async (data) => {
        setLoading(true);
        AuthService.signUp(data)
            .then(() => {
                navigate('/todos')
            })
            .catch(err => {
                setError(err);
                setLoading(false);
                reset();
            })
    };

    const errorMessage = () => {
        return error ? (
            <p className='modalDescription errorMessage'>{error}</p>
        ) : null;
    }

    return (
        <Container sx={{mt: 2, display: 'flex', flexDirection: 'column'}}>
            {isLoading ? (
                <Box>
                    <Spinner/>
                </Box>
            ) : (
                <Box>
                    <Paper className='paper' elevation={3}>
                        <Box className='formWrapper'>
                            <p className='modalHeader'>Sign Up</p>
                            <p className='modalDescription'>Create your account to get full access</p>

                            {errorMessage()}

                            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                                {SIGNUP_FIELDS.map(({type, label, registerValue}) => (
                                    <TextField
                                        className='textField'
                                        key={label}
                                        label={`Enter ${label}`}
                                        {...register(registerValue)}
                                        type={type}
                                        required
                                        error={!!errors[registerValue]}
                                        helperText={errors?.[registerValue]?.message}
                                    />
                                ))}
                                <Button variant={'contained'} type="submit">
                                    Sign Up
                                </Button>
                                <Typography className='modalDescription'>Already have an account?</Typography>
                                <Typography className='modalDescription link' onClick={() => navigate('/')}
                                            sx={{cursor: 'pointer'}}>
                                    Login here
                                </Typography>
                            </form>
                        </Box>
                    </Paper>
                </Box>
            )}
        </Container>
    );
};
