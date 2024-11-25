// Inisialisasi peta
var map = L.map('map').setView([-7.80, 112.10], 10.4); // Koordinat pusat Kediri

// Tambahkan basemap dari OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Tambahkan layer polygon dari GeoServer
var polyLayer = L.tileLayer.wms('http://localhost:8080/geoserver/pgweb_acara_10/wms', {
    layers: 'pgweb_acara_10:batas_admin', // Sesuaikan nama layer
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer'
}).addTo(map);

// Tambahkan layer polyline dari GeoServer
var lineLayer = L.tileLayer.wms('http://localhost:8080/geoserver/Jaringan_jalan/wms', {
    layers: 'Jaringan_jalan:jln_OutputJaringan_jalan:jln_Output', // Sesuaikan nama layer
    format: 'image/png',
    transparent: true,
    attribution: 'GeoServer'
}).addTo(map);

// Tambahkan legend pada WebGIS
var layerLegend = L.Geoserver.legend("http://localhost:8080/geoserver/pgweb_acara_10/wms?service=WMS&version=1.1.0&request=GetMap&layers=pgweb_acara_10%3Abatas_admin&bbox=108.55542755126964%2C-8.21277713775629%2C111.69287872314452%2C-5.725278854370082&width=768&height=608&srs=EPSG%3A4326&styles=&format=application/openlayers", {
    layers: "pgweb_acara_10:batas_admin",
    // style: stylefile,
  });

  // Tambahkan kontrol layer
var overlayMaps = {
    "Wilayah Desa (Poligon)": polyLayer,
    "Jaringan Jalan (Polyline)": lineLayer
};
L.control.layers(null, overlayMaps).addTo(map);