import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { Query, graphql } from 'react-apollo'

class CharacterBio extends Component {
    renderStarships(starships) {
        return starships.map(starships => {
            return (
                <h3 key={starships.id}>{starships.name}</h3>
            )
        })
    }

    renderFilms(films) {
        return films.map(films => {
            return (
                <article key={films.id} className="associatedFilms_list">
                    <Link to={"/characters/" + films.id}>
                        {films.title}
                    </Link>
                </article>
            )
        })
    }



    render() {
        const id = this.props.match.params.id;
        return (
            <Query query={query} variables={{ id }} >
                {
                    (({ loading, err, data }) => {
                        if (loading) return <div>loading</div>
                        if (err) return <div>err</div>
                        return (
                            <div className="bioCard">
                                <h3><Link to="/">Home</Link></h3>
                                <hr />

                                <h1>{data.person.name}</h1>
                                <hr />

                                <div className="biography">
                                    <h2>Biography</h2>
                                    <hr />
                                    <h3>Homeworld: {data.person.homeworld.name}</h3>
                                    <h3>Birth Year: {data.person.birthYear}</h3>
                                    <h3>Species: {data.person.species.name}</h3>
                                </div>

                                <br />

                                <hr />
                                <div className="physicalAttributes">
                                    <h2>Physical Attributes</h2>
                                    <hr />
                                    <h3>Gender: {data.person.gender}</h3>
                                    <h3>Height: {data.person.height}cm</h3>
                                    <h3>Weight: {data.person.mass}kg</h3>
                                </div>
                                <hr />
                                <br />
                                <hr />
                                <div className="starships">
                                    <h2>Associated Starships</h2>
                                    <hr />
                                    {this.renderStarships(data.person.starshipConnection.starships)}
                                </div>
                                <hr />
                                <br />
                                <hr />

                                <div className="films">
                                    <h2>Appears In:</h2>
                                    <hr />
                                    {this.renderFilms(data.person.filmConnection.films)}
                                </div>


                                {data.person.id}


                            </div>
                        )
                    })
                }
            </Query>
        )
    }
}
const query = gql`

query person($id: ID) {
    person(id: $id) {
      name
      birthYear
      homeworld {
        name
      }
      species {
        name
      }
      gender
      height
      mass
      starshipConnection {
        starships {
            id
          name
        }
      }
      filmConnection {
        films {
            id
          title
        }
      }
    }
  }




`;

export default graphql(query)(CharacterBio);