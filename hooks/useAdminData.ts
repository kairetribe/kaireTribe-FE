import { useContext } from "react";
import { AdminDataContext } from "@/context/adminData";

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used within an AdminDataProvider");
  }
  return context;
};