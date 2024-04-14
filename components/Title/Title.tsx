import { ReactNode } from "react";
import "./Title.styles.css";

export const Title = ({ children }: { children: ReactNode }) => {
  return (
    <div className="title">
      <h1>{children}</h1>
    </div>
  );
};
