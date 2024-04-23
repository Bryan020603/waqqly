import { useFetchUserPets } from '@/pages/pets/hooks/useFetchUserPets';
import { FullPageCircularSpinner } from '@/shared/components/FullPageCircularSpinner';
import { MainContent } from '@/shared/components/MainContent';
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { PetRemoveBtn } from './components/PetRemoveBtn';

const Pets = () => {
  const { isLoading, pets, onPetRemoved } = useFetchUserPets();

  if (isLoading) {
    return <FullPageCircularSpinner />;
  }

  if (pets.length === 0) {
    return (
      <MainContent center>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
          p={2}
        >
          <Typography variant="h6">No Pets Found!</Typography>
          <Link to="/add-pets">Create new Pet</Link>
        </Box>
      </MainContent>
    );
  }

  return (
    <MainContent>
      <Container fixed>
        <Typography variant="h4" my={5}>
          Your Pets
        </Typography>
        <Grid container spacing={3} mb={7}>
          {pets.map((pet) => (
            <Grid key={pet._id} item xs={12} sm={6} md={4} lg={3}>
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
                        Location:
                      </Typography>
                      <Typography
                        component="span"
                        fontWeight="400"
                        variant="body2"
                      >
                        {pet.petLocation}
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
                <CardActions>
                  <PetRemoveBtn id={pet._id} onRemoved={onPetRemoved} />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MainContent>
  );
};

export default Pets;
