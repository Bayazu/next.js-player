import React, { FC } from "react";

interface TrackProgressProps {
  left: number;
  right: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TrackProgress: FC<TrackProgressProps> = ({ left, right, onChange }) => {
  return (
    <div style={{ display: "flex" }}>
      <input
        type="range"
        value={left}
        min={0}
        max={right}
        onChange={onChange}
      />
      <div>
        {left} / {right}
      </div>
    </div>
  );
};

export default TrackProgress;
