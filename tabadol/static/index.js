let map;
let markers;

let geocoder;

let queryCenter;
let queryZoom;

function initMap() {
  console.log('InitMap')

  geocoder = new google.maps.Geocoder();

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 52.5200, lng: 13.4050 }, //We start at the center of Berlin
    zoom: 13,}
function getDefaultDrawingOptions() {
    return options;
}

function searchAddressSubmit() {
  console.log('searchAddressSubmit');

  const address = document.getElementById("search_address").value;
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK") {
      document.getElementById('addressHelpBlock').innerHTML="Perfect! Here are the results near you:";
      map.setZoom(15);
      map.setCenter(results[0].geometry.location);
    } else {
      console.log("Geocode was not successful for the following reason: " + status);
      document.getElementById('addressHelpBlock').innerHTML="Sorry! That search did not work, try again!";
    }
  });

  //prevent refresh
  return false;
}

function loadJSON(url, callback) {
  var xobj = new XMLHttpRequest();

