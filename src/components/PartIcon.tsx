import type { FC } from "react";

/**
 * PartIcon — schematic line drawings for each bin item.
 * Intentionally CSS/SVG (not photography): monochrome graphite glyphs on the
 * faint grid tile read as technical catalog illustrations and keep the
 * component-bin identity consistent and lightweight.
 */
interface Props {
  part: string;
  className?: string;
}

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const BALL = {
  fill: "currentColor",
  stroke: "none",
};

function shapes(part: string) {
  switch (part) {
    case "bolt":
      return (
        <g {...STROKE}>
          <polygon points="20,16 44,16 56,30 44,44 20,44 8,30" />
          <rect x="26" y="44" width="12" height="16" />
          <path d="M26 50 H38 M26 56 H38" />
        </g>
      );
    case "nut":
      return (
        <g {...STROKE}>
          <polygon points="12,32 22,14 42,14 52,32 42,50 22,50" />
          <circle cx="32" cy="32" r="9" />
        </g>
      );
    case "washer":
      return (
        <g {...STROKE}>
          <circle cx="32" cy="32" r="22" />
          <circle cx="32" cy="32" r="11" />
        </g>
      );
    case "screw":
      return (
        <g {...STROKE}>
          <path d="M14 26 Q32 10 50 26" />
          <path d="M14 26 H50" />
          <path d="M24 26 L30 60 L34 60 L40 26" />
          <path d="M25 34 L39 35 M26 41 L38 42" />
        </g>
      );
    case "wrench":
      return (
        <g {...STROKE}>
          <circle cx="20" cy="44" r="11" />
          <circle cx="20" cy="44" r="5" />
          <path d="M28 36 L46 18" strokeWidth={7} />
          <path d="M40 10 L54 10 L54 18" />
        </g>
      );
    case "driver":
      return (
        <g {...STROKE}>
          <rect x="17" y="40" width="30" height="16" />
          <path d="M24 40 V46 M32 40 V46 M40 40 V46" />
          <rect x="29" y="14" width="6" height="28" />
          <path d="M27 14 L37 14 L32 6 Z" />
        </g>
      );
    case "pliers":
      return (
        <g {...STROKE}>
          <path d="M20 8 L30 30 M44 8 L34 30" />
          <path d="M17 5 L24 5 M40 5 L47 5" />
          <circle cx="32" cy="30" r="3.5" />
          <path d="M30 30 L18 56 M34 30 L46 56" />
        </g>
      );
    case "bearing":
      return (
        <g>
          <g {...STROKE}>
            <circle cx="32" cy="32" r="24" />
            <circle cx="32" cy="32" r="12" />
          </g>
          <circle {...BALL} cx="50" cy="32" r="2.6" />
          <circle {...BALL} cx="41" cy="16.4" r="2.6" />
          <circle {...BALL} cx="23" cy="16.4" r="2.6" />
          <circle {...BALL} cx="14" cy="32" r="2.6" />
          <circle {...BALL} cx="23" cy="47.6" r="2.6" />
          <circle {...BALL} cx="41" cy="47.6" r="2.6" />
        </g>
      );
    case "resistor":
      return (
        <g {...STROKE}>
          <path d="M4 32 H20" />
          <path d="M44 32 H60" />
          <rect x="20" y="24" width="24" height="16" />
          <path d="M26 24 V40 M31 24 V40 M36 24 V40" />
        </g>
      );
    case "switch":
      return (
        <g>
          <g {...STROKE}>
            <rect x="14" y="20" width="36" height="26" />
            <path d="M22 46 V56 M42 46 V56" />
            <path d="M30 42 L45 18" strokeWidth={4} />
          </g>
          <circle {...BALL} cx="30" cy="42" r="2.4" />
        </g>
      );
    case "hinge":
      return (
        <g>
          <g {...STROKE}>
            <rect x="6" y="14" width="22" height="36" />
            <rect x="36" y="14" width="22" height="36" />
            <rect x="28" y="12" width="8" height="40" />
            <path d="M12 22 H22 M12 32 H22 M12 42 H22 M42 22 H52 M42 32 H52 M42 42 H52" />
          </g>
          <circle {...BALL} cx="32" cy="32" r="2.2" />
        </g>
      );
    case "spring":
      return (
        <g {...STROKE}>
          <path d="M10 10 H54" />
          <path d="M16 14 Q48 18 16 22 Q48 26 16 30 Q48 34 16 38 Q48 42 16 46 Q48 50 16 54" />
          <path d="M10 56 H54" />
        </g>
      );
    case "disc":
      return (
        <g {...STROKE}>
          <circle cx="32" cy="32" r="24" />
          <circle cx="32" cy="32" r="7" />
          <path d="M32 8 V14 M56 32 H50 M32 56 V50 M8 32 H14" />
          <path d="M49 15 L45 19 M49 49 L45 45 M15 49 L19 45 M15 15 L19 19" />
        </g>
      );
    case "belt":
      return (
        <g {...STROKE}>
          <circle cx="20" cy="32" r="9" />
          <circle cx="20" cy="32" r="3" />
          <circle cx="48" cy="32" r="9" />
          <circle cx="48" cy="32" r="3" />
          <path d="M20 23 H48 M20 41 H48" />
          <path d="M24 28 H30 M34 28 H40 M24 36 H30 M34 36 H40" />
        </g>
      );
    case "grease":
      return (
        <g {...STROKE}>
          <rect x="24" y="4" width="16" height="8" />
          <ellipse cx="32" cy="16" rx="16" ry="5" />
          <path d="M16 16 V48" />
          <path d="M48 16 V48" />
          <path d="M16 48 A16 5 0 0 0 48 48" />
          <path d="M16 32 A16 5 0 0 0 48 32" />
        </g>
      );
    case "bottle":
      return (
        <g {...STROKE}>
          <rect x="26" y="4" width="12" height="8" />
          <rect x="29" y="12" width="6" height="8" />
          <path d="M22 20 H42 V56 H22 Z" />
          <path d="M22 40 H42" />
        </g>
      );
    default:
      return (
        <g {...STROKE}>
          <rect x="12" y="12" width="40" height="40" />
          <path d="M20 32 H44 M32 20 V44" />
        </g>
      );
  }
}

const PartIcon: FC<Props> = ({ part, className }) => (
  <svg
    className={className}
    viewBox="0 0 64 64"
    role="img"
    aria-label={`${part} component illustration`}
    focusable="false"
  >
    {shapes(part)}
  </svg>
);

export default PartIcon;
