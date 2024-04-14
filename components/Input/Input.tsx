import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";

// eslint-disable-next-line react/display-name
export const Input = forwardRef(
  (
    { className, ...rest }: InputHTMLAttributes<HTMLInputElement>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        ref={ref}
        className={`bg-main outline-none rounded-[15px] text-secondary text-[36px] h-[68px] min-w-0 px-2 [&[error]]:bg-red-800 transition-colors ${
          className || ""
        }`}
        {...rest}
      />
    );
  }
);
