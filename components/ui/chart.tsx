"use client"

import * as React from "react"
import type { TooltipProps } from "recharts"
import { cn } from "@/lib/utils"

export interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContextValue {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextValue | undefined>(undefined)

function useChartContext() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChartContext must be used within a ChartProvider")
  }
  return context
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

export function ChartContainer({ config, className, children, ...props }: ChartContainerProps) {
  // Set CSS variables for chart colors
  const style = React.useMemo(() => {
    return Object.entries(config).reduce(
      (acc, [key, value]) => {
        acc[`--color-${key}`] = value.color
        return acc
      },
      {} as Record<string, string>,
    )
  }, [config])

  return (
    <ChartContext.Provider value={{ config }}>
      <div className={cn("h-full w-full", className)} style={style} {...props}>
        {children}
      </div>
    </ChartContext.Provider>
  )
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  formatter,
  labelFormatter,
  ...props
}: TooltipProps<any, any>) {
  const { config } = useChartContext()

  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      {label && <div className="mb-1 text-sm font-medium">{labelFormatter ? labelFormatter(label) : label}</div>}
      <div className="flex flex-col gap-0.5">
        {payload.map((item: any, index: number) => {
          const dataKey = item.dataKey
          const color = item.color || (dataKey && config[dataKey]?.color) || "#888"
          const name = item.name || (dataKey && config[dataKey]?.label) || dataKey
          const value = formatter ? formatter(item.value) : item.value

          return (
            <div key={index} className="flex items-center gap-2 text-xs">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="font-medium">{name}:</span>
              <span>{value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
