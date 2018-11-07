import React from "react";

import styles from "./Indicator.module.css";

interface IndicatorProps {
  onClick: () => void;
  on: boolean;
}

const Indicator: React.SFC<IndicatorProps> = props => (
  <div className={styles.Indicator} onClick={props.onClick}>
    {props.on ? "🌕 ON" : "🌑 OFF"}
  </div>
);

export default Indicator;
