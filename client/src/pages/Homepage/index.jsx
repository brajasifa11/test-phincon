import React, { useEffect } from 'react';
import classes from './index.module.scss';
import { Navbar } from '../../components/Navbar';
import { Card } from '../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPokemons } from '../../store/action';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pokemons = useSelector(state => state.getPokemons.pokemons);
  const toDetail = (pokeomnId) => {
    navigate(`pokemon/${pokeomnId}`);
  };

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.wraper}>
        <Navbar />
      <div className={classes.body}>
        {pokemons &&
          pokemons.map((pokemon, idx) => {
            return <Card pokemon={pokemon} key={idx} toDetail={toDetail} />;
          })
        }
        </div>
      </div>
    </div>
  );
};

export default Home;
