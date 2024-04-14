import { ButtonHTMLAttributes } from "react";

export const Button = ({
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`h-[68px] min-w-[68px] rounded-[15px] bg-main text-secondary text-[36px] ${
        className || ""
      }`}
      {...rest}
    />
  );
};
