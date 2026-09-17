import React from "react";
import { useSpring, animated } from '@react-spring/web';
import logo from "../../assets/logo.png";
import "./SideBar.css";

export function Sidebar({ isSideBarOpen, setSideBarOpen }) {

    //Animacion del componente
    const asideSpring = useSpring({
        transform: isSideBarOpen ? 'translateX(0%)' : 'translateX(-100%)',
        config: { tension: 250, friction: 30 },
    });

    //Animacion del fondo
    const backdropSpring = useSpring({
        opacity: isSideBarOpen ? 1 : 0,
        config: { tension: 200, friction: 25 },
    });

    // custom cursor: yellow circle with an X (data URL SVG). hotspot at center (16 16)
    const closeCursor = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><circle cx='16' cy='16' r='14' fill='%23FFD54A'/><line x1='10' y1='10' x2='22' y2='22' stroke='%23000' stroke-width='2' stroke-linecap='round'/><line x1='22' y1='10' x2='10' y2='22' stroke='%23000' stroke-width='2' stroke-linecap='round'/></svg>") 16 16, auto`;

    return (
        <>
            <animated.div
                style={{
                    ...backdropSpring,
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.45)',
                    zIndex: 999,
                    pointerEvents: isSideBarOpen ? 'auto' : 'none',
                    cursor: isSideBarOpen ? closeCursor : 'auto',
                }}
                onClick={() => setSideBarOpen(false)}
            />

            <animated.aside
                style={{
                    ...asideSpring,
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    height: '100vh',
                    zIndex: 1000,
                }}
                className={`sidebar ${isSideBarOpen ? 'open' : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sideBarUp">
                    <h1 className="logo">Mangoa.</h1>
                    <span>Panel personal</span>
                    <span>Lo que ofreces al mundo</span>
                </div>

                <div className="sideBarDown">
                    <span className="highlight">Cuéntanos qué necesitas</span>
                </div>
            </animated.aside>
        </>
    );
}

