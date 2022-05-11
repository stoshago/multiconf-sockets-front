import React  from 'react';
import {Box} from '@mui/material';
import { Header } from '../header';
import './layout.css';


export const Layout = ({ children }) => (
  <Box
    sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <video className='video'  src='/videos/videoplayback.mp4' autoPlay loop muted/>
    <Box sx={{position: 'absolute', width: '100%'}}>
    <Header/>
      <Box
        sx={{
          width: '100%',
          flexGrow: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  </Box>
);
