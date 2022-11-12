import pymongo
import csv
import pprint

MONGO_URL = 'mongodb://localhost:27017'

client = pymongo.MongoClient(MONGO_URL)
db = client.mso
with open('ads.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        db.ads.insert_one(row)

with open('companies.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        db.companies.insert_one(row)

