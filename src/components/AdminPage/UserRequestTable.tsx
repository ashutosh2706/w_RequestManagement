import { SortingState, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { UserRequestAdmin } from "../../types/userRequestAdmin";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TableSearch from "../Common/TableSearch"
import { UserRequestFromApi } from "../../types/userRequest";
import { requestService } from "../../services/requestService";
import { message, Select, Skeleton, Empty } from 'antd';
import Swal from "sweetalert2";
import { PriorityCode, REQUEST_PRIORITY, REQUEST_STATUS, StatusCode } from "../../Constants";


export default function UserRequestTable() {

    const [renderComponent, setRenderComponent] = useState<boolean>(false);
    const [userRequestData, setUserRequestData] = useState<UserRequestAdmin[]>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [sorting, setSorting] = useState<SortingState>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState(true);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
    const [totalPage, setTotalPage] = useState(0);


    const fetchData = () => {

        const pageNumber: number = table.getState().pagination.pageIndex + 1;
        const pageSize: number = table.getState().pagination.pageSize;

        let sortField = "", sortDirection = "";

        if (sorting.length > 0) {
            // when sort is performed
            const { id, desc } = sorting[0];
            sortField = id, sortDirection = desc ? 'desc' : 'asc';
        }

        requestService.getAllRequests(globalFilter.trim(), pageNumber, pageSize, sortField, sortDirection).then((data) => {

            setTotalPage(data.totalPage);

            const mappedData: UserRequestAdmin[] = data.items.map((item: UserRequestFromApi) => ({
                requestId: item.requestId,
                userId: item.userId,
                title: item.title,
                priority: item.priority,
                status: item.status
            }));

            setIsLoading(false);
            setUserRequestData(mappedData);

        }).catch((error: Error) => {
            messageApi.open({
                type: 'error',
                content: `${error.message}`,
            });
            setIsLoading(false);
        });
    }

    useEffect(() => fetchData(), [renderComponent, pagination, globalFilter, sorting]);

    const getPriorityCode = ((priority: string): number => {
        return priority === REQUEST_PRIORITY.PRIORITY_HIGH ? PriorityCode.PRIORITY_HIGH :
            priority === REQUEST_PRIORITY.PRIORITY_NORM ? PriorityCode.PRIORITY_NORM :
                PriorityCode.PRIORITY_LOW;
    });

    const getStatusCode = ((status: string): number => {
        return status === REQUEST_STATUS.REQUEST_PENDING ? StatusCode.STATUS_PENDING :
            status === REQUEST_STATUS.REQUEST_APPROVED ? StatusCode.STATUS_APPROVED :
                StatusCode.STATUS_REJECTED;
    });

    const handleRequest = (requestId: number | unknown) => {
        if (typeof requestId === 'number') {
            Swal.fire({
                title: "Confirm Request Action",
                icon: "question",
                showDenyButton: true,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Approve",
                denyButtonText: "Reject"
            }).then((result) => {

                if (!result.isDismissed && (result.isConfirmed || result.isDenied)) {
                    const statusCode = result.isConfirmed ? StatusCode.STATUS_APPROVED : StatusCode.STATUS_REJECTED;

                    // construct request body
                    requestService.getRequestByRequestId(requestId).then((data: UserRequestFromApi) => {

                        const updateRequestForm = new FormData();
                        updateRequestForm.append('requestId', data.requestId.toString());
                        updateRequestForm.append('userId', data.userId.toString());
                        updateRequestForm.append('title', data.title);
                        updateRequestForm.append('guardianName', data.guardianName);
                        updateRequestForm.append('phone', data.phone);
                        updateRequestForm.append('requestDate', data.requestDate);
                        updateRequestForm.append('priorityCode', getPriorityCode(data.priority).toString());
                        updateRequestForm.append('statusCode', statusCode.toString());

                        requestService.updateRequestStatus(updateRequestForm).then(() => {
                            setRenderComponent(!renderComponent);
                            Swal.fire({
                                title: "Success",
                                text: `Request ${result.isConfirmed ? 'approved' : 'rejected'}`,
                                icon: "success"
                            });
                        }).catch((error: Error) => {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: `${error.message}`,
                                confirmButtonColor: '#4369ff'
                            });
                        });
                        
                    }).catch((error) => {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: `${error.message}`,
                            confirmButtonColor: '#4369ff'
                        });
                    })
                }
            });
        }
    }


    const columnHelper = createColumnHelper<UserRequestAdmin>();

    const defaultColumns = [
        columnHelper.accessor('requestId', {
            cell: info => info.getValue(),
            header: "REQUEST ID"

        }),
        columnHelper.accessor('userId', {
            cell: info => info.getValue(),
            header: "USER ID"
        }),
        columnHelper.accessor('title', {
            cell: info => info.getValue(),
            header: "TITLE"
        }),
        columnHelper.accessor('priority', {
            cell: info => info.getValue(),
            header: "PRIORITY"
        }),
        columnHelper.accessor('status', {
            cell: info => {
                if (info.getValue() === REQUEST_STATUS.REQUEST_APPROVED) {
                    return (
                        <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-80">
                            approved
                        </span>
                    )
                } else if (info.getValue() === REQUEST_STATUS.REQUEST_PENDING) {
                    return (
                        <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-80">
                            pending
                        </span>)
                } else {
                    return (
                        <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-80">
                            rejected
                        </span>
                    )
                }
            },
            header: "STATUS"
        })
    ]

    const table = useReactTable({
        data: userRequestData,
        columns: defaultColumns,
        enableSorting: true,
        state: {
            globalFilter,
            sorting,
            pagination
        },
        sortDescFirst: false,
        pageCount: totalPage,
        onPaginationChange: setPagination,
        onGlobalFilterChange: setGlobalFilter,
        manualPagination: true,
        manualFiltering: true,
        manualSorting: true,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
    })




    return (
        <>
            {contextHolder}
            <div className="p-5 bg-gray-100 h-screen">
                <div className="flex justify-between mb-5 me-5">
                    <div className="text-base w-auto">
                        <TableSearch debounce={500} initValue={globalFilter ?? ""} onChange={(value) => setGlobalFilter(String(value))} />
                    </div>
                </div>
                <div className="overflow-auto rounded-lg shadow-xl border border-gray-400">
                    <table className="shadow-lg w-full rounded-xl overflow-hidden">
                        <caption className="text-start md:text-xl text-base p-5 font-medium">Manage Requests</caption>
                        <thead className="bg-white border-b-2 border-gray-200">
                            {
                                table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {
                                            headerGroup.headers.map(header => (
                                                <th key={header.id} className="p-3 md:text-base text-sm font-semibold tracking-wide text-left whitespace-nowrap" colSpan={header.colSpan}>
                                                    {header.isPlaceholder ? null : (
                                                        <div className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''} onClick={header.column.getToggleSortingHandler()}
                                                            title={header.column.getCanSort() ? header.column.getNextSortingOrder() === 'asc' ? 'Sort ascending' : header.column.getNextSortingOrder() === 'desc' ? 'Sort descending' : 'Clear sort' : undefined}>
                                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                                            {{ asc: ' 🔼', desc: ' 🔽', }[header.column.getIsSorted() as string] ?? null}
                                                        </div>
                                                    )}
                                                </th>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {isLoading ? (<tr><td colSpan={5} className="p-5 text-center md:text-xl text-sm"><Skeleton active paragraph={{ rows: 5 }} /></td></tr>) :
                                table.getRowModel().rows.length ? (
                                    table.getRowModel().rows.map((row, index) => (
                                        <tr key={row.id} className={`${index % 2 == 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-slate-200 transition-all duration-100 cursor-pointer`}
                                            onClick={() => {
                                                row.getAllCells().forEach(cell => {
                                                    if (cell.column.id === 'requestId') {
                                                        handleRequest(cell.getValue());
                                                    }
                                                })

                                            }}>
                                            {
                                                row.getVisibleCells().map((cell) => (
                                                    <td key={cell.id} className="p-3 md:text-base text-sm text-gray-700 whitespace-nowrap">
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </td>
                                                ))
                                            }
                                        </tr>
                                    ))
                                ) : (<tr><td colSpan={5} className="p-5 text-center md:text-xl text-sm"><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"No record found!"} /></td></tr>)
                            }
                        </tbody>
                    </table>

                </div>
                {/** pagination */}
                <div className="mt-5 flex items-center justify-end gap-2">
                    <button onClick={() => { table.previousPage() }} disabled={!table.getCanPreviousPage()} className="text-lg font-bold rounded-lg p-1 border border-gray-500 px-2 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg">
                        <ChevronLeft className="w-7 h-7" />
                    </button>
                    <button onClick={() => { table.nextPage() }} disabled={!table.getCanNextPage()} className="text-lg font-bold rounded-lg p-1 border border-gray-500 px-2 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg">
                        <ChevronRight className="w-7 h-7" />
                    </button>
                    <span className="items-center gap-1 hidden md:flex">
                        <div>Page </div>
                        <div>{table.getState().pagination.pageIndex + 1} of {" "}{table.getPageCount()}</div>
                    </span>
                    <Select
                        defaultValue='5'
                        style={{ width: 120 }}
                        onChange={(value) => table.setPageSize(Number(value))}
                        options={[
                            { value: '5', label: '5 / page' },
                            { value: '10', label: '10 / page' },
                            { value: '20', label: '20 / page' },
                        ]}
                    />
                </div>
            </div>
        </>
    )
}