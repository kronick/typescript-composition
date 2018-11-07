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

        {/* This only works because `Indicator` is a functional component.
            If it were a class component, we couldn't do this. */}
        <Toggle>{Indicator}</Toggle>

        {/* "Classic" render props pattern. This works whether `Indicator`
            is a function or a class component. Downside is that in the
            case where it's a class component with an interface that conforms
            to the injected props exactly, it's really verbose.
            
            With many render prop parameters of the same type (strings, for
            example), there's also the risk that we "wire up" the interior
            component incorrectly. */}
        <Toggle>
          {({ on, onClick }) => <Indicator onClick={onClick} on={on} />}
        </Toggle>

        {/* A much more concise syntax using the "component injection" pattern.
            The props that `Indicator` takes in must match the interface
            specified in the definition of `ToggleInjector` exactly. This
            simplifies things and minimizes the chance of introducing a
            bug by incorrectly wiring things up. */}
        <ToggleInjector component={Indicator} />

        {/* `ToggleInjector` can also infer additional props that it should
             accept based on the component it's wrapping. In this case,
             `IndicatorWithOptions` accepts two extra props that are set
             on `ToggleInjector` directly. This can be pretty useful and
             allows `ToggleInjector` to "masquerade" as an extended
             version of its wrapped component.*/}
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

        {/* We need to use the anonymous functiona component pattern if we want
             to compose multiple component injectors. Not ideal because the
             inner component will re-mount on every re-render. */}
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
            
            Types are not really respected, however. */}
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

        {/* TODO: Higher Order Components (HOCs) */}
      </div>
    );
  }
}

export default App;
