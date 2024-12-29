import React, { useEffect, useState } from 'react'

function FormComponent() {
    let [inputs, setInputs] = useState({ });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.algobook.info/v1/gym/categories');
                const result = await response.json();
                setInputs({...inputs, muscles: result ?? []});
            } catch (error) {
                console.error(error);
            }
        }
    
         fetchData();
},[])

    const getMuscleWorkouts = async (event) => {
        try {
            const response = await fetch(`https://api.algobook.info/v1/gym/categories/${event.target.value}`);
            const result = await response.json();
            setInputs({...inputs, workouts: result ?? []});
        } catch (error) {
            console.error(error);
        }
    }
    const handleSubmit = () => {
        return;
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select name="muscle-selector" id="muscle-selector" onChange={getMuscleWorkouts}>
                    <option>Select target muscle</option>
                    {inputs.muscles && inputs.muscles.map((muscle, index) => {
                        return <option key={index} value={muscle}>{muscle}</option>
                    })}    
                </select>
                <select name="workout-selector" id="workout-selector">
                    <option>Select workout</option>
                    {inputs.workouts && inputs.workouts.exercises.map((workout, index) => {
                        return <option key={index} value={workout.name}>{workout.name}</option>
                    })}
                </select>
                <input type="number" name="sets" placeholder="Sets" />
                <input type="number" name="repetitions" placeholder="Repetitions" />
                <input type="submit" value="Add" />
            </form>
        </div>
    )
}

export default FormComponent