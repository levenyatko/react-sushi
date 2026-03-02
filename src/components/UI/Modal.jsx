import { createPortal } from "react-dom";
import {useEffect, useRef} from "react";


export default function Modal({ children, open, onClose, className = '' }) {
    const dialogRef = useRef();

    useEffect(() => {
        const dialog = dialogRef.current;

        if (open) {
            dialog.showModal();
        }

        return () => dialog.close();
    }, [open]);

    return createPortal(<dialog className={`modal ${className}`} ref={dialogRef} onClose={onClose}>
        { children}
    </dialog>, document.getElementById('modal'));
}