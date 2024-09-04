import { TrendingUp } from "lucide-react";
import React from "react";

interface MetricHeadingProps {
  text: string
  value: string
  change: number
}

export const MetricHeading: React.FC<MetricHeadingProps> = ({change,text,value}) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-muted-foreground">{text}</p>
      <div className="flex flex-row gap-2 items-start">
        <h3 className="font-semibold text-3xl">{value}</h3>
        <div className="flex flex-row gap-1 items-center">
          <TrendingUp size={20} className="h-5 w-5 text-green-600" />
          <span className="text-green-600">{(change * 100).toFixed(1)}%</span>
        </div>
      </div>
    </div>
  )
}