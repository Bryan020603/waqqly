import { PetsSearchFilters } from '@/pages/pets-search/components/PetsSearchFilters';
import { useSearchPets } from '@/pages/pets-search/hooks/useSearchPets';
import { FullPageCircularSpinner } from '@/shared/components/FullPageCircularSpinner';
import { MainContent } from '@/shared/components/MainContent';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';

const PetsSearch = () => {
  const { isLoading, pets, handleSearch, handleClearSearch } = useSearchPets();

  if (isLoading) {
    return <FullPageCircularSpinner />;
  }

  if (pets.length === 0) {
    return (
      <MainContent center>
        <Typography variant="h5">No Pets Found!</Typography>
      </MainContent>
    );
  }

  return (
    <MainContent>
      <Container fixed>
        <Typography variant="h4" my={5}>
          Search Filters
        </Typography>
        <PetsSearchFilters />
        <Grid container mt={2} mb={4}>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            gap={2}
          >
            <Button onClick={handleSearch} variant="contained" color="primary">
              Search
            </Button>
            <Button
              onClick={handleClearSearch}
              variant="contained"
              color="secondary"
            >
              Clear
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={3} mb={7}>
          {pets.map((pet) => (
            <Grid key={pet._id} item xs={12} sm={4} md={3}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    height={230}
                    component="img"
                    image={pet.imageUrl}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {pet.name}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography
                        component="span"
                        fontWeight="500"
                        variant="body2"
                      >
                        Size:
                      </Typography>
                      <Typography
                        component="span"
                        fontWeight="400"
                        variant="body2"
                      >
                        {pet.size}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography
                        component="span"
                        fontWeight="500"
                        variant="body2"
                      >
                        Colour:
                      </Typography>
                      <Typography
                        component="span"
                        fontWeight="400"
                        variant="body2"
                      >
                        {pet.color}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography
                        component="span"
                        fontWeight="500"
                        variant="body2"
                      >
                        Owner:
                      </Typography>
                      <Typography
                        component="span"
                        fontWeight="400"
                        variant="body2"
                      >
                        {pet.ownerFirstName} {pet.ownerLastName}
                      </Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography
                        component="span"
                        fontWeight="500"
                        variant="body2"
                        sx={{
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Contact:
                      </Typography>
                      <Typography
                        component="span"
                        fontWeight="400"
                        variant="body2"
                      >
                        {pet.ownerEmail}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MainContent>
  );
};

export default PetsSearch;
