  var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

  function chooseColour (magnitude){
    if (magnitude > 4){
      return "FireBrick"
    } else if (magnitude >= 3){
      return "Crimson"
    }else if (magnitude >= 2){
      return "orange"
    }else if (magnitude >= 1){
      return "yellow"
    }else {
      return "Green"
    }
  }
 
d3.json(queryUrl, function(data) {
    
    createFeatures(data.features);
  });

  function createFeatures(earthquakeData) {
  var earthquakes = L.geoJSON(earthquakeData,{
    pointToLayer: function (feature, latlng){
      return L.circle(latlng, {
        radius: feature.properties.mag *50000,
        fillColor: chooseColour(feature.properties.mag),
        fillOpacity: 0.75,
        stroke: false
      }).bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }
  });
  
    createMap(earthquakes);
  }
  
  function createMap(earthquakes) {
   
      var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        accessToken: "pk.eyJ1IjoibHVqYW5lOTIiLCJhIjoiY2thb2llZTFvMDJzMjJ3cWlvNHgwYmo1cSJ9.ASSry7Qp6PrHNQifvyRj2w"

    });
  
  
    var baseMaps = {
      "Street Map": streetmap
    };
  
    var overlayMaps = {
      Earthquakes: earthquakes
    };
  
    
    var myMap = L.map("map", {
      center: [
        30.09, -15.71
      ],
      zoom: 2.5,
      layers: [streetmap, earthquakes]
    });
  
    
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  }
