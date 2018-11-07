import React from "react";
import omit from "lodash/omit";

/** Props that the child of this component must accept */
export interface ToggleChildProps {
  /** Callback that should be fired whenever the toggle is switched on or off */
  onClick: () => void;

  /** Current state of the toggle */
  on: boolean;
}

export interface ToggleProps<TPassthroughProps = {}> {
  /** Component to wrap
   *
   *  Accepts any valid React component type (function or class component) that
   *  accepts the ToggleChildProps (`onClick` and `on`)
   */
  component: React.ComponentType<TPassthroughProps>;
}

interface ToggleState {
  on: boolean;
}

/** State wrapper that provides a boolean `on` prop to the wrapped component
 *  and an `onClick` callback prop to change state.
 */
export default class Toggle<
  TPassthroughProps extends ToggleChildProps
> extends React.Component<
  ToggleProps<TPassthroughProps> &
    Omit<TPassthroughProps, keyof ToggleChildProps>,
  ToggleState
> {
  public constructor(
    props: ToggleProps<TPassthroughProps> & TPassthroughProps
  ) {
    super(props);
    this.state = { on: false };
  }

  public onToggle = () => {
    this.setState({ on: !this.state.on });
  };

  public render() {
    const Component = (this.props as ToggleProps<TPassthroughProps>).component;
    const passthroughProps = omit(this.props, "component");
    return (
      <Component
        onClick={this.onToggle}
        on={this.state.on}
        {...passthroughProps}
      />
    );
  }
}
