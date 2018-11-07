import React from "react";

export interface ClockProps {
  time: string;

  onClick: () => void;
  on: boolean;

  showText: boolean;
}

const Clock: React.SFC<ClockProps> = ({ time, on, onClick, showText }) => {
  return (
    <div onClick={onClick}>
      {showText ? "The current time is:" : ""} {on ? time : "<HIDDEN>"}
    </div>
  );
};

export default Clock;
