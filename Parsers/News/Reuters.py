#!/usr/bin/env python
# encoding: utf-8
"""

Reuters.py - Classe para extrair o conteudo das paginas da Reuters

"""
from bs4 import BeautifulSoup

class Reuters(object):
	
	inputPath = ''
	outputPath = ''
	
	def __init__(self, inputPath, outputPath):
		self.inputPath = inputPath
		self.outputPath = outputPath

	def parse(self, html):
		#news
		news = []
		#modulo que carrega a arvore DOM no SOUP
		soup = BeautifulSoup(html)
		#recuperar o titulo da noticia
		title = soup.h1.string
		news.append(title + '\n')

		#recuperar a noticia
		head = soup.select('#articleText .focusParagraph p')
		news.append(head[0].get_text())

		#content = soup.find_all("span",id="articleText")
		content = soup.select("#articleText > p")

		limit = len(content)
		k = 0
		while (k < limit):
			# print(content[k].string)
			news.append(content[k].string)
			k += 1

		return ''.join(news)