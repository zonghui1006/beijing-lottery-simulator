import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function LotterySimulator() {
  const [times, setTimes] = useState(6); // 参与次数，默认 6 次
  const [rate, setRate] = useState(0.04); // 单次中签率，默认 0.04%
  const [result, setResult] = useState(null);

  const calculateProbability = () => {
    const p = rate / 100; // 转换为小数
    const n = times;
    const probability = 1 - Math.pow(1 - p, n);
    setResult((probability * 100).toFixed(4));
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <Card className="shadow-xl">
        <CardContent className="space-y-6">
          <h2 className="text-xl font-bold text-center">
            北京小客车摇号中签概率模拟器
          </h2>
          <div className="space-y-2">
            <Label>已参与次数（次）</Label>
            <Input
              type="number"
              value={times}
              onChange={(e) => setTimes(parseInt(e.target.value) || 0)}
              placeholder="输入你已参与的次数"
            />
          </div>

          <div className="space-y-2">
            <Label>每次中签率（%）</Label>
            <Input
              type="number"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
              placeholder="默认约 0.04%"
            />
          </div>

          <Button className="w-full" onClick={calculateProbability}>
            计算中签概率
          </Button>

          {result && (
            <motion.div
              className="text-center pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-lg font-medium">累计中签概率：</p>
              <p className="text-3xl font-bold text-green-600">{result}%</p>
              <Progress value={parseFloat(result)} className="mt-4" />
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
