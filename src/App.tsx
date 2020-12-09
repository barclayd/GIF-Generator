import React, { useEffect, useState } from 'react';
import './App.css';
import { VideoService } from './services/VideoService';

interface AppProps {}

const videoService = new VideoService();

function App({}: AppProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      await loadVideo();
    })();
  }, []);

  const loadVideo = async () => {
    await videoService.load();
    setReady(true);
  };

  return <></>;
}

export default App;
