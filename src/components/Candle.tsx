import { CandleProps } from "@shared";

/**
 * Single candle with configurable height, width, and bottom.
 * Invoked in <CandlesLeft /> and <CandlesRight /> and mounted to <Desk />.
 */
const Candle = ({
  bottom = "0px",
  width = "34px",
  height = "80%",
}: CandleProps) => {
  return (
    <div
      className="candle"
      style={
        {
          "--candle-width": width,
          "--candle-height": height,
          "--candle-bottom": bottom,
        } as React.CSSProperties
      }
    >
      <div className="flame">
        <div className="shadows"></div>
        <div className="top"></div>
        <div className="middle"></div>
        <div className="bottom"></div>
      </div>
      <div className="wick"></div>
      <div className="wax"></div>
    </div>
  );
};

export default Candle;
