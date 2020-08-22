import React, { useState, useEffect } from "react";
import axios from 'axios';
import { colors, typeColors } from "./colors";
import "./styles.scss";

const url = "https://pokeapi.co/api/v2/pokemon/";

const Stat = ({ color, width, dataType, dataValue }) => {
  const styles = {
    backgroundColor: color,
    width: width + "%"
  };
  return (
    <React.Fragment>
      <div className="label">
        {dataType === "special-attack"
          ? "sp. attack"
          : dataType === "special-defense"
          ? "sp. defense"
          : dataType}
        : <span style={{ color: color }}>{dataValue}</span>
      </div>
      <div className="stat-total">
        <div data-value={dataValue} className="stat" style={{ ...styles }} />
      </div>
    </React.Fragment>
  );
};

const Data = ({ data }) => {
  const calcPercent = (base_stat) => {
    return (base_stat / 255) * 100;
  };
  const getColor = (type) => {
    switch (type) {
      case "hp":
        return colors.red;
      case "attack":
        return colors.orange;
      case "defense":
        return colors.purple;
      case "special-attack":
        return colors.blue;
      case "special-defense":
        return colors.green;
      case "speed":
        return colors.pink;
      default:
        return "#fff";
    }
  };
  return (
    <div className="data-container">
      {data.map((stat) => (
        <Stat
          dataType={stat.stat.name}
          dataValue={stat.base_stat}
          width={calcPercent(stat.base_stat)}
          color={getColor(stat.stat.name)}
        />
      ))}
    </div>
  );
};

const Types = ({ data }) => {
  return (
    <div className="types">
      {data.map((type) => (
        <span
          className="type"
          style={{ backgroundColor: "#" + typeColors[type.type.name] }}
        >
          {type.type.name}
        </span>
      ))}
    </div>
  );
};

const Loader = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 100);
  });
  return <div className="loading">{show && <div className="loader" />}</div>;
};

const PokeInfo = ({ pkmn, isLoading }) => (
  <div className="sprite-container">
    {isLoading ? (
      <Loader />
    ) : (
      <React.Fragment>
        <div className="id">#{pkmn.id}</div>
        <div className="img-wrapper">
          <img className="sprite" src={pkmn.sprites.front_default} alt={pkmn.name} />
        </div>
        <h3 className="name">{pkmn.name}</h3>
        <Types data={pkmn.types} />
      </React.Fragment>
    )}
  </div>
);

const PokemonCard = ({ pkmn, isLoading, children }) => {
  return (
    pkmn && (
      <div id="card">
        {children}
        <PokeInfo isLoading={isLoading} pkmn={pkmn} />
        <Data data={pkmn.stats} />
      </div>
    )
  );
};

const Buttons = ({ id, setID, isLoading }) => {
  const updateID = (updateType) => {
    switch (updateType) {
      case "random": {
        setID(Math.floor(Math.random() * 800));
        break;
      }
      case "up": {
        if (id < 800) {
          setID(id + 1);
          break;
        }
        break;
      }
      case "down": {
        if (id > 1) {
          setID(id - 1);
          break;
        }
        break;
      }
      default: break;
    }
  };
  const buttonVals = {
    random: "🔀",
    up: "▲",
    down: "▼"
  };
  return (
    <div className="btns">
      {Object.entries(buttonVals).map((pair) => (
        <button onClick={() => updateID(pair[0])} disabled={isLoading}>
          {pair[1]}
        </button>
      ))}
    </div>
  );
};

const App = () => {
  const [id, setID] = useState(1);
  const [pkmn, setPkmn] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPkmn = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(url + id);
        setPkmn(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };
    fetchPkmn();
  }, [id]);
  return (
    <PokemonCard isLoading={isLoading} pkmn={pkmn}>
      <Buttons isLoading={isLoading} id={id} setID={setID} />
    </PokemonCard>
  );
};

export default App;
