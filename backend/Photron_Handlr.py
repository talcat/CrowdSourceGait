# Functionality for importing and reading Photron (FASTCAM related software) 
# RAW image files in python.  Basic strategy is to read them into a menmap array
# This will not work well for 32bit machines because of the limited address space
# but in my experience 64bit machines is fine.
#

# The metadata reader is basics on the specs given by the Photron Manual - it searches
# the most relevent metadata for reading the file
#
# 06/09/2016 - rewrote and cleaned up from who-knows-when old version 

import numpy as np

def cih_parser(filename):
    """Given the filename of the .cih text file, will create a metadata dictionary
    to help parse and read the Photron video file structure, and allow python to read
    Photron MRAW files"""
    
    if filename[-4:] != ".cih":
        raise Exception
    
    try:
        with open(filename, 'r') as f:
            info = f.readlines()
    except: raise Exception
        
    #the below takes all of the metadata in the cih file, and turns it into a keyed 
    #python dictionary
    #also removes the newline and cairrage return for each value
    i2 = map(lambda k: k.split(" : "), info)
    metadata = [{x[0]: x[1][:-2]} for x in i2 if len(x) == 2]
    metadata += [{"filename":filename}]
    #turn list of dictionary into 1 giant dictionary
    return { k: v for d in metadata for k, v in d.items() }

def get_menmap(metadata):
    """Given a metadata file from the cih parser function will load into memory the 
    menmap array for the reading images from PHOTRON MRAW files"""
    
    #Get total size of the image array we will be reading
    width = int(metadata["Image Width"])
    height = int(metadata["Image Height"])
    depth = int(metadata["Total Frame"])
    shape = (depth, width, height)
    
    #Bit depth of the images (for bitshifting)
    cBits = int(metadata["EffectiveBit Depth"])
               
    #If the bitdepth of the saved images is NOT 8 or 16, you need to deal with reading it
    #in a different way, or resaving the images using Photron FastViewer as python really 
    #does not like reading in non-byte increments
    nBits = int(metadata["Color Bit"])
    thedtype = 'uint16'
    if np.mod(nBits, 8) != 0:
        raise Exception
    else:
        if nBits == 8:
               thedtype = 'uint8'
                   
    
    #load the whole file into memmap.  NOTE THAT 32 BIT OS WILL NOT LIKE THIS
    array = np.memmap(metadata["filename"][:-4] + ".mraw", dtype = thedtype, 
                      mode='r', shape = shape)
    
    #if the bits are saved "Lower" mode we need to shift them
    #if metadata['EffectiveBit Side'] == "Lower":
    #    toshift = nBits - cBits
    #    array = np.left_shift(array[:,:,:], toshift)
    return array
    