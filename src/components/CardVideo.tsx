import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import YouTubePlayer from './YoutubePlayer';

interface CardVideoProps {
  video: {
    id?: any;
    title: string;
    videoUrl: string;
    category: string;
    imageUrl: string;
    description: string;
  };
  onEdit: (video: any) => void;
  onDelete: (id: number) => void;
}

const CardVideo: React.FC<CardVideoProps> = ({ video, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false); // Estado para abrir/cerrar el popup del video
  const [videoUrl, setVideoUrl] = useState(''); // URL del video
  const [confirmOpen, setConfirmOpen] = useState(false); // Estado para el diálogo de confirmación

  const handleCardClick = (urlVideo: string) => {
    setVideoUrl(urlVideo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setVideoUrl('');
  };

  const handleConfirmOpen = () => {
    setConfirmOpen(true); // Abre el diálogo de confirmación
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false); // Cierra el diálogo de confirmación
  };

  const handleDelete = () => {
    onDelete(video.id!); // Llama a la función onDelete con el ID del video
    handleConfirmClose(); // Cierra el diálogo
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          margin: 2,
          position: 'relative',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0px 0px 26px rgb(0 0 0)',
        }}
      >
        {/* Encabezado con imagen */}
        <Box
          onClick={() => handleCardClick(video.videoUrl)}
          sx={{
            cursor: 'pointer',
            position: 'relative',
            height: '180px',
            backgroundImage: `url(${video.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Typography
            sx={{
              position: 'absolute',
              bottom: 10,
              left: 10,
              color: '#fff',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: '5px 10px',
              borderRadius: '5px',
            }}
            variant="body2"
          >
            {video.category}
          </Typography>
        </Box>
        <Box
          onClick={() => handleCardClick(video.videoUrl)}
          sx={{
            position: 'absolute',
            top: '29%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#fff',
            opacity: 0.8,
            '&:hover': {
              opacity: 1,
            },
            cursor: 'pointer',
          }}
        >
          <PlayCircleOutlineIcon sx={{ fontSize: 60 }} />
        </Box>
        {/* Contenido de la tarjeta */}
        <CardContent>
          <Tooltip title={video.title} arrow>
            <Typography variant="h6" gutterBottom>
              {video.title.slice(0, 30)}
              {video.title.length > 30 ? '...' : ''}
            </Typography>
          </Tooltip>
          <Tooltip title={video.description} arrow>
            <Typography variant="body2" color="text.secondary">
              {video.description.slice(0, 80)}
              {video.description.length > 80 ? '...' : ''}
            </Typography>
          </Tooltip>
        </CardContent>

        {/* Acciones (botones) */}
        <CardActions
          sx={{
            justifyContent: 'space-between',
            borderTop: '1px solid #e0e0e0',
            padding: '10px 16px',
          }}
        >
          <Button
            size="small"
            sx={{
              color: 'rgb(4, 12, 42)',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: 'rgb(4 12 42 / 30%)' },
            }}
            onClick={() => onEdit(video)}
          >
            Editar
          </Button>
          <Button
            size="small"
            sx={{
              color: '#F44336',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: 'rgb(244 67 54 / 30%)' },
            }}
            onClick={handleConfirmOpen} // Abre el cuadro de confirmación
          >
            Eliminar
          </Button>
        </CardActions>
      </Card>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <YouTubePlayer videoUrl={videoUrl} onClose={handleClose} />
      </Dialog>
      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>¿Estás seguro?</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar el video "<strong>{video.title}</strong>"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CardVideo;
