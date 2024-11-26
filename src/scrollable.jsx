import React from 'react';
import "./styles/Scrollable.css";

function ScrollableIcons() {
    const items = [
        {
            icon: "https://cdn-icons-png.flaticon.com/512/599/599995.png",
            label: "Drugs & Medications",
        },
        {
            icon: "https://cdn-icons-png.flaticon.com/512/857/857681.png",
            label: "Pill Identifier",
        },
        {
            icon: "https://cdn-icons-png.flaticon.com/512/1040/1040415.png",
            label: "Interaction Checker",
        },
        {
            icon: "https://cdn-icons-png.flaticon.com/512/4035/4035458.png",
            label: "Symptom Checker",
        },
        {
            icon: "https://cdn-icons-png.flaticon.com/512/754/754888.png",
            label: "Health News",
        },
    ];

    const scrollContainer = React.useRef(null);

    const scrollLeft = () => {
        scrollContainer.current.scrollBy({
            left: -200,
            behavior: "smooth",
        });
    };

    const scrollRight = () => {
        scrollContainer.current.scrollBy({
            left: 200,
            behavior: "smooth",
        });
    };

    return (
        <div className="scrollable-icons-container">
            <button className="scroll-button left" onClick={scrollLeft}>
                ◀
            </button>
            <div className="scrollable-icons" ref={scrollContainer}>
                {items.map((item, index) => (
                    <div className="icon-item" key={index}>
                        <div className="icon-circle">
                            <img src={item.icon} alt={item.label} className="icon" />
                        </div>
                        <p className="icon-label">{item.label}</p>
                    </div>
                ))}
            </div>
            <button className="scroll-button right" onClick={scrollRight}>
                ▶
            </button>
        </div>
    );
}

export default ScrollableIcons;