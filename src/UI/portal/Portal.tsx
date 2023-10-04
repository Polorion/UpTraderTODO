import * as React from 'react';
import S from './Portal.module.scss'
import ReactDOM from "react-dom";

export const Portal = (props: any) => {
    const node = document.querySelector("#modal");
    if (!node) {
        return null;
    }
    const exitModal = () => {
        props.exitModal(false)
    }
    return ReactDOM.createPortal(
        <div onClick={exitModal} className={S.body}>
            <div onClick={(e) => {
                e.stopPropagation()
            }}>
                <props.element/>
            </div>
        </div>,
        node
    );
};