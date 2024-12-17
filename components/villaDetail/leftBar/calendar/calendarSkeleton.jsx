export default function CalendarSkeleton() {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#f2f2f2",
        borderRadius: "8px",
        padding: "20px 0"
      }}
    >
        <div style={{width: "100%", display:"flex", justifyContent: "space-between"}}>
            <span style={{width: 200, height: 30, backgroundColor: "#cfcfcf", animation: 'pulse 1.5s infinite'}}></span>
            <div style={{height: 30, display: "flex", justifyContent:"space-between", gap: 10}}>
                <div style={{display: "flex", alignItems: "center", gap: 10}}>
                    <span style={{ width: 30, height: 30, display: "inline-block", backgroundColor: "#cfcfcf", animation: 'pulse 1.5s infinite', borderRadius: "50%"}}></span>
                    <span style={{ width: 60, height: 15, display: "inline-block", backgroundColor: "#cfcfcf", animation: 'pulse 1.5s infinite'}}></span>
                </div>
                <div style={{display: "flex", alignItems: "center", gap: 10}}>
                    <span style={{ width: 30, height: 30, display: "inline-block", backgroundColor: "#cfcfcf", animation: 'pulse 1.5s infinite', borderRadius: "50%"}}></span>
                    <span style={{ width: 40, height: 15, display: "inline-block", backgroundColor: "#cfcfcf", animation: 'pulse 1.5s infinite'}}></span>
                </div>
            </div>
        </div>
        <div style={{width: "100%", display: "flex", marginTop: 30, flexWrap: "wrap"}}>
            <div style={{width: "33.333%", height: 300, padding: 20}}>
                <div style={{ width: "100%", height: "100%", backgroundColor: "#cfcfcf", animation: 'pulse 1.5s infinite'}}></div>
            </div>
            <div style={{width: "33.333%", height: 300, padding: 20}}>
                <div style={{ width: "100%", height: "100%", backgroundColor: "#cfcfcf", animation: 'pulse 1.5s infinite'}}></div>
            </div>
            <div style={{width: "33.333%", height: 300, padding: 20}}>
                <div style={{ width: "100%", height: "100%", backgroundColor: "#cfcfcf", animation: 'pulse 1.5s infinite'}}></div>
            </div>
        </div>
      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}
