import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

export class VideoService {
  constructor(private ffmpeg = createFFmpeg({ log: true })) {}

  get isLoaded(): boolean {
    return this.ffmpeg.isLoaded();
  }

  public async load() {
    await this.ffmpeg.load();
  }
}
