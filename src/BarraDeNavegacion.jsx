import { useContext, useState } from "react";
import { Container, Navbar, NavDropdown } from "react-bootstrap";
import { Link, replace } from "react-router";
import { EspeciesContext } from "./EspeciesProvider";



function Navegacion() {
    const {especiesItem} = useContext(EspeciesContext);
    const [arrayPeriodo, setArrayPeriodo] = useState([])
    const [arrayPeriodoSinEspacios, setArrayPeriodoSinEspacios] = useState([])

    for (let i = 0; i < especiesItem.length; i++){
        if(!arrayPeriodo.find((item) => item === especiesItem[i].periodo)){
            arrayPeriodo.push(especiesItem[i].periodo)
        }
    }

    for(let k = 0; k < arrayPeriodo.length; k++){
        let reemplazar = String(arrayPeriodo[k]).replaceAll(" ", "-")
        if(!arrayPeriodoSinEspacios.find((item) => item === reemplazar)){
            arrayPeriodoSinEspacios.push(reemplazar)
        }
        
    }

      console.log(especiesItem);

    return (
        <>
           {especiesItem && <Navbar bg="lightblue" expand="lg" className="w-100 mb-4 fixed-top" style={{backgroundColor:"black", color:"white"}}>
                <Container fluid>
                    <Navbar.Brand style={{color:"white"}}>
                        Especies del Mundo 
                    </Navbar.Brand>
                    <NavDropdown style={{marginRight:"200px"}}>
                        <NavDropdown.Item as={Link} to="/">Home</NavDropdown.Item>
                        {arrayPeriodoSinEspacios.map((currentPeriodoSinEspacios, index) => (
                            <NavDropdown.Item key={index} as={Link} to={`/especie/periodo/${currentPeriodoSinEspacios}`}>
                                {String(currentPeriodoSinEspacios).replaceAll("-", " ")}
                            </NavDropdown.Item>
                        ))}
                    </NavDropdown>
                </Container>
            </Navbar>
            }
           
        </>
    )
}

export default Navegacion;