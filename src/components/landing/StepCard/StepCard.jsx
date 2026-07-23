import './StepCard.scss';

const StepCard = ({ number, title, text }) => {
    return (
        <div className="step-card">
            <span className="step-card__num">{number}</span>
            <h3 className="step-card__title">{title}</h3>
            <p className="step-card__text">{text}</p>
        </div>
    );
};

export default StepCard;