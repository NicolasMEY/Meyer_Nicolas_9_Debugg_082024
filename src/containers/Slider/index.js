import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Trie les évènements par date dans l'ordre décroissant
  const byDateDesc = data?.focus.sort(
    (evtA, evtB) => new Date(evtA.date) - new Date(evtB.date) // Changer pour décroissant, La fonction de comparaison new Date(evtB.date) - new Date(evtA.date) trie les événements de la date la plus récente à la date la plus ancienne. Le résultat est un tableau d'événements triés dans l'ordre décroissant.
    // < new Date(evtB.date) ? -1 : 0
  );

  // Trie le tableau focus contenu dans l'objet data par date dans l'ordre décroissant. Du plus ancien au plus récent.
  // Méthode sort avec une fonction de comparaison basée sur les dates
  // -1 indique que si l'evenetment A est plus ancien que B, il doit etre placé avant le B (evenement le plus récent)

  const nextCard = () => {
    setIndex((prevIndex) =>
      prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
    );

    // NextCard : prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0 : Si l'index actuel est inférieur au dernier index du tableau, il passe à l'index suivant. Sinon, il réinitialise l'index à 0 pour revenir au début du tableau.
  };

  useEffect(
    () => {
      const intervalId = setInterval(nextCard, 5000);
      return () => clearInterval(intervalId);
    },
    // eslint-disable-next-line
    [index, byDateDesc]
    // useEffect : exécute la fonction nextCard toutes les 5 secondes
    // clearInterval : arrête l'exécution de la fonction nextCard
    // La dépendance [index, byDateDesc] indique que l'effet doit être réexécuté lorsque l'une de ces valeurs change.
  );

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={_.title}
                  type="radio"
                  readOnly
                  name="radio-button"
                  checked={index === radioIdx}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
