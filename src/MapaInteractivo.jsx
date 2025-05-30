import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import {  React, useContext, useState, useEffect} from "react";
import { Link } from "react-router";
import { EspeciesContext } from "./EspeciesProvider";
import { Button } from 'react-bootstrap';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


function MapaInteractivo() {
  const {coordenadasItem, setCoordenadasItem} = useContext(EspeciesContext);
  const {especiesItem, setEspeciesItem} = useContext(EspeciesContext);
  const centro = [43.551, -5.920]
  return (
    <MapContainer center={centro} zoom={13} scrollWheelZoom={false} style={{ height: "500px", width: "70%" }}>
      <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {coordenadasItem.map((currentCoord, index) => (
        
          <Marker key={index} position={currentCoord.coordenadas}>
          <Popup>
            <p>{currentCoord.region}</p>
            {especiesItem.filter((especie) => 
              especie.habitat.split(',').map((h) => h.trim()).includes(currentCoord.region)).map((especie, index) => (
                <p key={index}><Button style={{color:"white"}} as={Link} to={`/especie/${especie.id}`}>{especie.nombre}</Button></p>
              )
            )}
          </Popup>
          </Marker>
      ))}
    </MapContainer>
  );
}

export default MapaInteractivo;
