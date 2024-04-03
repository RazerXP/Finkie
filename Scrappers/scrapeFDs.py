import requests
import csv
from bs4 import BeautifulSoup

target = requests.get('https://www.paisabazaar.com/fixed-deposit/')
soup = BeautifulSoup(target.text, 'lxml')
table = soup.find('tbody')
rows = table.find_all('tr')

curr_row = [0, 0, 0, 0, 0]
file = open("FDrates.csv", 'w')
writer = csv.writer(file)

for row in rows:
    col = row.find_all('td')
    if(len(col)==2):
        curr_row[0] = (col[0].text)
        continue
    elif(len(col)==4):
        for i in range(4):
            curr_row[i+1] = (col[i].text)
    else:
        for i in range(5):
            curr_row[i] = (col[i].text)
    writer.writerow(curr_row)
file.close()