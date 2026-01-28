import { useEffect, useRef, useState, useCallback } from 'react';

interface Icon {
  id: string;
  label: string;
  src: string;
}

interface SkillSwarmProps {
  icons: Icon[];
  maxAttractDist?: number;
  attractStrength?: number;
  repelStrength?: number;
  springK?: number;
  damping?: number;
}

interface Position {
  x: number;
  y: number;
}

interface IconState {
  home: Position;
  current: Position;
  velocity: Position;
}

export default function SkillSwarm({
  icons,
  maxAttractDist = 150,
  attractStrength = 0.02,
  repelStrength = 0.15,
  springK = 0.08,
  damping = 0.85,
}: SkillSwarmProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const iconsRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const statesRef = useRef<Map<string, IconState>>(new Map());
  const mousePosRef = useRef<Position>({ x: 0, y: 0 });
  const isMouseActiveRef = useRef(false);
  const [reducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Initialize home positions in an arc pattern
  const initializePositions = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(rect.width, rect.height) * 0.35;
    const angleStep = (Math.PI * 1.2) / icons.length; // 120 degree arc
    const startAngle = Math.PI / 2 - (angleStep * (icons.length - 1)) / 2;

    icons.forEach((icon, index) => {
      const angle = startAngle + angleStep * index;
      const homeX = centerX + Math.cos(angle) * radius;
      const homeY = centerY + Math.sin(angle) * radius;

      const existingState = statesRef.current.get(icon.id);
      statesRef.current.set(icon.id, {
        home: { x: homeX, y: homeY },
        current: existingState?.current || { x: homeX, y: homeY },
        velocity: existingState?.velocity || { x: 0, y: 0 },
      });
    });
  }, [icons]);

  // Physics simulation
  const updatePhysics = useCallback(() => {
    if (reducedMotion) return;

    const mousePos = mousePosRef.current;
    const isActive = isMouseActiveRef.current;

    statesRef.current.forEach((state, iconId) => {
      const { home, current, velocity } = state;
      let fx = 0;
      let fy = 0;

      // Spring force to home position
      const dx = home.x - current.x;
      const dy = home.y - current.y;
      fx += dx * springK;
      fy += dy * springK;

      // Mouse attraction/repulsion
      if (isActive) {
        const mouseDx = mousePos.x - current.x;
        const mouseDy = mousePos.y - current.y;
        const dist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

        if (dist < maxAttractDist && dist > 0) {
          const normalizedDx = mouseDx / dist;
          const normalizedDy = mouseDy / dist;

          // Attraction when far, repulsion when close
          if (dist > 60) {
            const strength = attractStrength * (1 - dist / maxAttractDist);
            fx += normalizedDx * strength * dist;
            fy += normalizedDy * strength * dist;
          } else {
            // Repulsion when too close
            const strength = repelStrength * (1 - dist / 60);
            fx -= normalizedDx * strength * 100;
            fy -= normalizedDy * strength * 100;
          }
        }
      }

      // Inter-icon repulsion (prevent overlap)
      statesRef.current.forEach((otherState, otherId) => {
        if (otherId === iconId) return;

        const otherCurrent = otherState.current;
        const dx = current.x - otherCurrent.x;
        const dy = current.y - otherCurrent.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 70 && dist > 0) {
          const normalizedDx = dx / dist;
          const normalizedDy = dy / dist;
          const strength = repelStrength * 0.5 * (1 - dist / 70);
          fx += normalizedDx * strength * 50;
          fy += normalizedDy * strength * 50;
        }
      });

      // Update velocity with damping
      let newVx = (velocity.x + fx) * damping;
      let newVy = (velocity.y + fy) * damping;

      // Update position
      const newX = current.x + newVx;
      const newY = current.y + newVy;

      state.current = { x: newX, y: newY };
      state.velocity = { x: newVx, y: newVy };

      // Update DOM
      const iconElement = iconsRef.current.get(iconId);
      if (iconElement) {
        iconElement.style.transform = `translate(${newX}px, ${newY}px)`;
      }
    });

    animationFrameRef.current = requestAnimationFrame(updatePhysics);
  }, [maxAttractDist, attractStrength, repelStrength, springK, damping, reducedMotion]);

  // Handle mouse/touch movement
  const handlePointerMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!containerRef.current || reducedMotion) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;

      if (clientX === undefined || clientY === undefined) return;

      mousePosRef.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
      isMouseActiveRef.current = true;
    },
    [reducedMotion]
  );

  const handlePointerLeave = useCallback(() => {
    isMouseActiveRef.current = false;
  }, []);

  // Initialize and start animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Wait for layout to be complete
    const init = () => {
      initializePositions();

      // Update initial DOM positions
      statesRef.current.forEach((state, iconId) => {
        const iconElement = iconsRef.current.get(iconId);
        if (iconElement) {
          iconElement.style.transform = `translate(${state.home.x}px, ${state.home.y}px)`;
        }
      });

      if (!reducedMotion) {
        animationFrameRef.current = requestAnimationFrame(updatePhysics);
        container.addEventListener('mousemove', handlePointerMove);
        container.addEventListener('touchmove', handlePointerMove, { passive: true });
        container.addEventListener('mouseleave', handlePointerLeave);
        container.addEventListener('touchend', handlePointerLeave);
        container.addEventListener('touchcancel', handlePointerLeave);
      }
    };

    // Use double RAF to ensure layout is complete
    requestAnimationFrame(() => {
      requestAnimationFrame(init);
    });

    // Handle resize
    const handleResize = () => {
      initializePositions();
      // Update positions after resize
      statesRef.current.forEach((state, iconId) => {
        const iconElement = iconsRef.current.get(iconId);
        if (iconElement && !isMouseActiveRef.current) {
          iconElement.style.transform = `translate(${state.home.x}px, ${state.home.y}px)`;
        }
      });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (!reducedMotion) {
        container.removeEventListener('mousemove', handlePointerMove);
        container.removeEventListener('touchmove', handlePointerMove);
        container.removeEventListener('mouseleave', handlePointerLeave);
        container.removeEventListener('touchend', handlePointerLeave);
        container.removeEventListener('touchcancel', handlePointerLeave);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [initializePositions, updatePhysics, handlePointerMove, handlePointerLeave, reducedMotion]);

  return (
    <div className="w-full max-w-[820px] mx-auto">
      <div
        ref={containerRef}
        className="relative w-full h-[500px] touch-none"
        style={{ minHeight: '500px', touchAction: 'none' }}
      >
        {icons.map((icon, index) => {
          const state = statesRef.current.get(icon.id);
          // Calculate initial position for first render
          const getInitialPosition = () => {
            if (state?.home.x && state?.home.y) {
              return { x: state.home.x, y: state.home.y };
            }
            // Fallback: center position until initialized
            return { x: 50 + (index % 5) * 100, y: 50 + Math.floor(index / 5) * 100 };
          };
          const initialPos = getInitialPosition();

          return (
            <div
              key={icon.id}
              ref={(el) => {
                if (el) iconsRef.current.set(icon.id, el);
              }}
              className="absolute top-0 left-0 w-[56px] h-[56px] rounded-2xl flex items-center justify-center will-change-transform cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-from focus:ring-offset-2 focus:ring-offset-dark-bg transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-accent-from/20"
              style={{
                transform: `translate(${initialPos.x}px, ${initialPos.y}px)`,
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
              aria-label={icon.label}
              title={icon.label}
              tabIndex={0}
              role="button"
              onFocus={(e) => {
                if (!containerRef.current || reducedMotion) return;
                const rect = containerRef.current.getBoundingClientRect();
                const iconRect = e.currentTarget.getBoundingClientRect();
                mousePosRef.current = {
                  x: iconRect.left - rect.left + iconRect.width / 2,
                  y: iconRect.top - rect.top + iconRect.height / 2,
                };
                isMouseActiveRef.current = true;
              }}
              onBlur={() => {
                isMouseActiveRef.current = false;
              }}
              onMouseEnter={(e) => {
                if (!containerRef.current || reducedMotion) return;
                const rect = containerRef.current.getBoundingClientRect();
                const iconRect = e.currentTarget.getBoundingClientRect();
                mousePosRef.current = {
                  x: iconRect.left - rect.left + iconRect.width / 2,
                  y: iconRect.top - rect.top + iconRect.height / 2,
                };
                isMouseActiveRef.current = true;
              }}
              onTouchStart={(e) => {
                if (!containerRef.current || reducedMotion) return;
                const rect = containerRef.current.getBoundingClientRect();
                const touch = e.touches[0];
                mousePosRef.current = {
                  x: touch.clientX - rect.left,
                  y: touch.clientY - rect.top,
                };
                isMouseActiveRef.current = true;
              }}
            >
              <img
                src={icon.src}
                alt={icon.label}
                className="w-8 h-8 object-contain"
                loading="lazy"
                draggable={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

