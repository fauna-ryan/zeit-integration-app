import React, { useEffect, useState } from 'react';

function App() {
  const [isLoading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const hasCollections = collections.length > 0;

  useEffect(() => {
    fetch('/api/collections')
      .then(response => response.json())
      .then(collections => {
        setCollections(collections);
        setLoading(false);
      });
  }, [setCollections, setLoading]);

  return (
    <div style={{ padding: 16 }}>
      <h1>FaunaDB Zeit Integration</h1>
      <h2>Collections</h2>
      {isLoading ? (
        <h5>Loading...</h5>
      ) : hasCollections ? (
        <ul>
          {collections.map(({ name }) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      ) : (
        <h5>No Collections</h5>
      )}
    </div>
  );
}

export default App;
