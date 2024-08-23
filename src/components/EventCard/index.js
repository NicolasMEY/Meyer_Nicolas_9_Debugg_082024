import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const EventCard = ({
  imageSrc,
  imageAlt,
  date,
  // = new Date(),
  title,
  label,
  small = false,
  ...props
}) => {
  const formattedDate = new Date(date); // Convertir la date si nécessaire
  const monthName = getMonth(formattedDate); // Utilise la fonction getMonth pour obtenir le mois en français

  return (
    <div
      data-testid="card-testid"
      className={`EventCard${small ? " EventCard--small" : ""}`}
      {...props}
    >
      <div className="EventCard__imageContainer">
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
        <div className="EventCard__label">{label}</div>
      </div>
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{title}</div>
        {/* <div className="EventCard__month">{getMonth(formattedDate)}</div> */}
        <div className="EventCard__month">{monthName}</div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  date: PropTypes.oneOfType([
    PropTypes.string, // Date en format string
    PropTypes.instanceOf(Date), // Date en objet Date
  ]).isRequired,
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  small: PropTypes.bool,
};

EventCard.defaultProps = {
  imageAlt: "image",
  small: false,
};

export default EventCard;
