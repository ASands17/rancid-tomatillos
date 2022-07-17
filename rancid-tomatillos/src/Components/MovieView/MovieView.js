import React, {Component} from "react";
import "./MovieView.css"


class MovieView extends Component{
    constructor(props) {
        super(props);
        this.state= {
            selectedMovieInfo: {},
            error: "",
        };
    }

    formatDate() {
        let testRelease = this.state.selectedMovieInfo.release_date
        return `Released: ${new Date(testRelease).toLocaleString().split(' ')[0]}`
    }

    formatGenres() {
        return (new Intl.ListFormat("en-GB", {style: "long", type: "conjunction"}).format(this.state.selectedMovieInfo.genres))
    }

    translateToCurrency(number) {
        if(number >1){
            return `$${new Intl.NumberFormat().format(number)}`;
        }
    }

    formatRuntime() {
        let testRuntime = this.state.selectedMovieInfo.runtime
        let hoursAndMins = (testRuntime/60).toFixed(2).split('.');
        return `${hoursAndMins[0]} hour and ${(hoursAndMins[1] * .60).toFixed(0)} minutes`
    }

    componentDidMount() {
        fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${this.props.id}`)
        .then(response => response.json())
        .then(data => {
            this.setState({
                selectedMovieInfo: data.movie
            })
        })
        .catch(() =>
        this.setState({error: "There was an error loading your film. Please try again!"}) 
        )
    }

    render() {
        let film = this.state.selectedMovieInfo;
        return(
            <div className="movieViewError">
            <div style={{display: this.state.error ? "block" : "none"}}> {this.state.error} </div>
            <div className="movieViewMain" src={film.backdrop_path} 
                                        style={{ backgroundImage: `url(${film.backdrop_path})` }}>
                <div className="posterTitleContainer">
                        <div className="statsContainer">
                            <h2 className="title">{film.title}</h2>
                            <p className="tagline">{film.tagline}</p>
                            <p className="releaseDate">{this.formatDate()}</p>
                            {film.budget && <p className="budget">Budget: {this.translateToCurrency(film.budget)}</p>}
                            {film.revenue && <p className="revenue">Revenue: {this.translateToCurrency(film.revenue)}</p>}
                            {film.runtime && <p className="runtime">Runtime: {this.formatRuntime()}</p>}
                            <p className="rating">{this.props.rating.toFixed(1)} ⭐️</p>
                            {film.title !== "Maratón After" && <div className="genresHolder">
                              <p className="genres"> {this.formatGenres()}</p>
                            </div>}
                        </div>
                </div>
            <footer>
                <p className="overview">{this.state.selectedMovieInfo.overview}</p>
            </footer>
        </div>
        </div>
        )
    }
} 

export default MovieView
