import React from "react";

import "./Select.css";

/** An interface defining a single option to render in a ListSelect */
export interface ListSelectOption<TData> {
  key: string;
  value: TData;
  display: string;
  selected: boolean;
}

interface ListSelectProps<TData> {
  /** Title for the list.
   *
   *  Nothing fancy going on here; just a plain old string type.
   */
  title: string;

  /**  A list of options to render.
   *
   *  The exact type of this prop depends on the `TData` type variable.
   */
  options: ListSelectOption<TData>[];

  /** Callback fired whenever a new option is selected.
   *
   *  Because the `selected` parameter is of a type defined using our
   *  type variable `TData`, this component's parent can be sure that
   *  the data it receives in this `onSelect` callback is the same type as
   *  what is passed in to the `options` array.
   */
  onSelect: (selected: ListSelectOption<TData>) => void;
}

/** A generic list select component */
export default class ListSelect<T> extends React.Component<ListSelectProps<T>> {
  public render() {
    return (
      <div className="Select">
        <div className="Select-title">{this.props.title}</div>
        {this.props.options.map(option => {
          const indicator = option.selected ? "🌕 " : "🌑 ";
          return (
            <div
              className="Select-option"
              onClick={() => this.props.onSelect(option)}
            >
              {indicator} {option.display}
            </div>
          );
        })}
      </div>
    );
  }
}
