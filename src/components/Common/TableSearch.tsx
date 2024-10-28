import { useEffect, useState } from "react"
import { Search } from "lucide-react";

interface TableSearchProps {
    onChange: (value: string) => void;
    debounce: number;
    initValue: string;
}

export default function TableSearch({ initValue, debounce, onChange }: TableSearchProps) {
    const [value, setValue] = useState<string>(initValue);

    useEffect(() => {
        setValue(initValue);
    }, [initValue])

    useEffect(() => {
        const timeOut = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeOut);
    }, [value, debounce, onChange])

    return (
        <>
            <div className="hidden md:flex border-2 border-gray-500 rounded-xl items-center justify-start">
                <Search className="mx-3 h-7 w-7" />
                <input placeholder="Search..." className="rounded-xl p-2 focus:bg-white bg-transparent outline-none w-full duration-300 focus:font-medium" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
            <div className="border-2 border-gray-500 rounded-xl flex md:hidden items-center justify-start">
                <input placeholder="🔍 Search..." className="rounded-xl p-2 font-medium focus:bg-white bg-transparent outline-none focus:w-full w-10 duration-300" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
        </>
    )
}