import React from 'react';

const ParkingModal = ({ isOpen, onClose, spot }) => {
    if (!isOpen) return null;

    const wazeUrl = `https://www.waze.com/ul?ll=${spot.lat},${spot.lon}&navigate=yes&zoom=17`;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
                animation: 'fadeIn 0.3s ease forwards',
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '12px',
                    width: '90%',
                    maxWidth: '500px',
                    position: 'relative',
                    direction: 'rtl',
                    border: '3px solid black',
                    animation: 'modalSlideIn 0.4s ease forwards',
                    transform: 'scale(0.8)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <style>
                    {`
                        @keyframes fadeIn {
                            from {
                                background-color: rgba(0, 0, 0, 0);
                            }
                            to {
                                background-color: rgba(0, 0, 0, 0.5);
                            }
                        }
                        @keyframes modalSlideIn {
                            from {
                                transform: scale(0.8) translateY(-20px);
                                opacity: 0;
                            }
                            to {
                                transform: scale(1) translateY(0);
                                opacity: 1;
                            }
                        }
                    `}
                </style>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        background: 'none',
                        border: 'none',
                        fontSize: '24px',
                        cursor: 'pointer',
                        color: '#666',
                        transition: 'color 0.3s ease',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#333'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#666'}
                >
                    ×
                </button>
                <h2 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>{spot.name}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a
                        href={spot.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            backgroundColor: '#dc8125',
                            color: 'white',
                            padding: '12px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            textAlign: 'center',
                            transition: 'all 0.3s ease',
                            transform: 'translateY(0)',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#c1701f';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = '#dc8125';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        אתר החניון - תפוסה
                    </a>
                    <a
                        href={wazeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            backgroundColor: '#dc8125',
                            color: 'white',
                            padding: '12px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            textAlign: 'center',
                            transition: 'all 0.3s ease',
                            transform: 'translateY(0)',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#c1701f';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = '#dc8125';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        ניווט ב-Waze
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ParkingModal; 