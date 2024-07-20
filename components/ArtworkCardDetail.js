import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import useSWR from 'swr';
import Error from 'next/error';
import { useAtom } from 'jotai';
import { useFavouriteListState } from "@/store";
import { useState } from 'react';

const fetcher = url => fetch(url).then(res => res.json());

export default function ArtworkCardDetail({ objectID }) {
  // Check that objectID is being correctly passed
  console.log('objectID:', objectID);

  const [favourites, setFavourites] = useFavouriteListState();
  const [showAdded, setShowAdded] = useState(favourites.includes(objectID));

  const favouritesClicked = () => {
    if (showAdded) {
      setFavourites(favourites.filter((x) => x != objectID));
      setShowAdded(false);
    } else {
      setFavourites((current) => [...current, objectID]);
      setShowAdded(true);
    }
  }

  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null,
    fetcher
  );

  if (error) return <Error statusCode={404} />;
  // if (error) return <h1> {error} </h1>
  if (!data) return null;

  const {
    primaryImage,
    title = 'N/A',
    objectDate = 'N/A',
    classification = 'N/A',
    medium = 'N/A',
    artistDisplayName = 'N/A',
    artistWikidata_URL,
    creditLine = 'N/A',
    dimensions = 'N/A'
  } = data;

  return (
    <Card>
      {primaryImage && <Card.Img variant="top" src={primaryImage} />}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {objectDate}<br />
          <strong>Classification:</strong> {classification}<br />
          <strong>Medium:</strong> {medium}<br /><br />
          <strong>Artist:</strong> {artistDisplayName} {artistDisplayName !== 'N/A' && artistWikidata_URL && (
            <a href={artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a>
          )}<br />
          <strong>Credit Line:</strong> {creditLine}<br />
          <strong>Dimensions:</strong> {dimensions}
        </Card.Text>
        <Button
          onClick={favouritesClicked}
          variant={showAdded ? "primary" : "outline-primary"} >
          {showAdded ? "+ Favourite (added)" : "+ Favourite"}
        </Button>
      </Card.Body>
    </Card>
  );
};
