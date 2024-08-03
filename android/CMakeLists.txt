cmake_minimum_required(VERSION 3.4.1)
project(NgheRoLibrary)

set (BUILD_DIR ./build)
set (CMAKE_VERBOSE_MAKEFILE ON)
set (CMAKE_CXX_STANDARD 14)

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/build/bin)
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/build/lib)
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/build/lib)

add_library(react-native-nghe-ro-library            SHARED
            cpp-adapter.cpp
)

target_link_libraries(
    react-native-nghe-ro-library
    log
)
