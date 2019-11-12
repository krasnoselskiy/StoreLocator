import L from 'leaflet';

var LeafIcon = L.Icon.extend({
  options: {
    shadowUrl: 'leaf-shadow.png',
    iconSize: [50, 60],
    iconAnchor: [3, -20],
    popupAnchor: [3, -20]
  }
});

var yellowIcon = new LeafIcon({ iconUrl: require('../../assets/yellow-icon.png') }),
  greenIcon = new LeafIcon({ iconUrl: require('../../assets/green-icon.png') })

export { yellowIcon, greenIcon };