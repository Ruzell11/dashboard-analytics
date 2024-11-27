 "use client"
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, ReactNode, useState } from "react";
import { getActivityData, getSalesData } from "./server";

// Define the type for the context value
type DashboardContextValue = {
    // Add properties here as needed for your dashboard context
    sales?: any;
    activity: any;
    startDateActivity: string;
    endDateActivity: string;
    startDateSales: string;
    endDateSales: string;
    setStartDateActivity: (startDateActivity: string) => void;
    setEndDateActivity: (endDateActivity: string) => void;
    setStartDateSales: (startDateSales: string) => void;
    setEndDateSales: (endDateSales: string) => void;
};

// Create the context with a default value of null
const DashboardContext = createContext<DashboardContextValue | null>(null);

// Define the provider component
interface DashboardContextProviderProps {
    children: ReactNode; // Type for the children prop
}

export default function DashboardContextProvider({ children }: DashboardContextProviderProps) {

    const [startDateActivity, setStartDateActivity] = useState<string>("");
    const [endDateActivity, setEndDateActivity] = useState<string>("");
    const [startDateSales, setStartDateSales] = useState<string>("");
    const [endDateSales, setEndDateSales] = useState<string>("");

    const sales = useQuery(
        ["sales-data", startDateSales, endDateSales],
        () => getSalesData(startDateSales, endDateSales), 
    );

    
    const activity = useQuery(
        ["activity-data", startDateActivity, endDateActivity],
        () => getActivityData(startDateActivity, endDateActivity), 
    );

    const contextValue: DashboardContextValue = {
        sales,
        activity,
        startDateActivity,
        endDateActivity,
        startDateSales,
        endDateSales,
        setStartDateSales,
        setEndDateSales,
        setStartDateActivity,
        setEndDateActivity
    };

    return (
        <DashboardContext.Provider value={contextValue}>
            {children}
        </DashboardContext.Provider>
    );
}

// Create a custom hook to use the context
export const useDashboardContext = () => {
    const context = useContext(DashboardContext);

    if (!context) {
        throw new Error("useDashboardContext must be used within a DashboardContextProvider");
    }

    return context;
};
