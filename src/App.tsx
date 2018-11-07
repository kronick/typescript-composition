import React, { Component } from "react";
import logo from "./logo.svg";
import styles from "./App.module.css";
import indicatorStyles from "./Indicator/Indicator.module.css";

import Toggle from "./Toggle";
import Toggle2, { ToggleProps } from "./Toggle2";

import Indicator from "./Indicator";
import IndicatorWithOptions from "./IndicatorWithOptions";

import Clock, { ClockProps } from "./Clock";
import WithTime, { WithTimeProps } from "./WithTime";

import Composer from "./Composer";

class App extends Component<{}, {}> {
  public render() {
    return (
      <div className="App">
        <a onClick={() => this.forceUpdate()}>Force update</a>
        <Toggle>
          {({ on, onClick }) => (
            <div className={indicatorStyles.Indicator} onClick={onClick}>
              {on ? "🌕 ON" : "🌑 OFF"}
            </div>
          )}
        </Toggle>

        <Toggle>{Indicator}</Toggle>

        <Toggle>
          {({ on, onClick }) => <Indicator onClick={onClick} on={on} />}
        </Toggle>

        <Toggle2 component={Indicator} />

        <Toggle2
          component={IndicatorWithOptions}
          valueOn={"👍"}
          valueOff={"👎"}
        />

        <Toggle2
          component={({ on, onClick }) => (
            <Indicator onClick={onClick} on={on} />
          )}
        />

        <Toggle2
          component={({ on, onClick }) => (
            <IndicatorWithOptions
              valueOn={"ON"}
              valueOff={"OFF"}
              onClick={onClick}
              on={on}
            />
          )}
        />

        <Toggle2
          component={({ on, onClick }) => (
            <WithTime
              on={on}
              onClick={onClick}
              millis={true}
              component={Clock}
              showText={true}
            />
          )}
        />

        <Composer<WithTimeProps & ToggleProps & ClockProps>
          millis={true}
          showText={true}
          components={[Toggle2, WithTime, Clock]}
        />
        <Composer<WithTimeProps & ToggleProps & ClockProps>
          millis={false}
          showText={true}
          components={[WithTime, Toggle2, Clock]}
        />
      </div>
    );
  }
}

export default App;
