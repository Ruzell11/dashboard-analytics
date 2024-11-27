import { useQuery } from "@tanstack/react-query"
import { getAnalyticsData } from "./server"
import DashboardContextProvider from "./store"
import DashboardCharts from "./components/Chart"

export default function Dashboard(){
 

    return (
     <DashboardContextProvider>
        <article className="flex gap-5 justify-center items-center">
        <DashboardCharts />
        </article>
     </DashboardContextProvider>
    )
  }