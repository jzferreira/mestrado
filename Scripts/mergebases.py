#!/usr/bin/env python
# encoding: utf-8
"""
untitled.py

Created by Ferreira Javier Zambrano on 2011-03-16.
Copyright (c) 2011 __MyCompanyName__. All rights reserved.
"""

import sys
import os
import shutil

def main():
	pathSrc = '/Users/javferre/Desktop/NewYorkTimes3/'
	pathDst = '/Users/javferre/Pessoal/UFAM/Mestrado/Workspace/Database/NewYorkTimes/'
	listing = os.listdir(pathSrc)
	startPage = 507
	for infile in listing:
		print "src: current file is: " + infile
		pathOrigem = pathSrc + infile
		fileSrc = open(pathOrigem, 'r')
		document = fileSrc.read()
		outFile = 'pagina' + str(startPage) + '.html'
		startPage += 1
		fileSrc.close()
		print "dst: current file is: " + outFile
		fileDst = open(pathDst + outFile, 'w')
		fileDst.write(document)
		fileDst.close()
		print "+++++++++++++++++++++++"


if __name__ == '__main__':
	main()

