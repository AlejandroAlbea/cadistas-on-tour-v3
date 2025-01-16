import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './styles.css'; // Asegúrate de que esta ruta sea correcta

export const Formulario = () => {
  const form = useRef();
  const [accompaniments, setAccompaniments] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addAccompaniment = () => {
    if (accompaniments.length < 9) {
      setAccompaniments([
        ...accompaniments,
        { id: accompaniments.length + 1, name: '', phone: '' },
      ]);
    } else {
      alert('No puedes añadir más de 9 acompañantes.');
    }
  };

  const removeAccompaniment = (id) => {
    setAccompaniments(accompaniments.filter((accomp) => accomp.id !== id));
  };

  const handleAccompanimentChange = (id, field, value) => {
    setAccompaniments(
      accompaniments.map((accomp) =>
        accomp.id === id ? { ...accomp, [field]: value } : accomp
      )
    );
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Deshabilitar el botón

    emailjs
      .sendForm('service_whwasce', 'template_nafkbxa', form.current, 'OmUeUSAm_7CdGuw_Z')
      .then(
        () => {
          setAlertVisible(true); // Mostrar la alerta
          setIsSubmitting(false); // Habilitar el botón nuevamente

          // Restablecer los campos del formulario
          form.current.reset(); // Limpia los campos del formulario
          setAccompaniments([]); // Eliminar los acompañantes añadidos
        },
        (error) => {
          alert('Error al enviar la reserva: ' + error.text);
          setIsSubmitting(false); // Habilitar el botón si hay error
        }
      );
  };

  const closeAlert = () => {
    setAlertVisible(false); // Cerrar la alerta
  };

  return (
    <div className="container">
      {/* Alerta global */}
      {alertVisible && (
        <div className="alert">
          <p>Reserva enviada con éxito.</p>
          <button onClick={closeAlert}>Cerrar</button>
        </div>
      )}

      <div className="logo-container">
              </div>
      <h3>Reserva plaza para tus desplazamientos.</h3>
      <form ref={form} onSubmit={sendEmail}>
        <div className="field">
          <label htmlFor="transport">Desplazamiento</label>
          <select name="transport" required>
            <option value="Albacete">Albacete</option>
            <option value="Málaga">Málaga</option>
            <option value="Córdoba">Córdoba</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="user_name">Nombre completo</label>
          <input type="text" name="user_name" id="user_name" required />
        </div>

        <div className="field">
          <label htmlFor="telefono">Número de teléfono</label>
          <input type="tel" name="telefono" id="telefono" required />
        </div>

        <div className="field">
          <label htmlFor="user_email">Correo electrónico</label>
          <input type="email" name="user_email" id="user_email" required />
        </div>

        <div className="field">
          <label htmlFor="usuario_x">Usuario X (opcional)</label>
          <input type="text" name="usuario_x" id="usuario_x" />
        </div>

        <h4>Acompañantes</h4>
        {accompaniments.map((accomp) => (
          <div key={accomp.id} className="field-group">
            <div className="field">
              <label>Nombre del acompañante {accomp.id}</label>
              <input
                type="text"
                name={`accompaniment_name_${accomp.id}`}
                value={accomp.name}
                onChange={(e) =>
                  handleAccompanimentChange(accomp.id, 'name', e.target.value)
                }
                required
              />
            </div>
            <div className="field">
              <label>Teléfono del acompañante {accomp.id}</label>
              <input
                type="tel"
                name={`accompaniment_phone_${accomp.id}`}
                value={accomp.phone}
                onChange={(e) =>
                  handleAccompanimentChange(accomp.id, 'phone', e.target.value)
                }
                required
              />
            </div>
            <button
              type="button"
              className="remove-button"
              onClick={() => removeAccompaniment(accomp.id)}
            >
              Quitar
            </button>
          </div>
        ))}

        <button type="button" onClick={addAccompaniment} className="add-button">
          Añadir acompañante
        </button>

        <input
          type="submit"
          id="button"
          value="Enviar Reserva"
          disabled={isSubmitting} // Deshabilitar el botón si está enviando
        />
      </form>
    </div>
  );
};
