import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const theme = createTheme();

const FormComponent = () => {

    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({ mode: 'onChange' });

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(prevState => !prevState);
    };

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                toast.success('Form Submitted Successfully');
            } else {
                toast.error('Failed to submit form');
            }
        } catch (error) {
            toast.error('Failed to submit form');
            console.error(error);
        }
    };

    const handleSelectChange = selectedOption => {
        setValue('selectField', selectedOption);
    };

    const password = watch('password'); // Get the value of the 'password' field

    return (
        <ThemeProvider theme={theme}>
            <Typography variant="h6" component="h1" align="center" gutterBottom>
                Form Example
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={8}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            {...register('name', { required: true })}
                            fullWidth
                            error={Boolean(errors.name)}
                            helperText={errors.name && 'Name is required.'}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            label="Mobile"
                            variant="outlined"
                            {...register('mobile', {
                                required: 'Mobile number is required',
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: 'Please enter a valid 10-digit mobile number'
                                }
                            })}
                            fullWidth
                            error={Boolean(errors.mobile)}
                            helperText={errors.mobile?.message}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                            fullWidth
                            error={Boolean(errors.email)}
                            helperText={errors.email && 'Please enter a valid email address.'}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            label="Password"
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', {
                                required: true,
                                pattern: /^(?=.*[0-9]{4})(?=.*[A-Z]{2})(?=.*[a-z]{2})(?=.*[@#$]).{8,}$/
                            })}
                            fullWidth
                            error={Boolean(errors.password)}
                            helperText={
                                errors.password && 'Should contain at least 1 special case character (like @#$), 4 numbers, 2 capital case letters and 2 small case letters.'
                            }
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleTogglePassword}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            label="Re-enter Password"
                            variant="outlined"
                            type="password"
                            {...register('reenterPassword', {
                                required: true,
                                validate: value => value === password
                            })}
                            fullWidth
                            error={Boolean(errors.reenterPassword)}
                            helperText={errors.reenterPassword && 'Passwords do not match.'}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <label>Select Field:</label>
                        <Select
                            options={[{ value: 'Female', label: 'Female' }, { value: 'Male', label: 'Male' }, { value: 'TransGender', label: 'TransGender' }]}
                            {...register('selectField', { required: 'This field is required' })}
                            onChange={handleSelectChange}
                        />
                        {errors.selectField && (
                            <span style={{ color: 'red' }}>{errors.selectField.message}</span>
                        )}
                    </Grid>
                    <Grid item xs={8}>
                        <Button type="submit" variant="contained" color="primary" align="center">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <ToastContainer />
        </ThemeProvider>
    );
};

export default FormComponent;
