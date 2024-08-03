package com.ngherolibrary;

import android.bluetooth.BluetoothDevice;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.rmsl.juce.Java;

import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

public class NgheRoLibraryModule extends NgheRoLibrarySpec {
  public static final String NAME = "NgheRoLibrary";

  private BroadcastReceiver headsetReceiver, bluetoothReceiver;

  NgheRoLibraryModule(ReactApplicationContext context) {
    super(context);
    registerHeadsetReceiver(context);
    //Java.initialiseJUCE (context.getApplicationContext());
  }
  private void registerHeadsetReceiver(ReactContext reactContext) {
        headsetReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                if (intent.hasExtra("state")) {
                    int state = intent.getIntExtra("state", -1);
                    switch (state) {
                        case 0:
                            hearStop();
                            sendEvent(reactContext, "headsetUnplugged");
                            break;
                        case 1:
                            sendEvent(reactContext, "headsetPlugged");
                            break;
                        default:
                            break;
                      }
                }
            }
        };
        IntentFilter filterHeadSet = new IntentFilter(Intent.ACTION_HEADSET_PLUG);
        reactContext.registerReceiver(headsetReceiver, filterHeadSet);


        bluetoothReceiver = new BroadcastReceiver() {
          @Override
          public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();
            if (BluetoothDevice.ACTION_ACL_CONNECTED.equals(action)) {
              BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
              sendEvent(reactContext, "bluetoothConnected");
            } else if (BluetoothDevice.ACTION_ACL_DISCONNECTED.equals(action)) {
              BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
              hearStop();
              sendEvent(reactContext, "bluetoothDisconnected");
            }
          }
        };

        IntentFilter filterBluetooth = new IntentFilter();
        filterBluetooth.addAction(BluetoothDevice.ACTION_ACL_CONNECTED);
        filterBluetooth.addAction(BluetoothDevice.ACTION_ACL_DISCONNECTED);
        reactContext.registerReceiver(bluetoothReceiver, filterBluetooth);
    }

    private void sendEvent(ReactContext reactContext, String eventName) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, null);
    }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  static {
    System.loadLibrary("react-native-nghe-ro-library");
  }

  public static native double nativeMultiply(double a, double b);



  public static native int nativeTestStart();

  public static native int nativeTestStop();

  public static native float nativeTestGetTestAt();

  public static native float nativeTestGetCurrentDbSPL();

  public static native boolean nativeTestIsTestOnRight();

  public static native void nativeTestPlay(float freq, float db, boolean rightEar);

  public static native float nativeTestHear();

  public static native void nativeTestUnhear();


  public static native void nativeHearInit();

  //public static native void nativeHearDestroy();

  public static native int nativeHearStart();

  public static native void nativeHearStop();

  public static native boolean nativeHearIsStart();

  public static native void nativeHearSetProfile(int freqIndex, boolean rightEar, float hearLevelDbSPL);

  public static native float nativeHearGetProfile(int freqIndex, boolean rightEar);

  public static native void nativeHearSetDenoise(boolean denoise);

  public static native boolean nativeHearGetDenoise();

  public static native void nativeHearSetBoost(float dbLevel);

  public static native float nativeHearGetBoost();

  public static native void nativeHearSetInput(int input);

  public static native int nativeHearGetInput();

  public static native void nativeHearSetEarProtection(boolean val);

  public static native boolean nativeHearGetEarProtection();

  public static native void nativeHearSetAutoEqualizer(boolean val);

  public static native boolean nativeHearGetAudioEqualizer();

  public static native void nativeHearSetEqualizerBass(float db);

  public static native float nativeHearGetEqualizerBass();

  public static native void nativeHearSetEqualizeMid(float db);

  public static native float nativeHearGetEqualizerMid();

  public static native void nativeHearSetEqualizeTreble(float db);

  public static native float nativeHearGetEqualizerTreble();

  public static native void nativeHearSetAutoBalance(boolean val);

  public static native boolean nativeHearGetAudioBalance();

  public static native void nativeHearSetEarBalance(float balance);

  public static native float nativeHearGetEarBalance();

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  public void multiply(double a, double b, Promise promise) {
    promise.resolve(nativeMultiply(a, b));
  }


  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  public void testGetCurrentDbSPL(Promise promise) {
    promise.resolve(nativeTestGetCurrentDbSPL());
  }

  @ReactMethod
  public void testStart(Promise promise) {
    promise.resolve(nativeTestStart());
  }

  @ReactMethod
  public void testStop(Promise promise) {
    promise.resolve(nativeTestStop());
  }

  @ReactMethod
  public void testPlay(float freq, float db, boolean rightEar) {
    nativeTestPlay(freq, db, rightEar);
  }


  @ReactMethod
  public void testHear(Promise promise) {
    promise.resolve(nativeTestHear());
  }

  @ReactMethod
  public void testUnhear() {
    nativeTestUnhear();
  }


  @ReactMethod
  public void hearInit(){
    nativeHearInit();
  }

  @ReactMethod
  public void hearDetroy() {
    //nativeHearDestroy();
  }

  @ReactMethod
  public void hearStart(Promise promise) {
    promise.resolve(nativeHearStart());
  }

  @ReactMethod
  public void hearStop() {
    nativeHearStop();
  }

  @ReactMethod
  public void hearIsStart(Promise promise) {
    promise.resolve(nativeHearIsStart());
  }

  @ReactMethod
  public void hearSetProfile(int freqIndex, boolean rightEar, float hearLevelDbSPL) {
    nativeHearSetProfile(freqIndex, rightEar, hearLevelDbSPL);
  }

  @ReactMethod
  public void hearGetProfile(int freqIndex, boolean rightEar, Promise promise) {
    promise.resolve(nativeHearGetProfile(freqIndex, rightEar));
  }

  @ReactMethod
  public void hearSetDenoise(boolean denoise) {
    nativeHearSetDenoise(denoise);
  }

  @ReactMethod
  public void hearGetDenoise(Promise promise) {
    promise.resolve(nativeHearGetDenoise());
  }

  @ReactMethod
  public void hearSetBoost(float dbLevel) {
    nativeHearSetBoost(dbLevel);
  }

  @ReactMethod
  public void hearGetBoost(Promise promise) {
    promise.resolve(nativeHearGetBoost());
  }

  @ReactMethod
  public void hearSetInput(int input) {
    nativeHearSetInput(input);
  }

  @ReactMethod
  public void hearGetInput(Promise promise) {
    promise.resolve(nativeHearGetInput());
  }

  @ReactMethod
  public void hearSetEarProtection(boolean val) {
    nativeHearSetEarProtection(val);
  }

  @ReactMethod
  public void hearGetEarProtection(Promise promise) {
    promise.resolve(nativeHearGetEarProtection());
  }

  @ReactMethod
  public void hearSetAutoEqualizer(boolean val) {
    nativeHearSetAutoEqualizer(val);
  }

  @ReactMethod
  public void hearGetAudioEqualizer(Promise promise) {
    promise.resolve(nativeHearGetAudioEqualizer());
  }

  @ReactMethod
  public void hearSetEqualizerBass(float db) {
    nativeHearSetEqualizerBass(db);
  }

  @ReactMethod
  public void hearGetEqualizerBass(Promise promise) {
    promise.resolve(nativeHearGetEqualizerBass());
  }

  @ReactMethod
  public void hearSetEqualizeMid(float db) {
    nativeHearSetEqualizeMid(db);
  }

  @ReactMethod
  public void hearGetEqualizerMid(Promise promise) {
    promise.resolve(nativeHearGetEqualizerMid());
  }

  @ReactMethod
  public void hearSetEqualizeTreble(float db) {
    nativeHearSetEqualizeTreble(db);
  }

  @ReactMethod
  public void hearGetEqualizerTreble(Promise promise) {
    promise.resolve(nativeHearGetEqualizerTreble());
  }

  @ReactMethod
  public void hearSetAutoBalance(boolean val) {
    nativeHearSetAutoBalance(val);

  }

  @ReactMethod
  public void hearGetAudioBalance(Promise promise) {
    promise.resolve(nativeHearGetAudioBalance());
  }

  @ReactMethod
  public void hearSetEarBalance(float balance) {
    nativeHearSetEarBalance(balance);
  }

  @ReactMethod
  public void hearGetEarBalance(Promise promise) {
    promise.resolve(nativeHearGetEarBalance());
  }
}
