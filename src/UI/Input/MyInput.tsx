import * as React from 'react';
import S from './MyInput.module.scss'

export const MyInput = React.forwardRef((props: any, ref) => {
    console.log(props)
    return (
        <input ref={ref} onInput={(e) => {
        }} className={S.input} {...props}/>
    );
})


