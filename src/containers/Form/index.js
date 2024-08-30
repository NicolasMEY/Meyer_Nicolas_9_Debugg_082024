import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  // const [name, setName] = useState("");
  // const [surname, setSurname] = useState("");
  // const [email, setEmail] = useState("");
  // const [selection, setSelection] = useState("");
  // const [message, setMessage] = useState("");
  // const [error, setError] = useState("");
  // const [success, setSuccess] = useState(false);

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();

      // Validation des champs
      // if (!name || !surname || !email || !selection || !message) {
      //   setError("Veuillez remplir tous les champs !");
      //   // Supprimer l'erreur aprés 1 seconde
      //   setTimeout(() => {
      //     setError("");
      //   }, 1000);
      //   return;
      // }

      setSending(true);
      // setError(""); // Réinitialiser le message d'erreur avant l'envoi

      // We try to call mockContactApi
      try {
        await mockContactApi();
        // setSucess(true); // Réinitialiser le succès
        setSending(false);
        // Réinitialiser les champs du formulaire aprés succès
        // setName("");
        // setSurname("");
        // setEmail("");
        // setSelection("");
        // setMessage("");

        onSuccess(); // Appel de onSuccess après le succès de l'API
      } catch (err) {
        setSending(false);
        // setSuccess(false); // Assurer que le succès est réinitialisé
        onError(err);
      }
    },
    // [name, surname, email, selection, message, onSuccess, onError]
    [onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field
            placeholder=""
            label="Nom"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
          />
          <Field
            placeholder=""
            label="Prénom"
            // value={surname}
            // onChange={(e) => setSurname(e.target.value)}
          />
          <Select
            selection={["Personnel", "Entreprise"]}
            // value={selection}
            // onChange={(newValue) => setSelection(newValue)}
            // // onChange={(e) => setSelection(e.target.value)}
            onChange={() => null}
            label="Personnel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field
            placeholder=""
            label="Email"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            // value={message}
            // onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
      {/* {error && <div className="error">{error}</div>} */}
      {/* Affichage du message d'erreur */}
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
