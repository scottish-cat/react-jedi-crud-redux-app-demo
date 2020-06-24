import {SET_PLANETS, ADD_PLANET, UPDATE_PLANET, DELETE_PLANET, CHANGE_BELOVED_STATUS} from '../actions/planets'

const initialState = {
  allPlanets: []
}

function planets(state = initialState, action) {
  switch(action.type) {
    case SET_PLANETS:
      return {...state,
        allPlanets: action.planets
      };

    case ADD_PLANET:
      return {...state, 
        allPlanets: [...state.allPlanets, action.planet]};

    case UPDATE_PLANET:
    return {...state,
        allPlanets: state.allPlanets.map((planet) => {
            return planet.id === action.planet.id ? action.planet : planet
        })
    };

    case DELETE_PLANET:
      return {...state,
        allPlanets: state.allPlanets.filter(planet => planet.id !== action.id)
      };

    case CHANGE_BELOVED_STATUS:
      return {...state,
        allPlanets: state.allPlanets.map((planet) => {
          return planet.id === action.id ? {...planet, beloved: !planet.beloved} : planet
        })
      };

    default:
      return state;
  }
}

export default planets;