import React, { useState, useEffect } from 'react';
import styles from './Modal.module.css';

const ModalComponent = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Scroll engelle
        } else {
            document.body.style.overflow = 'auto'; // Scroll geri getir
        }

        return () => {
            document.body.style.overflow = 'auto'; // Bileşen unmount olduğunda scroll'u geri getir
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles.modal} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.title}>
                    <div className={styles.titleSubContainer}>
                        <div className={styles.propsContainer}>
                            <span className={styles.orange}>Opsiyonlu</span>
                            <span className={styles.red}>Dolu</span>
                        </div>
                        <span className={styles.closeButton} onClick={onClose}>
                            &times;
                        </span>
                    </div>
                </div>
                <div className={styles.calendarContainer}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ModalComponent;