// Web Audio API Procedural Handloom Loom Synthesizer
// Simulates the rhythmic wooden shuttle click, reed beat, and ambient meditative temple drone

class LoomSoundscape {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private droneOsc: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;

  public init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isPlaying = true;

    // Start gentle meditative tanpura low drone (C#2 ~ 69.3 Hz + harmonics)
    try {
      this.droneOsc = this.ctx.createOscillator();
      this.droneGain = this.ctx.createGain();

      this.droneOsc.type = 'sine';
      this.droneOsc.frequency.setValueAtTime(69.3, this.ctx.currentTime); // C#2

      this.droneGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.droneGain.gain.exponentialRampToValueAtTime(0.015, this.ctx.currentTime + 2);

      this.droneOsc.connect(this.droneGain);
      this.droneGain.connect(this.ctx.destination);
      this.droneOsc.start();
    } catch {
      // Audio context safeguard
    }

    // Schedule rhythmic loom clicks: Beat 1 (Wooden shuttle throw), Beat 2 (Reed beat & catch)
    let beat = 0;
    const intervalMs = 1100; // ~54 BPM meditative weaving cadence

    const triggerLoomBeat = () => {
      if (!this.isPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;

      if (beat % 2 === 0) {
        // Wooden shuttle click (Crisp hollow wood knock)
        this.playWoodKnock(now, 520, 0.08);
      } else {
        // Reed batten slide & latch (Warm organic tap)
        this.playWoodKnock(now, 380, 0.06);
      }

      beat++;
      this.timerId = window.setTimeout(triggerLoomBeat, intervalMs);
    };

    triggerLoomBeat();
  }

  private playWoodKnock(time: number, freq: number, duration: number) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq, time);
      filter.Q.setValueAtTime(3.5, time);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.6, time + duration);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.04, time + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + duration);
    } catch {
      // Silently catch audio nodes
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.droneGain && this.ctx) {
      try {
        this.droneGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          this.droneOsc?.stop();
          this.droneOsc?.disconnect();
          this.droneGain?.disconnect();
          this.droneOsc = null;
          this.droneGain = null;
        }, 500);
      } catch {
        // Cleanup
      }
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const loomAudio = new LoomSoundscape();
