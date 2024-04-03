import requests
import csv
from bs4 import BeautifulSoup

target = requests.get('https://www.advisorkhoj.com/mutual-funds-research/mutual-fund-category-monitor')
soup = BeautifulSoup(target.text, 'lxml')
table = soup.find('tbody')
rows = table.find_all('tr')

curr_row = [0 for i in range(11)]
file = open("MFroi.csv", 'w')
writer = csv.writer(file)

for row in rows:
    col = row.find_all('td')
    for i in range(11):
        curr_row[i] = col[i].text
    writer.writerow(curr_row)
file.close()