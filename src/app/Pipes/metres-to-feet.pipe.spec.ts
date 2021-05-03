import { MetresToFeetPipe } from './metres-to-feet.pipe';

describe('MetresToFeetPipe', () => {
  it('create an instance', () => {
    const pipe = new MetresToFeetPipe();
    expect(pipe).toBeTruthy();
  });
});
