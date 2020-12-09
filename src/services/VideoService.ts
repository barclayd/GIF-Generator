import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

export class VideoService {
  constructor(private ffmpeg = createFFmpeg({ log: true })) {}

  public async load() {
    await this.ffmpeg.load();
  }
}
