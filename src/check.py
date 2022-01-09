import json
 
f = open('./common.json')
f2 = open('./common2.json')
 
# returns JSON object as
# a dictionary
data = json.load(f)
data2 = json.load(f2)
 
# Iterating through the json
# list
new_common = []
for i in data2:
    if i in data:
        new_common.append(i)

 
# Closing file
f.close()
f2.close()
