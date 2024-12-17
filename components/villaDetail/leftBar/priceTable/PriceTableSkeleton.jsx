export default function PriceTableSkeleton() {
  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        backgroundColor: "#f2f2f2",
        borderRadius: "8px",
        margin: "10px 0",
        padding: 30,
      }}
    >
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
            <span style={{backgroundColor: "#cfcfcf", display: "inline-block", width: 200, height: 30, animation: 'pulse 1.5s infinite'}}></span>
            <div style={{gap: 20, display: "flex"}}>
                <span style={{backgroundColor: "#cfcfcf", width: 70, height: 30, display: "inline-block", animation: 'pulse 1.5s infinite'}}></span>
                <span style={{backgroundColor: "#cfcfcf", width: 70, height: 30, display: "inline-block", animation: 'pulse 1.5s infinite'}}></span>
                <span style={{backgroundColor: "#cfcfcf", width: 70, height: 30, display: "inline-block", animation: 'pulse 1.5s infinite'}}></span>
                <span style={{backgroundColor: "#cfcfcf", width: 70, height: 30, display: "inline-block", animation: 'pulse 1.5s infinite'}}></span>
            </div>
        </div>
        <div style={{width: "100%", height: "100%", padding: "20px 0 60px 0"}}>
            <div style={{width: "100%", height: "100%", display: "flex"}}>
                <div style={{width: "33.333%", padding: 10}}>
                    <span style={{width: "100%", height: 150, backgroundColor: "#cfcfcf", display: "inline-block", animation: 'pulse 1.5s infinite'}}></span>
                </div>
                <div style={{width: "33.333%", padding: 10}}>
                    <span style={{width: "100%", height: 150, backgroundColor: "#cfcfcf", display: "inline-block", animation: 'pulse 1.5s infinite'}}></span>
                </div>
                <div style={{width: "33.333%", padding: 10}}>
                    <span style={{width: "100%", height: 150, backgroundColor: "#cfcfcf", display: "inline-block", animation: 'pulse 1.5s infinite'}}></span>
                </div>
            </div>
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
