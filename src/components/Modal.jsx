/* eslint-disable react/prop-types */
const Modal = ({ triggerText, title, children }) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        {triggerText}
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
