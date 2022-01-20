import { Add } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { NextPage } from 'next';
import StoryCard from '../../components/content/StoryCard';
import Link from '../../components/core/Link';
import withAuth from '../../hoc/withAuth';
import useStoryBySlug from '../../hooks/useStoryBySlug';
import { AccessLevel } from '../../types/enum/accessLevel';

const AdminIndexPage: NextPage = () => {
  const { story, storyLoading, setSlug, slug } = useStoryBySlug(
    AccessLevel.ADMIN
  );
  return (
    <Grid
      container
      minHeight="calc(100vh - 64px)"
      p={4}
      direction="column"
      gap={2}
    >
      <Grid container justifyContent="space-between">
        <Typography variant="h5">Create Or Edit Stories</Typography>
        <Button component={Link} variant="contained" href="/admin/story">
          <Add /> Create
        </Button>
      </Grid>
      <TextField
        placeholder="ex: the-final-stand"
        label="Find Story by Slug"
        variant="outlined"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />
      {storyLoading ? <CircularProgress /> : null}
      {slug && !storyLoading && !story ? (
        <Typography variant="overline">No stories found</Typography>
      ) : null}
      {story && !storyLoading ? (
        <StoryCard
          accessLevel={AccessLevel.ADMIN}
          story={story}
          sx={{ maxWidth: 325 }}
        />
      ) : null}
    </Grid>
  );
};

export default withAuth(AdminIndexPage);
