import SendingMessageFlightPath from "@components/FlightPaths/SendingMessageFlightPath";

export default function MessageIsSending() {
  return (
    <>
      <h1>Sending Message</h1>
      <p>Hang tight while your message is in flight...</p>
      <SendingMessageFlightPath />
    </>
  );
}
