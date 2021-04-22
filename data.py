from urllib.request import Request, urlopen
import json
from datetime import datetime
def get_data(url,url2,url3):
    req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    webpage=urlopen(req).read()
    stateData=json.loads(webpage)
    req = Request(url2, headers={'User-Agent': 'Mozilla/5.0'})
    webpage=urlopen(req).read()
    conturyData=json.loads(webpage)
    req = Request(url3, headers={'User-Agent': 'Mozilla/5.0'})
    webpage=urlopen(req).read()
    pastData=json.loads(webpage)
    dic={}
    for i in conturyData:
        if i["country"] == "USA":
            dic[i["country"]]={
                "totalCase":i["cases"],
                "todayCases":i["todayCases"],
                "deaths":i["deaths"],
                "recover":i["recovered"],
        }
            break   
    for i in stateData:
        dic[i["state"]]={
            "totalCase":i["cases"],
            "todayCases":i["todayCases"],
            "deaths":i["deaths"],
            "recover":i["recovered"],
            "population":i["population"]
        }
    dic['pastDic']=[["date","positive","positiveIncrease","death","deathIncrease"]]
    for i in pastData:
        date = datetime.strptime(str(i['date']), '%Y%m%d').strftime('%m/%d/%Y')
        dic['pastDic'].append([date,i["positive"],i['positiveIncrease'],i['death'],i['deathIncrease']])
    return (json.dumps(dic))
print(get_data("https://corona.lmao.ninja/v2/states?sort&yesterday","https://coronavirus-19-api.herokuapp.com/countries","https://api.covidtracking.com/v1/us/daily.json"))
