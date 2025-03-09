import json

class JsonReader:
    
    # return json object as dictionary
    def open(self):
        with open('data.json', 'r') as file:
            data = json.load(file)
            
            for i in data['']:
                return i
            
        file.close()