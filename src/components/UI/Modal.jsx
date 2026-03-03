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

    return createPortal(
        <dialog
            className={`rounded-lg p-6 bg-white shadow-xl w-full max-w-3xl fixed inset-0 m-auto ${className}`}
            ref={dialogRef}
            onClose={onClose}
        >
            {children}
        </dialog>,
        document.getElementById('modal')
    );
}