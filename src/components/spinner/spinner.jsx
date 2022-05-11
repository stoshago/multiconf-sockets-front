import Box from '@mui/material/Box';

export const Spinner = () => {
    return (
        <Box
            sx={{
                textAlign: 'center',
            }}
        >
            <img src='/images/loading-ua-balls.svg' alt="spinner"></img>
        </Box>
    );
};
