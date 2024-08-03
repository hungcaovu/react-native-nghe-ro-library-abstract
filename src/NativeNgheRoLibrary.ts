import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
export interface Spec extends TurboModule {
  multiply(a: number, b: number): Promise<number>;
  testGetCurrentDbSPL(): Promise<number>;
  testStart(): Promise<number>;
  testStop(): Promise<number>;
  testPlay(freq: number, db: number, rightEar: boolean): Promise<number>;
  testHear(): Promise<number>;
  testUnhear(): void;
  hearInit(): void;
  hearDetroy(): void;
  hearStart(): Promise<number>;
  hearStop(): void;
  hearIsStart(): Promise<boolean>;
  hearSetProfile(
    freqIndex: number,
    rightEar: boolean,
    hearLevelDbSPL: number
  ): void;
  hearGetProfile(freqIndex: number, rightEar: boolean): Promise<number>;
  hearSetDenoise(denoise: boolean): void;
  hearGetDenoise(): Promise<boolean>;
  hearSetBoost(dbLevel: number): void;
  hearGetBoost(): Promise<number>;
  hearSetInput(input: number): void;
  hearGetInput(): Promise<number>;
  hearSetEarProtection(val: boolean): void;
  hearGetEarProtection(): Promise<boolean>;
  hearSetAutoEqualizer(val: number): void;
  hearGetAudioEqualizer(): Promise<boolean>;
  hearSetEqualizerBass(db: number): void;
  hearGetEqualizerBass(): Promise<number>;
  hearSetEqualizeMid(db: number): void;
  hearGetEqualizerMid(): Promise<number>;
  hearSetEqualizeTreble(db: number): void;
  hearGetEqualizerTreble(): Promise<number>;
  hearSetAutoBalance(val: boolean): void;
  hearGetAutoBalance(): Promise<boolean>;
  hearSetEarBalance(balance: number): void;
  hearGetEarBalance(): Promise<number>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NgheRoLibrary');
