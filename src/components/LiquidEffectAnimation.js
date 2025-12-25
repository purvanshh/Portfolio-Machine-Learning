import { useEffect, useRef } from 'react';
import './LiquidEffectAnimation.css';

function LiquidEffectAnimation() {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Load the script dynamically
        const script = document.createElement('script');
        script.type = 'module';
        script.textContent = `
      import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js';

      const canvas = document.getElementById('liquid-canvas');
      if (canvas) {
        const app = LiquidBackground(canvas);
        // Beautiful abstract cosmic image that complements the dark theme
        app.loadImage('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&q=80');
        app.liquidPlane.material.metalness = 0.75;
        app.liquidPlane.material.roughness = 0.25;
        app.liquidPlane.uniforms.displacementScale.value = 5;
        app.setRain(false);
        window.__liquidApp = app;
      }
    `;

        document.body.appendChild(script);

        return () => {
            if (window.__liquidApp && window.__liquidApp.dispose) {
                window.__liquidApp.dispose();
            }
            if (script.parentNode) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="liquid-effect-container">
            <canvas ref={canvasRef} id="liquid-canvas" className="liquid-canvas" />
        </div>
    );
}

export default LiquidEffectAnimation;
