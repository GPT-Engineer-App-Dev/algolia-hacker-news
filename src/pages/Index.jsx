import { useEffect, useState } from "react";
import { Container, Text, VStack, Spinner, Box, Link, Heading } from "@chakra-ui/react";
import axios from "axios";

const Index = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("https://hn.algolia.com/api/v1/search?query=react");
        setArticles(response.data.hits);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="xl">Hacker News Aggregator</Heading>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          articles.map((article) => (
            <Box key={article.objectID} p={4} borderWidth="1px" borderRadius="lg" width="100%">
              <Link href={article.url} isExternal>
                <Text fontSize="xl" fontWeight="bold">{article.title}</Text>
              </Link>
              <Text>Author: {article.author}</Text>
              <Text>Points: {article.points}</Text>
            </Box>
          ))
        )}
      </VStack>
    </Container>
  );
};

export default Index;