import { DeviceEventEmitter } from 'react-native';
import { useState, useEffect, useCallback, type SetStateAction } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  PermissionsAndroid,
} from 'react-native';
import {
  testGetCurrentDbSPL,
  testStart,//
  testStop,//
  testHear,
  testUnhear,
  testPlay,//

  hearInit,
  hearDetroy,
  hearStart,
  hearStop,
  hearSetDenoise,
  hearSetInput,
  hearSetEarProtection,

  setProfile,

  hearSetAutoEqualizer,
  hearSetEqualizerBass,
  hearSetEqualizeMid,
  hearSetEqualizerTreble,
  hearSetAutoBalance,
  hearSetEarBalance,
} from 'react-native-nghe-ro-library';

export default function App() {
  var frequecies = [125, 255, 500, 1000, 2000, 4000, 8000];

  const [ear, setEar] = useState<boolean>(false); // False = left, True = right
  const [micInternal, setMicInternal] = useState<boolean>(true); // False = Headphone, True = Internal
  const [freqIdx, setFreqIdx] = useState<number>(0);

  const [denoise, setDenoise] = useState<boolean>(true); // False = Headphone, True = Internal
  const [state, setState] = useState<string | undefined>('Stop');

  const [hear, setHear] = useState<number | undefined>();

  const stopTestCal = () => {
    testStop().then((res) => {
      if (res === 0) {
        setState('Stop');
        setEar(false);
        setFreqIdx(0);
      } else {
        console.log('Error');
      }
    });
  };


  const startTestCal = () => {
    console.log('Start Test');
    testStart().then((res: number) => {
      if (res === 0) {
        setState('Started'); // State
        setFreqIdx(0); // state
        setEar(false); // State
        testPlay(frequecies[freqIdx] || 0, 0, ear);
      } else {
        console.log('Error');
      }
    });
  };

  const hearTestCal = () => {
    testHear().then((db) => {
      setHear(db);
      if (freqIdx + 1 >= frequecies.length) {
        setEar(ear ? false : true);
        setFreqIdx(0);
      } else {
        setFreqIdx(freqIdx + 1);
      }
      testPlay(frequecies[freqIdx] || 0, 0.0, ear);
    });
  };

  const unhearTestCal = () => {
    setHear(undefined);
    testUnhear();
    if (freqIdx + 1 >= frequecies.length) {
      setEar(ear ? false : true);
      setFreqIdx(0);
    } else {
      setFreqIdx(freqIdx + 1);
    }
    testPlay(frequecies[freqIdx] || 0, 0, ear);
  };

  const startHearCal = () => {
    try {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }).then((granted) => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');

          hearInit();
          hearStart().then((res) => {
            console.log('Start Hear: ', res);
            if (res === 0) {
              setState('Started');
            } else {
              setState('Error');
            }
          });
        } else {
          console.log('Camera permission denied');
        }
      });
    } catch (err) {
      console.warn(err);
    }
  };

  const micInputCal = useCallback(() => {
    setMicInternal(!micInternal);
    if (micInternal) {
      console.log('Mic Internal');
      hearSetInput(0);
    } else {
      console.log('Mic External');
      hearSetInput(1);
    }
  }, [micInternal]);

  const denoiseCall = useCallback(() => {
    setDenoise(!denoise);
    hearSetDenoise(denoise);
    console.log('hearSetDenoise: ', denoise);
  }, [denoise]);

  useEffect(() => {
    const headsetPluggedListener = DeviceEventEmitter.addListener('headsetPlugged', () => {
      console.log('Headset is plugged');
      // Handle headset plugged event here
      setState("Headset is plugged");
    }
    );

    const headsetUnpluggedListener = DeviceEventEmitter.addListener('headsetUnplugged', () => {
      console.log('Headset is unplugged');
      // Handle headset unplugged event here
      setState("Headset is unplugged");
    }
    );

    const bluetoothConnectedListener = DeviceEventEmitter.addListener('bluetoothConnected', () => {
      console.log('Bluetooth device is connected');
      // Handle Bluetooth connected event here
      setState("Bluetooth is plugged");
    }
    );

    const bluetoothDisconnectedListener = DeviceEventEmitter.addListener('bluetoothDisconnected', () => {
      console.log('Bluetooth device is disconnected');
      // Handle Bluetooth disconnected event here
      setState("Bluetooth is unplugged");
    }
    );

    return () => {
      headsetPluggedListener.remove();
      headsetUnpluggedListener.remove();
      bluetoothConnectedListener.remove();
      bluetoothDisconnectedListener.remove();
    };
  }, []);

  useEffect(() => {
    // Thiết lập hẹn giờ
    const timer = setInterval(() => {
      testGetCurrentDbSPL().then((val) => {
        setHear(val);
        console.log('Db: ', val);
      });
    }, 100);

    // Hủy hẹn giờ khi thành phần bị hủy
    return () => {
      clearInterval(timer);
    };
  }, []);
  /**
    <Button title="Start" onPress={startTestCal} />
    <Button title="Stop" onPress={stopTestCal} />
    <Button title="Hear" onPress={hearTestCal} />
    <Text>Db: {hear}</Text>
    <Button title="UnHear" onPress={unhearTestCal} />
  **/
  /*
    <Button title="Start" onPress={startHearCal} />
    <Button title="Mic" onPress={micInputCal} />
    <Button title="Noise" onPress={denoiseCall} />
    <Button title="Start" onPress={startTestCal} />
  */
  return (
    <View style={styles.container}>
      <Button title="Start" onPress={startTestCal} />
      <Button title="Stop" onPress={stopTestCal} />
      <Button title="Hear" onPress={hearTestCal} />
      <Text>Db: {hear}</Text>
      <Button title="UnHear" onPress={unhearTestCal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
