import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useContext } from "react";
import { Link } from "react-router";
import { EspeciesContext } from "./EspeciesProvider";
import { Button, Container, Row, Col } from 'react-bootstrap';

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
    <Container fluid style={{ marginTop: "1rem" }}>
      <Row className="justify-content-center">
        <Col sm={2} md={4} lg={6}>
          <div style={{ height: "500px", width: "100%" }}>
            <MapContainer center={centro} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {coordenadasItem.map((currentCoord, index) => (
                <Marker key={index} position={currentCoord.coordenadas}>
                  <Popup>
                    <p>{currentCoord.region}</p>
                    {especiesItem.filter((especie) => 
                      especie.habitat.split(',').map((h) => h.trim()).includes(currentCoord.region)
                    ).map((especie, idx) => (
                      <p key={idx}>
                        <Button style={{color:"white"}} as={Link} to={`/especie/${especie.id}`}>
                          {especie.nombre}
                        </Button>
                      </p>
                    ))}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default MapaInteractivo;
