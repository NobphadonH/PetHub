import { useState, useEffect } from "react";

function TypeChoiceBoxes({onSelectType, selectedType}) {
    const [selected, setSelected] = useState(null);

    const options = [
        {
            id: 1,
            title: "โรงแรมสัตว์เลี้ยงระดับมืออาชีพ",
            description: "อาคารหลายห้องสำหรับสัตว์เลี้ยง พร้อมทีมงานดูแลโดยเฉพาะ",
        },
        {
            id: 2,
            title: "เดย์แคร์สัตว์เลี้ยง",
            description: "สำหรับการดูแลระยะสั้นหรือการดูแลระหว่างวัน",
        },
        {
            id: 3,
            title: "โรงพยาบาลหรือคลินิกสัตว์",
            description: "สถานพยาบาลที่ออกแบบมาเพื่อสัตว์เลี้ยงโดยเฉพาะ",
        },
        {
            id: 4,
            title: "คาเฟ่สัตว์",
            description: "คาเฟ่สัตว์ที่รองรับสัตว์เลี้ยงเข้าพัก เหมาะกับสัตว์ที่ต้องการเพื่อน",
        }
    ];

    const handleSelect = (optionTitle) => {
        setSelected(optionTitle);
        onSelectType(optionTitle);
    };

    useEffect(() => {
        if (selectedType) {
            setSelected(selectedType);
        }
    }, [selectedType]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {options.map(option => (
                <div
                    key={option.id}
                    className={`col-span-1 bg-white border p-6 rounded-xl drop-shadow-md cursor-pointer ${
                        selected === option.title ? 'border-pethub-color4' : 'border-neutral-100'
                    }`}
                    onClick={() => handleSelect(option.title)}
                >
                    <div className="grid grid-cols-6 gap-2">
                        <div className="col-start-1 col-span-1 flex items-center">
                            <div className={`w-4 h-4 rounded-full ${
                                selected === option.title ? 'bg-pethub-color4' : 'bg-gray-300'
                            }`}></div>
                        </div>
                        <div className="col-start-2 col-span-5">
                            <div className="text-left text-sm font-bold">{option.title}</div>
                            <div className="text-left text-sm">{option.description}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TypeChoiceBoxes