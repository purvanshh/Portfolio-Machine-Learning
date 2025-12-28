import React, { useState, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

const HamburgerMenuOverlay = ({
    items = [],
    buttonTop = "60px",
    buttonLeft = "60px",
    buttonSize = "md",
    buttonColor = "#1a1a2e",
    overlayBackground = "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0d0d1a 100%)",
    textColor = "#ffffff",
    fontSize = "lg",
    fontFamily = '"Inter", sans-serif',
    fontWeight = "semibold",
    animationDuration = 1.2,
    staggerDelay = 0.08,
    menuAlignment = "left",
    className,
    buttonClassName,
    menuItemClassName,
    keepOpenOnItemClick = false,
    customButton,
    ariaLabel = "Navigation menu",
    onOpen,
    onClose,
    menuDirection = "vertical",
    enableBlur = true,
    zIndex = 1000,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef(null);
    const containerRef = useRef(null);

    const toggleMenu = () => {
        const newState = !isOpen;
        setIsOpen(newState);

        if (newState) {
            onOpen?.();
        } else {
            onClose?.();
        }
    };

    const handleItemClick = (item) => {
        if (item.onClick) {
            item.onClick();
        }

        if (item.href && !item.onClick) {
            // Handle smooth scroll for hash links
            if (item.href.startsWith('#')) {
                const targetId = item.href.slice(1);
                if (targetId === 'top') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    const element = document.getElementById(targetId);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            } else {
                window.location.href = item.href;
            }
        }

        if (!keepOpenOnItemClick) {
            setIsOpen(false);
            onClose?.();
        }
    };

    // Close menu on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
                onClose?.();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <div ref={containerRef} className={cn("fixed w-full h-full pointer-events-none", className)} style={{ zIndex }}>
            <style>
                {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          .hamburger-overlay-${zIndex} {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: start;
            align-items: center;
            background: ${overlayBackground};
            z-index: ${zIndex};
            clip-path: circle(0px at ${buttonLeft} ${buttonTop});
            transition: clip-path ${animationDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            pointer-events: none;
            ${enableBlur ? "backdrop-filter: blur(10px);" : ""}
          }
          
          .hamburger-overlay-${zIndex}.open {
            clip-path: circle(150% at ${buttonLeft} ${buttonTop});
            pointer-events: auto;
          }
          
          .hamburger-button-${zIndex} {
            position: fixed;
            left: ${buttonLeft};
            top: ${buttonTop};
            transform: translate(-50%, -50%);
            border-radius: 16px;
            z-index: ${zIndex + 1};
            background: ${buttonColor};
            border: 1px solid rgba(255, 255, 255, 0.1);
            cursor: pointer;
            transition: all 0.3s ease;
            pointer-events: auto;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          }
          
          .hamburger-button-${zIndex}:hover {
            transform: translate(-50%, -50%) scale(1.1);
            box-shadow: 0 6px 30px rgba(0, 0, 0, 0.4);
          }
          
          .hamburger-button-${zIndex}:focus {
            outline: 2px solid ${textColor};
            outline-offset: 2px;
          }
          
          .menu-items-${zIndex} {
            ${menuDirection === "horizontal" ? "display: flex; flex-wrap: wrap; gap: 1rem;" : ""}
            ${menuAlignment === "center" ? "text-align: center;" : ""}
            ${menuAlignment === "right" ? "text-align: right;" : ""}
            padding-left: 60px;
          }
          
          .menu-item-${zIndex} {
            position: relative;
            list-style: none;
            padding: 0.75rem 0;
            cursor: pointer;
            transform: translateX(-200px);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            font-family: ${fontFamily};
            font-weight: ${fontWeight === 'normal' ? 400 : fontWeight === 'medium' ? 500 : fontWeight === 'semibold' ? 600 : 700};
            color: ${textColor};
            font-size: 2.5rem;
            ${menuDirection === "horizontal" ? "display: inline-block; margin: 0 1rem;" : ""}
          }
          
          .menu-item-${zIndex}.visible {
            transform: translateX(0);
            opacity: 1;
          }
          
          .menu-item-${zIndex}::before {
            content: "";
            position: absolute;
            left: -30px;
            top: 50%;
            transform: translateY(-50%) scaleX(0);
            width: 20px;
            height: 3px;
            border-radius: 10px;
            background: ${textColor};
            opacity: 0;
            transition: all 0.25s ease;
            transform-origin: left;
          }
          
          .menu-item-${zIndex}:hover::before {
            opacity: 0.8;
            transform: translateY(-50%) scaleX(1);
          }
          
          .menu-item-${zIndex} span {
            opacity: 0.7;
            transition: opacity 0.25s ease;
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }
          
          .menu-item-${zIndex}:hover span {
            opacity: 1;
          }
          
          .menu-item-${zIndex}:focus {
            outline: 2px solid ${textColor};
            outline-offset: 2px;
            border-radius: 4px;
          }
          
          /* Mobile responsiveness */
          @media (max-width: 768px) {
            .hamburger-button-${zIndex} {
              left: 40px;
              top: 40px;
            }
            
            .hamburger-overlay-${zIndex} {
              clip-path: circle(0px at 40px 40px);
            }
            
            .hamburger-overlay-${zIndex}.open {
              clip-path: circle(150% at 40px 40px);
            }
            
            .menu-items-${zIndex} {
              padding: 1.5rem;
              max-height: 80vh;
              overflow-y: auto;
            }
            
            .menu-item-${zIndex} {
              padding: 0.6rem 0;
              font-size: 1.75rem;
            }
          }
          
          @media (max-width: 480px) {
            .menu-items-${zIndex} {
              ${menuDirection === "horizontal" ? "flex-direction: column; gap: 0;" : ""}
            }
            
            .menu-item-${zIndex} {
              ${menuDirection === "horizontal" ? "display: block; margin: 0;" : ""}
              font-size: 1.5rem;
            }
          }
        `}
            </style>

            {/* Navigation Overlay */}
            <div
                ref={navRef}
                className={cn(`hamburger-overlay-${zIndex}`, isOpen && "open")}
                aria-hidden={!isOpen}
            >
                <ul className={cn(`mt-20 menu-items-${zIndex}`)}>
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className={cn(
                                `menu-item-${zIndex}`,
                                isOpen && "visible",
                                menuItemClassName
                            )}
                            style={{
                                transitionDelay: isOpen ? `${index * staggerDelay}s` : "0s",
                            }}
                            onClick={() => handleItemClick(item)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    handleItemClick(item);
                                }
                            }}
                            tabIndex={isOpen ? 0 : -1}
                            role="button"
                            aria-label={`Navigate to ${item.label}`}
                        >
                            <span>
                                {item.icon && <span className="menu-icon">{item.icon}</span>}
                                {item.label}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Hamburger Button */}
            <button
                className={`hamburger-button-${zIndex}`}
                onClick={toggleMenu}
                aria-label={ariaLabel}
                aria-expanded={isOpen}
                aria-controls="navigation-menu"
                style={{
                    width: buttonSize === "sm" ? "40px" : buttonSize === "md" ? "48px" : "64px",
                    height: buttonSize === "sm" ? "40px" : buttonSize === "md" ? "48px" : "64px",
                }}
            >
                <div className={`hamburger-lines-${zIndex} ${isOpen ? 'open' : ''}`}>
                    <span className="line line-1"></span>
                    <span className="line line-2"></span>
                    <span className="line line-3"></span>
                </div>
            </button>

            <style>
                {`
                    .hamburger-lines-${zIndex} {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        height: 100%;
                        gap: 5px;
                    }
                    
                    .hamburger-lines-${zIndex} .line {
                        display: block;
                        width: 20px;
                        height: 2px;
                        background: ${textColor};
                        border-radius: 2px;
                        transition: all 0.15s ease-out;
                        transform-origin: center;
                    }
                    
                    .hamburger-lines-${zIndex}.open .line {
                        transition: all 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6);
                    }
                    
                    .hamburger-lines-${zIndex}.open .line-1 {
                        transform: translateY(7px) rotate(45deg);
                    }
                    
                    .hamburger-lines-${zIndex}.open .line-2 {
                        opacity: 0;
                        transform: scaleX(0);
                    }
                    
                    .hamburger-lines-${zIndex}.open .line-3 {
                        transform: translateY(-7px) rotate(-45deg);
                    }
                `}
            </style>
        </div>
    );
};

export default HamburgerMenuOverlay;
