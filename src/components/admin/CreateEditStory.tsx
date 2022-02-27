import { Save } from '@mui/icons-material';
import { DatePicker, LoadingButton } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Alert,
  AlertColor,
  Autocomplete,
  Chip,
  Grid,
  MenuItem,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import Editor from 'rich-markdown-editor';
import { getMinDate } from '../../core/utils';
import { validateStory } from '../../core/validation/validateStory';
import { storyDtoConverter } from '../../infrastructure/content/storyConverter';
import { saveStory } from '../../infrastructure/content/storyRepository';
import { Story } from '../../types/content/story';
import { StoryError } from '../../types/content/storyError';
import { Language } from '../../types/enum/language';
import { PublishStatus } from '../../types/enum/publishStatus';

interface CreateEditStoryProps {
  story?: Story;
}

const featuredOptions = [
  {
    label: 'Yes',
    value: 'true',
  },
  {
    label: 'No',
    value: 'false',
  },
];

export const CreateEditStory: React.FC<CreateEditStoryProps> = ({ story }) => {
  const router = useRouter();
  const [title, setTitle] = useState(story?.title ?? '');
  const [slug, setSlug] = useState(story?.slug ?? '');
  const [bannerImageUrl, setBannerImageUrl] = useState(
    story?.bannerImageUrl ?? ''
  );
  const [abstract, setAbstract] = useState(story?.abstract ?? '');
  const [outline, setOutline] = useState(story?.outline ?? '');
  const [eventDate, setEventDate] = useState(story?.eventDate ?? new Date());
  const [publishDate, setPublishDate] = useState(
    story?.publishDate ?? new Date()
  );
  const [minutesToRead, setMinutesToRead] = useState(story?.minutesToRead ?? 5);
  const [publishStatus, setPublishStatus] = useState(
    story?.publishStatus ?? PublishStatus.DRAFT
  );
  const [featured, setFeatured] = useState(story?.featured ? 'true' : 'false');
  const [tags, setTags] = useState(story?.tags ?? []);
  const [readMoreStorySlugs, setReadMoreStorySlugs] = useState(
    story?.readMoreStorySlugs ?? []
  );

  const [editStory, setEditStory] = useState(false);
  const [mdStory, setMdStory] = useState(story?.story ?? '');
  const useDarkModeForEditor = useTheme().palette.mode === 'dark';
  const [storyError, setStoryError] = useState<StoryError>({});

  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: '',
    severity: 'error',
  });

  console.log(mdStory);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setStoryError({});
    e.preventDefault();

    const newStory: Story = {
      id: story?.id,
      title,
      slug,
      bannerImageUrl,
      abstract,
      outline,
      minutesToRead,
      eventDate: eventDate,
      publishStatus,
      publishDate: publishDate,
      featured: featured === 'true',
      tags,
      story: mdStory,
      readMoreStorySlugs,
      language: Language.ENGLISH_US,
    };

    const storyError = validateStory(newStory);
    if (Object.keys(storyError).length > 0) {
      setStoryError(storyError);
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Validation Error. Check the input fields',
      });
      return;
    }
    const storyDto = storyDtoConverter.toDto(newStory);
    setSaving(true);
    try {
      await saveStory(storyDto);
      setSaving(false);
      setSnackbar({
        open: true,
        severity: 'success',
        message: 'Story saved successfully',
      });
      story?.id === undefined
        ? router.push(`/admin/story/${slug}`)
        : router.replace(`/admin/story/${slug}`);
    } catch (e) {
      console.log(e);
      setSaving(false);
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Error occurred while saving to firebase. Check console logs.',
      });
    }
  };

  const handleSnackbarClose = (
    _?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Grid container minHeight="calc(100vh - 64px)" p={2}>
        <Grid
          item
          xs={12}
          md={6}
          lg={8}
          xl={9}
          sx={{ border: '1px solid', borderRadius: 1 }}
          paddingLeft={4}
        >
          <Grid container alignItems="center">
            <Typography variant="overline" flexGrow={1}>
              The Story
            </Typography>
            <Typography variant="overline">Edit</Typography>
            <Switch
              checked={editStory}
              disabled={saving}
              color="secondary"
              onChange={(e) => setEditStory(e.target.checked)}
            />
          </Grid>

          <Editor
            defaultValue={story?.story ?? ''}
            onChange={setMdStory}
            dark={useDarkModeForEditor}
            readOnly={!editStory || saving}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3} p={2}>
          <Grid
            container
            direction="column"
            gap={2}
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              label="Title"
              placeholder="Something that catches the eye"
              value={title}
              fullWidth
              onChange={(e) => setTitle(e.target.value)}
              error={storyError?.title !== undefined}
              helperText={storyError?.title}
              disabled={saving}
              required
            />
            <TextField
              label="Slug"
              placeholder="ex: the-final-stand"
              value={slug}
              error={storyError?.slug !== undefined}
              disabled={saving}
              helperText={
                storyError?.slug ??
                `Web URL will be /today-in-history/${slug ? slug : 'your-slug'}`
              }
              fullWidth
              onChange={(e) => setSlug(e.target.value)}
              required
            />
            <TextField
              label="Banner Image URL"
              placeholder="https://somecloudprovider/image-identifier"
              value={bannerImageUrl}
              error={storyError?.bannerImageUrl !== undefined}
              disabled={saving}
              helperText={
                storyError?.bannerImageUrl ??
                'This will be displayed on the card and top of the story'
              }
              fullWidth
              onChange={(e) => setBannerImageUrl(e.target.value)}
              required
            />
            <TextField
              label="Abstract"
              placeholder="Brief summary of the story"
              value={abstract}
              error={storyError?.abstract !== undefined}
              disabled={saving}
              helperText={storyError?.abstract}
              fullWidth
              onChange={(e) => setAbstract(e.target.value)}
              required
            />
            <TextField
              label="Outline"
              placeholder="A one liner to attract the user"
              value={outline}
              fullWidth
              error={storyError?.outline !== undefined}
              disabled={saving}
              helperText={
                storyError?.outline ?? 'This will be shown in the notification'
              }
              onChange={(e) => setOutline(e.target.value)}
              required
            />
            <TextField
              label="Minutes To Read"
              placeholder="ex: 5"
              value={minutesToRead}
              error={storyError?.minutesToRead !== undefined}
              disabled={saving}
              helperText={storyError?.minutesToRead}
              fullWidth
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              onChange={(e) =>
                setMinutesToRead(
                  isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)
                )
              }
              required
            />
            <DatePicker
              label="Date of Event Occurrence"
              minDate={getMinDate()}
              onError={(e, reason) => {
                if (e) {
                  setStoryError({
                    ...storyError,
                    eventDate: reason?.toString(),
                  });
                } else {
                  setStoryError({
                    ...storyError,
                    eventDate: undefined,
                  });
                }
              }}
              value={eventDate}
              onChange={(newValue) => {
                setEventDate(newValue ?? new Date());
              }}
              inputFormat="dd/MM/yyyy"
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  disabled={saving}
                  helperText={storyError?.eventDate ?? params.helperText}
                  error={params.error || storyError?.eventDate !== undefined}
                />
              )}
            />
            <DatePicker
              label="Date of Publishing"
              value={publishDate}
              onChange={(newValue) => {
                setPublishDate(newValue ?? new Date());
              }}
              onError={(e, reason) => {
                if (e) {
                  setStoryError({
                    ...storyError,
                    publishDate: reason?.toString(),
                  });
                } else {
                  setStoryError({
                    ...storyError,
                    publishDate: undefined,
                  });
                }
              }}
              inputFormat="dd/MM/yyyy"
              renderInput={(params) => (
                <TextField
                  {...params}
                  required={publishStatus === PublishStatus.PUBLISHED}
                  disabled={saving}
                  helperText={storyError?.publishDate ?? params.helperText}
                  error={params.error || storyError?.publishDate !== undefined}
                />
              )}
            />
            <TextField
              label="Featured"
              value={featured}
              fullWidth
              select
              error={storyError?.featured !== undefined}
              disabled={saving}
              helperText={
                storyError?.featured ??
                'If featured will be shown under /today-in-history/featured'
              }
              onChange={(e) => setFeatured(e.target.value)}
              required
            >
              {featuredOptions.map(({ label, value }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Publish Status"
              value={publishStatus.toLongString()}
              fullWidth
              select
              error={storyError?.publishStatus !== undefined}
              disabled={saving}
              helperText={
                storyError?.publishStatus ??
                'If DRAFT, will only be shown to ADMIN users'
              }
              required
              onChange={(e) =>
                setPublishStatus(
                  PublishStatus.fromLongString(e.target.value) ??
                    PublishStatus.DRAFT
                )
              }
            >
              {PublishStatus.values().map((publishStatus) => (
                <MenuItem
                  key={publishStatus.publishStatus}
                  value={publishStatus.toLongString()}
                >
                  {publishStatus.publishStatus.toUpperCase()}
                </MenuItem>
              ))}
            </TextField>
            <Stack spacing={3} flexGrow={1}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                defaultValue={story?.tags ?? []}
                onChange={(_, value: string[]) => setTags(value)}
                renderTags={(value: string[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tags"
                    placeholder="Identifiers for the story"
                    error={storyError?.tags !== undefined}
                    disabled={saving}
                    helperText={
                      storyError?.tags ??
                      'Story will be found on /today-in-history/tag/[tag]'
                    }
                  />
                )}
              />
            </Stack>

            <Stack spacing={3} flexGrow={1}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                defaultValue={story?.readMoreStorySlugs ?? []}
                onChange={(_, value: string[]) => setReadMoreStorySlugs(value)}
                renderTags={(value: string[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Read More Stories"
                    placeholder="Slug for the story ex: the-final-stand"
                    error={storyError?.readMoreStorySlugs !== undefined}
                    disabled={saving}
                    helperText={
                      storyError?.readMoreStorySlugs ??
                      'Stories will be visible in read more section of the story'
                    }
                  />
                )}
              />
              <LoadingButton
                loading={saving}
                loadingPosition="center"
                endIcon={<Save />}
                type="submit"
                variant="contained"
              >
                Save
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default CreateEditStory;
