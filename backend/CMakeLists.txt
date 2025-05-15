cmake_minimum_required(VERSION 3.12)
project(FairXORNG)

set(CMAKE_CXX_STANDARD 17)

# Include your pybind11 and Python headers explicitly
include_directories(
    "${CMAKE_SOURCE_DIR}"
    "C:/ACTUAL Code/FairXORNG/venv/Lib/site-packages/pybind11/include"
    "C:/Users/PC/AppData/Local/Programs/Python/Python313/Include"
)

# Set the Python library dir manually (adjust to your local path if needed)
link_directories("C:/Users/PC/AppData/Local/Programs/Python/Python313/libs")

# Create the Python extension module
add_library(FairXORNG SHARED
    fairxorng.cpp
    fairxorng_bindings.cpp
)

# Rename the output file to match Python's naming conventions
set_target_properties(FairXORNG PROPERTIES
    PREFIX ""
    SUFFIX ".pyd"
)

# Link against Python (change the name if your Python version is different)
target_link_libraries(FairXORNG
    python313
)