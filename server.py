import bottle
import data
@bottle.route("/")
def setHTML():
    return bottle.static_file("index.html", root="")
@bottle.route("/style.css")
def setCSS():
    return bottle.static_file("style.css", root="")
    
@bottle.route("/app.js")
def setData():
    return bottle.static_file("app.js", root="")
@bottle.route("/loading.gif")
def setLoading():
    return bottle.static_file("Loading.gif", root="")
    
    
@bottle.route("/data")
def get_data():
    return data.get_data("https://corona.lmao.ninja/v2/states?sort&yesterday","https://coronavirus-19-api.herokuapp.com/countries","https://api.covidtracking.com/v1/us/daily.json")
    
    
bottle.run(host="0.0.0.0", port=8080, debug=True)