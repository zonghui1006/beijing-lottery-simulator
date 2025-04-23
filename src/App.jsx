import React, { useState } from "react";

function App() {
  const [times, setTimes] = useState(6);
  const [rate, setRate] = useState(0.04);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const calculateProbability = () => {
    const p = rate / 100;
    const n = times;
    const probability = 1 - Math.pow(1 - p, n);
    setResult((probability * 100).toFixed(4));
    setCopied(false);
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(`${result}%`).then(() => setCopied(true));
    }
  };

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "40px auto",
        padding: "24px 20px",
        fontFamily: "system-ui, sans-serif",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
      }}
    >
      <h1
        style={{
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
          color: "#333",
        }}
      >
        北京小客车摇号中签概率模拟器
      </h1>

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontWeight: 500, display: "block", marginBottom: 6 }}>
          已参与次数：
        </label>
        <input
          type="number"
          value={times}
          onChange={(e) => setTimes(parseInt(e.target.value) || 0)}
          style={{
            width: "100%",
            padding: 10,
            fontSize: 16,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontWeight: 500, display: "block", marginBottom: 6 }}>
          每次中签率（默认 0.04%）：
        </label>
        <input
          type="number"
          step="0.01"
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
          style={{
            width: "100%",
            padding: 10,
            fontSize: 16,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />
      </div>

      <button
        onClick={calculateProbability}
        style={{
          padding: "12px 16px",
          fontSize: 16,
          fontWeight: 600,
          width: "100%",
          backgroundColor: "#1a73e8",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        计算中签概率
      </button>

      {result && (
        <div style={{ marginTop: 28, textAlign: "center" }}>
          <div style={{ fontSize: 16, color: "#444" }}>累计中签概率：</div>
          <div
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: "#34a853",
              marginTop: 8,
            }}
          >
            {result}%
          </div>

          <button
            onClick={copyResult}
            style={{
              marginTop: 12,
              padding: "8px 16px",
              border: "1px solid #ccc",
              borderRadius: 6,
              backgroundColor: copied ? "#d4edda" : "#f8f9fa",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            {copied ? "已复制到剪贴板 ✅" : "复制中签结果"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
