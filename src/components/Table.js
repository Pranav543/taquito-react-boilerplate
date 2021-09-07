import React, { Component } from "react";

const Table = ({ rows, header, headerLength, name }) => {
    const renderTableData = () => {
        return rows.map((row, index) => {
            var rowArray = [];

            for (var i = 1; i < headerLength; i++) {
                rowArray.push(
                    <td key={name + "-col-" + i}>{row[header[i]]}</td>
                );
            }
            if (name == "tradersDashboard") {
                rowArray.push(
                    <td key={name + "-col-" + i}>
                        <input
                            className="submitButton"
                            type="submit"
                            value="Claim"
                        />
                    </td>
                );
            }

            return <tr key={name + "-row-" + index}>{rowArray}</tr>;
        });
    };

    const renderTableHeader = () => {
        let headers = header.slice(1, headerLength);
        return headers.map((key, index) => {
            return <th key={name + "-" + key + "-" + index}>{key}</th>;
        });
    };

    return (
        <div>
            <table id="table" key={name}>
                <tbody key={name + "-table"}>
                    <tr key={name + "-header"}>{renderTableHeader()}</tr>
                    {renderTableData()}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
