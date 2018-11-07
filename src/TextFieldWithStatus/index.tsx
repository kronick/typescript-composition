import React from "react";

interface InputStateManagerProps<T> {
  /** Value to display when  */
  persistedValue: T;
  onChange: (value: T) => void;
  onSubmit: (value: T) => void;
}

interface ManageableInputProps<TData, TError = string> {
  value: TData;

  /** Callback fired every time the value is changed */
  onChange: (value: TData) => void;

  /** Callback fired when the value should be updated  */
  onSubmit: (value: TData) => void;

  /** Error to report, if any */
  error?: TError;
}

interface TextFieldWithStatusProps {
  /** Value to display in the text field */
  value: string;

  /** Callback fired every time the value is changed */
  onChange: (value: string) => void;

  /** Callback fired when the input is blurred */
  onBlur: () => void;

  /** Error to report, if any */
  error?: string;

  /** Flag indicating whether the input should be marked as pending */
  pending: boolean;
}

/**
 *
 * <InputWithState<string, TextFieldWithStatusProps> component={TextField} color={"red"} onSubmit={console.log} />
 */
