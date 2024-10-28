import { useEffect, useState } from "react"
import { SortingState, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { UserRequest, UserRequestFromApi } from "../../types/userRequest";
import { useNavigate } from "react-router-dom";
import { CirclePlus, ChevronLeft, ChevronRight } from 'lucide-react';
import { getCookie } from "../../utils/cookieUtil";
import { decodeJwt } from "../../utils/decodeJwt";
import TableSearch from "../Common/TableSearch";
import { requestService } from "../../services/requestService";
import { message, Select, Skeleton, Empty } from 'antd';
import { REQUEST_STATUS } from "../../Constants";


export default function UserRequestTable() {

    const navigate = useNavigate();

    const columnHelper = createColumnHelper<UserRequest>();
    const defaultColumns = [

        columnHelper.accessor('requestId', {
            cell: info => info.getValue(),
            header: "ID"
        }),
        columnHelper.accessor('requestDate', {
            cell: info => info.getValue(),
            header: "DATE"
        }),
        columnHelper.accessor('title', {
            cell: info => info.getValue(),
            header: "TITLE"
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
                        </span>
                    )
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

    const [requestData, setRequestData] = useState<UserRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<SortingState>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
    const [totalPage, setTotalPage] = useState(0);


    useEffect(() => {

        const token = getCookie('token') ?? '';
        const userId = decodeJwt(token)?.userId;
        const pageNumber: number = table.getState().pagination.pageIndex + 1;
        const pageSize: number = table.getState().pagination.pageSize;

        let sortField = "", sortDirection = "";

        if(sorting.length > 0) {
            // when sort is performed
            const { id, desc } = sorting[0];
            sortField = id, sortDirection = desc ? 'desc' : 'asc';
        }
        

        requestService.getUserRequests(Number(userId), globalFilter.trim(), pageNumber, pageSize, sortField, sortDirection).then((data) => {

            setTotalPage(data.totalPage);
            
            const mappedData: UserRequest[] = data.items.map((item: UserRequestFromApi) => ({
                requestId: item.requestId,
                requestDate: item.requestDate,
                title: item.title,
                status: item.status
            }));

            setIsLoading(false);
            setRequestData(mappedData);


        }).catch((error: Error) => {
            messageApi.open({
                type: 'error',
                content: `${error.message}`,
            });
            setIsLoading(false);
        });

    }, [pagination, globalFilter, sorting]);


    const table = useReactTable({
        data: requestData,
        columns: defaultColumns,
        state: {
            globalFilter,
            sorting,
            pagination
        },
        pageCount: totalPage,
        sortDescFirst: false,
        manualPagination: true,
        manualFiltering: true,
        manualSorting: true,
        onPaginationChange: setPagination,
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel()
    })


    return (
        <>
            {contextHolder}
            <div className="p-5 bg-gray-100 h-screen">
                <div className="flex justify-between mb-5 me-5">
                    <div className="text-base w-auto">
                        <TableSearch debounce={500} initValue={globalFilter ?? ""} onChange={(value) => setGlobalFilter(String(value))} />
                    </div>
                    <div className="text-xl">
                        <button className="hidden md:block w-52 bg-[#4369ff] rounded-xl text-white py-2 font-medium hover:bg-[#3451c7]" onClick={() => navigate("/new-request")}>
                            <div className="flex items-center justify-center">
                                <CirclePlus className="h-6 w-6 text-white mr-2" />
                                <span>New Request</span>
                            </div>
                        </button>
                        <div className="md:hidden flex items-center justify-center">
                            <CirclePlus className="w-10 h-10 mr-2 stroke-[#4369ff] cursor-pointer hover:stroke-black" onClick={() => navigate("/new-request")} />
                        </div>
                    </div>
                </div>
                <div className="overflow-auto rounded-lg shadow-xl border border-gray-400">
                    <table className="shadow-lg w-full rounded-xl overflow-hidden">
                        <caption className="text-start md:text-xl text-base p-5 font-medium" >My Requests</caption>
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
                            {isLoading ? (<tr><td colSpan={4} className="p-5 text-center md:text-xl text-sm"><Skeleton active paragraph={{rows: 5}}/></td></tr>) :
                                table.getRowModel().rows.length ? (
                                    table.getRowModel().rows.map((row, index) => (
                                        <tr key={row.id} className={`${index % 2 == 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-slate-200 transition-all duration-100`}>
                                            {
                                                row.getVisibleCells().map((cell) => (
                                                    <td key={cell.id} className="p-3 md:text-base text-sm text-gray-700 whitespace-nowrap">
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </td>
                                                ))
                                            }
                                        </tr>
                                    ))
                                ) : (<tr><td colSpan={4} className="p-5 text-center md:text-xl text-sm"><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"No record found!"}/></td></tr>)
                            }
                        </tbody>
                    </table>

                </div>
                {/** pagination controller */}
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