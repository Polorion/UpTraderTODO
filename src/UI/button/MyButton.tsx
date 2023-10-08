import * as React from 'react';
import S from './MyButton.module.scss'


export const MyButton = ({children, ...props}: any) => {

    return (
        <button onClick={() => {
        }} className={S.button} {...props}>  {children}</button>
    );
}


