import React from "react";
import "./IdeaModal.css";

const IdeaModal = ({ idea, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{idea.title}</h2>
        <p>{idea.details}</p>

        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default IdeaModal;
