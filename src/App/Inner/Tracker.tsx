export const Tracker = () => {
  return (
    <div className="w-full">
      <div className="flex w-full overflow-x-auto gap-1">
        {Array.from({ length: Math.ceil(365 / 7) }).map((_, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((_, dayIndex) => {
              const blockIndex = weekIndex * 7 + dayIndex;
              if (blockIndex >= 365) return null;
              return (
                <div
                  key={blockIndex}
                  className="w-10 h-10 border border-black rounded-[3px]"
                >
                  {blockIndex}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
