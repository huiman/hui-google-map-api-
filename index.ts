/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

function initMap(): void {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const map = new google.maps.Map(
    document.getElementById('map') as HTMLElement,
    {
      zoom: 6,
      center: { lat: 41.85, lng: -87.65 },
    }
  );

  directionsRenderer.setMap(map);

  (document.getElementById('submit') as HTMLElement).addEventListener(
    'click',
    () => {
      const date1 = new Date();
      calculateAndDisplayRoute(directionsService, directionsRenderer);
      const date2 = new Date();
      console.log('Time Usage: ', date2.getTime() - date1.getTime());
    }
  );
}

function calculateAndDisplayRoute(
  directionsService: google.maps.DirectionsService,
  directionsRenderer: google.maps.DirectionsRenderer
) {
  const waypts: google.maps.DirectionsWaypoint[] = [];
  const checkboxArray = document.getElementById(
    'waypoints'
  ) as HTMLSelectElement;

  for (let i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray.options[i].selected) {
      waypts.push({
        location: (checkboxArray[i] as HTMLOptionElement).value,
        stopover: true,
      });
    }
  }

  directionsService
    .route({
      origin: { lat: 13.775446, lng: 100.542826 }, // (document.getElementById('start') as HTMLInputElement).value,
      destination: { lat: 13.775446, lng: 100.542826 }, // (document.getElementById('end') as HTMLInputElement).value,
      waypoints: [
        {
          location: { lat: 13.7980656824271, lng: 100.587612791324 },
          stopover: true,
        },
        {
          location: { lat: 13.8383055183821, lng: 100.593774113492 },
          stopover: true,
        },
        // {location:{ lat: 18.7724556365889, lng: 98.9748212711639},stopover: true},
        {
          location: { lat: 13.4274316425287, lng: 101.035628571165 },
          stopover: true,
        },
        {
          location: { lat: 13.7675357946759, lng: 100.651200826864 },
          stopover: true,
        },
        {
          location: { lat: 13.6582539901728, lng: 100.659906597456 },
          stopover: true,
        },
        {
          location: { lat: 14.1828301435354, lng: 100.620430686508 },
          stopover: true,
        },
        { location: { lat: 14.2523913653773, lng: 100.59048 }, stopover: true },
        {
          location: { lat: 14.0032669316271, lng: 100.515057870643 },
          stopover: true,
        },
        {
          location: { lat: 13.7575545997164, lng: 100.5732497 },
          stopover: true,
        },
        {
          location: { lat: 13.7288689578804, lng: 100.550050228084 },
          stopover: true,
        },
        {
          location: { lat: 13.9304578664369, lng: 99.7620196257962 },
          stopover: true,
        },
        {
          location: { lat: 13.8775762865885, lng: 100.434853453445 },
          stopover: true,
        },
        {
          location: { lat: 13.7746538720243, lng: 100.543084052063 },
          stopover: true,
        },
        {
          location: { lat: 13.8990931823214, lng: 100.526669696294 },
          stopover: true,
        },
        {
          location: { lat: 13.7924284748869, lng: 100.550112026786 },
          stopover: true,
        },
        {
          location: { lat: 13.7366043163183, lng: 100.744626371165 },
          stopover: true,
        },
        {
          location: { lat: 13.8698310966416, lng: 99.8184905712225 },
          stopover: true,
        },
        {
          location: { lat: 13.8698310966416, lng: 99.8185120288947 },
          stopover: true,
        },
        {
          location: { lat: 13.7975119055118, lng: 100.55601354296 },
          stopover: true,
        },
        {
          location: { lat: 13.9939235656496, lng: 100.634615675006 },
          stopover: true,
        },
        {
          location: { lat: 13.8366630350177, lng: 100.569634870776 },
          stopover: true,
        },
        {
          location: { lat: 13.3553176419677, lng: 101.022251955826 },
          stopover: true,
        },
        {
          location: { lat: 13.5370828984111, lng: 100.654698997399 },
          stopover: true,
        },
        {
          location: { lat: 13.4123599165152, lng: 100.022719071165 },
          stopover: true,
        },
      ],
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      console.log(
        '-',
        (document.getElementById('start') as HTMLInputElement).value
      );
      directionsRenderer.setDirections(response);

      const route = response.routes[0];
      const summaryPanel = document.getElementById(
        'directions-panel'
      ) as HTMLElement;

      summaryPanel.innerHTML = '';

      // For each route, display summary information.
      for (let i = 0; i < route.legs.length; i++) {
        const routeSegment = i + 1;

        summaryPanel.innerHTML +=
          '<b>Route Segment: ' + routeSegment + '</b><br>';
        summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
        summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
        summaryPanel.innerHTML += route.legs[i].distance!.text + '<br><br>';
      }
    })
    .catch((e) => window.alert('Directions request failed due to ' + status));
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
