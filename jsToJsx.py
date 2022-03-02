import os
import sys
rootdir = 'src'
for subdir, dirs, files in os.walk(rootdir):
    for file in files:
        address = os.path.join(subdir,file)
        split = os.path.splitext(address)
        if split[1]=='.js':
            os.rename(address, f'{split[0]}.jsx')