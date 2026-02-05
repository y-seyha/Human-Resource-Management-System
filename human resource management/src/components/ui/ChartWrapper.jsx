import React, { useEffect, useRef } from "react";
import { Line, Pie } from "react-chartjs-2";

const ChartWrapper = ({ type, data, options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      chart.reset();
      chart.update("active");
    }
  }, [data]);

  return (
    <div
      className="bg-white shadow rounded-lg p-4 w-full"
      style={{ minHeight: 320 }}
    >
      {type === "line" ? (
        <Line
          ref={chartRef}
          data={data}
          options={{
            ...options,
            animation: { duration: 1500, easing: "easeOutQuart" },
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      ) : (
        <Pie
          ref={chartRef}
          data={data}
          options={{
            ...options,
            animation: { duration: 1500, easing: "easeOutQuart" },
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "bottom" } },
          }}
        />
      )}
    </div>
  );
};

export default ChartWrapper;
