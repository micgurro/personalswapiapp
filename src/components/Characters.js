import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { Query, graphql } from 'react-apollo'
import '../index.css';

class Characters extends Component {

    renderCharacters(characters) {
        return characters.map(characters => {
            return (
                <article key={characters.id} className="character_list">
                    <Link to={"/characterbio/" + characters.id}>
                        <strong>{characters.name}</strong>
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
                            <div className="characterList">
                                <h3><Link to="/">Home</Link></h3>
                                <hr />
                                <h2>Characters from</h2>
                                <h1>{data.film.title}</h1>
                                <hr />
                                <p>Click a link for a detailed bio for each character.</p>
                                <hr />
                                {this.renderCharacters(data.film.characterConnection.characters)}
                            </div>
                        )
                    })
                }
            </Query>
        )
    }
}
const query = gql`

query Character($id: ID) {
    film(id:$id){
        title
        id
        characterConnection{
            characters{
                name
                id
            }
        }
    }

}
    
  
`;

export default graphql(query)(Characters);