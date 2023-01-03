import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { fetchDataByGenre } from "../store";

const SelectGenre = ({ genres, type }) => {
    const dispatch = useDispatch();
    return (
        <Select
            className="flex"
            onChange={e => {
                dispatch(fetchDataByGenre({ genre: e.target.value, type }));
            }}
        >
            {genres.map((genre) => {
                return <option value={genre.id} key={genre.id}>{genre.name}</option>
            })}
        </Select>
    );
};

SelectGenre.propTypes = {
    genres: PropTypes.array,
    type: PropTypes.string,
};

const Select = styled.select`
  margin-left: 5rem;
  cursor: pointer;
  font-size: 1.5rem;
  background-color: rgba(0, 0, 0, .5);
  color: white;
`;

export default SelectGenre;