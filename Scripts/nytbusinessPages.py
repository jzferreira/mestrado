#!/usr/bin/env python
# encoding: utf-8

#TODO ou coloco tudo em portugues ou tudo em ingles nos comentarios e nome da variaveis! SE DECIDE JAVIER!

#modulos de uso
from BeautifulSoup import BeautifulSoup
import os
import re
import shutil as cp

def getFilesDir(dirInput):

	filesDir = os.listdir(dirInput)
	return filesDir

def copyFile(page, filename):
	dest = '/Users/javferre/Pessoal/UFAM/Mestrado/Workspace/Database/HTML/newyorktimesBusiness/' + filename
	# for page in pages:
	# 	#copia binaria de arquivo
	# 	cp.copyfile(page, dest)
	cp.copyfile(page, dest)


def readFiles(dirInput):

	#lista com todas as paginas do diretorio
	filesDir = getFilesDir(dirInput)

	#paginas de business
	#paginasList = []
	countPagesBusiness = 0

	#loop para ler todos os arquivos do diretorio
	for filename in filesDir:
		#recupera o path absoluto do arquivo
		fullPath = os.path.abspath(dirInput + filename) 
		#abre arquivo no modo leitura
		fs = open(fullPath,'r')
		#modulo que carrega o arquivo html
		soup = BeautifulSoup(fs.read())
		#recuperar as tags h2
		title = soup('h2')
		#caso tenha pelo menos 1 verifica
		if len(title) > 0:
			mainTitle = title[0].prettify().lower().strip()
			if isBusiness(mainTitle):
				#paginasList.append(fullPath)
				countPagesBusiness = countPagesBusiness + 1
				print '%s | %d' % (fullPath, countPagesBusiness)
				copyFile(fullPath, filename)


	#copyfile(paginasList)

def isBusiness(content):
	#pattern do business
	businessPattern = re.compile('business')
	isBusiness = businessPattern.search(content, re.MULTILINE)

	return isBusiness is not None

def main():
	path = '/Users/javferre/Pessoal/UFAM/Mestrado/Workspace/Database/HTML/newyorktimes/'
	readFiles(path)

if __name__ == '__main__':
	main()