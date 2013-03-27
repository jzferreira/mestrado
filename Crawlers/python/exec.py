#!/usr/bin/env python
# encoding: utf-8
"""
exec.py

Created by Ferreira Javier Zambrano on 2010-10-08.
Copyright (c) 2010 __MyCompanyName__. All rights reserved.
"""

import sys
import os
#from ColetorFT import *
from Crawler import *
#from ColetorNY import *

def createDir(diretorio):
	if not os.path.isdir(diretorio):
		os.mkdir(diretorio)
		print 'Diretorio de saida: ' + diretorio
	else:
		print "[Erro] Diretorio ja existe"
		
def main():
	#instancia do coletor
	diretorio = sys.argv[1]
	projeto = sys.argv[2]
	createDir(projeto)
	#coletor = ColetorFT(projeto)
	coletor = Crawler(diretorio,projeto)
	coletor.start()


if __name__ == '__main__':
	main()