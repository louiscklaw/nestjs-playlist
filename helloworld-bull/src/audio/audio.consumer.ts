import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueCompleted,
} from '@nestjs/bull';
import { Job } from 'bull';

function doSomething() {
  console.log('hello do something');
}

@Processor('audio')
export class AudioConsumer {
  @Process()
  async transcode(job: Job<unknown>) {
    console.log('transcode ...');
    let progress = 0;
    for (let i = 0; i < 100; i++) {
      await doSomething();
      progress += 1;
      await job.progress(progress);
    }
    return {};
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(`Processing job ...`);
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(`completed job `);
  }
}
