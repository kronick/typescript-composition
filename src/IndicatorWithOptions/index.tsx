import React from "react";

import styles from "../Indicator/Indicator.module.css";

interface IndicatorWithOptionsProps {
  onClick: () => void;
  on: boolean;

  valueOn: React.ReactNode;
  valueOff: React.ReactNode;
}

const IndicatorWithOptions: React.SFC<IndicatorWithOptionsProps> = props => (
  <div className={styles.Indicator} onClick={props.onClick}>
    {props.on ? props.valueOn : props.valueOff} {logProps(props)}
  </div>
);

const logProps = (props: any) => {
  console.log(props);
  return null;
};

export default IndicatorWithOptions;
