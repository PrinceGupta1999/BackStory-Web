import { ArrowRightAlt } from '@mui/icons-material';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Story } from '../../types/content/story';
import Link from '../core/Link';
import StoryCard from './StoryCard';

export interface StoryCardsSectionProps {
  stories: Story[];
  title: string;
  findMoreHref?: string;
}

const StoryCardsSection: React.FC<StoryCardsSectionProps> = ({
  stories,
  title,
  findMoreHref,
}) => {
  return (
    <Grid container gap={2} my={1}>
      <Grid item xs={12} px={2}>
        {findMoreHref ? (
          <Grid container alignItems="center">
            <Link
              href={findMoreHref}
              color="inherit"
              underline="hover"
              variant="h5"
            >
              {title}
            </Link>
            <ArrowRightAlt />
          </Grid>
        ) : (
          <Typography variant="h5">{title}</Typography>
        )}
      </Grid>
      <Grid container px={1}>
        {stories.map((story) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={story.id}
            p={1}
            sx={{ display: 'flex' }}
          >
            <StoryCard story={story} sx={{ minWidth: 256 }} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default StoryCardsSection;
