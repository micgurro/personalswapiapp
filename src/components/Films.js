import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class Films extends Component {
    Films() {
        return this.props.data.allFilms.films.map(films => {
            return (
                <article key={films.id} className="film_list">
                    <Link to={"/characters/" + films.id}>
                        {films.title}: {films.releaseDate}
                    </Link>
                </article>
            );
        })
    }
    render() {
        if (this.props.data.loading) return <div>loading</div>
        if (this.props.data.error) return <div> error</div>

        return <div className="home">
            <h1>Star Wars API + GraphQL App</h1>
            <hr />
            <h2>Select a link for a list of characters who appear in the film.</h2>
            <hr />
            {this.Films()}
        </div>
    }
}



const query = gql`
{
    allFilms {
        films{
        id
        releaseDate
        title
        
        }
    }
}
`

export default graphql(query)(Films);