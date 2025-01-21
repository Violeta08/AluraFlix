import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import NuevoVideo from './components/NuevoVideos';
import './index.css'
import videosData from './data/videoData';
import Footer from './components/Footer';

export interface VideoData {
  id?: number;
  title: string;
  category: string;
  imageUrl: string;
  videoUrl: string;
  description: string;
}

const LOCAL_STORAGE_KEY = 'videos';

const App: React.FC = () => {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [videoToEdit, setVideoToEdit] = useState<VideoData | null>(null);
  const [isNuevoVideoOpen, setIsNuevoVideoOpen] = useState(false);

 // Cargar los videos desde Local Storage o datos estáticos
 useEffect(() => {
  const storedVideos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  if (storedVideos.length > 0) {
    setVideos(storedVideos);
  } else {
    setVideos(videosData); // Cargar los videos desde el archivo estático
  }
}, []);


  // Guardar los videos en Local Storage cada vez que cambien
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(videos));
  }, [videos]);

  const addOrUpdateVideo = (video: VideoData) => {
    if (video.id) {
      // Actualizar video existente
      setVideos((prev) => prev.map((v) => (v.id === video.id ? video : v)));
    } else {
      // Agregar nuevo video
      setVideos((prev) => [...prev, { ...video, id: Date.now() }]);
    }
    setVideoToEdit(null);
    setIsNuevoVideoOpen(false);
  };

  const deleteVideo = (id: number) => {
    setVideos((prev) => prev.filter((video) => video.id !== id));
  };

  const openNuevoVideo = () => {
    setVideoToEdit(null);
    setIsNuevoVideoOpen(true);
  };

  const closeNuevoVideo = () => {
    setIsNuevoVideoOpen(false);
  };

  return (
      <Router>
        <Header onOpenNewVideo={openNuevoVideo} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                videos={videos}
                onEdit={(video) => {
                  setVideoToEdit(video);
                  setIsNuevoVideoOpen(true);
                }}
                onDelete={deleteVideo}
              />
            }
          />
        </Routes>
        <NuevoVideo
          videoToEdit={videoToEdit}
          onSave={addOrUpdateVideo}
          open={isNuevoVideoOpen}
          onClose={closeNuevoVideo}
        />
        <Footer />
      </Router>
  );
};

export default App;
