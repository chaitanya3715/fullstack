import React, { useState } from 'react';

interface SkillsListProps {
  skills: string[];
  initialDisplay?: number;
}

export function SkillsList({ skills, initialDisplay = 10 }: SkillsListProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedSkills = showAll ? skills : skills.slice(0, initialDisplay);
  const hasMore = skills.length > initialDisplay;

  return (
    <>
      <div className="flex gap-3 p-3 flex-wrap pr-4">
        {displayedSkills.map((skill, index) => (
          <div 
            key={index}
            className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#E4E9F1] pl-4 pr-4"
          >
            <p className="text-[#141C24] text-sm font-medium leading-normal">{skill}</p>
          </div>
        ))}
      </div>
      
      {hasMore && (
        <div className="flex px-4 py-3 justify-start">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#E4E9F1] text-[#141C24] text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">
              {showAll ? 'Show less' : `Show ${skills.length - initialDisplay} more`}
            </span>
          </button>
        </div>
      )}
    </>
  );
}