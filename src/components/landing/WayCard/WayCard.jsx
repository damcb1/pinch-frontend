import './WayCard.scss';

const WayCard = ({ icon, title, text }) => {
    return (
        <div className="way-card">
            <div className="way-card__icon" aria-hidden="true">{icon}</div>
            <h3 className="way-card__title">{title}</h3>
            <p className="way-card__text">{text}</p>
        </div>
    );
};

export default WayCard;