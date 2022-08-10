import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

@Processor('audio')
export class AudioProcessor {
  private readonly logger = new Logger(AudioProcessor.name);

  @Process('transcode')
  async handleTranscode(job: Job) {
    console.log('Start transcoding...');
    console.log(job.data);

    for (let i = 0; i < 5; i++) {
      await delay(1 * 1000);

      console.log(`${JSON.stringify(job.data)} ${i}/5 done`);
    }

    console.log('Transcoding completed');
  }
}
