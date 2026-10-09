import "./Divider.css";

export default function Divider({ text = "ou" }) {
  return (
    <div className="divider">
      <span className="divider__line" />
      <span className="divider__text">{text}</span>
      <span className="divider__line" />
    </div>
  );
}
