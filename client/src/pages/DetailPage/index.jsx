import React, { useEffect, useState } from 'react';
import classes from './index.module.scss';
import { Navbar } from '../../components/Navbar';
import { isEmpty } from 'lodash';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPokemon } from '../../store/action';
import {
  checkProbability, 
  resetProbability,
  caughtPokemon
} from '../../store/action/serverIndex';

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pokemon = useSelector(state => state.getPokemons.pokemon);
  const probabilityValue = useSelector(state => state.conditionReducer.probability);
  const { id } = useParams();
  const [ show,  setShow ] = useState(false);
  const [ notifFailed, setNotifFailed ] = useState(false);
  const [ nickname, setNickname ] = useState('');

  useEffect(() => {
    dispatch(getPokemon(id));
    if (!isEmpty(probabilityValue)) {
      dispatch(resetProbability());
    };
  }, []);

  const resetStatus = () => {
    setShow(false);
    setNotifFailed(false);
  };

  const probability = () => {
    resetStatus();
    dispatch(checkProbability());
  };

  useEffect(() => {
    if (probabilityValue === 'Success') {
      setShow(true);
    } else if (probabilityValue === 'Failed') {
      setNotifFailed(true);
    }
  }, [probabilityValue]);

  useEffect(() => {
    if (notifFailed) {
      setTimeout(() => {
        setNotifFailed(false);
      }, 3000);
    };
  }, [notifFailed]);

  const catchHandler = (e) => {
    e.preventDefault();
    const newPokemon = {
      pokemonId: pokemon.id,
      nickname: nickname,
      imageUrl: pokemon.imageUrl
    };
    dispatch(caughtPokemon(newPokemon,
      () => {navigate('/mypage')}
    ));
  };

  return (
    <div className={classes.container}>
      <Navbar />
      <div className={classes.wraper}>
        {notifFailed && <p className={classes.notifFailed}>Failed to Catch Pokemon</p>}
        {show && 
          <div className={classes.form}>
            <form onSubmit={catchHandler}>
              <input type='text'
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}>
              </input>
              <button className={classes.btn} type='submit'>Submit</button>
            </form>
          </div>
        }
        <div className={classes.body}>
          <div className={classes.card}>
            <img src={pokemon?.imageUrl} alt={pokemon?.name} />
            <p>{pokemon?.name}</p>
          </div>
          <div className={classes.rightSection}>
            <div className={classes.details}>
              <p>MOVES : {pokemon?.move}</p>
              <p>TYPES : {pokemon?.types}</p>
              <p>ABILITIES : {pokemon?.abilities}</p>
            </div>
            <div className={classes.btnCatch} onClick={probability} >
              Catch Pokemon
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
