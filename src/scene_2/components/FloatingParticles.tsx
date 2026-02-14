import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const FloatingParticles: React.FC = () => {
    const frame = useCurrentFrame();

    const particles = useMemo(() => {
        return Array.from({ length: 15 }).map((_, i) => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 10 + Math.random() * 30,
            speed: 0.2 + Math.random() * 0.5,
            delay: Math.random() * 100,
            opacity: 0.05 + Math.random() * 0.1,
            rotation: Math.random() * 360,
        }));
    }, []);

    return (
        <AbsoluteFill className="pointer-events-none overflow-hidden opacity-50">
            {particles.map((p, i) => {
                const moveY = (frame * p.speed + p.delay) % 120 - 10;
                const floatOpacity = interpolate(moveY, [-10, 10, 100, 120], [0, p.opacity, p.opacity, 0]);

                return (
                    <div
                        key={i}
                        className="absolute bg-white rounded-lg shadow-sm border border-blue-100"
                        style={{
                            left: `${p.x}%`,
                            top: `${moveY}%`,
                            width: p.size,
                            height: p.size * 1.4,
                            opacity: floatOpacity,
                            transform: `rotate(${p.rotation + frame * 0.1}deg)`,
                        }}
                    >
                        <div className="mt-2 mx-1 h-0.5 bg-blue-50 opacity-50" />
                        <div className="mt-1 mx-1 h-0.5 bg-blue-50 opacity-50" />
                        <div className="mt-1 mx-1 w-2/3 h-0.5 bg-blue-50 opacity-50" />
                    </div>
                );
            })}
        </AbsoluteFill>
    );
};
