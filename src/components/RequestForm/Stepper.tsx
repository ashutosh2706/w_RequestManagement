import { useEffect, useRef, useState } from "react"

interface StepperProps {
    steps: string[],
    currentStep: number
}

interface Step {
    description: string,
    completed: boolean,
    selected: boolean,
}

export default function Stepper({ steps, currentStep }: StepperProps) {

    const [newSteps, setNewSteps] = useState<Step[]>([]);
    const stepRef = useRef<Step[]>();

    const updateStates = (stepNumber: number, currentSteps: Step[]): Step[] => {
        const newSteps: Step[] = [...currentSteps];
        let count = 0;

        while (count < newSteps.length) {
            // current step
            if (count === stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    selected: true,
                    completed: false
                }

            } else if (count < stepNumber) {
                // step completed
                newSteps[count] = {
                    ...newSteps[count],
                    selected: false,
                    completed: true
                }

            } else {
                // step yet to reach
                newSteps[count] = {
                    ...newSteps[count],
                    selected: false,
                    completed: false
                }
            }
            ++count;
        }
        return newSteps;
    }

    useEffect(() => {
        const stepStates = steps.map((step, index) =>
            // create a new array of objects and return
            Object.assign({}, {
                description: step,
                completed: false,
                selected: index === 0
            })
        )

        stepRef.current = stepStates;           // -> this mantains the state of stepper bubbles which are selected and which are completed between re-renders
        const newStates = updateStates(currentStep - 1, stepRef.current);
        setNewSteps(newStates);

    }, [steps, currentStep])

    const displaySteps = newSteps.map((step, index) => {
        return (
            <div key={index} className={index !== newSteps.length - 1 ? "w-full flex items-center" : "flex items-center"}>
                <div className="relative flex flex-col items-center text-gray-900">
                    <div className={`rounded-full transition duration-500 ease-in-out
                    md:h-12 md:w-12 h-9 w-9 flex items-center justify-center py-3 ${step.selected ? "text-black font-bold text-lg border-2 border-[#4369ff]" : "border-2 border-gray-300"} ${step.completed ? 'bg-[#4369ff] text-white font-bold border border-[#4369ff]' : ''}`}>
                        {
                            step.completed ? <span className="text-white font-bold text-xl">&#10003;</span> : <span className="font-medium">{index + 1}</span>
                        }
                    </div>
                    <div className={`absolute top-0 text-center mt-16 w-32 text-sm hidden  uppercase md:block
                    ${step.selected ? "text-gray-900 font-bold" : "text-gray-400 font-medium"}`}>
                        {step.description}
                    </div>
                </div>
                <div className={`flex-auto border-t-2 transition duration-500 ease-in-out 
                ${step.completed ? "border-[#4369ff]" : "border-gray-300"}`}></div>
            </div>
        )
    })

    return (
        <div className="mx-4 p-4 flex justify-between items-center">
            {displaySteps}
        </div>
    )
}