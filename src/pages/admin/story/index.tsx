import { NextPage } from 'next';
import CreateEditStory from '../../../components/admin/CreateEditStory';
import withAuth from '../../../hoc/withAuth';

const CreateStory: NextPage = () => {
  return <CreateEditStory />;
};

export default withAuth(CreateStory);
