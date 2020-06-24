import React, {useEffect, useState} from 'react';
import Input from "../common/Input";
import Button from '../common/Button';
import { nanoid } from "nanoid";

import { useSelector, useDispatch } from 'react-redux';
import { starshipsColumns } from '../../services/starshipsService';
import { getAllStarships } from '../../store/selectors/starships';
import { addStarship, updateStarship } from '../../store/actions/starships';

const initialStarshipData = starshipsColumns.reduce((columns, columnName) => {
    columns[columnName] = '';
    return columns;
}, {})

const StarshipsForm = ({history, match}) => {
    const dispatch = useDispatch();
    const starships = useSelector(state => getAllStarships(state));
    const [formErrors, setFormErrors] = useState({});
    const [starshipData, setStarshipData] = useState({...initialStarshipData});
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const starshipId = match.params.id;
        if (starshipId === "new") return;
        const existingStarshipData = starships.filter(starship => starship.id === starshipId)[0];
        setStarshipData(existingStarshipData);
        setEditMode(true);
    }, [])

    const validate = (data) => { // super simple validation
        let errors = {};
        Object.entries(data).map(([propKey, propVal]) => {
            if (!propVal && !propKey.includes('beloved')) {
                errors = {...errors, [propKey]: 'Field should not be empty'};
            }
        })
        setFormErrors(errors);
        return errors
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const errors = validate(starshipData);

        if (Object.keys(errors).length) {
            return;
        }

        if (editMode) {
            dispatch(updateStarship(starshipData));
            localStorage.setItem('starships', JSON.stringify(
                starships.map(starship => starship.id === starshipData.id ? starshipData : starship))
            );
        } else {
            const newStarship = {...starshipData, beloved: false, id: nanoid()};
            dispatch(addStarship(newStarship));
            localStorage.setItem('starships', JSON.stringify([...starships, newStarship]));
        }

        history.goBack();
    }

    const handleChange = (event) => {
        const {currentTarget: input} = event;
        const data = {...starshipData};
        const errors = {...formErrors};
        if (errors[input.name]) {
            delete errors[input.name];
        }

        data[input.name] = input.value;
        setStarshipData(data);
        setFormErrors(errors)
    }

    return (
        <form>
            {starshipsColumns.map(starshipColName => (
                <Input
                    key={starshipColName}
                    name={starshipColName}
                    label={starshipColName[0].toUpperCase() + starshipColName.slice(1)}
                    value={starshipData[starshipColName]}
                    type={starshipColName === 'beloved' ? 'checkbox' : 'input'}
                    error={formErrors[starshipColName]}
                    onChange={event => handleChange(event)}
                />
            ))}
            <Button
                onClick={event => onSubmit(event)}
                label="Save"
                disabled={Object.keys(formErrors).length}
                classes="btn btn-dark"
            />
        </form>
    );
};

export default StarshipsForm;
