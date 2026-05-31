"use client";

import { useEffect, useRef } from "react";
import webGLFluidEnhanced from "webgl-fluid";

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && typeof window !== "undefined") {
      webGLFluidEnhanced(canvasRef.current, {
        SIM_RESOLUTION: 128,
        DYE_RESOLUTION: 1440,
        CAPTURE_RESOLUTION: 512,
        DENSITY_DISSIPATION: 3.5,
        VELOCITY_DISSIPATION: 2.0,
        PRESSURE: 0.1,
        PRESSURE_ITERATIONS: 20,
        CURL: 2.0,
        SPLAT_RADIUS: 0.2,
        SPLAT_FORCE: 6000,
        SHADING: true,
        COLOR_UPDATE_SPEED: 10,
        PAUSED: false,
        BACK_COLOR: { r: 0, g: 0, b: 0 },
        TRANSPARENT: false, // Must be false for WebGL Bloom/Shading to work correctly!
        COLORFUL: false,
        SPLAT_COLOR: { r: 1.5, g: 1.2, b: 0.4 }, // Very dim Champagne Gold
        BLOOM: true,
        BLOOM_INTENSITY: 0.3,
        SUNRAYS: false,
      });

      const proxyEvent = (e: Event) => {
        if (!canvasRef.current || !e.isTrusted) return;
        
        // Use bubbles: false so we don't trigger the window listener again (infinite loop)
        const ev = new Event(e.type, { bubbles: false }) as Event & { [key: string]: unknown };
        
        if (e.type.includes('touch')) {
            const touchE = e as TouchEvent;
            ev.touches = touchE.touches;
            ev.targetTouches = touchE.touches; // webgl-fluid uses targetTouches
            ev.changedTouches = touchE.changedTouches;
            ev.pageX = touchE.touches[0]?.pageX;
            ev.pageY = touchE.touches[0]?.pageY;
        } else {
            const mouseE = e as MouseEvent;
            ev.clientX = mouseE.clientX;
            ev.clientY = mouseE.clientY;
            ev.offsetX = mouseE.clientX; // Because canvas is inset-0, client == offset
            ev.offsetY = mouseE.clientY;
            ev.buttons = mouseE.buttons;
        }
        
        canvasRef.current.dispatchEvent(ev);
      };

      // Only proxy click events, disable hover/move to remove the trailing effect
      window.addEventListener('mousedown', proxyEvent);
      window.addEventListener('touchstart', proxyEvent, { passive: false });
      window.addEventListener('mouseup', proxyEvent);
      window.addEventListener('touchend', proxyEvent);

      return () => {
        window.removeEventListener('mousedown', proxyEvent);
        window.removeEventListener('touchstart', proxyEvent);
        window.removeEventListener('mouseup', proxyEvent);
        window.removeEventListener('touchend', proxyEvent);
      };
    }
  }, []);

  return (
    <canvas
      id="fluid"
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[40] h-[100svh] w-screen"
      style={{ mixBlendMode: "screen", opacity: 0.8 }}
    />
  );
}
