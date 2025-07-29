import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import "./style.css";

const Cardd = ({ nombre }) => {
  const [energia, setEnergia] = useState(100);
  const [felicidad, setFelicidad] = useState(100);
  const [hambre, setHambre] = useState(0);
  const [audio, setAudio] = useState(true);
  const [condition, setCondition] = useState(false);

  const images = [
    "../../public/Imagen pegada (2).png",
    "../../public/Comiendo.png",
    "../../public/durmiendo.png",
    "../../public/Imagen pegada.png",
    "../../public/ChatGPT_Image_24_jun_2025__12_49_23-removebg-preview.png",
  ];

  const [current, setCurrent] = useState(images[0]);
  useEffect(() => {
    if (felicidad <= 0 || energia <= 0 || hambre > 96) {
      decir(`Tu Tamagotchi ${nombre} se ha ido 🪦`)
      setCondition(true);
    }

    if (condition == false) {
      hambre == 50 && audio == true ? decir("Tengo Hambre") : "";
      energia == 50 && audio ? decir("Estoy Cansado") : "";
      felicidad == 50 && audio ? decir("No estoy feliz") : "";
      hambre == 80 && audio
        ? decir("Tengo Mucha hambre, dame comida por favor")
        : "";
      energia == 20 && audio ? decir("Estoy muy cansado, ayuda por favor") : "";
      felicidad == 20 && audio
        ? decir("Estoy muy triste, ayuda por favor")
        : "";
      hambre == 5 && audio ? decir("Estoy lleno") : "";
      energia == 100 && audio ? decir("Tengo energía") : "";
      felicidad == 100 && audio ? decir("Estoy feliz") : "";
    }

    const id = setInterval(() => {
      condition == true
        ? setEnergia(energia)
        : setEnergia((energia) => energia - 1);
      condition == true
        ? setFelicidad(felicidad)
        : setFelicidad((felicidad) => felicidad - 2);
      condition == true ? setHambre(hambre) : setHambre((hambre) => hambre + 5);
    }, 3000);
    return () => clearInterval(id);
  }, [energia, felicidad, hambre, condition, audio]);

  const tiempo = (num) => {
    setCurrent(images[num]);
    setTimeout(() => {
      setCurrent(images[0]);
    }, 1000);
  };

  const reiniciar = () => {
    setEnergia(100);
    setFelicidad(100);
    setHambre(0);
    setCondition(false);
  };

  const decir = (texto) => {
    const voz = new SpeechSynthesisUtterance(texto);
    voz.lang = "es-ES";
    voz.pitch = 1.5;
    window.speechSynthesis.speak(voz);
  };

  return (
    <>
      <Card
        className="mx-auto  bg-dark text-light rounded-5 border border-5 border-secondary "
        border="secondary"
        style={{ width: "40rem" }}
      >
        <Card.Body>
          <Card.Title className="fs-5">
            {condition == true
              ? `Tu Tamagotchi ${nombre} se ha ido 🪦`
              : nombre}
          </Card.Title>
          <div className={`${condition == true ? "fondoded" : "fondo"}`}>
            <Card.Img
              variant="top"
              className="image"
              src={condition == true ? images[4] : current}
            />
          </div>
          <label className="d-flex mt-3 ">Energía ⚡</label>
          <ProgressBar
            striped
            variant="primary"
            label={`${energia} %`}
            now={energia}
          />
          <br />
          <label className="d-flex">Hambre 😋</label>
          <ProgressBar
            striped
            variant="danger"
            label={`${hambre} %`}
            now={hambre}
          />
          <br />
          <label className="d-flex ">Felicidad 😁</label>
          <ProgressBar
            striped
            variant="warning"
            label={`${felicidad} %`}
            now={felicidad}
          />

          {/* BOTONES */}
          <div>
            <div className="mt-4 w-40 float-end">
              <Button
                disabled={condition == true ? true : false}
                variant="primary"
                className=" rounded-circle boton"
                onClick={() => {
                  energia >= 85 ? setEnergia(100) : setEnergia(energia + 15);
                  setHambre(hambre + 5);
                  tiempo(2);
                }}
              >
                😴
              </Button>
              <div className="d-flex">
                <Button
                  disabled={condition == true ? true : false}
                  variant="danger me-5"
                  className=" rounded-circle   boton"
                  onClick={() => {
                    hambre <= 10 ? setHambre(0) : setHambre(hambre - 10);
                    tiempo(1);
                  }}
                >
                  🍝
                </Button>
                <Button
                  disabled={condition == true ? true : false}
                  variant="warning "
                  className=" rounded-circle position-relative start-17  boton "
                  onClick={() => {
                    felicidad >= 85
                      ? setFelicidad(100)
                      : setFelicidad(felicidad + 10);
                    setEnergia(energia - 5);
                    tiempo(3);
                  }}
                >
                  ⚽
                </Button>
              </div>
            </div>
            <i className="bi bi-dpad fs-7"></i>
          </div>
          <div className="d-flex justify-content-center ">
            <Button
              className=" ovalo boton btn btn-secondary"
              onClick={() => setAudio(!audio)}
            >
              Audio
            </Button>
            <Button
              className=" ovalo boton btn btn-secondary"
              onClick={reiniciar}
            >
              Reset
            </Button>
          </div>
        </Card.Body>
      </Card>
      <br />
    </>
  );
};
export default Cardd;
