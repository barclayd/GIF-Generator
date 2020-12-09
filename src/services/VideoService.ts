import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

export class VideoService {
  constructor(private ffmpeg = createFFmpeg({ log: true })) {}

  static videoURL(video: File): string {
    return URL.createObjectURL(video)
  }

  get isLoaded(): boolean {
    return this.ffmpeg.isLoaded();
  }

  private createURLForGIF(data: BlobPart): string {
    return URL.createObjectURL(new Blob([data]));
  }

  public async load() {
    await this.ffmpeg.load();
  }

  public async createGifURLForVideo(video: File): Promise<string> {
    const gif = await this.convertToGIF(video);
    return this.createURLForGIF(gif);
  }

  private async convertToGIF(video: File): Promise<BlobPart> {
    const VIDEO_FILE = 'video.mp4';
    const GIF_FILE = 'output.gif';

    this.ffmpeg.FS('writeFile', VIDEO_FILE, await fetchFile(video));
    await this.ffmpeg.run(
      '-i',
      VIDEO_FILE,
      '-t',
      '2.5',
      '-ss',
      '2.0',
      '-f',
      'gif',
      GIF_FILE,
    );
    return this.ffmpeg.FS('readFile', GIF_FILE);
  }
}
