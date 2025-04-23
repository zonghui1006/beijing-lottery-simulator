import React, { useState } from "react";

function App() {
  const [mode, setMode] = useState("normal");
  const [times, setTimes] = useState(6);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const [evTimes, setEvTimes] = useState(0);
  const [evYears, setEvYears] = useState(null);
  const [evCopied, setEvCopied] = useState(false);

  const [familyPoints, setFamilyPoints] = useState(0);
  const [familyYears, setFamilyYears] = useState(null);
  const [familyCopied, setFamilyCopied] = useState(false);

  // 配置项
  const normalBaseApplicants = 662714 + 2659052; // 普通指标总基数
  const normalAnnualQuota = 19200; // 每年发放数量
  const evBaseApplicants = 503789; // 新能源排队基数
  const evAnnualQuota = 14600; // 新能源每年发放量
  const familyBaseApplicants = 306133; // 家庭排队总人数
  const familyAnnualQuota = 58400 + 40000; // 家庭每年发放量

  // 新增：往年发放量控制变量
  const previousYearsQuota = 12720; // 设置往年每年发放的数量（可配置）

  const calculateProbability = () => {
    const p = normalAnnualQuota / normalBaseApplicants;
    const probability = 1 - Math.pow(1 - p, times);
    setResult((probability * 100).toFixed(4));
    setCopied(false);
  };

  const copyResult = () => {
    if (result)
      navigator.clipboard.writeText(`${result}%`).then(() => setCopied(true));
  };

  const estimateEvWaitYears = () => {
    // 计算往年发放量
    const yearsPassed = evTimes / 2; // 每年有 2 次参与机会
    const totalQuotaUsed =
      yearsPassed * evAnnualQuota + yearsPassed * previousYearsQuota;
    const remaining = Math.max(evBaseApplicants - totalQuotaUsed, 0);
    const years = (remaining / evAnnualQuota).toFixed(1);
    setEvYears(years);
    setEvCopied(false);
  };

  const copyEvResult = () => {
    if (evYears)
      navigator.clipboard
        .writeText(`${evYears} 年`)
        .then(() => setEvCopied(true));
  };

  const estimateFamilyWaitYears = () => {
    const rank = Math.max(familyBaseApplicants - familyPoints * 1000, 1000);
    const years = (rank / familyAnnualQuota).toFixed(1);
    setFamilyYears(years);
    setFamilyCopied(false);
  };

  const copyFamilyResult = () => {
    if (familyYears)
      navigator.clipboard
        .writeText(`${familyYears} 年`)
        .then(() => setFamilyCopied(true));
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          flex: 1,
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
          咔咔牌指标模拟器
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: 20,
          }}
        >
          <button
            onClick={() => setMode("normal")}
            style={{
              ...modeBtnStyle,
              backgroundColor: mode === "normal" ? "#1a73e8" : "#eee",
              color: mode === "normal" ? "#fff" : "#333",
            }}
          >
            普通中签
          </button>
          <button
            onClick={() => setMode("ev")}
            style={{
              ...modeBtnStyle,
              backgroundColor: mode === "ev" ? "#1a73e8" : "#eee",
              color: mode === "ev" ? "#fff" : "#333",
            }}
          >
            新能源排队
          </button>
          <button
            onClick={() => setMode("family")}
            style={{
              ...modeBtnStyle,
              backgroundColor: mode === "family" ? "#1a73e8" : "#eee",
              color: mode === "family" ? "#fff" : "#333",
            }}
          >
            家庭排队
          </button>
        </div>

        {mode === "normal" && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 500 }}>已参与次数：</label>
              <input
                type="number"
                value={times}
                onChange={(e) => setTimes(parseInt(e.target.value) || 0)}
                style={inputStyle}
              />
            </div>
            <button onClick={calculateProbability} style={btnStyle}>
              计算中签概率
            </button>
            {result && (
              <div style={{ marginTop: 20, textAlign: "center" }}>
                <div style={{ fontSize: 16 }}>累计中签概率（估算）：</div>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    color: "#34a853",
                    marginTop: 8,
                  }}
                >
                  {result}%
                </div>
                <button onClick={copyResult} style={copyBtnStyle}>
                  {copied ? "✅ 已复制" : "复制结果"}
                </button>
              </div>
            )}
          </div>
        )}

        {mode === "ev" && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 500 }}>已参与次数：</label>
              <input
                type="number"
                value={evTimes}
                onChange={(e) => setEvTimes(parseInt(e.target.value) || 0)}
                style={inputStyle}
              />
            </div>
            <button onClick={estimateEvWaitYears} style={btnStyle}>
              估算排队年限
            </button>
            {evYears && (
              <div style={{ marginTop: 16, fontSize: 16, textAlign: "center" }}>
                <div>
                  预计排队年限约 <b>{evYears}</b> 年
                </div>
                <button onClick={copyEvResult} style={copyBtnStyle}>
                  {evCopied ? "✅ 已复制" : "复制结果"}
                </button>
              </div>
            )}
          </div>
        )}

        {mode === "family" && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 500 }}>当前积分：（算不准）</label>
              <input
                type="number"
                value={familyPoints}
                onChange={(e) =>
                  setFamilyPoints(parseFloat(e.target.value) || 0)
                }
                style={inputStyle}
              />
            </div>
            <button onClick={estimateFamilyWaitYears} style={btnStyle}>
              估算排队年限
            </button>
            {familyYears && (
              <div style={{ marginTop: 16, fontSize: 16, textAlign: "center" }}>
                <div>
                  预计排队年限约 <b>{familyYears}</b> 年
                </div>
                <button onClick={copyFamilyResult} style={copyBtnStyle}>
                  {familyCopied ? "✅ 已复制" : "复制结果"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  fontSize: 16,
  borderRadius: 6,
  border: "1px solid #ccc",
  marginTop: 4,
  boxSizing: "border-box",
};

const btnStyle = {
  padding: "12px 16px",
  fontSize: 16,
  fontWeight: 600,
  width: "100%",
  backgroundColor: "#1a73e8",
  color: "white",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

const modeBtnStyle = {
  padding: "10px 14px",
  fontSize: 14,
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
};

const copyBtnStyle = {
  marginTop: 12,
  padding: "8px 16px",
  border: "1px solid #ccc",
  borderRadius: 6,
  backgroundColor: "#f8f9fa",
  cursor: "pointer",
  fontSize: 14,
};

export default App;
