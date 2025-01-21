import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VideoData {
  id?: number | undefined;
  title: string;
  category: string;
  imageUrl: string;
  videoUrl: string;
  description: string;
}

interface VideoState {
  videos: VideoData[];
  videoToEdit: VideoData | null;
}

const initialState: VideoState = {
  videos: [],
  videoToEdit: null,
};

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    addVideo: (state, action: PayloadAction<VideoData>) => {
      state.videos.push({ ...action.payload, id: Date.now() });
    },
    updateVideo: (state, action: PayloadAction<VideoData>) => {
      state.videos = state.videos.map((video) =>
        video.id === action.payload.id ? action.payload : video
      );
    },
    deleteVideo: (state, action: PayloadAction<number>) => {
      state.videos = state.videos.filter((video) => video.id !== action.payload);
    },
    setVideoToEdit: (state, action: PayloadAction<VideoData | null>) => {
      state.videoToEdit = action.payload;
    },
  },
});

export const { addVideo, updateVideo, deleteVideo, setVideoToEdit } = videoSlice.actions;

export default videoSlice.reducer;
