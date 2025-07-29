import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Cardd from "./Tarjeta";

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [name, setName] = useState("Tamagotchi");
  const ChangeName = (e) => {
    setName(e.target.value);
  };
  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <>
      <Cardd nombre={name} />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Que nombre le quieres colocar a tu Tamagotchi?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label htmlFor="inputPassword5">Nombre</Form.Label>
            <Form.Control
              type="text"
              onChange={ChangeName}
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              required={true}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="dark" type="submit" onClick={handleClose}>
              Cerrar
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
