import React from 'react';
import { graphql } from 'gatsby';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

// // new code \/ to use a datatable from app.jsx
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from '../app';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
// // new code ^

// This query is executed at build time by Gatsby.
export const GatsbyQuery = graphql`
  {
    rickAndMorty {
      character(id: 1) {
        name
        image
      }
    }
  }
`;

// This query is executed at run time by Apollo.
const APOLLO_QUERY = gql`
  {
    meme(where: { id: "cjke35p4tni830953j0xemo7v" }) {
      photo {
        url(
          transformation: {
            image: { resize: { width: 600, height: 600, fit: crop } }
          }
        )
      }
    }
  }
`;

// // other memes from the same graphql endpoint
// cjke2xdaqnh9j09532bnyblnq
// cjke2v0ehng8v09531aivwv14
// meme(where: { id: "cjke2xlf9nhd90953khilyzja" })

export default ({
  data: {
    rickAndMorty: { character },
  },
}) => {
  const { loading, error, data } = useQuery(APOLLO_QUERY);

  // // new code \/ to use a datatable from app.jsx
  // ReactDOM.render(
  //   <React.StrictMode>
  //     <App />
  //   </React.StrictMode>,
  //   document.getElementById('root')
  // );
  // // new code ^

  return (
    <div style={{ textAlign: 'center', width: '600px', margin: '50px auto' }}>
      <h1>Here's {character.name} and a funny meme</h1>
      <p>
        Rick & Morty API{' '}
        <span role="img" aria-label="down">
          👇{' '}
        </span>{' '}
        data loads at build time. The dog meme API
        <span role="img" aria-label="down">
          👇{' '}
        </span>{' '}
        loads at runtime.
      </p>
      <div>
        <img
          src={character.image}
          alt={character.name}
          style={{ width: 300 }}
        />

        {loading && <p>Loading meme...</p>}
        {error && <p>Error: ${error.message}</p>}
        {data && data.meme && data.meme.photo && (
          <img
            src={data.meme.photo.url}
            alt="Funny Meme"
            style={{ maxWidth: 300 }}
          />
        )}
      </div>
    </div>
  );
};
