#ifdef __cplusplus
#import "react-native-nghe-ro-library.h"
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNNgheRoLibrarySpec.h"

@interface NgheRoLibrary : NSObject <NativeNgheRoLibrarySpec>
#else
#import <React/RCTBridgeModule.h>

@interface NgheRoLibrary : NSObject <RCTBridgeModule>
#endif

@end
