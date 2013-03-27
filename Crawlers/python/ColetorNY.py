#!/usr/bin/env python
# encoding: utf-8
"""
Coletor.py

Created by Ferreira Javier Zambrano on 2010-10-08.
Copyright (c) 2010 __MyCompanyName__. All rights reserved.
"""

import sys
import os
import urllib2
import io
import re
from threading import Thread
import time

class ColetorNY(Thread):
	linksExtraidos = {} #links extraidos
	dirPath = '' #string com o path do diretorio de saida.
	totalPaginas = 99
	pagina = 1
	prev = 10
	next = 20
	urlInicio = 'http://query.nytimes.com/search/business?query=nokia&n=10&prev=0&frow=0&page=2'
	def __init__(self, savePath):
		self.dirPath = savePath
		Thread.__init__(self)
	
	#Recupera o diretorio de saida
	def getDirPath(self):
		return self.dirPath
	
	#Recupera a url de INICIO
	def getURLInicio(self):
		return self.urlInicio
	
	#Adiciona a paginas coletadas
	def addLinksColetados(self, link):
		response = link in self.linksExtraidos
		if (response == False):
			print 'Store: ' + link
			self.linksExtraidos[link] = link
	
	def incrementaPagina(self):
		self.pagina += 1
		
	def getNumberOfPagina(self):
		return self.pagina
	
	#printa as paginas ja coletadas
	def printer(self):
		links = self.linksExtraidos
		for link in links.keys():
			print link
	
	#salva as url das paginas para um arquivo
	def saveToFile(self):
		npaginas = 0
		pathFile = self.getDirPath() + '/paginas.txt'
		file = open(pathFile, 'w')
		links = self.linksExtraidos
		for link in links.keys():
			npaginas+= 1;
			file.write(link + '\n')
		print 'File was created.'
		npaginas = npaginas + 1
		print 'Total de Links: ' + str(npaginas)
		file.close()
	
	#salva o HTML das paginas para um arquivo
	def saveHTML(self, html):
		pathFile = self.getDirPath() + '/pagina_' + str(self.getNumberOfPagina()) + '.html'
		file = open(pathFile, 'w')
		file.write(html)
		file.close()
	
	#extrai os links na pagina
	def extraiLinks(self, html):
		html = html.replace('\n', '')
		html = html.replace('\r', '')
		html = html.replace('\t', '')
		olPattern =  re.compile(r'<ul class="results">.*</ul *>')
		html = olPattern.search(html).group()
		#print '##### HTML #####' + html + "##############"
		aPattern = re.compile(r'<a href="(.*?)">(.*?)</a>')
		aText = aPattern.findall(html)
		if aText:
			for key in aText:
				if key[0].find('www.nytimes') != (-1):
					self.addLinksColetados(key[0])
		else:
			print 'No Match'
	
	def buildURL(self, number):
		url = ''
		if (number == 2):
			url = 'http://query.nytimes.com/search/business?query=nokia&n=10&prev=10&frow=10&page=2'
		else:
			url = 'http://query.nytimes.com/search/business?query=nokia&n=10&prev=' + str(self.prev) + '&frow=' + str(self.next) + '&page=' + str(self.getNumberOfPagina())
			self.prev = self.prev + 10;
			self.next = self.next + 10;
		return url
	
	#Faz o download da pagina
	def doDownload(self, url):
		print 'Download Page Number: ' + str(self.getNumberOfPagina())
		print 'Url: ' + url
		response = urllib2.urlopen(url, timeout = 60000);
		print 'Open and Read HTML...'
		html = response.read()
		print 'Remove all links...'
		self.extraiLinks(html)
		#print 'Save File'
		#self.saveToFile()
		#print 'Save HTML'
		#self.saveHTML(html)
		print '================'
			
	def run(self):
		print "init Thread: " + self.getName()
		while self.getNumberOfPagina() <= self.totalPaginas:
			if (self.getNumberOfPagina() == 1):
				self.doDownload(self.getURLInicio())
			elif (self.getNumberOfPagina() == 2):
				url = self.buildURL(2)
				self.doDownload(url)
			else:
				url = self.buildURL(self.getNumberOfPagina())
				self.doDownload(url)
			self.incrementaPagina()
			time.sleep(10)
		self.saveToFile()