import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import classes from "./TableBody.module.css";
interface TableBodyProps {
  data: { [key: string]: any };
  columns: {
    label?: string;
    path?: string;
    content?: (data: any) => JSX.Element | string;
    key?: string;
  }[];
}
const TableBody: React.FC<TableBodyProps> = ({ data, columns }) => {
  const renderCell = (
    item: any,
    column: {
      label?: string;
      path?: string;
      content?: (data: any) => JSX.Element | string;
      key?: string;
    }
  ) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path!);
  };
  const createKey = (
    item: any,
    column: {
      label?: string;
      path?: string;
      content?: (data: any) => JSX.Element | string;
      key?: string;
    }
  ) => {
    return item.id + (column.path || column.key);
  };

  return (
    <tbody className={classes["table-body"]}>
      {data.map((item: any) => (
        <tr key={item.id}>
          {columns.map((column) => (
            <td key={createKey(item, column)}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
