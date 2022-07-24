import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar, Sidebar } from "./components";
import { Home, Employees } from "./pages";

import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";
import Table_req_rendement_chaine from "./data/Table_req_rendement_chaine.json";
import {
  decorateDate,
  getRandomFloat,
  getTopObjects,
  getPercentOf,
} from "./utils/functions";

const App = () => {
  const { activeMenu } = useStateContext();

  const [CustomEmployees, setCustomEmployees] = React.useState([]);
  const [topEmployees, setTopEmployees] = React.useState([]);
  const [chartData, setChartData] = React.useState([]);

  const handleRendement = (value) => {
    //generate random rendement value because most of rendement values are 0%
    if (![null, "", " ", 0].includes(value)) {
      return `${value.toFixed(2)} %`;
    } else {
      return `${getRandomFloat(0, 91, 2)} %`;
    }
  };

  const getRendementStatus = (value) => {
    value = parseFloat(value);

    let status;
    if (value < 50) {
      status = "Faible";
    } else if (value >= 50 && value <= 70) {
      status = "Moyenne";
    } else {
      status = "Excellent";
    }

    return status;
  };

  /** Manupilate json data and grep data */
  React.useEffect(() => {
    let tempData = Table_req_rendement_chaine.map((employee, index) => {
      let emp = {};

      emp["id"] = employee["Matricule"];
      emp["fullname"] = employee["Employé"];
      emp["contrat_duration"] = `${employee["Période (J)"]} j`;
      emp["presence_days"] = employee["Jours Présence"];
      emp["extra_hours"] = employee["H. Sup. (min)"];
      emp["presence_minutes"] = decorateDate(employee["Tps Présence (min)"]);
      emp["working_time"] = decorateDate(employee["Tps de Travail (min)"]);
      emp["absence"] = employee["Tps Absence"];
      emp["stoped_time"] = employee["Tps Arrêt (min)"];
      emp["rendement"] = handleRendement(employee["Rendement %"]);
      emp["done_pieces"] = employee["Nbr Pièces"];
      emp["status"] = getRendementStatus(emp["rendement"]);
      return emp;
    });

    let top5 = getTopObjects(tempData, "rendement", 5);

    let averageFaibleEmp = tempData.filter(
      (e) => parseFloat(e.rendement) < 50
    ).length;
    let averageMoyenneEmp = tempData.filter(
      (e) => parseFloat(e.rendement) >= 50 && parseFloat(e.rendement) <= 70
    ).length;
    let averageGoodEmp = tempData.filter(
      (e) => parseFloat(e.rendement) > 70
    ).length;

    let avgFaiblePercent = getPercentOf(averageFaibleEmp, tempData.length);
    let avgMoyennePercent = getPercentOf(averageMoyenneEmp, tempData.length);
    let avgGoodPercent = getPercentOf(averageGoodEmp, tempData.length);

    setCustomEmployees(tempData);
    setTopEmployees(top5);
    setChartData([
      { x: "Excellent", y: avgGoodPercent, text: `${avgGoodPercent}%` },
      { x: "Moyenne", y: avgMoyennePercent, text: `${avgMoyennePercent}%` },
      { x: "Faible", y: avgFaiblePercent, text: `${avgFaiblePercent} %` },
    ]);

    console.log(tempData);
  }, [setCustomEmployees, setTopEmployees, setChartData]);

  /**
   *
   */

  return (
    <div>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              <Routes>
                {/* dashboard  */}
                <Route
                  path="/"
                  element={
                    <Home
                      data={CustomEmployees}
                      top5={topEmployees}
                      chartData={chartData}
                    />
                  }
                />
                <Route
                  path="/home"
                  element={
                    <Home
                      data={CustomEmployees}
                      top5={topEmployees}
                      chartData={chartData}
                    />
                  }
                />

                {/* pages  */}
                <Route
                  path="/employees"
                  element={<Employees data={CustomEmployees} />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
