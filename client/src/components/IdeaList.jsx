import React, { useState } from "react";
import IdeaCard from "./IdeaCard";
import IdeaModal from "./IdeaModal";

const IdeaList = ({ ideas }) => {
  const [selectedIdea, setSelectedIdea] = useState(null);

  return (
    <>
      <div className="idea-grid">
        {ideas.map((idea, index) => (
          <IdeaCard key={index} idea={idea} onSelect={setSelectedIdea} />
        ))}
      </div>

      {selectedIdea && (
        <IdeaModal idea={selectedIdea} onClose={() => setSelectedIdea(null)} />
      )}
    </>
  );
};

export default IdeaList;
