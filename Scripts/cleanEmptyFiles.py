#!/usr/bin/env python
# encoding: utf-8
"""
cleanEmptyFiles.py

Created by Javier Zambrano Ferreira
Copyright (c) 2012. All rights reserved.
"""

import sys
import os
import shutil

def copyFile(src, dest):
	#copia binaria de arquivo
	shutil.copyfile(src, dest)


def readDir():

	#se o nome do arquivo nao for especificado, usa o dir corrente; caso contrario, usa os arquivos especificados na linha de comando
	pathInputFile = '/Users/javferre/Projects/database/newyork/'
	pathOutputFile = '/Users/javferre/Pessoal/UFAM/Mestrado/Workspace/Database/HTML/teste/'

	countNaoVazio = 0 #contador de paginas com conteudo
	countVazio = 0 #contador de paginas sem conteudo

	if len (sys.argv) == 1: 
		filenames = os.listdir(os.curdir)
	else:
		filenames = os.listdir(pathInputFile)

	for filename in filenames:
		#TODO remover tudo isso para os.path.abspath(stringpath)
		srcPath = pathInputFile + filename
		if os.path.getsize(srcPath) > 0:
			print 'nao vazio: ' + filename
			countNaoVazio = countNaoVazio + 1
			finalDest = pathOutputFile + filename #path do destino final
			copyFile(srcPath, finalDest)
		else:
			print 'vazio: ' + filename
			countVazio = countVazio + 1

	print '##########\nVazio: %d e NaoVazio: %d' % (countVazio, countNaoVazio)

def main():
	readDir()

if __name__ == '__main__':
	main()