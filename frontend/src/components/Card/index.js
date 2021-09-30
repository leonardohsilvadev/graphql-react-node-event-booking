import "./styles.css";

export const Card = ({ title, subtitle, onClick, buttonText }) => (
  <div className="events-list">
    <div>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </div>

    <div>
      <button className="btn" onClick={onClick}>
        {buttonText}
      </button>
    </div>
  </div>
);
