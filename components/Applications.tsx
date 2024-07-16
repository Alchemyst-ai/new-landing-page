import Application from "@/app/types/applications";
import React from "react";

interface ApplicationProps {
  applications: Application[];
}

const Applications: React.FC<ApplicationProps> = ({ applications }) => {
  return (
    <div className="flex flex-col items-center w-4/5 md:w-2/3">
      <h1 className="text-3xl font-bold mb-8 text-start w-full text-[#cecec5]">
        Applications
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {applications.map((app, index) => (
          <div key={index} className={`${app.bgColor} ${app.round} p-10 `}>
            {app.svg}
            <h2 className="text-3xl font-semibold my-5">{app.title}</h2>
            <p className="text-lg">{app.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Applications;
