

export interface NumContainerProps {
    nums: number[];
    highlighted?: number[];
}

export default function NumContainer({nums, highlighted = []}: NumContainerProps){
    return (
        <div className ="border-black-300 border-3 mt-4 bg-gray-300">
            <div className="array-container flex items-end h-150">
                {nums.map((item, index) => (
                    <div 
                        key={index} 
                        className={`rounded-sm ${highlighted.includes(index) ? "bg-red-500" : "bg-blue-500"} border border-black-300`}
                        style={{
                            height:`${item}%`,
                            width: `${100 / nums.length}%`
                        }}
                        />
                ))}
            </div>
        </div>
    );
}