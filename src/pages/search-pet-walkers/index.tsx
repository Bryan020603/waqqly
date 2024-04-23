import { WalkersSearchFilters } from '@/pages/search-pet-walkers/components/WalkersSearchFilters';
import { useSearchPetWalkers } from '@/pages/search-pet-walkers/hooks/useSearrchPetWalkers';
import { FullPageCircularSpinner } from '@/shared/components/FullPageCircularSpinner';
import { MainContent } from '@/shared/components/MainContent';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';

const SearchPetWalkers = () => {
  const { isLoading, walkers, handleClearSearch, handleSearch } =
    useSearchPetWalkers();

  if (isLoading) {
    return <FullPageCircularSpinner />;
  }

  if (walkers.length === 0) {
    return (
      <MainContent center>
        <Typography variant="h5">No Walkers Found!</Typography>
      </MainContent>
    );
  }

  return (
    <MainContent>
      <Container fixed>
        <Typography variant="h4" my={5}>
          Search Filters
        </Typography>
        <WalkersSearchFilters />
        <Grid container mt={2} mb={10}>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="flex-start"
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

        <Grid container mb={7}>
          {walkers.map((walker) => (
            <Grid key={walker._id} item xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  overflow: 'visible',
                }}
              >
                <Box display="flex" justifyContent="center">
                  <Avatar
                    src={walker.avatarUrl}
                    sx={{
                      width: '100px',
                      height: '100px',
                      mt: '-30px',
                    }}
                  />
                </Box>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {walker.firstName} {walker.lastName}
                  </Typography>
                  <Typography
                    textAlign="left"
                    sx={{ whiteSpace: 'break-spaces' }}
                    gutterBottom
                    variant="body1"
                  >
                    {walker.bio}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography
                      component="span"
                      fontWeight="600"
                      variant="body2"
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Age:
                    </Typography>
                    <Typography
                      component="span"
                      fontWeight="400"
                      variant="body2"
                    >
                      {walker.age}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography
                      component="span"
                      fontWeight="600"
                      variant="body2"
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Experience:
                    </Typography>
                    <Typography
                      component="span"
                      fontWeight="400"
                      variant="body2"
                    >
                      {walker.numOfExperience}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography
                      component="span"
                      fontWeight="600"
                      variant="body2"
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Telephone:
                    </Typography>
                    <Typography
                      component="span"
                      fontWeight="400"
                      variant="body2"
                    >
                      {walker.tel}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MainContent>
  );
};
export default SearchPetWalkers;
