import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Row, Col, Pagination, Card } from 'react-bootstrap';
import Error from 'next/error';
import ArtworkCard from '../../components/ArtworkCard';

const fetcher = url => fetch(url).then(res => res.json());

const PER_PAGE = 12;

export default function Artwork() {
  const router = useRouter();
  const [artworkList, setArtworkList] = useState([]);
  const [page, setPage] = useState(1);

  let finalQuery = router.asPath.split('?')[1];

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`,
    fetcher
  );

  useEffect(() => {
    if (data && data.objectIDs) {
      const results = [];
      for (let i = 0; i < data.objectIDs.length; i += PER_PAGE) {
        const chunk = data.objectIDs.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  const previousPage = () => {
    window.scrollTo(0, 0);
    if (page > 1) setPage(page - 1);
  };

  const nextPage = () => {
    window.scrollTo(0, 0);
    if (page < artworkList.length) setPage(page + 1);
  };

  if (error) return <Error statusCode={404} />;

  return (
    <>
      {artworkList.length > 0 ? (
        <>
          <Row className="gy-4 m-3">
            {artworkList[page - 1].map(objectID => (
              <Col lg={3} key={objectID}>
                <ArtworkCard objectID={objectID} />
              </Col>
            ))}
          </Row>
          <Row>
            <Col>
              <Pagination>
                <Pagination.Prev onClick={previousPage} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage} />
              </Pagination>
            </Col>
          </Row>
        </>
      ) : (
        <Card>
          <h4>Nothing Here</h4>
          Try searching for something else.
        </Card>
      )}
    </>
  );
}