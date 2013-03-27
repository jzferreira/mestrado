#!/usr/bin/env python
# encoding: utf-8

def main():
	#pathInputFile = '/Users/javferre/Mestrado/Crawlers/nodejs/cnnMoney.txt'
	pathInputFile =  'cnnMoney.txt'
	#pathInputFile = '/Users/javferre/Desktop/newcnnMoney.txt'
	fs = open(pathInputFile, 'r')
	newlines = []
	for line in fs:
		if 'magazines/fortune/' in line:
			pass
		elif '/magazines/moneymag/' in line:
			pass
		elif 'com/1996' in line:
			pass
		elif 'com/1997' in line:
			pass
		elif 'com/1998' in line:
			pass
		elif '/1999/' in line:
			pass
		elif '/2000/' in line:
			pass
		elif '/2001/' in line:
			pass
		elif '/2002/' in line:
			pass
		elif '/2003/' in line:
			pass
		elif '/2004/' in line:
			pass
		elif '/2005/' in line:
			pass
		elif '/2006/' in line:
			pass
		elif '/2007/' in line:
			pass
		elif 'eeds.feedburner.com' in line:
			pass
		elif 'http://money.cnn.com/galleries/galleryLauncher.exclude.h' in line:
			pass
		elif '/2008/' in line:
			pass
		elif '/2009/' in line:
			pass
		else:
			newlines.append(line)

	print ''.join(newlines)

if __name__ == '__main__':
	main()