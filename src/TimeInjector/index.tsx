import React from "react";
import omit from "lodash/omit";

/** Props that the child of this component must accept */
export interface TimeInjectorInjectedProps {
  time: string;
}

export interface TimeInjectorProps<TPassthroughProps = {}> {
  /** Component to wrap
   *
   *  Accepts any valid React component type (function or class component) that
   *  accepts the TimeInjectorChildProps (`onClick` and `on`)
   */
  component: React.ComponentType<TPassthroughProps>;

  millis: boolean;
}

interface TimeInjectorState {
  time: string;
}

/** State wrapper that injects an updated datetime string every 1000ms into
 *  the wrapped component's `date` prop.
 */
export default class TimeInjector<
  TPassthroughProps extends TimeInjectorInjectedProps
> extends React.Component<
  TimeInjectorProps<TPassthroughProps> &
    Omit<TPassthroughProps, keyof TimeInjectorInjectedProps>,
  TimeInjectorState
> {
  private interval?: number;

  public constructor(
    props: TimeInjectorProps<TPassthroughProps> & TPassthroughProps
  ) {
    super(props);
    this.state = { time: this.getDate() };
  }

  public componentDidMount() {
    this.interval = window.setInterval(this.updateDate, 1000);
  }

  public componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  private getDate() {
    const props = this.props as TimeInjectorProps<TPassthroughProps>;
    return props.millis
      ? `${new Date().toLocaleTimeString()} (${new Date()
          .getTime()
          .toString()})`
      : new Date().toLocaleTimeString();
  }

  private updateDate = () => {
    this.setState({ time: this.getDate() });
  };

  public render() {
    const Component = (this.props as TimeInjectorProps<TPassthroughProps>)
      .component;
    const passthroughProps = omit(this.props, "component");
    return <Component time={this.state.time} {...passthroughProps} />;
  }
}
