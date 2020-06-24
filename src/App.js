import React, { useEffect } from 'react';
import {Route, Switch, Redirect} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

import PeoplePage from "./components/pages/PeoplePage2";
import PlanetsPage from "./components/pages/PlanetsPage";
import StarshipsPage from "./components/pages/StarshipsPage";
import PeopleForm from "./components/pages/PeopleForm";
import PlanetsForm from "./components/pages/PlanetsForm.jsx";
import StarshipsForm from "./components/pages/StarshipsForm.jsx";
import Navbar from "./components/Navbar";
import NotFound from "./components/common/NotFound";

import { getPeople } from "./services/peopleService";
import { getPlanets } from "./services/planetsService";
import { getStarships } from "./services/starshipsService";

import { useDispatch } from 'react-redux';
import { setPeople } from './store/actions/people';
import { setPlanets } from './store/actions/planets';
import { setStarships } from './store/actions/starships';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            const peopleResponse = await getPeople()
            dispatch(setPeople(peopleResponse));

            const planetsResponse = await getPlanets()
            dispatch(setPlanets(planetsResponse));

            const starshipsResponse = await getStarships()
            dispatch(setStarships(starshipsResponse));
        }

        fetchData();
    }, [])

    return (
        <>
            <Navbar/>
            <main className="container">
                <Switch>
                    <Route path="/people/:id" component={ PeopleForm } />
                    <Route path="/people" component={ PeoplePage } />
                    <Route path="/planets/:id" component={ PlanetsForm } />
                    <Route path="/planets" component={ PlanetsPage } />
                    <Route path="/starships/:id" component={ StarshipsForm } />
                    <Route path="/starships" component={ StarshipsPage } />
                    <Route path="/not-found" component={ NotFound } />
                    <Redirect exact from="/" to="/people" component={PeoplePage}/>
                    <Redirect to="/not-found"/>
                </Switch>
            </main>
        </>

    );
}

export default App;
