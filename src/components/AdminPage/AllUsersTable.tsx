import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { UserModel } from "../../types/userModel";
import TableSearch from "../Common/TableSearch"
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Settings } from "lucide-react";
import { getCookie } from "../../utils/cookieUtil";
import { decodeJwt } from "../../utils/decodeJwt";
import { userService } from "../../services/userService";
import { SuccessToast } from "../../lib/Toast";
import { message, Modal, Select, Tooltip, Skeleton, Empty, Switch } from "antd";


export default function AllUserTable() {

    const columnHelper = createColumnHelper<UserModel>();
    const defaultColumns = [
        columnHelper.accessor('userId', {
            cell: info => info.getValue(),
            header: "USER ID"
        }),
        columnHelper.accessor('firstName', {
            cell: info => info.getValue(),
            header: "FIRST NAME"
        }),
        columnHelper.accessor('lastName', {
            cell: info => info.getValue(),
            header: "LAST NAME"
        }),
        columnHelper.accessor('email', {
            cell: info => info.getValue(),
            header: "EMAIl"
        }),
        columnHelper.accessor('allowed', {
            cell: info => <Switch defaultChecked={info.getValue()} />,
            header: "ACCOUNT",
        }),
        columnHelper.accessor('roleId', {
            cell: info => {
                if (info.getValue() === 1) {
                    return (
                        <div className="flex items-center justify-start gap-2">
                            <span>User</span>
                            <Tooltip title="Change role">
                                <Settings className="w-5 h-5 cursor-pointer" />
                            </Tooltip>
                        </div>
                    )
                } else {
                    return (
                        <div className="flex items-center justify-start gap-2">
                            <span>Admin</span>
                            <Tooltip title="Change role">
                                <Settings className="w-5 h-5 cursor-pointer" />
                            </Tooltip>
                        </div>
                    )
                }
            },
            header: "ROLE"
        })
    ]


    const [userData, setUserData] = useState<UserModel[]>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [renderComponent, setRenderComponent] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [userId, setUserId] = useState<number>(-1);
    const [roleId, setRoleId] = useState<number>(-1);       // current roleId of user
    const [newRoleId, setNewRoleId] = useState<number>(-1); // new (assigned) roleId of user
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState(true);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
    const [totalPage, setTotalPage] = useState(0);
    

    const fetchData = () => {

        const token = getCookie('token') ?? '';
        const loggedInUserId = decodeJwt(token)?.userId;
        const pageNumber: number = table.getState().pagination.pageIndex + 1;
        const pageSize: number = table.getState().pagination.pageSize;



        userService.getUsers(globalFilter.trim(), pageNumber, pageSize).then((data) => {

            setTotalPage(data.totalPage);
            const users: UserModel[] = data.items;
            const filteredData = users.filter(e => e.userId != Number(loggedInUserId));    // remove the currently logged in user
            setUserData(filteredData);
            setIsLoading(false);

        }).catch((error: Error) => {
            messageApi.open({
                type: 'error',
                content: `${error.message}`,
            });
            setIsLoading(false);
        });
    }

    useEffect(() => fetchData(), [renderComponent, pagination, globalFilter]);

    const table = useReactTable({
        data: userData,
        columns: defaultColumns,
        state: {
            globalFilter,
            pagination
        },
        pageCount: totalPage,
        onPaginationChange: setPagination,
        onGlobalFilterChange: setGlobalFilter,
        manualPagination: true,
        manualFiltering: true,
        getCoreRowModel: getCoreRowModel()
    })


    const handleDropdownChange = (newRole: string) => {
        newRole === 'admin' ? setNewRoleId(2) : newRole === 'user' ? setNewRoleId(1) : setNewRoleId(-1);
    }


    const handleUserStatus = (userId: unknown) => {

        userService.allowUser(Number(userId)).then(() => {
            SuccessToast.fire({
                title: "Action completed successfully"
            });
        }).catch((error: Error) => {
            messageApi.open({
                type: 'error',
                content: `${error.message}`,
            });
        });

    }


    const changeRole = () => {
        if (newRoleId !== -1) {
            userService.changeRole(userId, newRoleId).then(() => {
                SuccessToast.fire({
                    title: "Role changed successfully"
                });
                setRenderComponent(!renderComponent);
                setIsModalVisible(false);
            }).catch((error: Error) => {
                messageApi.open({
                    type: 'error',
                    content: `${error.message}`,
                });
            });
        } else {
            messageApi.open({
                type: 'error',
                content: "Please select a role",
            });
        }
    }

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
                        <caption className="text-start md:text-xl text-base p-5 font-medium">Manage Users</caption>
                        <thead className="bg-white border-b-2 border-gray-200">
                            {
                                table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {
                                            headerGroup.headers.map(header => (
                                                <th key={header.id} className="p-3 md:text-base text-sm font-semibold tracking-wide text-left whitespace-nowrap">
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                </th>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {isLoading ? (<tr><td colSpan={6} className="p-5 text-center md:text-xl text-sm"><Skeleton active paragraph={{ rows: 5 }} /></td></tr>) :
                                table.getRowModel().rows.length ? (
                                    table.getRowModel().rows.map((row, index) => (
                                        <tr key={row.id} className={`${index % 2 == 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-slate-200 transition-all duration-100`}>
                                            {
                                                row.getVisibleCells().map((cell) => (
                                                    <td key={cell.id} className="p-3 md:text-base text-sm text-gray-700 whitespace-nowrap" onClick={() => {
                                                        if (cell.column.id === 'allowed') {
                                                            const row = cell.row;
                                                            const userId = row.getAllCells().find(c => c.column.id === 'userId')?.getValue();
                                                            handleUserStatus(userId);
                                                        } else if (cell.column.id === 'roleId') {
                                                            const row = cell.row;
                                                            const userId = row.getAllCells().find(c => c.column.id === 'userId')?.getValue();
                                                            const roleId = row.getAllCells().find(c => c.column.id === 'roleId')?.getValue();
                                                            setUserId(Number(userId));
                                                            setRoleId(Number(roleId));
                                                            setIsModalVisible(true);
                                                        }
                                                    }}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </td>
                                                ))
                                            }
                                        </tr>
                                    ))
                                ) : (<tr><td colSpan={6} className="p-5 text-center md:text-xl text-sm"><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"No record found!"} /></td></tr>)
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
            <Modal centered title="Change Role" open={isModalVisible} onOk={changeRole} onCancel={() => setIsModalVisible(!isModalVisible)}>
                <div className="text-lg p-2 flex flex-wrap items-center">
                    <span className="text-base mr-1">Current Role:&nbsp;</span>
                    <div className="break-words ms-1 text-base">{roleId === 1 ? 'User' : 'Admin'}</div>
                </div>
                <div className="text-lg p-2">
                    <span className="text-base">New role:&nbsp;</span>
                    <Select
                        defaultValue="none"
                        style={{ width: 120 }}
                        onChange={handleDropdownChange}
                        options={[
                            { value: 'user', label: 'User' },
                            { value: 'admin', label: 'Admin' },
                            { value: 'none', label: 'Select Role' },
                        ]}
                    />
                </div>
            </Modal>
        </>
    )
}