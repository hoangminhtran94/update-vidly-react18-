import React, { Component } from "react";

interface TableHeaderProps {
  columns: {
    label?: string;
    path?: string;
    content?: (data: any) => JSX.Element | string;
    key?: string;
  }[];
  sortColumn: {
    path: string;
    order: "desc" | "asc";
  };
  onSort: (sortColumn: { path: string; order: "asc" | "desc" }) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  sortColumn,
  onSort,
}) => {
  const raiseSort = (path: string) => {
    const sortColumnCopy = { ...sortColumn };
    if (sortColumnCopy.path === path)
      sortColumnCopy.order = sortColumnCopy.order === "asc" ? "desc" : "asc";
    else {
      sortColumnCopy.path = path;
      sortColumnCopy.order = "asc";
    }
    onSort(sortColumnCopy);
  };
  const renderSortIcon = (column: {
    label?: string;
    path?: string;
    content?: (data: any) => JSX.Element | string;
    key?: string;
  }) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  return (
    <thead className="table-primary">
      <tr>
        {columns.map((column, index) => (
          <th
            key={column.path || index}
            onClick={() => raiseSort(column.path!)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
