import { React, useContext, useState, useEffect} from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import { EspeciesContext } from "./EspeciesProvider";
import { useParams, Link } from "react-router";

function EspecieFiltradaDatos (){

    const {especiesItem} = useContext(EspeciesContext)
    const {periodo, habitat} = useParams()
    const [especiesFiltradas, setEspeciesFiltradas]  = useState([])

    useEffect(() => {
       let filtradas = especiesItem;
       
        if (periodo) {
            const periodoFormateado = String(periodo).replaceAll("-", " ");
            filtradas = filtradas.filter((especie) =>
                especie.periodo.includes(periodoFormateado)
            );
        }

        if (habitat) {
            const habitatFormateado = String(habitat).replaceAll("-", " ");
            filtradas = filtradas.filter((especie) =>
                especie.habitat.includes(habitatFormateado)
            );
        }
        setEspeciesFiltradas(filtradas);
    }, [especiesItem, periodo, habitat]);



    
    return (
        <div style={{ marginTop: "2%" }}>
            <Container>
                <Row className="justify-content-center">
                    {especiesFiltradas.map((especie, index) => (
                        <Col key={index} sm={2} md={4} lg={6}>
                            <Card style={{ marginTop: "20px" }}>
                                <Card.Img src={`/${especie.imagen}`} />
                                <Card.Title as={Link} to={`/especie/${especie.id}`}>
                                    {especie.nombre}
                                </Card.Title>
                                <Card.Body>
                                    <p>Periodo - {especie.periodo}</p>
                                    <p>Habitat - {especie.habitat}</p>
                                    <p>
                                        {especie.causas.length > 1 ? "Causas de su extinción:" : "Causa de su extinción:"}
                                        <ul>
                                            {especie.causas.map((causa, i) => (
                                                <li key={i}>{causa}</li>
                                            ))}
                                        </ul>
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default EspecieFiltradaDatos;