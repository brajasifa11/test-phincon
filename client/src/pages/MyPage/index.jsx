import React, { useEffect, useState } from "react";
import classes from './index.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../../components/Navbar";
import { Card } from "../../components/Card";
import { 
  getPokemons, renamePokemon, 
  checkNumber, releasePokemon 
} from '../../store/action/serverIndex';

const MyPage = () => {
  const dispatch = useDispatch();
  const [ selected, setSelected ] = useState(null);
  const [ notifFailed, setNotifFailed ] = useState(false);
  const [ notifSuccess, setNotifSuccess ] = useState(false);
  const myPokemons = useSelector(state => state.myPokemons.myPokemons);

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  const resetStatus = () => {
    setNotifFailed(false);
    setNotifSuccess(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    resetStatus();
    if (selected.nickname.length > 0) {
      dispatch(renamePokemon(selected,
        () => {setSelected(null)},
      ));
      dispatch(getPokemons());
    };
  };

  const removePokemon = (id) => {
    if (notifFailed) {
      resetStatus();
    }
    dispatch(checkNumber(
      () => {dispatch(releasePokemon(id))},
      () => {setNotifFailed(true)},
    ));
  };

  useEffect(() => {
    if (notifFailed) {
      setTimeout(() => {
        setNotifFailed(false);
      }, 2000);
    }
  }, [notifFailed]);

  return (
    <div className={classes.container}>
      <Navbar />
      <div className={classes.wraper}>
        {notifFailed && <p className={classes.popup}>Failed to Release</p>}
        {notifSuccess && <p className={classes.popup}>Pokemon Renamed</p>}
        {selected && (
          <div className={classes.form}>
            <form onSubmit={handleUpdate}>
              <input type='text'
              onChange={(e) => setSelected({
                ...selected, nickname: e.target.value,
              })}
              ></input>
              <button type='submit'>Submit</button>
            </form>
          </div>
        )}
        <div className={classes.body}>
          {myPokemons &&
            myPokemons.map((pokemon, idx) => {
              return (
                <Card 
                pokemon={pokemon} favourite key={idx}
                setSelected={setSelected}
                removePokemon={removePokemon}
                />
                )
              })
            }
        </div>
      </div>
    </div>
  );
};

export default MyPage;
