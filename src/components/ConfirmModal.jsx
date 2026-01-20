import "../styles/ConfirmModal.css"


export function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    // <div
    //   aria-modal="true"
    //   role="dialog"
    //   className="contenedor-principal-modal"
    // >
    //   {/* <div className="contenedor-titulo">
    //     <h4>{title}</h4>
    //     <p>{message}</p>
    //     <div className="contenedor-botones-modal">
    //       <button onClick={onCancel} className="btn btn-info rounded-pill border border-dark border-2">Cancel</button>
    //       <button onClick={onConfirm} className="btn btn-danger rounded-pill border border-dark border-2">Delete</button>
    //     </div>
    //   </div>
    // </div> */}
<div className="position-relative"> 
    <div className="card mb-3 position-absolute top-50 start-50 translate-middle" style={{width: 288}} aria-modal="true"
      role="dialog">
        
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text mb-3">{message}</p>
    <div className="d-flex justify-content-end">
    <button onClick={onCancel} className="btn btn-info rounded-pill border border-dark border-2 me-1">Cancel</button>
          <button onClick={onConfirm} className="btn btn-danger rounded-pill border border-dark border-2">Delete</button>
  </div></div></div>
</div>
  );
}
