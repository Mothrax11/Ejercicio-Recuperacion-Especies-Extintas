import { useContext, useState, useEffect     } from "react";
import { Container, Navbar, NavDropdown, Col, Row } from "react-bootstrap";
import { Link } from "react-router";
import { EspeciesContext } from "./EspeciesProvider";

function Navegacion() {
    const {especiesItem} = useContext(EspeciesContext);
    const [arrayPeriodo, setArrayPeriodo] = useState([])
    const [arrayPeriodoSinEspacios, setArrayPeriodoSinEspacios] = useState([])

    const [arrayHabitat, setArrayHabitat] = useState([]);
    const [arrayHabitatDesglosado, setArrayHabitatDesglosado] = useState([]);

    useEffect(() => {
        const periodosUnicos = [];
        const habitatsUnicos = [];

        for (let i = 0; i < especiesItem.length; i++) {
            const especie = especiesItem[i];

            if (!periodosUnicos.includes(especie.periodo)) {
                periodosUnicos.push(especie.periodo);
            }

            const habitatsSeparados = especie.habitat.split(",");
            for (let j = 0; j < habitatsSeparados.length; j++) {
                const habitatLimpio = habitatsSeparados[j].trim();
                if (!habitatsUnicos.includes(habitatLimpio)) {
                    habitatsUnicos.push(habitatLimpio);
                }
            }
        }
        setArrayPeriodo(periodosUnicos);
        setArrayPeriodoSinEspacios(periodosUnicos.map(p => p.replaceAll(" ", "-")));
        
        setArrayHabitat(habitatsUnicos);
        setArrayHabitatDesglosado(habitatsUnicos.map(h => h.replaceAll(" ", "-")));
    }, [especiesItem]);
      

    return (
        <>
            {especiesItem && (
                <Navbar bg="lightblue" expand="lg" className="w-100 mb-4 fixed-top" style={{ backgroundColor: "black", color: "white" }}>
                    <Container fluid>
                        <Row className="w-100">
                            <Col sm={6} md={4} lg={2} className="d-flex align-items-center">
                                <Navbar.Brand as={Link} to="/" style={{ color: "white" }}>
                                    Especies del Mundo
                                </Navbar.Brand>
                            </Col>
                            <Col sm={6} md={4} lg={2}>
                                <NavDropdown title="Periodo" className="w-100" style={{ marginRight: "200px" }}>
                                    <NavDropdown.Item as={Link} to="/">Todos</NavDropdown.Item>
                                    {arrayPeriodoSinEspacios.map((currentPeriodoSinEspacios, index) => (
                                        <NavDropdown.Item key={index} as={Link} to={`/especie/periodo/${currentPeriodoSinEspacios}`}>
                                            {String(currentPeriodoSinEspacios).replaceAll("-", " ")}
                                        </NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                            </Col>
                            <Col sm={6} md={4} lg={2}>
                                <NavDropdown title="Hábitat" className="w-100" style={{ marginRight: "20px" }}>
                                    <NavDropdown.Item as={Link} to="/">Todos</NavDropdown.Item>
                                    {arrayHabitatDesglosado.map((currentHabitatSinEspacios, index) => (
                                        <NavDropdown.Item key={index} as={Link} to={`/especie/habitat/${currentHabitatSinEspacios}`}>
                                            {currentHabitatSinEspacios.replaceAll("-", " ")}
                                        </NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                            </Col>
                        </Row>
                    </Container>
                </Navbar>
            )}
        </>
    )
}

export default Navegacion;