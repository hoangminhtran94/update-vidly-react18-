import React, { Component } from "react";
import TableHeader from "../TableHeader/TableHeader";
import TableBody from "../TableBody/TableBody";
import classes from "./Table.module.css";
import { Table as TableBoostrap } from "react-bootstrap";

interface TableProps {
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
  data: { [key: string]: any };
}

const Table: React.FC<TableProps> = ({ columns, sortColumn, data, onSort }) => {
  return (
    <TableBoostrap className={classes["table"]} striped hover size="bg">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </TableBoostrap>
  );
};

export default Table;
