import { HeaderTitle } from "../../common";

const InfoList = ({ info }) => {
  return (
    <>
      <HeaderTitle headerText="Focus Preparation Checklist" />
      <ul className="list-disc pl-5 space-y-1 text-sm font-bold">
        {info.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default InfoList;
