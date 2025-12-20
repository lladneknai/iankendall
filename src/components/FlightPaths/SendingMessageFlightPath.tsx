//
// CONFIG
//
const DURATION = 2; // Duration for complete figure-eight loop
const SHOW_POINTS = false;

// All path points as configurable variables
const CENTER = { x: 200, y: 50 }; // Center crossing point

// Left loop points
const LEFT_TOP_CTRL = { x: 150, y: 0 }; // Control point for top curve
const LEFT_TOP_ANCHOR = { x: 65, y: 15 }; // Top anchor point
const LEFT_SIDE_CTRL = { x: -8, y: 50 }; // Control point for left turn
const LEFT_BOTTOM_ANCHOR = { x: 65, y: 85 }; // Bottom anchor point
const LEFT_BOTTOM_CTRL = { x: 150, y: 100 }; // Control point for bottom curve

// // Right loop points
const RIGHT_TOP_CTRL = { x: 250, y: 0 }; // Control point for top curve
const RIGHT_TOP_ANCHOR = { x: 335, y: 15 }; // Top anchor point
const RIGHT_SIDE_CTRL = { x: 405, y: 50 }; // Control point for right turn
const RIGHT_BOTTOM_ANCHOR = { x: 335, y: 85 }; // Bottom anchor point
const RIGHT_BOTTOM_CTRL = { x: 250, y: 100 }; // Control point for bottom curve

// Build path using quadratic Bezier curves
const PATH = `
  M ${CENTER.x},${CENTER.y}
  Q ${LEFT_TOP_CTRL.x},${LEFT_TOP_CTRL.y} ${LEFT_TOP_ANCHOR.x},${LEFT_TOP_ANCHOR.y}
  Q ${LEFT_SIDE_CTRL.x},${LEFT_SIDE_CTRL.y} ${LEFT_BOTTOM_ANCHOR.x},${LEFT_BOTTOM_ANCHOR.y}
  Q ${LEFT_BOTTOM_CTRL.x},${LEFT_BOTTOM_CTRL.y} ${CENTER.x},${CENTER.y}
  Q ${RIGHT_TOP_CTRL.x},${RIGHT_TOP_CTRL.y} ${RIGHT_TOP_ANCHOR.x},${RIGHT_TOP_ANCHOR.y}
  Q ${RIGHT_SIDE_CTRL.x},${RIGHT_SIDE_CTRL.y} ${RIGHT_BOTTOM_ANCHOR.x},${RIGHT_BOTTOM_ANCHOR.y}
  Q ${RIGHT_BOTTOM_CTRL.x},${RIGHT_BOTTOM_CTRL.y} ${CENTER.x},${CENTER.y}
  Z
`;

export default function SendingMessageFlightPath() {
  return (
    <div id="SendingMessageFlightPath">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        height="100"
        width="400"
      >
        <path
          id="sendingPath"
          d={PATH}
          strokeWidth="2"
          strokeDasharray="10"
          stroke="grey"
          fill="none"
        />
        {SHOW_POINTS && <ControlPoints />}

        {/* Animated plane icon - loops continuously */}
        <g
          transform="translate(-16, -16) rotate(45) scale(0.04)"
          fill="papayawhip"
          stroke="papayawhip"
          strokeWidth="8"
        >
          <animateMotion
            rotate="auto"
            begin="0s"
            dur={`${DURATION}s`}
            repeatCount="indefinite"
          >
            <mpath xlinkHref="#sendingPath" />
          </animateMotion>

          <path d="M290.5 287.7L491.4 86.9 359 456.3 290.5 287.7zM457.4 53L256.6 253.8 88 185.3 457.4 53zM38.1 216.8l205.8 83.6 83.6 205.8c5.3 13.1 18.1 21.7 32.3 21.7 14.7 0 27.8-9.2 32.8-23.1L570.6 8c3.5-9.8 1-20.6-6.3-28s-18.2-9.8-28-6.3L39.4 151.7c-13.9 5-23.1 18.1-23.1 32.8 0 14.2 8.6 27 21.7 32.3z" />
        </g>
      </svg>
    </div>
  );
}

