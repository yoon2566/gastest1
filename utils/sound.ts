
class SoundManager {
  private ctx: AudioContext | null = null;
  private bgmOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];
  private isBgmPlaying: boolean = false;
  private currentBgmMode: 'intro' | 'game' | null = null;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Chiptune BGM Generator
  playBGM(mode: 'intro' | 'game') {
    this.init();
    if (this.currentBgmMode === mode && this.isBgmPlaying) return;
    this.stopBGM();
    
    this.currentBgmMode = mode;
    this.isBgmPlaying = true;
    const now = this.ctx!.currentTime;

    if (mode === 'intro') {
      // Tense, mysterious bass loop
      this.createLoop([110, 110, 123.47, 110], 0.5, 'sawtooth', 0.03); // A2, A2, B2, A2
      this.createLoop([220, 0, 246.94, 0], 0.5, 'square', 0.01); 
    } else {
      // Upbeat, adventurous melody loop
      this.createLoop([261.63, 329.63, 392.00, 523.25], 0.25, 'triangle', 0.04); // C4, E4, G4, C5
      this.createLoop([130.81, 130.81, 164.81, 196.00], 0.5, 'square', 0.02); // Bassline
    }
  }

  stopBGM() {
    this.bgmOscillators.forEach(obj => {
      try {
        obj.osc.stop();
        obj.osc.disconnect();
      } catch (e) {}
    });
    this.bgmOscillators = [];
    this.isBgmPlaying = false;
  }

  private createLoop(freqs: number[], interval: number, type: OscillatorType, volume: number) {
    const playTick = (index: number) => {
      if (!this.isBgmPlaying || !this.ctx) return;
      
      const freq = freqs[index % freqs.length];
      if (freq > 0) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        gain.gain.setValueAtTime(volume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + interval * 0.9);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start();
        osc.stop(this.ctx.currentTime + interval * 0.9);
      }

      setTimeout(() => playTick(index + 1), interval * 1000);
    };
    
    playTick(0);
  }

  playClick() {
    this.init();
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx!.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx!.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, this.ctx!.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx!.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(this.ctx!.destination);
    osc.start();
    osc.stop(this.ctx!.currentTime + 0.1);
  }

  playSuccess() {
    this.init();
    const now = this.ctx!.currentTime;
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.1);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx!.destination);
    osc.start();
    osc.stop(now + 0.3);
  }

  playError() {
    this.init();
    const now = this.ctx!.currentTime;
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(100, now + 0.2);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx!.destination);
    osc.start();
    osc.stop(now + 0.2);
  }

  playFanfare() {
    this.init();
    const now = this.ctx!.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.1);
      gain.gain.setValueAtTime(0.1, now + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.4);
    });
  }
}

export const sounds = new SoundManager();
