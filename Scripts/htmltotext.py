#!/usr/bin/env python
# encoding: utf-8
"""
htmltotext.py

Created by Ferreira Javier Zambrano on 2011-04-06.
Copyright (c) 2011 Nokia Technology Institue. All rights reserved.
"""

import sys
import os
import re
import io

def createDir(diretorio):
	if not os.path.isdir(diretorio):
		os.mkdir(diretorio)
		print 'Diretorio de saida: ' + diretorio
	else:
		print "[Erro] Diretorio ja existe"

def removeHTML(html):
	html = re.sub('<script(.|\n)*?<\/script>',"",html)
	html = re.sub('<style(.|\n)*?<\/style>',"",html)
	return re.sub('<(.|\n)*?>',"",html)

def main():
	#path para o diretorio de entrada das paginas html
	pathInput = '/Users/javferre/Pessoal/UFAM/Mestrado/Workspace/Database/HTML/FinancialTimes/'
	#path para o diretorio de saida das paginas
	pathOutput = '/Users/javferre/Pessoal/UFAM/Mestrado/Workspace/Database/TEXT/' + sys.argv[1]
	#lista todos os arquivos dentro do diretorio de entrada
	listing = os.listdir(pathInput)
	createDir(pathOutput)
	for infile in listing:
		print '#######################'
		print "File Input: current file is: " + infile
		pathOrigem = pathInput + infile
		fileInput = open(pathOrigem, 'r')
		documentInput = fileInput.read()
		fileInput.close()
		textInput = removeHTML(documentInput)
		nameOutputFile = pathOutput + '/' + infile
		nameOutputFile = re.sub('html', 'txt', nameOutputFile)
		fileOutput = open(nameOutputFile, 'w')
		fileOutput.write(textInput)
		fileOutput.close()
		print "File Output: " + nameOutputFile
		print '#######################'

if __name__ == '__main__':
	main()
