import React from "react";
import omit from "lodash/omit";

interface ComposerProps {
  components: React.ComponentType<any>[];
}

interface ComponentInjectorProps {
  component: React.ComponentClass<any>;
}

/** Composer applies the effect of multiple component injection wrappers
 *
 *  Type checking of the props gets pretty sloppy unfortunately. This component
 *  is parameterized by a set of `TExtraProps` that will be passed down to all
 *  child components.
 */
export default class Composer<TExtraProps> extends React.Component<
  ComposerProps &
    Partial<Omit<TExtraProps & ComponentInjectorProps, "component">>
> {
  public render() {
    if (!this.props.components.length) {
      return null;
    }

    const Component = this.props.components[0];
    const otherProps = omit(this.props, ["components"]);

    if (this.props.components.length === 1) {
      return <Component {...otherProps} />;
    }

    const otherComponents = this.props.components.slice(1);

    return (
      <Component
        component={(props: any) => (
          <Composer components={otherComponents} {...props} />
        )}
        {...otherProps}
      />
    );
  }
}

{
  /* <Toggle2 component={(props: any) => (
  <Composer component={[WithTime, Clock]} {...props} />
)} {...otherProps} />


<WithTime component={(props: any) => (
  <Composer component={[Clock]} {...props} />
)} {...otherProps} />

<Clock {...otherProps} /> */
}
