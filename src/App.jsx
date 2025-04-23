import React, { useState } from "react";

function App() {
  const [times, setTimes] = useState(6);
  const [rate, setRate] = useState(0.04);
  const [result, setResult] = useState(null);

  const calculateProbability = () => {
    const p = rate / 100;
    const n = times;
    const probability = 1 - Math.pow(1 - p, n);
    setResult((probability * 100).toFixed(4));
  };

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "60px auto",
        padding: 24,
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        北京小客车摇号中签概率模拟器
      </h1>

      <div style={{ marginBottom: 16 }}>
        <label>已参与次数：</label>
        <input
          type="number"
          value={times}
          onChange={(e) => setTimes(parseInt(e.target.value) || 0)}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label>每次中签率（默认 0.04%）：</label>
        <input
          type="number"
          step="0.01"
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        />
      </div>

      <button
        onClick={calculateProbability}
        style={{ padding: "8px 16px", width: "100%" }}
      >
        计算中签概率
      </button>

      {result && (
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 16 }}>累计中签概率：</div>
          <div style={{ fontSize: 28, fontWeight: "bold", color: "green" }}>
            {result}%
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
