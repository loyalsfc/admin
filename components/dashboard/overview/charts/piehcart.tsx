"use client"

import { Pie, PieChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { PropertyStatTypes } from "@/api/dashboard/property-stats"

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  shortlet: {
    label: "Shortlet",
    color: "#FDE71E",
  },
  workspace: {
    label: "Workspace",
    color: "#205BF3",
  },
} satisfies ChartConfig

export function PropertyPieChart({data}:{data: PropertyStatTypes[] | undefined}) {
    if(!data){
        return(
            <p className="text-center">An Error Occured</p>
        )
    }

    const stat = data.map(item => {
        return {...item, fill: item.type === "shortlet" ? "#FDE71E" : "#205BF3"}
    })

    return (
        <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-[250px]"
        >
            <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                data={stat}
                    dataKey="count"
                    nameKey="type"
                    innerRadius={30}
                />
            </PieChart>
        </ChartContainer>    
    )
}
