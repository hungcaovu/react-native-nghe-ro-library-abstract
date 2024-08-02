
package com.rmsl.juce;

import android.content.Context;

public class Java
{
  static
  {
    System.loadLibrary ("react-native-nghe-ro-library");
  }

  public native static void initialiseJUCE (Context appContext);
}
