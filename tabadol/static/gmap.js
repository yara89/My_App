let map, infoWindow, markers;

// Initialize and add the map
    function initMap() {
      // fetch URL variables:
      const fetchURLBase = "http://localhost:5000/";
      const username = document.getElementById("username").innerText;
      const updates = document.getElementById("updates").innerText;

      const getUpdatesFunction = async () => {

        const URL = `${fetchURLBase}api/${username}/updates/requests`;
        console.log(URL);
        try {

       const response = await fetch(URL, { mode: "cors" });
      // console.log(response.headers.values());
       const updatesAndLocation = await response.json();
       console.log(updatesAndLocation);
        // The location of somewhere in Berlin
        const berlin = { lat: 52.5200, lng: 13.4050};
        // The location of user
        const userLocation = updatesAndLocation.location;

        // The map, centered at Berlin
         const map = new google.maps.Map(document.getElementById("map"), {
         zoom: 11,
         center: berlin,
             // disabling some controls. Reference: https://developers.google.com/maps/documentation/javascript/controls
         streetViewControl: false,
         fullscreenControl: true,
         mapTypeControl: false,
         mapTypeId: google.maps.MapTypeId.ROADMAP
        });

      // get each update and make a marker out of it!
      updatesAndLocation.data.map(update => {
        createMarker(update)
      })

      function createMarker(place) {
        console.log(place);
        lat = place.location.lat;
        lng = place.location.lng;

        const contentString = "<div>" +
        "<strong>" + place.title + "</strong><br>" +
        "<span>Latitude: " + lat + "</span><br>" +
        "<span>Longitude: " + lng + "</span>" +
        "</div>";

        const infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        // The marker, positioned at Berlin
        const markers = new google.maps.Marker({
          position: place.location,
          map: map,
        });

        marker.addListener("click", () => {
          infowindow.open(map, marker);
        })
      }

    } catch(err) {
      console.log(err);
    }
  }


  getUpdatesFunction();
}

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
              "stylers": [ { "visibility": "on" } ]
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
              "stylers": [ { "visibility": "on" } ]
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
  //when clicked i want to display information below
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
