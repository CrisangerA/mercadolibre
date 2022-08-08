import { FC, ReactNode } from "react";

interface TypograpyProps {
  size: number;
  children: ReactNode;
  display?: string;
}

const Typograpy: FC<TypograpyProps> = ({ children, size, display }) => {
  return (
    <p style={{
      fontSize: size + 'px',
      margin: 0,
      display: display || 'inline'
    }}>
      {children}
    </p>
  )
}

export default Typograpy;
