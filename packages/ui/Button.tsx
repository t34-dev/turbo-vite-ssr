import s from './Button.module.scss';
import {ButtonHTMLAttributes, FC, PropsWithChildren} from "react";

interface ButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>{

}

export const Button:FC<ButtonProps> = ({children, ...rest}) => {
  return <button className={s.root} {...rest}>{children}</button>;
};

