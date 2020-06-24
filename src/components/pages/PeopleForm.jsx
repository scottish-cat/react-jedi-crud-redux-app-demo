import React, {useEffect, useState} from 'react';
import Input from "../common/Input";
import Button from '../common/Button';
import { nanoid } from "nanoid";

import { useSelector, useDispatch } from 'react-redux';
import { peopleColumns } from '../../services/peopleService';
import { getAllPeople } from '../../store/selectors/people';
import { addPerson, updatePerson } from '../../store/actions/people';

const initialPersonData = peopleColumns.reduce((columns, columnName) => {
    columns[columnName] = '';
    return columns;
}, {})

const PeopleForm = ({history, match}) => {
    const dispatch = useDispatch();
    const people = useSelector(state => getAllPeople(state));
    const [formErrors, setFormErrors] = useState({});
    const [personData, setPersonData] = useState({...initialPersonData});
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const personId = match.params.id;
        if (personId === "new") return;
        const existingPersonData = people.filter(person => person.id === personId)[0];
        setPersonData(existingPersonData);
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
        const errors = validate(personData);

        if (Object.keys(errors).length) {
            return;
        }

        editMode ? dispatch(updatePerson(personData)) : dispatch(addPerson({...personData, beloved: false, id: nanoid()}));
        history.goBack();
    }

    const handleChange = (event) => {
        const {currentTarget: input} = event;
        const data = {...personData};
        const errors = {...formErrors};
        if (errors[input.name]) {
            delete errors[input.name];
        }

        data[input.name] = input.value;
        setPersonData(data);
        setFormErrors(errors)
    }

    return (
        <form>
            {peopleColumns.map(peopleColName => (
                <Input
                    key={peopleColName}
                    name={peopleColName}
                    label={peopleColName[0].toUpperCase() + peopleColName.slice(1)}
                    value={personData[peopleColName]}
                    type={peopleColName === 'beloved' ? 'checkbox' : 'input'}
                    error={formErrors[peopleColName]}
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

export default PeopleForm;
