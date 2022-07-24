import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";

import { employeesGridNew } from "../utils/functions";
import { Header } from "../components";

const Employees = ({ data }) => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Search"];
  const FilterOptions = { type: "Menu" };
  const editing = { allowDeleting: false, allowEditing: false };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Employés" />
      <GridComponent
        dataSource={data}
        width="auto"
        enableHover={false}
        allowPaging
        autoFit={true}
        allowSorting
        filterSettings={FilterOptions}
        allowFiltering={true}
        pageSettings={{ pageCount: 10 }}
        editSettings={editing}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {employeesGridNew.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};
export default Employees;
