import React from "react";
import {
  CContainer, CRow, CCol, CCard, CCardBody, CCardTitle, CCardText, CImage
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";

// Importar imágenes correctamente
import rio from "../../../assets/images/rio.jpg";
import rio2 from "../../../assets/images/rio2.png";
import torbes from "../../../assets/images/torbes.jpg";
import rio3 from "../../../assets/images/rio3.png";

const newsPosts = [
  { id: 1, title: "🌊 Desbordamiento del río Torbes", description: "Lluvias En el sector Andrés Eloy Blanco municipio san cristóbal, el río Torbes se llevó la carretera principal de la comunidad, que arrasó con tuberías de agua potable, las cloacas y postes tras el aumento del caudal en medio del aguacero.  causado el desbordamiento.", image: rio },
  { id: 2, title: "🏠 Deslizamiento de tierra", description: "Un Al menos siete viviendas de la citada comunidad están a punto de caer al río, motivo por el cual, los residentes  ejercieron acciones de protesta y trancaron la Troncal 5 que comunica al Táchira con el estado Barinas, por varias horas, hecho que generó fuertes discusiones. (Jueves 10 de agosto del 2023)", image: rio2 },
  { id: 3, title: "🚨 Alerta por Derrumbes", description: "Expertos evaluarán Según los vecinos, en el sector La Playa, el río Torbes se salió de su cauce, mientras que en el barrio El Río se presentó una situación similar, pero por un caño y una laguna, hecho que hizo colapsar algunas alcantarillas. Bomberos de San Cristóbal y cuadrillas de la Alcaldía atendieron la emergencia. (10 de junio del 2024)", image: torbes },
  { id: 4, title: "🚨 Alerta en Barrio La Playa", description: "El sector la playa es una de las zonas de alto riesgo que han sido georeferenciadas por la dirección regional de protección civil pese a esto sus habitantes renuncian que con la llegada de las lluvias no han sido visitados por ningún organismo. (Martes 17 de mayo 2018)", image: rio3 },
];

const NewsModule = () => {
  return (
    <CContainer className="text-center mt-5">
      <CRow className="justify-content-center">
        {newsPosts.map((post) => (
          <CCol md={5} key={post.id} className="mb-4">
            <CCard className="p-3 shadow-lg border-0 hover-effect " style={{ maxWidth: "400px", textAlign: "justify" }}>
              <div className="image-container">
                <CImage
                  src={post.image}  // ✅ Ahora carga correctamente la imagen
                  className="d-block rounded"
                  alt={post.title}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              </div>
              <CCardBody>
                <CCardTitle className="fs-5 fw-bold">{post.title}</CCardTitle>
                <CCardText>{post.description}</CCardText>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </CContainer>
  );
};

export default NewsModule;