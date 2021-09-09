import React, { Component } from "react";

const Table = ({ rows, header, headerLength, name, callback, loading }) => {
    const renderTableData = () => {
        return rows.map((row, index) => {
            var rowArray = [];

            for (var i = 1; i < headerLength; i++) {
                rowArray.push(
                    <td style={{fontWeight: 'bold'}} key={name + "-col-" + i}>{row[header[i]]}</td>
                );
            }
            if (name == "tradersDashboard") {
                rowArray.push(
                    <td key={name + "-col-" + i}>
                        {/* <input
                            className="submitButton"
                            type="submit"
                            value="Claim"
                            onClick = {callback}
                        /> */}
                        <button
                            className="claimbutton"
                            disabled={loading}
                            value="Claim"
                            onClick={callback}
                        >
                            {loading ? (
                                <span style={{fontWeight: 'bold'}}>
                                    <i className="fas fa-spinner fa-spin"></i>
                                    &nbsp; Please wait
                                </span>
                            ) : (
                                <span style={{fontWeight: 'bold'}} >Claim</span>
                            )}
                        </button>
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
