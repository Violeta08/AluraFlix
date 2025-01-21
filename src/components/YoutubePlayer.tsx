import React from 'react';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReactPlayer from 'react-player';

interface YouTubePlayerProps {
  videoUrl: string;
  onClose: () => void;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoUrl, onClose }) => {
  return (
    <Box sx={{ position: 'relative', padding: '16px' }}>
      {/* Botón para cerrar el popup */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
        }}
      >
        <CloseIcon />
      </IconButton>
      {/* Reproductor de YouTube */}
      <ReactPlayer 
        url={videoUrl}  
        playing={true} // Reproducir automáticamente
        controls // Mostrar controles
        width="100%" // Ocupa todo el ancho del popup
        height="500px" // Ocupa todo el alto del popup
     />
    </Box>
  );
};

export default YouTubePlayer;
