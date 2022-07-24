import React from "react";
import { FiThumbsUp, FiPieChart } from "react-icons/fi";
import Pie from "../components/Pie";
import { getAnalyticsData, EmployeeProfileAvatar } from "../utils/functions";

const Home = ({ data, top5, chartData }) => {
  const analyticsData = getAnalyticsData(data);

  return (
    <div>
      <span
        className="text-sm text-red-600 text-green-600 mt-1"
        style={{ display: "none" }}
      ></span>
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <div className="flex m-3 flex-wrap justify-center gap-4 items-center">
          {analyticsData.map((item) => (
            <div
              key={item.title}
              className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-96  p-4 pt-9 rounded-2xl "
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-10 m-4 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
          <div className="flex justify-between items-center gap-2">
            <p className="text-lg font-semibold">Top 5 Employés</p>
            <button
              type="button"
              style={{ background: "rgb(254, 201, 15)" }}
              className="text-2xl hover:drop-shadow-xl text-white rounded-full p-2"
            >
              <FiThumbsUp />
            </button>
          </div>
          <div className="mt-10 w-72 md:w-400">
            {top5.map((emp, key) => {
              let RendColor = parseFloat(emp.rendement) >= 70 ? "green" : "red";

              return (
                <div key={key} className="flex justify-between mt-4">
                  <div className="flex gap-4">
                    <EmployeeProfileAvatar />
                    <div>
                      <p className="text-md font-semibold">{emp.fullname}</p>
                      <p className="text-sm text-gray-400 italic">#{emp.id}</p>
                    </div>
                  </div>
                  <p className={`text-${RendColor}-600`}>{emp.rendement}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
          <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold">Rendement Statistique</p>
            <button
              type="button"
              style={{ background: "rgb(0, 194, 146)" }}
              className="text-2xl hover:drop-shadow-xl text-white rounded-full p-2"
            >
              <FiPieChart />
            </button>
          </div>
          <div className="md:w-full overflow-auto">
            <Pie chartData={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
