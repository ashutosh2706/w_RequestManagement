import React, { useContext, useRef, useState } from "react";
import { StepperContext } from "../../contexts/stepperContext";
import { Files } from "lucide-react";



export default function UplodadFile() {


    const { tempData, setTempData } = useContext(StepperContext);
    const [isFileSelected, setIsFileSelected] = useState(false);
    const inputFile = useRef<HTMLInputElement>(null);


    const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const fileList = e.target.files;
        attachFile(fileList);
    };

    const handleDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
    }

    const handleDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        const fileList = e.dataTransfer.files;
        attachFile(fileList);
    }

    const attachFile = (fileList: FileList | null) => {
        if (fileList && fileList.length > 0) {
            const file = fileList[0];
            setTempData({ ...tempData, "file-data": file, "file-name": file.name });
            setIsFileSelected(true);
        } else {
            setTempData({ ...tempData, "file-data": ""});
        }
    }

    return (
        <>
            <div className="flex flex-col">
                <div className="max-w-3xl md:px-20 px-10">
                    <h2 className="font-medium underline md:text-2xl text-lg text-center mb-10 font-sans">Attach File</h2>
                    <div className="flex flex-col gap-4">
                        <div className="md:font-bold font-medium h-6 mt-3 md:text-sm text-xs leading-8 uppercase"> Attach file <span className="text-xs font-normal">(pdf/doc/jpeg)</span> <span className="text-red-600 font-bold text-lg"></span></div>
                        <div className="flex items-center justify-center border-dotted border-black border-2 w-full" onDragOver={handleDragOver} onDrop={handleDrop}>
                            <div className="flex flex-col items-center justify-center p-5 mb-5">
                                {!isFileSelected && (
                                    <div className="flex flex-col items-center justify-center">
                                        <Files className="w-16 h-16 m-5 hidden md:block" />
                                        <span className="md:text-xl text-sm">Drag and Drop File</span>
                                        <span className="m-3 md:text-xl text-sm">or</span>
                                    </div>
                                )}
                                {isFileSelected && (
                                    <span className="md:text-xl text-sm m-5">{tempData['file-name']}</span>
                                )}
                                <input onChange={handleFileChange} type="file" name="file-upload" hidden accept=".pdf, .doc, .docx, .jpeg, .jpg" ref={inputFile} />
                                <button className="bg-gray-700 text-white py-2 px-4 md:text-base text-sm rounded-xl md:font-semibold font-medium cursor-pointer tracking-wide hover:bg-gray-300 hover:text-black transition duration-200 ease-in-out" onClick={() => inputFile.current?.click()}>Select File</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}