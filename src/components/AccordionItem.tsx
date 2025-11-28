import { useState } from "react";
import data from "../data/tennis.json";
import './AccordionItem.css';

export default function AccordionItem() {
    let [active, useActive] = useState(2000);
    let [activeIds, setActiveIds] = useState<number[]>([]);
    let [multipleMode, useMultipleMode] = useState(false);

    const handleClick = (id: number) => {
        if (multipleMode) {//multiple mode
            if (activeIds.includes(id)) {
                const newIds = activeIds.filter((e) => e != id); 
                setActiveIds(newIds); 
            } else {
                setActiveIds([...activeIds, id]);
            }
        } else {//singular mode
            if (id == active) {
                useActive(2000);
            } else {
                useActive(id);
            }
        }
    };

    return (
        <div className="container">
            <div className='btn-group w-100 mb-4' role='group'>
                <button onClick={() => useMultipleMode(false)} className={`btn ${!multipleMode ? 'btn-primary' : 'btn-outline-primary'}`}>Singular mode</button>
                <button onClick={() => useMultipleMode(true)} className={`btn ${multipleMode ? 'btn-primary' : 'btn-outline-primary'}`}>Multiple mode</button>

            </div>

            {data.map((d, i) => (
                <div className="card" key={i}>
                    <div className="card-header d-flex justify-content-between align-items-center" style={{ cursor: 'pointer' }} onClick={() => handleClick(d.id)}>
                        <h5 className="mb-0">{d.title}</h5>
                            <span className="badge bg-primary fs-5">
                                {(activeIds.includes(d.id) && multipleMode) || 
                                    (active == d.id && !multipleMode)
                                    ? "-"
                                    : "+"}
                            </span>
                        
                    </div>

                    {active == d.id && !multipleMode ? <div className="card-body"><p className="card-text">{d.content}</p>  </div> : null}

                    {activeIds.includes(d.id) && multipleMode ? <div className="card-body"><p className="card-text">{d.content}</p>  </div> : null}


                </div>
            ))}
        </div>
    );
}
