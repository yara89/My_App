let map, infoWindow, markers;

// Initialize and add the map
      function initMap() {
        // The location of Berlin
      const berlin = { lat: 52.5200, lng: 13.4050};
        // The map, centered at Berlin
         const map = new google.maps.Map(document.getElementById("map"), {
         zoom: 11,
         center: berlin,
         // disabling some controls. Reference: https://developers.google.com/maps/documentation/javascript/controls
         streetViewControl: false,
         fullscreenControl: false,
         mapTypeControl: false,
         mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      // The marker, positioned at Berlin
      // Create an array of alphabetical characters used to label the markers.
      const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      // Add some markers to the map.
      const markers = locations.map((location, i) => {
        return new google.maps.Marker({
          position: location,
          //map: map,
          label: labels[i % labels.length],
         });
      });
      // Add a marker clusterer to manage the markers.
      new MarkerClusterer(map, markers, {
            imagePath:
              "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
      });
    }
    const locations = [
          { lat: 52.5200, lng: 13.4050 },
          { lat: 52.5194, lng: 13.3868 },
          { lat: 52.5221, lng: 13.4102 },
          { lat: 52.4802, lng: 13.4279 },
    ];

      var mapStyles = [
          {
              "featureType": "administrative",
              "stylers": [ { "visibility": "off" } ]
          },{
              "featureType": "road",
              "elementType": "labels",
              "stylers": [ { "visibility": "off" } ]
          },{
              "featureType": "road",
              "elementType": "geometry.stroke",
              "stylers": [ { "visibility": "off" } ]
          },{
              "featureType": "transit",
              "stylers": [ { "visibility": "off" } ]
          },{
              "featureType": "poi.attraction",
              "stylers": [ { "visibility": "off" } ]
          },{
              "featureType": "poi.business",
              "stylers": [ { "visibility": "off" } ]
          },{
              "featureType": "poi.government",
              "stylers": [ { "visibility": "off" } ]
          },{
              "featureType": "poi.medical",
              "stylers": [ { "visibility": "off" } ]
          },{
              "featureType": "poi.park",
              "elementType": "labels",
              "stylers": [ { "visibility": "off" } ]
          },{
              "featureType": "poi.place_of_worship",
              "stylers": [ { "visibility": "off" } ]
          },{
              "featureType": "poi.school",
              "stylers": [ { "visibility": "off" } ]
          },{
              "featureType": "poi.sports_complex",
              "stylers": [ { "visibility": "on" },
                            { "color": "#c9e7c9" } ]
          },{
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
                { "visibility": "on" },
                { "color": "#ffffff" }
            ]
          },{
              "featureType": "landscape.man_made",
              "stylers": [
                  { "visibility": "on" },
                  { "color": "#dbdbdb" }
              ]
          },{
              "featureType": "landscape.natural",
              "elementType": "labels",
              "stylers": [ { "visibility": "off" } ]
          }
        ];
        map.setOptions({ styles: mapStyles });

    }


function showOffers(post) {
  //to display information below after marker is selected
  const card = document.querySelector(".offer-card");
  card.toggleAttribute("hidden");
  document.getElementById("title").textContent = post.title;
  document.getElementById("userName").textContent = post.user_name;
  document.getElementById("offerType").textContent = post.offer_type;
  document.getElementById("address").textConent = post.address;
  document.getElementById("content").textContent = post.content;
  document.getElementById(
    "view-offer"
  ).href = `http://127.0.0.1:5000/post/${post.id}`;
}

function searchAddress(geocoder, resultsMap) {
  const address = document.getElementById("address").value;
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK") {
      resultsMap.setCenter(results[0].geometry.location);
      resultsMap.setZoom(12);
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}


// Initialize and add the map without marker

/*let map;

function initMap() {
  console.log('InitMap')
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 52.5200, lng: 13.4050 },
    zoom: 10,
  });
}*/


// Initialize and add the map without marker

/*let map;

function initMap() {
  console.log('InitMap')
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 52.5200, lng: 13.4050 },
    zoom: 10,
  });
}*/
