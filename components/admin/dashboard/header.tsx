import { Calendar } from "lucide-react";
import { useAuthContext } from "../../../hooks/useAuthContext";

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const formatDate = (): string => {
  return new Date().toLocaleDateString("en-GB", {
    day:   "numeric",
    month: "long",
    year:  "numeric",
  });
};

export const Header = () => {
  const { session } = useAuthContext();
  const firstName   = session?.firstName ?? "there";

  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {getGreeting()}, {firstName}
        </h1>
        <p className="text-gray-500 text-sm">
          It's a sunny day today, we hope you're taking good care of your health 🌞
        </p>
      </div>
      <div className="flex items-center text-gray-900 font-medium text-sm">
        <Calendar className="w-4 h-4 mr-2 text-primary" />
        <span>{formatDate()}</span>
      </div>
    </div>
  );
};