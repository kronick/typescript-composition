import React, { Component } from "react";
import logo from "./logo.svg";
import styles from "./App.module.css";
import indicatorStyles from "./Indicator/Indicator.module.css";

import Toggle from "./Toggle";
import ToggleInjector, { ToggleProps } from "./ToggleInjector";

import Indicator from "./Indicator";
import IndicatorWithOptions from "./IndicatorWithOptions";

import Clock, { ClockProps } from "./Clock";
import TimeInjector, { TimeInjectorProps } from "./TimeInjector";

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

        <ToggleInjector component={Indicator} />

        <ToggleInjector
          component={IndicatorWithOptions}
          valueOn={"👍"}
          valueOff={"👎"}
        />

        {/* We can use an anonymous functional component in the `component` 
            slot but this is not a great idea. A new instance of the function
            will be created every time this parent component re-renders, which
            means a whole new component will be re-mounted. We don't have this
            problem with render props, or if we define the render function as a
            separate component elsewhere (i.e. not as a fat arrow function
            within its parent's render function. */}
        <ToggleInjector
          component={({ on, onClick }) => (
            <Indicator onClick={onClick} on={on} />
          )}
        />

        <ToggleInjector
          component={({ on, onClick }) => (
            <IndicatorWithOptions
              valueOn={"ON"}
              valueOff={"OFF"}
              onClick={onClick}
              on={on}
            />
          )}
        />

        {/* We need to use the anonymous component pattern if we want to
             compose multiple component injectors. Not ideal because the inner
             component will re-mount on every re-render. */}
        <ToggleInjector
          component={({ on, onClick }) => (
            <TimeInjector
              on={on}
              onClick={onClick}
              millis={true}
              component={Clock}
              showText={true}
            />
          )}
        />

        <TimeInjector
          millis={true}
          component={({ time }) => (
            <ToggleInjector time={time} component={Clock} showText={true} />
          )}
        />

        {/* Back to the `Toggle` component that uses a true render prop. Since
            the render prop is just a function that's called and not a
            component that gets mounted/unmounted, performance is better.
            But it's a lot more verbose if we don't need to nest component
            or re-map any props between layers.  */}
        <Toggle>
          {({ on, onClick }) => (
            <TimeInjector
              on={on}
              onClick={onClick}
              millis={true}
              component={Clock}
              showText={true}
            />
          )}
        </Toggle>

        {/* We can create a Composer function that will do the nested anonymous
            functional component thing recursively for us.
            
            Types are not really repsected, however. */}
        <Composer<TimeInjectorProps & ToggleProps & ClockProps>
          millis={true}
          showText={true}
          components={[ToggleInjector, TimeInjector, Clock]}
        />
        <Composer<TimeInjectorProps & ToggleProps & ClockProps>
          millis={false}
          showText={true}
          components={[TimeInjector, ToggleInjector, Clock]}
        />
      </div>
    );
  }
}

export default App;
