import InfoList from "./InfoList";
import TimeSummary from "./TimeSummary";
import { InfoData } from "@/utils/data";

const Info = ({ tasks }) => {
  return (
    <div className="p-4 rounded-lg border shadow-lg space-y-4">
      {/* Info Section */}
      <InfoList info={InfoData} />
      {/* Time Summary Section */}
      <TimeSummary tasks={tasks} />
    </div>
  );
};

export default Info;
