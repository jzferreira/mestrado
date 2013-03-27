#!/usr/bin/env python
# encoding: utf-8
"""
parser.py

Created by Javier Ferreira on 2012-12-14

Script para remover apenas o conteúdo txt das paginas e verificar as entidades por paginas
"""

#modulos de uso para parser do HTML
from bs4 import BeautifulSoup
import os
import re
import shutil as cp
import sys
import argparse

def isDirectory(path):
	if os.path.isdir(path):
		msg = "Nao e um diretorio valido: " + path
		raise argparse.ArgumentError(msg)
	else:
		return path

def init():
	parser = argparse.ArgumentParser(description='Process HTML to TXT')
	parser.add_argument('--inputpath', metavar='path', help='path the input directory')
	args = parser.parse_args()
	print args.inputpath

if __name__ == '__main__':
	init()

# #diretorio de entrada de todas as paginas
# path = '/Users/javferre/Mestrado/Database/HTML/Reuters/All/page1.html'

# #abre arquivo no modo leitura
# fs = open(path, 'r')

# news = []

# #modulo que carrega a arvore DOM no SOUP
# soup = BeautifulSoup(fs.read())

# #recuperar o titulo da noticia
# title = soup.h1.string

# news.append(title + '\n')

# #recuperar a noticia
# head = soup.select('#articleText .focusParagraph p')
# news.append(head[0].get_text())

# #content = soup.find_all("span",id="articleText")
# content = soup.select("#articleText > p")

# limit = len(content)
# k = 0
# while (k < limit):
# 	# print(content[k].string)
# 	news.append(content[k].string)
# 	k += 1

# print ''.join(news)