function ControlPoints() {
  return (
    <>
      {/* Path markers - visual debugging for figure-eight */}
      {/* Center crossing point (red) */}
      <circle r="5" cx={CENTER.x} cy={CENTER.y} fill="red" />
      <text
        x={CENTER.x}
        y={CENTER.y - 15}
        fontSize="11"
        fill="red"
        textAnchor="middle"
        fontWeight="bold"
      >
        CENTER
      </text>

      {/* Left loop - anchor points (orange) */}
      <circle
        r="4"
        cx={LEFT_TOP_ANCHOR.x}
        cy={LEFT_TOP_ANCHOR.y}
        fill="orange"
      />
      <circle
        r="4"
        cx={LEFT_BOTTOM_ANCHOR.x}
        cy={LEFT_BOTTOM_ANCHOR.y}
        fill="orange"
      />

      {/* Right loop - anchor points (cyan) */}
      <circle
        r="4"
        cx={RIGHT_TOP_ANCHOR.x}
        cy={RIGHT_TOP_ANCHOR.y}
        fill="cyan"
      />
      <circle
        r="4"
        cx={RIGHT_BOTTOM_ANCHOR.x}
        cy={RIGHT_BOTTOM_ANCHOR.y}
        fill="cyan"
      />

      {/* Control points - top (yellow) */}
      <circle
        r="2"
        cx={LEFT_TOP_CTRL.x}
        cy={LEFT_TOP_CTRL.y}
        fill="yellow"
        opacity="0.5"
      />
      <circle
        r="2"
        cx={RIGHT_TOP_CTRL.x}
        cy={RIGHT_TOP_CTRL.y}
        fill="yellow"
        opacity="0.5"
      />

      {/* Control points - sides (green) */}
      <circle
        r="2"
        cx={LEFT_SIDE_CTRL.x}
        cy={LEFT_SIDE_CTRL.y}
        fill="green"
        opacity="0.5"
      />
      <circle
        r="2"
        cx={RIGHT_SIDE_CTRL.x}
        cy={RIGHT_SIDE_CTRL.y}
        fill="green"
        opacity="0.5"
      />

      {/* Control points - bottom (purple) */}
      <circle
        r="2"
        cx={LEFT_BOTTOM_CTRL.x}
        cy={LEFT_BOTTOM_CTRL.y}
        fill="purple"
        opacity="0.5"
      />
      <circle
        r="2"
        cx={RIGHT_BOTTOM_CTRL.x}
        cy={RIGHT_BOTTOM_CTRL.y}
        fill="purple"
        opacity="0.5"
      />
    </>
  );
}

//
// ORIGINAL POINTS
//
// // Left loop points
// const LEFT_TOP_CTRL = { x: 150, y: 0 }; // Control point for top curve
// const LEFT_TOP_ANCHOR = { x: 65, y: 15 }; // Top anchor point
// const LEFT_SIDE_CTRL = { x: 15, y: 50 }; // Control point for left turn
// const LEFT_BOTTOM_ANCHOR = { x: 65, y: 85 }; // Bottom anchor point
// const LEFT_BOTTOM_CTRL = { x: 150, y: 100 }; // Control point for bottom curve

// // Right loop points
// const RIGHT_TOP_CTRL = { x: 250, y: 0 }; // Control point for top curve
// const RIGHT_TOP_ANCHOR = { x: 335, y: 15 }; // Top anchor point
// const RIGHT_SIDE_CTRL = { x: 385, y: 50 }; // Control point for right turn
// const RIGHT_BOTTOM_ANCHOR = { x: 335, y: 85 }; // Bottom anchor point
// const RIGHT_BOTTOM_CTRL = { x: 250, y: 100 }; // Control point for bottom curve
