import { NativeModules, Platform } from 'react-native';
import type { Callback } from './types';

const LINKING_ERROR =
  `The package 'react-native-nghe-ro-library' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const NgheRoLibraryModule = isTurboModuleEnabled
  ? require('./NativeNgheRoLibrary').default
  : NativeModules.NgheRoLibrary;

const NgheRoLibrary = NgheRoLibraryModule
  ? NgheRoLibraryModule
  : new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR);
      },
    }
  );

export function multiply(a: number, b: number): Promise<number> {
  return NgheRoLibrary.multiply(a, b);
}

export function testGetCurrentDbSPL(): Promise<number> {
  return NgheRoLibrary.testGetCurrentDbSPL();
}

export function testStart(): Promise<number> {
  return NgheRoLibrary.testStart();
}

export function testStop(): Promise<number> {
  return NgheRoLibrary.testStop();
}

export function testPlay(
  freq: number,
  db: number,
  rightEar: boolean
): Promise<number> {
  return NgheRoLibrary.testPlay(freq, db, rightEar);
}

export function testHear(): Promise<number> {
  return NgheRoLibrary.testHear();
}

export function testUnhear(): void {
  return NgheRoLibrary.testUnhear();
}

export function hearInit(): void {
  return NgheRoLibrary.hearInit();
}

export function hearDetroy(): void {
  return NgheRoLibrary.hearDetroy();
}

export function hearStart(): Promise<number> {
  return NgheRoLibrary.hearStart();
}

export function hearStop(): void {
  return NgheRoLibrary.hearStop();
}

export function hearIsStart(): Promise<boolean> {
  return NgheRoLibrary.hearIsStart();
}

export function hearSetProfile(
  freqIndex: number,
  rightEar: boolean,
  hearLevelDbSPL: number
): void {
  return NgheRoLibrary.hearSetProfile(freqIndex, rightEar, hearLevelDbSPL);
}
export function hearGetProfile(
  freqIndex: number,
  rightEar: boolean
): Promise<number> {
  return NgheRoLibrary.hearGetProfile(freqIndex, rightEar);
}
export function hearSetDenoise(denoise: boolean): void {
  return NgheRoLibrary.hearSetDenoise(denoise);
}
export function hearGetDenoise(): Promise<boolean> {
  return NgheRoLibrary.hearGetDenoise();
}
export function hearSetBoost(dbLevel: number): void {
  return NgheRoLibrary.hearSetBoost(dbLevel);
}
export function hearGetBoost(): Promise<number> {
  return NgheRoLibrary.hearGetBoost();
}
export function hearSetInput(input: number): void {
  return NgheRoLibrary.hearSetInput(input);
}
export function hearGetInput(): Promise<number> {
  return NgheRoLibrary.hearGetInput();
}
export function hearSetEarProtection(val: boolean): void {
  return NgheRoLibrary.hearSetEarProtection(val);
}
export function hearGetEarProtection(): Promise<boolean> {
  return NgheRoLibrary.hearGetEarProtection();
}
export function hearSetAutoEqualizer(val: number): void {
  return NgheRoLibrary.hearSetAutoEqualizer(val);
}
export function hearGetAudioEqualizer(): Promise<boolean> {
  return NgheRoLibrary.hearGetAudioEqualizer();
}
export function hearSetEqualizerBass(db: number): void {
  return NgheRoLibrary.hearSetEqualizerBass(db);
}
export function hearGetEqualizerBass(): Promise<number> {
  return NgheRoLibrary.hearGetEqualizerBass();
}
export function hearSetEqualizeMid(db: number): void {
  return NgheRoLibrary.hearSetEqualizeMid(db);
}
export function hearGetEqualizerMid(): Promise<number> {
  return NgheRoLibrary.hearGetEqualizerMid();
}
export function hearSetEqualizeTreble(db: number): void {
  return NgheRoLibrary.hearSetEqualizeTreble(db);
}
export function hearGetEqualizerTreble(): Promise<number> {
  return NgheRoLibrary.hearGetEqualizerTreble();
}
export function hearSetAutoBalance(val: boolean): void {
  return NgheRoLibrary.hearSetAutoBalance(val);
}
export function hearGetAutoBalance(): Promise<boolean> {
  return NgheRoLibrary.hearGetAutoBalance();
}
export function hearSetEarBalance(balance: number): void {
  return NgheRoLibrary.hearSetEarBalance(balance);
}
export function hearGetEarBalance(): Promise<number> {
  return NgheRoLibrary.hearGetEarBalance();
}
