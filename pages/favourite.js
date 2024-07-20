import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import { useFavouriteListState } from "@/store";

export default function Favourite() {
  const [favouriteLists, setFavouriteLists] = useFavouriteListState();

  return (
    <>
      {favouriteLists && favouriteLists.length > 0 ? (
        <Container>
          <Row>
            {favouriteLists.map((objectID) => (
              <Col lg={3} md={4} sm={6} xs={12} key={objectID}>
                <ArtworkCard objectID={objectID} />
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                No Favourites Yet
              </Card.Title>
              <Card.Text style={{ fontSize: "1.2rem" }}>
                Browse and add some artwork to your favourites.
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
      )}
    </>
  );
}
