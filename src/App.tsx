import React, { useEffect, useState, Suspense } from 'react';
import './App.css';
import { VideoService } from './services/VideoService';

interface AppProps {}

const videoService = new VideoService();

function App({}: AppProps) {
  const [video, setVideo] = useState<File | undefined>(undefined);

  useEffect(() => {
    (async () => {
      await loadVideo();
    })();
  }, []);

  const loadVideo = async () => {
    if (!videoService.isLoaded) {
      await videoService.load();
    }
  };

  return (
    <Suspense fallback={<h3>Loading...</h3>}>
      <h3>Convert Video to GIF</h3>
      <input
        type="file"
        onChange={(e) => setVideo(e.target.files?.item(0) ?? undefined)}
      />
      {video && <video controls width="250" src={URL.createObjectURL(video)} />}
    </Suspense>
  );
}

export default App;
