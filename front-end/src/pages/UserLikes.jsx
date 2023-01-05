import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserLikedMovies } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import styled from "styled-components";
import Navbar from "../components/navbar";
import Card from "../components/card";

const UserLikes = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [email, setEmail] = useState(undefined);

    const navigate = useNavigate();
    const movies = useSelector((state) => state.netflix.movies);
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) setEmail(currentUser.email);
            else navigate("/login");
        });
    }, [navigate]);

    useEffect(() => {
        if (email) {
            dispatch(getUserLikedMovies(email));
        }
    }, [dispatch, email]);

    window.onscroll = () => {
        setIsScrolled(window.scrollY === 0 ? false : true);
        return () => window.onscroll = null;
    };

    return (
        <Container>
            <Navbar isScrolled={isScrolled}/>
            <div className="content flex column">
                <h1>My List</h1>
                <div className="grid flex">
                    {
                        movies.map(( movie, index ) => {
                            return <Card movieData={movie} index={index} key={movie.id} isLiked={true} />
                        })
                    }
                </div>
            </div>
        </Container>
    );
};

const Container = styled.div`
  .content {
    margin: 8rem 2.3rem 2.3rem;
    gap: 3rem;

    h1 {
      margin-left: 3rem;
    }

    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;

export default UserLikes;