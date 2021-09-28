import './styles.css'

const FormOrDiv = props => props.onSubmit ? <form {...props}></form> : <div {...props}></div>

const Modal = ({ title, children, onCancel, onConfirm, onSubmit }) => {

  return (
    <FormOrDiv className="modal-container" {...onSubmit && { onSubmit }}>
      <header className="modal-header">
        <h1>{title}</h1>
      </header>
      <section className="modal-content">{children}</section>
      <section className="modal-actions">
        <button className="btn" onClick={onCancel}>Cancel</button>
        <button className="btn" onClick={onConfirm} {...onSubmit && { type: 'submit' } }>Confirm</button>
      </section>
    </FormOrDiv>
  )
}

export default Modal