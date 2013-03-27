#!/usr/bin/env python
# encoding: utf-8
"""
untitled.py

Created by Ferreira Javier Zambrano on 2011-02-07.
Copyright (c) 2011 __MyCompanyName__. All rights reserved.
"""

import sys
import os
from threading import Thread
import time
import urllib2
import io

class Crawler(Thread):
    dirPath = '' #string com o path do diretorio de saida.
    totalPaginas = 0
    entryPath = ''

    #startPath = Path com o arquivo dos links a serem coletados
    #savePath com o diretório a serem salvos as páginas
    def __init__(self, startPath ,savePath):
        self.entryPath = startPath
        self.dirPath = savePath
        Thread.__init__(self)

    def getDirPath(self):
        return self.dirPath

    def getEntryPath(self):
        return self.entryPath

    def incrementaPagina(self):
        self.totalPaginas += 1

    def getNPagina(self):
        return self.totalPaginas

    def saveHTML(self, html):
        nPagina = self.getNPagina()
        pathFile = self.getDirPath() + '/page' + str(nPagina) + '.html'
        file = open(pathFile, 'w')
        file.write(html)
        file.close()

    def doDownload(self, url):
        try:
            print('Abrindo conexao com ' + url)
            response = urllib2.urlopen(url, timeout = 60000)
            print('Lendo arquivo...')
            html = response.read()
            print('Salvando documento...')
            self.saveHTML(html)
        except HTTPError, e:
            print 'The server couldn\'t fulfill the request.'
            print 'Error code: ', e.code
        except URLError, e:
            print 'We failed to reach a server.'
            print 'Reason: ', e.reason
        else:
            print 'blz...'
        
    def run(self):
        inicio = time.localtime()
        print 'Inicio as ' + str(inicio.tm_hour) + ':' + str(inicio.tm_min)
        fs = open(self.getEntryPath(), 'r')
        for line in fs:
            print('Endereco da Pagina N. [' + str(self.getNPagina()) + ']: '  + line)
            self.doDownload(line)
            self.incrementaPagina()
            time.sleep(15)
        fim = time.localtime()
        print 'Fim as ' + str(fim.tm_hour) + ':' + str(fim.tm_min)