import React, { useEffect, useRef ,useContext} from "react";
import { chatContext } from "../context/Context";
import "../styles/Alertbox.css";

const Alert = ({ onConfirm, onCancel }) => {
  const dialogRef = useRef(null);
  const {setShowAlert}=useContext(chatContext);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, []);

  return (
    <div
      className="overallalert"
      onClick={() => {
        dialogRef.current.close();
        setShowAlert(false)
      }}
    >
      <dialog className="alert" ref={dialogRef} >
        <p>
          Are You <strong>Sure</strong> You Want To Delete This ?
        </p>
        <div className="alertbtn">
          <button className="confirmbtn" onClick={onConfirm}>
            Yes
          </button>
          <button
            className="cancelbtn"
            onClick={() => {
              dialogRef.current.close();
              onCancel();
            }}
          >
            No
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default Alert;
