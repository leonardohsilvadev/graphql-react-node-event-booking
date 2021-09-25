import './styles.css'

const Modal = ({ title, children, onCancel, onConfirm }) => (
  <div className="modal-container">
    <header class="modal-header">
      <h1>{title}</h1>
    </header>
    <section className="modal-content">{children}</section>
    <section className="modal-actions">
      <button class="btn" onClick={onCancel}>Cancel</button>
      <button class="btn" onClick={onConfirm}>Confirm</button>
    </section>
  </div>
)

export default Modal