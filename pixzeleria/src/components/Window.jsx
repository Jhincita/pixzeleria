// src/components/Window.jsx
import React from 'react';
import './Window.css'; // your old window styles

export default function Window({ title, children, isOpen, onClose }) {
    if (!isOpen) return null; // only render if open

    return (
        <div className="window-overlay">
            <div className="window">
                <div className="window-title">
                    {title}
                    <button onClick={onClose} className="close-btn">×</button>
                </div>
                <div className="window-content">
                    {children}
                </div>
            </div>
        </div>
    );
}
