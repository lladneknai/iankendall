//
// CONFIG
//
const DURATION = 2;
const FADE_TIMEOUT = 0.5;
const SHOW_POINTS = false;
const START_POINT = { x: 252, y: 30 }; // Where plane starts (upper-center-right)
const CONTROL_1 = { x: 333, y: -50 }; // First control point (pulls curve up/right for climb & turn)
const CONTROL_2 = { x: 300, y: 140 }; // Second control point (pulls curve for descent)
const END_POINT = { x: 0, y: 420 }; // Where plane lands (lower-left)

// Build completely smooth path using single cubic Bezier curve
const PATH = `M ${START_POINT.x} ${START_POINT.y} C ${CONTROL_1.x} ${CONTROL_1.y}, ${CONTROL_2.x} ${CONTROL_2.y}, ${END_POINT.x} ${END_POINT.y}`;

export default function ContactButtonFlightPath() {
  return (
    <div id="ContactButtonFlightPath">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        height="350"
        width="400"
      >
        {/* Fade-out animation */}
        <animate
          attributeName="opacity"
          from="1"
          to="0"
          begin={`${FADE_TIMEOUT}s`}
          dur="1s"
          fill="freeze"
        />
        <defs>
          {/* Mask for drawing plane line path */}
          <mask id="mask">
            <path id="basePath" d={PATH} />
            <use
              xlinkHref="#basePath"
              strokeWidth="3"
              stroke="white"
              strokeDasharray="0,500"
              fill="none"
            >
              <animate
                attributeName="stroke-dasharray"
                from="0,500"
                to="500,0"
                begin="0s"
                dur={`${DURATION * 1.5}s`}
                fill="freeze"
              />
            </use>
          </mask>
        </defs>

        {SHOW_POINTS && <ControlPoints />}

        <use
          xlinkHref="#basePath"
          strokeWidth="2"
          strokeDasharray="10"
          stroke="grey"
          fill="none"
          mask="url(#mask)"
        />

        {/* Animated plane icon */}
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
            fill="freeze"
          >
            <mpath xlinkHref="#basePath" />
          </animateMotion>

          <animate
            attributeName="opacity"
            values="1;1;0"
            keyTimes="0;0.75;1"
            dur={`${DURATION}s`}
            fill="freeze"
          />
          <path d="M290.5 287.7L491.4 86.9 359 456.3 290.5 287.7zM457.4 53L256.6 253.8 88 185.3 457.4 53zM38.1 216.8l205.8 83.6 83.6 205.8c5.3 13.1 18.1 21.7 32.3 21.7 14.7 0 27.8-9.2 32.8-23.1L570.6 8c3.5-9.8 1-20.6-6.3-28s-18.2-9.8-28-6.3L39.4 151.7c-13.9 5-23.1 18.1-23.1 32.8 0 14.2 8.6 27 21.7 32.3z" />
        </g>
      </svg>
    </div>
  );
}

function ControlPoints() {
  return (
    <>
      {/* Path markers - visual debugging */}
      {/* Start point (red) */}
      <circle r="5" cx={START_POINT.x} cy={START_POINT.y} fill="red" />
      <text
        x={START_POINT.x}
        y={START_POINT.y - 12}
        fontSize="11"
        fill="red"
        textAnchor="middle"
        fontWeight="bold"
      >
        START
      </text>

      {/* Control point 1 (orange) - pulls climb/turn */}
      <circle
        r="4"
        cx={CONTROL_1.x}
        cy={CONTROL_1.y}
        fill="orange"
        opacity="0.6"
      />
      <text
        x={CONTROL_1.x}
        y={CONTROL_1.y - 12}
        fontSize="10"
        fill="orange"
        textAnchor="middle"
      >
        CTRL 1
      </text>

      {/* Control point 2 (cyan) - pulls descent */}
      <circle
        r="4"
        cx={CONTROL_2.x}
        cy={CONTROL_2.y}
        fill="cyan"
        opacity="0.6"
      />
      <text
        x={CONTROL_2.x}
        y={CONTROL_2.y + 18}
        fontSize="10"
        fill="cyan"
        textAnchor="middle"
      >
        CTRL 2
      </text>

      {/* End point (green) */}
      <circle r="5" cx={END_POINT.x} cy={END_POINT.y} fill="green" />
      <text
        x={END_POINT.x}
        y={END_POINT.y + 18}
        fontSize="11"
        fill="green"
        textAnchor="middle"
        fontWeight="bold"
      >
        END
      </text>
    </>
  );
}
