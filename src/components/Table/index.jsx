import React, { useState, useEffect, useMemo, useCallback } from 'react'
import style from "../../styles/FormStyle.module.scss"
import { faPlus, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { AgGridReact } from "ag-grid-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "ag-grid-enterprise";

import { useInfo } from '../../layouts/layout';

import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method



import $ from "jquery"
import { useNavigate } from 'react-router-dom';

import { memo } from 'react';

const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
}

function setData(link, params) {
    $.ajax({
        url: link,
        type: 'GET',
        dataType: 'json',
        CORS: false,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("JWT")}`
        },
        contentType: 'application/json',
        secure: true,
        async: true,
        success: function (data) {
            params.api.setRowData([]);
            params.api.applyTransaction({ add: data.result })
        }
    });
}



export default memo(function Table({ colDefsIn, link, nameLink, chartField, setTypeDialog, setId, setVisible }) {
    const [colDefs, setColDefs] = useState(colDefsIn);
    const [gridApi, setGridApi] = useState({});
    const { toast } = useInfo();
    const [reset, setReset] = useState(0);

    const navigate = useNavigate();

    const applyQuickFilter = (e) => {
        const searchText = e.target.value;
        gridApi.api.setQuickFilter(searchText);
    };

    const chartToolPanelsDef = useMemo(() => {
        return {
            defaultToolPanel: "settings",
        };
    }, []);

    const popupParent = useMemo(() => {
        return document.body;
    }, []);

    const onFirstDataRendered = useCallback((params) => {
        params.api.createRangeChart({
            cellRange: {
                rowStartIndex: params.firstRow,
                rowEndIndex: params.lastRow,
                columns: [...chartField],
            },
            chartType: "groupedColumn",
        });
    }, []);
    
    useEffect(() => {
        if (gridApi.type === "gridReady") {
            setData(link, gridApi)
        }
    })


    const onGridReady = (params) => {
        gridApi.api = params.api;
        gridApi.type = params.type;
        gridApi.columnApi = params.columnApi;
        gridApi.context = params.context;


        setData(link, params);

        $(`.${nameLink}Table`).on("click", ".view", function () {
            setId($(this).attr("dataid"));
            setVisible(true);
            setTypeDialog("View");
        });

        $(`.${nameLink}Table`).on("click", ".edit", function () {
            setId($(this).attr("dataid"));
            setVisible(true);
            setTypeDialog("Edit");
        });

        $(`.${nameLink}CreateButton`).on("click", function () {
            setVisible(true);
            setTypeDialog("Create");
        });

        $(`.chart`).on("click", function () {
            onFirstDataRendered(gridApi);
        });

        $(`.${nameLink}Table`).on("click", '.delete', function () {
            const id = $(this).attr("dataid");
            confirmDialog({
                message: 'Are you sure you want to delete?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                defaultFocus: 'accept',
                accept() {
                    $.ajax({
                        url: `http://localhost:3120/identity/${nameLink}/delete/${id}`,
                        type: 'DELETE',
                        dataType: 'json',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("JWT")}`
                        },
                        CORS: false,
                        contentType: 'application/json',
                        secure: true,
                        async: false,
                        success: function (data) {
                            if (data.code === 104) {
                                const rowData = [];
                                gridApi.api.forEachNode(function (node) {
                                    rowData.push(node.data);
                                });
                                gridApi.api.applyTransaction({
                                    remove: rowData,
                                });
                                setData(link, params);
                                toast.current.show({ severity: 'info', summary: '', detail: 'Deleted succesfully', life: 3000 });
                            } else {
                                toast.current.show({ severity: 'error', summary: '', detail: 'Delete failed', life: 3000 });
                            }
                        },
                        error: function (data) {
                            console.log(data);
                            toast.current.show({ severity: 'error', summary: '', detail: `${data.responseJSON.message}`, life: 3000 });
                        }
                    })


                },
                reject() {
                    toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
                }
            });

        })


    }
    
    return (
        <div>
            <ConfirmDialog></ConfirmDialog>
            <div className={style.container}>
                <div className={`${style.newButton} ${nameLink}CreateButton`}>
                    <FontAwesomeIcon className={style.iconNew} icon={faPlus} />
                </div>
                <FontAwesomeIcon className={`${style.chart} chart`} icon={faChartSimple} />
            </div>

            <div className={`ag-theme-alpine ${nameLink}Table table`} style={{ width: "100%", height: "600px", maxHeight: "600px" }}>
                <AgGridReact
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    enableRangeSelection={true}
                    popupParent={popupParent}
                    enableCharts={true}
                    enableChartToolPanelsButton={true}
                    chartToolPanelsDef={chartToolPanelsDef}
                    sideBar={{
                        toolPanels: [
                            {
                                id: "columns",
                                labelDefault: "Columns",
                                labelKey: "columns",
                                iconKey: "columns",
                                toolPanel: "agColumnsToolPanel",
                                toolPanelParams: {
                                    suppressPivotMode: true,
                                    suppressRowGroups: true,
                                    suppressValues: true,
                                    suppressColumnFilter: false,
                                    suppressColumnSelectAll: false,

                                },
                            },
                            {
                                id: "filters",
                                labelDefault: "Filters",
                                labelKey: "filters",
                                iconKey: "filter",
                                toolPanel: "agFiltersToolPanel",
                                toolPanelParams: {
                                    suppressFilterSearch: false,
                                },
                            },
                            {
                                id: "QuickSearch",
                                labelDefault: "Quick Search",
                                labelKey: "QuickSearch",
                                iconKey: "menu",
                                toolPanel: () => (
                                    <div>
                                        <h4>Global Search</h4>
                                        <input
                                            placeholder="Search..."
                                            type="search"
                                            style={{
                                                width: 400,
                                                height: 35,
                                                outline: "none",
                                                border: "none",
                                                borderBottom: `1px #181616 solid`,
                                                padding: `0 5px`,
                                            }}
                                            onChange={applyQuickFilter}
                                        />
                                    </div>
                                ),
                            },
                        ],
                        // defaultToolPanel: "QuickSearch",
                        // position: "right",
                    }}
                    pagination={true}
                    paginationAutoPageSize={true}
                >
                </AgGridReact>
            </div>
        </div>
    )
});
