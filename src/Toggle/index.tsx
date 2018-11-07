import React from "react";

/** Props that the child of this component must accept */
export interface ToggleChildProps {
  /** Callback that should be fired whenever the toggle is switched on or off */
  onClick: () => void;

  /** Current state of the toggle */
  on: boolean;
}

interface ToggleProps {
  /** Children must be either a React class component or function component
   *  that accepts the ToggleChildProps
   */
  children: React.ComponentType<ToggleChildProps>;
}

interface ToggleState {
  on: boolean;
}

export default class Toggle extends React.Component<ToggleProps, ToggleState> {
  public constructor(props: ToggleProps) {
    super(props);
    this.state = { on: false };
  }

  public onToggle = () => {
    this.setState({ on: !this.state.on });
  };

  public render() {
    return <this.props.children onClick={this.onToggle} on={this.state.on} />;
  }
}
