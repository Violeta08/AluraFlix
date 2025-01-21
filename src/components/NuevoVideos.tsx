import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Modal,
  Snackbar,
  Alert,
} from '@mui/material';
import { VideoData } from '../App';

const NuevoVideo: React.FC<NuevoVideoProps> = ({ videoToEdit, onSave, open, onClose }) => {
  const [videoData, setVideoData] = useState<VideoData>({
    id: undefined,
    title: '',
    category: '',
    imageUrl: '',
    videoUrl: '',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (open) {
      if (videoToEdit) {
        setVideoData(videoToEdit);
      } else {
        setVideoData({
          id: undefined,
          title: '',
          category: '',
          imageUrl: '',
          videoUrl: '',
          description: '',
        });
      }
      setErrors({});
    }
  }, [open, videoToEdit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVideoData((prev: any) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSelectChange = (e: any) => {
    const { value } = e.target;
    setVideoData((prev: any) => ({ ...prev, category: value as string }));
    setErrors((prev) => ({ ...prev, category: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!videoData.title) newErrors.title = 'El título es requerido.';
    if (!videoData.category) newErrors.category = 'La categoría es requerida.';
    if (!videoData.imageUrl) newErrors.imageUrl = 'El enlace de la imagen es requerido.';
    if (!videoData.videoUrl) newErrors.videoUrl = 'El enlace del video es requerido.';
    if (!videoData.description) newErrors.description = 'La descripción es requerida.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave(videoData);
      setSnackbarOpen(true);
      onClose();
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: 300, sm: 400 },
            bgcolor: '#000000', // Fondo negro
            borderRadius: '10px',
            boxShadow: '0px 4px 20px rgba(255, 255, 255, 0.2)', // Sombra blanca
            p: 4,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ color: '#FFFFFF' }}>
            {videoToEdit ? 'Editar Video' : 'Nuevo Video'}
          </Typography>
          <Box component="form" autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Título"
              name="title"
              value={videoData.title}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.title}
              helperText={errors.title}
              InputProps={{
                style: { backgroundColor: '#FFFFFF', color: '#000000' }, // Fondo blanco, texto negro
              }}
              InputLabelProps={{
                style: { color: '#FFFFFF' }, // Color de etiqueta
              }}
            />
            <FormControl fullWidth error={!!errors.category}>
              <InputLabel sx={{ color: '#FFFFFF' }}>Categoría</InputLabel>
              <Select
                name="category"
                value={videoData.category}
                onChange={handleSelectChange}
                label="Categoría"
                sx={{
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                }}
              >
                {['Frontend', 'Backend', 'Innovación'].map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
              {errors.category && (
                <Typography variant="caption" color="error">
                  {errors.category}
                </Typography>
              )}
            </FormControl>
            <TextField
              label="Enlace de la Imagen"
              name="imageUrl"
              value={videoData.imageUrl}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.imageUrl}
              helperText={errors.imageUrl}
              InputProps={{
                style: { backgroundColor: '#FFFFFF', color: '#000000' },
              }}
              InputLabelProps={{
                style: { color: '#FFFFFF' },
              }}
            />
            <TextField
              label="Enlace del Video"
              name="videoUrl"
              value={videoData.videoUrl}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.videoUrl}
              helperText={errors.videoUrl}
              InputProps={{
                style: { backgroundColor: '#FFFFFF', color: '#000000' },
              }}
              InputLabelProps={{
                style: { color: '#FFFFFF' },
              }}
            />
            <TextField
              label="Descripción"
              name="description"
              value={videoData.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description}
              InputProps={{
                style: { backgroundColor: '#FFFFFF', color: '#000000' },
              }}
              InputLabelProps={{
                style: { color: '#FFFFFF' },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                {videoToEdit ? 'Actualizar' : 'Guardar'}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setErrors({});
                  onClose();
                }}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Guardado exitosamente.
        </Alert>
      </Snackbar>
    </>
  );
};

export default NuevoVideo;
