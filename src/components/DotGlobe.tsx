import { useEffect, useRef, useState } from "react";
import { getTimezoneById, type Timezone } from "@/data/timezones";
import { getTranslations, getDefaultLanguage } from "@/i18n";

interface DotGlobeProps {
  selectedTimezone: Timezone;
  onTimezoneChange?: (timezone: Timezone) => void;
  globeTextureSrc?: string; // e.g. "/assets/globe-dots.png"
}

export default function DotGlobe({
  selectedTimezone: initialTimezone,
  onTimezoneChange,
  globeTextureSrc: propGlobeTextureSrc,
}: DotGlobeProps) {
  const [selectedTimezone, setSelectedTimezone] = useState<Timezone>(initialTimezone);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [debugMode, setDebugMode] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const globeCircleRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);

  const animationRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  const [currentTransform, setCurrentTransform] = useState({ x: 0, y: 0 });

  // Debug: log texture source
  useEffect(() => {
    if (propGlobeTextureSrc) {
      console.log("Globe texture source:", propGlobeTextureSrc);
    } else {
      console.warn("Globe texture source missing; fallback pattern will be used.");
    }
  }, [propGlobeTextureSrc]);

  // Check debug mode (?debug=1)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setDebugMode(urlParams.get("debug") === "1");
  }, []);

  // Reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Listen for timezone changes from buttons (custom event)
  useEffect(() => {
    const handleTimezoneChange = (e: Event) => {
      const ce = e as CustomEvent;
      const timezoneId = ce.detail?.timezoneId as string | undefined;
      if (!timezoneId) return;

      const tz = getTimezoneById(timezoneId);
      if (!tz) return;

      setSelectedTimezone(tz);
      setPopoverOpen(false);
      onTimezoneChange?.(tz);
    };

    document.addEventListener("timezone-change", handleTimezoneChange as EventListener);
    return () => {
      document.removeEventListener("timezone-change", handleTimezoneChange as EventListener);
    };
  }, [onTimezoneChange]);

  // Close popover on ESC or outside click
  useEffect(() => {
    if (!popoverOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPopoverOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!markerRef.current) return;
      if (!markerRef.current.contains(t)) setPopoverOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [popoverOpen]);

  // Mouse/touch interaction (rotate illusion)
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || reducedMotion) return;

    const updateTargetFromPoint = (clientX: number, clientY: number) => {
      const rect = wrapper.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const nx = (x / rect.width - 0.5) * 2; // -1..1
      const ny = (y / rect.height - 0.5) * 2; // -1..1

      targetRef.current.x = nx;
      targetRef.current.y = ny;
    };

    const handleMouseMove = (e: MouseEvent) => updateTargetFromPoint(e.clientX, e.clientY);
    const handleMouseLeave = () => {
      targetRef.current.x = 0;
      targetRef.current.y = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (!touch) return;
      updateTargetFromPoint(touch.clientX, touch.clientY);
    };

    const handleTouchEnd = () => {
      targetRef.current.x = 0;
      targetRef.current.y = 0;
    };

    const animate = () => {
      const lerp = 0.08;

      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lerp;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lerp;

      // state update (ok for small component; if perf issue, we can set CSS vars instead)
      setCurrentTransform({ x: currentRef.current.x, y: currentRef.current.y });

      animationRef.current = requestAnimationFrame(animate);
    };

    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", handleMouseLeave);
    wrapper.addEventListener("touchmove", handleTouchMove, { passive: false });
    wrapper.addEventListener("touchend", handleTouchEnd);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
      wrapper.removeEventListener("touchmove", handleTouchMove);
      wrapper.removeEventListener("touchend", handleTouchEnd);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [reducedMotion]);

  // Debug mode: drag marker to calibrate (reference = globeCircle)
  useEffect(() => {
    if (!debugMode) return;
    const marker = markerRef.current;
    const globeCircle = globeCircleRef.current;
    if (!marker || !globeCircle) return;

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let startCenterX = 0;
    let startCenterY = 0;

    const onDown = (e: MouseEvent) => {
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;

      const rect = marker.getBoundingClientRect();
      startCenterX = rect.left + rect.width / 2;
      startCenterY = rect.top + rect.height / 2;

      e.preventDefault();
      e.stopPropagation();
    };

    const onMove = (e: MouseEvent) => {
      if (!dragging) return;

      const circleRect = globeCircle.getBoundingClientRect();
      const newX = startCenterX + (e.clientX - startX);
      const newY = startCenterY + (e.clientY - startY);

      const percentX = ((newX - circleRect.left) / circleRect.width) * 100;
      const percentY = ((newY - circleRect.top) / circleRect.height) * 100;

      const clampedX = Math.max(0, Math.min(100, percentX));
      const clampedY = Math.max(0, Math.min(100, percentY));

      marker.style.left = `${clampedX}%`;
      marker.style.top = `${clampedY}%`;

      console.log(`Marker position: x=${clampedX.toFixed(1)}%, y=${clampedY.toFixed(1)}%`);
    };

    const onUp = () => {
      if (!dragging) return;
      dragging = false;

      const circleRect = globeCircle.getBoundingClientRect();
      const markerRect = marker.getBoundingClientRect();

      const percentX =
        ((markerRect.left + markerRect.width / 2 - circleRect.left) / circleRect.width) * 100;
      const percentY =
        ((markerRect.top + markerRect.height / 2 - circleRect.top) / circleRect.height) * 100;

      console.log(
        `Final position for ${selectedTimezone.id.toUpperCase()}: { x: ${percentX.toFixed(
          1
        )}, y: ${percentY.toFixed(1)} }`
      );
    };

    marker.addEventListener("mousedown", onDown);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);

    return () => {
      marker.removeEventListener("mousedown", onDown);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [debugMode, selectedTimezone.id]);

  // Transforms (illusion)
  const rotateY = reducedMotion ? 0 : currentTransform.x * 10;
  const rotateX = reducedMotion ? 0 : -currentTransform.y * 6;
  const translateX = reducedMotion ? 0 : currentTransform.x * 10;
  const translateY = reducedMotion ? 0 : currentTransform.y * 8;
  const scale =
    reducedMotion ? 1 : 1 + Math.abs(currentTransform.x) * 0.01 + Math.abs(currentTransform.y) * 0.01;

  // language (optional)
  const [lang, setLang] = useState<"tr" | "en">("tr");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLang(getDefaultLanguage());
      
      // Listen for language changes
      const handleStorageChange = () => {
        setLang(getDefaultLanguage());
      };
      window.addEventListener("storage", handleStorageChange);
      
      // Also listen for custom language change event
      const handleLanguageChange = () => {
        setLang(getDefaultLanguage());
      };
      window.addEventListener("language-change", handleLanguageChange);
      
      return () => {
        window.removeEventListener("storage", handleStorageChange);
        window.removeEventListener("language-change", handleLanguageChange);
      };
    }
  }, []);
  const isTurkish = lang === "tr";
  const t = getTranslations(lang);

  // fallback pattern (safe string)
  const fallbackPattern =
    "radial-gradient(circle at 20% 30%, rgba(124, 58, 237, 0.35) 2px, transparent 2px), radial-gradient(circle at 60% 50%, rgba(34, 211, 238, 0.35) 2px, transparent 2px), radial-gradient(circle at 80% 70%, rgba(124, 58, 237, 0.25) 2px, transparent 2px), radial-gradient(circle at 40% 80%, rgba(34, 211, 238, 0.25) 2px, transparent 2px), radial-gradient(circle at 10% 60%, rgba(124, 58, 237, 0.3) 2px, transparent 2px), radial-gradient(circle at 90% 40%, rgba(34, 211, 238, 0.3) 2px, transparent 2px)";

  const texture = propGlobeTextureSrc?.trim() ? propGlobeTextureSrc : "";

  return (
    <div
      ref={wrapperRef}
      data-dot-globe
      className="relative h-full w-full overflow-hidden rounded-2xl"
      style={{ perspective: "1000px" }}
    >
      {/* Full area viewport */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Globe circle (marker reference) */}
        <div
          ref={globeCircleRef}
          className="absolute"
          style={{
            left: "50%",
            top: "58%",
            transform: "translate(-50%, -50%)",
            width: "min(420px, 92%)",
            aspectRatio: "1 / 1",
            borderRadius: "9999px",
            position: "relative",
          }}
        >
          {/* Globe layers */}
          <div
            className="relative h-full w-full"
            style={{
              transform: `scale(${scale})`,
              transition: reducedMotion ? "transform 0.3s ease-out" : "none",
            }}
          >
            {/* Layer A: Transform container */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
                transformStyle: "preserve-3d",
                transition: reducedMotion ? "transform 0.3s ease-out" : "none",
              }}
            >
              {/* Texture layer (only if texture exists) */}
              {texture && (
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundImage: 'url("' + texture + '")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    filter: "brightness(1.1) contrast(1.05)",
                  }}
                />
              )}

              {/* Fallback pattern layer (only if no texture) */}
              {!texture && (
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: fallbackPattern,
                    backgroundSize: "80% 80%, 80% 80%, 80% 80%, 80% 80%, 80% 80%, 80% 80%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    filter: "brightness(1.1) contrast(1.05)",
                  }}
                />
              )}
            </div>

            {/* Glow / rim light */}
            <div
              className="absolute inset-0 rounded-full opacity-30"
              style={{
                background: `radial-gradient(circle at ${50 + translateX}% ${50 + translateY}%, rgba(124, 58, 237, 0.45) 0%, transparent 70%)`,
                transform: `translate(${translateX}px, ${translateY}px)`,
                transition: reducedMotion ? "all 0.3s ease-out" : "none",
              }}
            />

            {/* Vignette */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, transparent 0%, rgba(0,0,0,0.35) 100%)",
              }}
            />
          </div>

          {/* Marker (relative to globeCircle) */}
          <div
            ref={markerRef}
            className="absolute z-10 cursor-pointer transition-transform hover:scale-110"
            style={{
              left: `${selectedTimezone.locator.x}%`,
              top: `${selectedTimezone.locator.y}%`,
              transform: "translate(-50%, -50%)",
              cursor: debugMode ? "move" : "pointer",
            }}
            onClick={(e) => {
              e.stopPropagation();
              setPopoverOpen((v) => !v);
            }}
            role="button"
            tabIndex={0}
            aria-label={`${selectedTimezone.city}, ${selectedTimezone.label}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setPopoverOpen((v) => !v);
              }
            }}
          >
            {/* Pulse (disabled in reduced motion) */}
            {!reducedMotion && (
              <>
                <div className="absolute inset-0 -m-2 animate-ping rounded-full bg-purple-500 opacity-20" />
                <div className="absolute inset-0 -m-1 animate-pulse rounded-full bg-purple-500 opacity-30" />
              </>
            )}

            {/* Dot */}
            <div
              className="relative rounded-full bg-purple-500"
              style={{
                width: 8,
                height: 8,
                boxShadow: popoverOpen
                  ? "0 0 12px rgba(124, 58, 237, 1), 0 0 24px rgba(124, 58, 237, 0.6)"
                  : "0 0 8px rgba(124, 58, 237, 0.8), 0 0 16px rgba(124, 58, 237, 0.4)",
              }}
            />

            {/* Popover */}
            {popoverOpen && (
              <div
                className="absolute left-1/2 bottom-full mb-3 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 px-4 py-3 text-sm shadow-xl backdrop-blur-md"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  minWidth: 200,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="space-y-1">
                  <div className="font-semibold text-white">
                    {selectedTimezone.city}
                    {isTurkish && selectedTimezone.id === "tr"
                      ? ", Türkiye"
                      : `, ${selectedTimezone.label}`}
                  </div>
                  <div className="text-xs text-white/70">{selectedTimezone.gmt}</div>
                  <div className="text-xs text-white/70">
                    {isTurkish ? "Çalışma Saatleri" : "Available"}: {selectedTimezone.hours}
                  </div>
                </div>

                {/* Arrow */}
                <div
                  className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 rotate-45 border-r border-b border-white/10"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    width: 8,
                    height: 8,
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Bottom label */}
        <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-center">
          <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-md">
            <span className="text-xs font-medium text-white/60">{t.home.cards.timezone.remote || "REMOTE"} — </span>
            <span className="text-xs font-semibold text-purple-400">{selectedTimezone.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
