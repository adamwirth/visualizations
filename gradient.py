import io
import struct
import sys

def run():
    gradientDefinition = getGradientDefinition()
    generatedGradient = generateGradient(gradientDefinition)
    writeGradient(generatedGradient)

def getGradientDefinition():
    """
    Returns a value to another value as an array.

    TODOs:
    - define as rgb/cmyk values
    - more advanced definition than an array of 2 terms
    - arbitrary number of points
    - different directions than just left-to-right
    - take arguments to process
    """
    return [5, -5]

def generateGradient(gradientDefinition):
    """
    Given a gradient definition, gradate it over 100 elements, and return a new iterable.

    TODOs:
    - Dynamically handle any gradient definition (type, length)
    - ...and without a clunky logic block
    - Define different lengths than 100
    - Handle different angles, colors
    """
    length = 100
    gradientArray = []
    gDLength = len(gradientDefinition)

    def considerEveryonesFeelings(currentIndex):
        """
        Return a value based on the index and the position of the gradientDefinition's values.
        Expecting an integer for currentIndex that's >= 1.
        """
        position = length / currentIndex
        retval = 0

        for gDefinition, gDIndex in gradientDefinition:
            # TODO Add to retval
            # TODO Should actually be dividing/multiplying from something, not adding
            # Add a weighted calculation for this loop iteration's value and idx
            pass

        return retval

    # TODO better buffering/looping than this for performance
    for i in range(length):
        val = considerEveryonesFeelings(i + 1)
        gradientArray.push(val)

    return gradientDefinition

def writeGradient(gradient):
    """
    Given a created gradient, output it to STDOUT.

    TODOs:
    - Round depending on gradient elements' types
    - Output to a file
    - Encode as an actual image JPEG / PNG
    """
    for element in gradient:
        print(element, sep=' ', end='')

def checkSys():
    print("System byteorder:", sys.byteorder)

if __name__ == '__main__':
    checkSys()
    run()
