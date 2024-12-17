export default function DistanceRulerSkeleton() {
  return (
    <div
      style={{
        width: "100%",
        height: "200px",
        backgroundColor: "#f2f2f2",
        borderRadius: "8px",
        margin: "10px 0",
      }}
    >
      <span style={{width: "200px", height: "25px", backgroundColor: "#e0e0e0", display: "inline-block", animation: 'pulse 1.5s infinite', marginTop: 20, marginLeft: 30}}></span>
      <div style={{marginTop: 10}}>
        <div style={{width: "100px", height: "120px", backgroundColor: "#e0e0e0", display: "inline-block", animation: 'pulse 1.5s infinite', marginTop: 10, marginLeft: 30, position: "relative"}}>
            <span style={{backgroundColor: "#cfcfcf", width: 50, height: 10, display: "inline-block", position: "absolute", left: 23, bottom: 40}}></span>
            <span style={{backgroundColor: "#cfcfcf", width: 70, height: 20, display: "inline-block", position: "absolute", left: 14, bottom: 10}}></span>
        </div>
        <div style={{width: "100px", height: "120px", backgroundColor: "#e0e0e0", display: "inline-block", animation: 'pulse 1.5s infinite', marginTop: 10, marginLeft: 30, position: "relative"}}>
            <span style={{backgroundColor: "#cfcfcf", width: 50, height: 10, display: "inline-block", position: "absolute", left: 23, bottom: 40}}></span>
            <span style={{backgroundColor: "#cfcfcf", width: 70, height: 20, display: "inline-block", position: "absolute", left: 14, bottom: 10}}></span>
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
