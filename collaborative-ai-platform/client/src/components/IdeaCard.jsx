import React from "react";
import "./IdeaCard.css"; // we will create this next

const IdeaCard = ({ idea, onSelect }) => {
  return (
    <div className="idea-card" onClick={() => onSelect(idea)}>
      <h3>{idea.title}</h3>
      <p className="summary">{idea.summary}</p>

      {idea.tags && idea.tags.length > 0 && (
        <div className="tags">
          {idea.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default IdeaCard;
