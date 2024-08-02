#include <jni.h>

extern "C" JNIEXPORT jdouble JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeMultiply(JNIEnv *env, jclass type, jdouble a, jdouble b)
{
    return a * b;
}

/* TEST EAR */

extern "C" JNIEXPORT jint JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeTestStart(JNIEnv *env, jclass type)
{
    return rand() % 3;
}

extern "C" JNIEXPORT jint JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeTestStop(JNIEnv *env, jclass type)
{
    return 0;
}

extern "C" JNIEXPORT jfloat JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeTestGetTestAt(JNIEnv *env, jclass type)
{
    return 100;
}

extern "C" JNIEXPORT jfloat JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeTestGetCurrentDbSPL(JNIEnv *env, jclass type)
{
    return rand() % 120;
}

extern "C" JNIEXPORT jboolean JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeTestIsTestOnRight(JNIEnv *env, jclass type)
{
    return rand() % 2;
}

extern "C" JNIEXPORT void JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeTestPlay(JNIEnv *env, jclass type, jfloat freq, jfloat db, jboolean rightEar)
{
    return;
}

extern "C" JNIEXPORT jfloat JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeTestHear(JNIEnv *env, jclass type)
{
    return return rand() % 120;
}

extern "C" JNIEXPORT void JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeTestUnhear(JNIEnv *env, jclass type)
{
    return -1;
}
/* END TEST EAR */

/* HEAR */

extern "C" JNIEXPORT void JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeHearInit(JNIEnv *env, jclass type)
{
}

extern "C" JNIEXPORT void JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeHearDetroy(JNIEnv *env, jclass type)
{
}

extern "C" JNIEXPORT jint JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeHearStart(JNIEnv *env, jclass type)
{
    return rand() % 2;
}

extern "C" JNIEXPORT void JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeHearStop(JNIEnv *env, jclass type)
{
}

extern "C" JNIEXPORT jboolean JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeHearIsStart(JNIEnv *env, jclass type)
{
    return rand() % 2;
}

extern "C" JNIEXPORT void JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeHearSetProfile(JNIEnv *env, jclass type, jint freqIndex, jboolean rightEar, jfloat hearLevelDbSPL)
{
}

extern "C" JNIEXPORT jfloat JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeHearGetProfile(JNIEnv *env, jclass type, jint freqIndex, jboolean rightEar)
{
    return rand() % 120;
}

bool m_denoise = false;
extern "C" JNIEXPORT void JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeHearSetDenoise(JNIEnv *env, jclass type, jboolean denoise)
{
    m_denoise = denoise;
}

extern "C" JNIEXPORT jboolean JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeHearGetDenoise(JNIEnv *env, jclass type)
{
    return m_denoise;
}

float m_boost = 0;
extern "C" JNIEXPORT void JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeHearSetBoost(JNIEnv *env, jclass type, jfloat dbLevel)
{
    m_boost = dbLevel;
}

extern "C" JNIEXPORT jfloat JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeHearGetBoost(JNIEnv *env, jclass type)
{
    return m_boost;
}

int m_input = 0;
extern "C" JNIEXPORT void JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeHearSetInput(JNIEnv *env, jclass type, jint input)
{
    m_input = input;
}

extern "C" JNIEXPORT jint JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeHearGetInput(JNIEnv *env, jclass type)
{
    return m_input;
}
bool m_ear_protection = false;

extern "C" JNIEXPORT void JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeHearSetEarProtection(JNIEnv *env, jclass type, jboolean val)
{
    m_ear_protection = val;
}

extern "C" JNIEXPORT jboolean JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeHearGetEarProtection(JNIEnv *env, jclass type)
{
    return m_ear_protection;
}
bool m_auto_eq = false;
extern "C" JNIEXPORT void JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeHearSetAutoEqualizer(JNIEnv *env, jclass type, jboolean val)
{
    m_auto_eq = val;
}

extern "C" JNIEXPORT jboolean JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeHearGetAudioEqualizer(JNIEnv *env, jclass type)
{
    return m_auto_eq;
}

float m_bass = 0;

extern "C" JNIEXPORT void JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeHearSetEqualizerBass(JNIEnv *env, jclass type, jfloat db)
{
    m_bass = db;
}

extern "C" JNIEXPORT jfloat JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeHearGetEqualizerBass(JNIEnv *env, jclass type)
{
    return m_bass;
}
float m_mid = 0;
extern "C" JNIEXPORT void JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeHearSetEqualizeMid(JNIEnv *env, jclass type, jfloat db)
{
    m_mid = db;
}

extern "C" JNIEXPORT jfloat JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeHearGetEqualizerMid(JNIEnv *env, jclass type)
{
    return m_mid;
}
float m_treble = 0;
extern "C" JNIEXPORT void JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeHearSetEqualizeTreble(JNIEnv *env, jclass type, jfloat db)
{
    m_treble = db;
    ;
}

extern "C" JNIEXPORT jfloat JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeHearGetEqualizerTreble(JNIEnv *env, jclass type)
{
    return m_treble;
}

bool m_balance_act = false;
extern "C" JNIEXPORT void JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeHearSetAutoBalance(JNIEnv *env, jclass type, jboolean val)
{
    m_balance_act = val;
}

extern "C" JNIEXPORT jboolean JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeHearGetAudioBalance(JNIEnv *env, jclass type)
{
    return m_balance_act;
}
float m_balance = 0;
extern "C" JNIEXPORT void JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeHearSetEarBalance(JNIEnv *env, jclass type, jfloat balance)
{
    m_balance = balance;
}

extern "C" JNIEXPORT jfloat JNICALL
Java_com_ngherolibrary_NgheRoLibraryModule_nativeHearGetEarBalance(JNIEnv *env, jclass type)
{
    return m_balance;
}
/* END HEAR */
