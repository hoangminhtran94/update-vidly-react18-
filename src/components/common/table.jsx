import React, { Component } from "react";
import TableHeader from "./tabeHeader";
import TableBody from "./tableBody";

const Table = ({ columns, sortColumn, data, onSort }) => {
  return (
    <table className="table align-middle">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
