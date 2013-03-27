#!usr/bin/env python
# encoding: utf-8
"""
checkURLS.py

Created by Javier Ferreira 

"""

import sys
import os

#hash com as urls
uniqueURLS = {}

#todas as urls
allURLS = []

#site
site = 'reuters'

#arquivo output
fileOutput = 'paginas.txt'

def addNewKey(url):
	if (uniqueURLS.has_key(url) == 1):
		print 'Url duplicada: ' + url
	else:
		uniqueURLS[url] = 1

def isNotVideo(url):
	return url.find('http://www.bloomberg.com/video')

def check():
	#path txt com a url das paginas das quatro companias
	#urlsTXT = ['bloomberg/bloombergApple.txt', 'bloomberg/bloombergMicrosoft.txt', 'bloomberg/bloombergNokia.txt', 'bloomberg/bloombergSamsung.txt']
	urlsTXT = ['reuters/reuters_apple.txt','reuters/reuters_google.txt','reuters/reuters_microsoft.txt','reuters/reuters_nokia.txt','reuters/reuters_samsung.txt']

	#appleTXT = 'bloomberg/bloombergApple.txt'
	#microsoftTXT = 'bloomberg/bloombergMicrosoft.txt'
	#nokiaTXT = 'bloomberg/bloombergNokia.txt'
	#samsungTXT = 'bloomberg/bloombergSamsung.txt'

	#ler cada arquivo

	for url in urlsTXT:
		#abri o arquivo em modo leitura. TODO: try catch :P
		fs = open(url, 'r')
		txt = fs.readline()
		while (txt != ""):
			if (isNotVideo(txt) < 0):
				cleanURL = txt.replace('\n', '').strip(' ')
				allURLS.append(cleanURL)
				addNewKey(cleanURL)
			txt = fs.readline()

	showResult()
	writeUniqueURLS()

def showResult():
	print 'Total de urls %s : %i' % (site, len(allURLS))
	print 'Total de urls duplicadas: %i' % (len(allURLS) - len(uniqueURLS)) 
	print 'Total de urls nao duplicadas: %i' % len(uniqueURLS)

#salva links nao duplicados
def writeUniqueURLS():
	print 'salvando arquivo com urls unicas'
	fs = open(site + '_' + fileOutput, 'w')
	for url in uniqueURLS:
		fs.write(url+'\n');
	fs.close()


def main():
	check()

if __name__ == '__main__':
	main()