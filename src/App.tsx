import React, { useEffect, useState, Suspense } from 'react';
import './App.css';
import { VideoService } from './services/VideoService';

interface AppProps {}

const videoService = new VideoService();

function App({}: AppProps) {
  const [video, setVideo] = useState<File | undefined>(undefined);
  const [gif, setGIF] = useState<string | undefined>(undefined);

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

  const onVideoChange = async (video: File | undefined | null) => {
    if (!video) {
      return;
    }
    setVideo(video);
    const gifURL = await videoService.createGifURLForVideo(video);
    setGIF(gifURL);
  };

  return (
    <Suspense fallback={<h3>Loading...</h3>}>
      <div className="video-container">
        <h1>Convert Video to GIF</h1>
        <h3>Upload a Video</h3>
        <input
          type="file"
          accept=".mp4"
          onChange={(e) => onVideoChange(e.target.files?.item(0))}
        />
        {video && (
          <video controls width="500" src={VideoService.videoURL(video)} />
        )}
        <h3>View your GIF</h3>
        {gif && (
          <img alt="Your uploaded video as a GIF" width="500" src={gif} />
        )}
      </div>
    </Suspense>
  );
}

export default App;
