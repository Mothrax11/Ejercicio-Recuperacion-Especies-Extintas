import { React, useContext, useEffect, useState} from "react";
import { Button, Card, CardFooter, Modal, ModalBody } from "react-bootstrap";
import { Link } from "react-router";
import { EspeciesContext } from "./EspeciesProvider";

function EspeciesDatos(){
    const { especiesItem, setEspeciesItem } = useContext(EspeciesContext);
    const [formularioAbierto, setFormularioAbierto] = useState(false)
    const [busqueda, setBusqueda] = useState("");
    const [fechas, setFechas] = useState([]);
      const [indice, setIndice] = useState(0);

    const [nuevaEspecie, setNuevaEspecie] = useState({
        nombre: "",
        periodo: "",
        habitat: "",
        causas: "",
        imagen: "",
        tipo_animal: "",
    });

    useEffect(() => {
       const periodosUnicos = [];

        for (let i = 0; i < especiesItem.length; i++) {
            const periodo = especiesItem[i].periodo;
            if (!periodosUnicos.includes(periodo)) {
                periodosUnicos.push(periodo);
            }
        }
        setFechas(periodosUnicos);

        }, [especiesItem])

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if(name === "imagen") {
            const file = files[0];
            if (file){
                setNuevaEspecie({...nuevaEspecie, imagen: URL.createObjectURL(file)})
            }
        } else {
            setNuevaEspecie({...nuevaEspecie, [name]: value})
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const nueva = {
            ...nuevaEspecie,
            id: especiesItem.length + 1,
            causas: nuevaEspecie.causas.split(",").map(c => c.trim())
        };

        setEspeciesItem([...especiesItem, nueva]);

        setNuevaEspecie({
            nombre: "",
            periodo: "",
            habitat: "",
            causas: "",
            imagen: "",
            tipo_animal: "",
        });
        setFormularioAbierto(false);
    };

    const handleDelete = (id) => {
        const filtradas = especiesItem.filter(especie => especie.id !== id);
        setEspeciesItem(filtradas);
    }

    const handleChangeBuscar = (e) => {
        setBusqueda(e.target.value);
    };

    const especiesFiltradas = especiesItem.filter(especie =>
        especie.nombre.toLowerCase().includes(busqueda.toLowerCase()) && especie.periodo ===  fechas[indice]
    );

    console.log(fechas)

    const cambiarIndice = (e) => {
        setIndice(parseInt(e.target.value));
        
    };

    return(
        <>  
            
            <Modal show={formularioAbierto}>
                <ModalBody>
                    <form onSubmit={handleSubmit} style={{ marginTop: "4%" }}>
                        <input name="nombre" type="text" placeholder="Nombre" value={nuevaEspecie.nombre} onChange={handleChange} required />
                        <input name="periodo" type="text" placeholder="Periodo" value={nuevaEspecie.periodo} onChange={handleChange} required />
                        <input name="habitat" type="text" placeholder="Hábitat" value={nuevaEspecie.habitat} onChange={handleChange} required />
                        <input name="causas" type="text" placeholder="Causas (separadas por comas)" value={nuevaEspecie.causas} onChange={handleChange} required />
                        <input name="imagen" type="file" placeholder="Imagen" onChange={handleChange} required />
                        <input name="tipo_animal" type="text" placeholder="Tipo de animal" value={nuevaEspecie.tipo_animal} onChange={handleChange} required />
                        <button type="submit">Añadir especie</button>
                    </form>
                </ModalBody>
            </Modal>
            <div style={{ marginTop: "5%" }}>
                <input type="text" placeholder="Escribe el nombre de la especie que quieres buscar" value={busqueda} onChange={handleChangeBuscar} style={{ marginBottom: "20px", padding: "8px", width: "100%" }}/>
                 {fechas.length > 0 && (
                    <>
                        <input type="range" min="0" max={fechas.length - 1} step="1" value={indice} onChange={cambiarIndice} style={{ marginBottom: "20px", padding: "8px", width: "100%" }}/>
                        <p><strong>{fechas[indice]}</strong></p>
                    </>
                )}
                {especiesFiltradas.map((especie, index) => (
                    <Card key={index} style={{ marginTop: "20px" }}>
                        <Card.Img src={especie.imagen}></Card.Img>
                        <Card.Title as={Link} to={`/especie/${especie.id}`}>{especie.nombre}</Card.Title>
                        <Card.Body>
                            <p>
                                Periodo - {especie.periodo}
                            </p>
                            <p>
                                Habitat - {especie.habitat}
                            </p>
                            <p>
                            {especie.causas.length > 1 ? "Causas de su extinción:" : "Causa de su extinción:"}
                            <ul>
                                {especie.causas.map((causa, index) => ( 
                                    <li key={index}>{causa}</li>
                                ))}
                            </ul>
                            </p>
                        </Card.Body>
                        <CardFooter>
                            <Button style={{ marginTop: "5%", backgroundColor:"red" }} onClick={() => handleDelete(especie.id)} >
                                Eliminar Especie
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <Button style={{ marginTop: "5%" }} onClick={() => setFormularioAbierto(!formularioAbierto)}>
                Añadir Especie
            </Button>
        </>
    )       
}
export default EspeciesDatos;