import "../styles/ConfirmModal.css"


export function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <div
      aria-modal="true"
      role="dialog"
      className="contenedor-principal-modal"
    >
      <div className="contenedor-titulo">
        <h4>{title}</h4>
        <p>{message}</p>
        <div className="contenedor-botones-modal">
          <button onClick={onCancel} className="boton-cancel-modal">Cancel</button>
          <button onClick={onConfirm} className="boton-eliminar-modal">Delete</button>
        </div>
      </div>
    </div>
  );
}
