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
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    padding: '15px',
                    borderRadius: '12px',
                    width: '85%',
                    maxWidth: '400px',
                    position: 'relative',
                    direction: 'rtl',
                    border: '3px solid black',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        background: 'none',
                        border: 'none',
                        fontSize: '20px',
                        cursor: 'pointer',
                        color: '#666',
                    }}
                >
                    ×
                </button>
                <h2 style={{ 
                    marginBottom: '15px', 
                    color: '#333', 
                    textAlign: 'center',
                    fontSize: '1.2rem',
                    padding: '0 20px'
                }}>
                    {spot.name}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <a
                        href={spot.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            backgroundColor: '#dc8125',
                            color: 'white',
                            padding: '10px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            textAlign: 'center',
                            transition: 'background-color 0.3s',
                            fontSize: '0.9rem'
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c1701f')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#dc8125')}
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
                            padding: '10px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            textAlign: 'center',
                            transition: 'background-color 0.3s',
                            fontSize: '0.9rem'
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c1701f')}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#dc8125')}
                    >
                        ניווט ב-Waze
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ParkingModal; 