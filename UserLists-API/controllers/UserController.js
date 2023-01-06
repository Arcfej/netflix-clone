const User = require("../models/UserModel");
const { request, response } = require("express");

module.exports.addToLikedMovies = async (request, response) => {
    try {
        const { email, data } = request.body;
        const user = await User.findOne({ email })
        if (user) {
            const { likedMovies } = user;
            const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
            if (!movieAlreadyLiked) {
                await User.findByIdAndUpdate(
                    user._id,
                    {
                        likedMovies: [...user.likedMovies, data],
                    },
                    { new: true },
                );
            } else {
                return response.json({ msg: "Movie already added to the liked list" });
            }
        } else {
            await User.create({ email, likedMovies: [data] });
        }
        return response.json({ msg: "Movie added successfully" });
    } catch (error) {
        return response.json({ msg: "Error adding movie" });
    }
};

module.exports.getLikedMovies = async (request, response) => {
    try {
        const { email } = request.params;
        const user = await User.findOne({ email });
        if (user) {
            return response.json({ msg: "fetching likes success", movies: user.likedMovies })
        } else {
            return response.json({ msg: "User with given email not found" });
        }
    } catch (err) {
        return response.json({ msg: "Error fetching movies" });
    }
};

module.exports.removeFromLikedMovies = async (request, response) => {
    try {
        const { movieId, email } = request.body;
        const user = await User.findOne({ email });
        if (user) {
            const { likedMovies } = user;
            const movieIndex = likedMovies.findIndex(({ id }) => id === movieId);
            if (movieIndex < 0) return response.status(400).send({ msg: "Movie not found" });
            console.log(movieIndex);
            likedMovies.splice(movieIndex, 1);
            await User.findByIdAndUpdate(
                user._id,
                { likedMovies },
                { new: true },
            );
            return response.json({ msg: "Movie removed successfully", movies: likedMovies });
        } else {
            console.log("User creation");
            await User.create({ email, likedMovies: [data] });
        }
    } catch (err) {
        console.log(err);
        return response.json({ msg: "Error deleting movie" });
    }
};
