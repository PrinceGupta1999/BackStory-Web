import { Grid } from '@mui/material';
import { NextPage } from 'next';
import Head from '../components/core/Head';
import Markdown from '../components/core/Markdown';

const md = `# Grievance Redressal

**Last modification date: February 20, 2022**

1. “Complaint” or “Grievance” herein refers to expressed dissatisfaction about the content published by Lord Shanidev (Sole Proprietorship) (hereafter referred to as ‘Backstory’) in relation to the Code of Ethics, and in accordance with Rule 10 of The Information Technology (Intermediary Guidelines and Digital Media Ethics code) Rules, 2021
2. Complaints have to be made in a written form or communicated over an electronic medium
3. Any complaint registered by a complainant must also be supported by additional information and documentation that includes but not limited to

* Name of the complainant
* Contact details (address, telephone number, or e-mail id)
* Link to the article that according to you violates the Code of Ethics
* Details of the content that according to you violates the Code of Ethics. Please specify the exact paragraphs or words in case of textual content, or include timestamps if it’s videos and podcasts.
* The provisions within the code of ethics that you feel were violated. 

4. The complaints will have to be addressed to the designated Grievance Officer as mentioned below

**Mr. Prince Gupta, Head of Content**,

support@backstory.today

38/18 Back Side Entry,

East Patel Nagar, New Delhi - 110008
`;
export const GrievanceRedressal: NextPage = () => {
  return (
    <>
      <Head title="Terms Of Use | BackStory" />
      <Grid
        container
        justifyContent="center"
        p={2}
        minHeight="calc(100vh - 64px)"
      >
        <Grid
          container
          maxWidth="lg"
          direction="column"
          gap={4}
          justifyContent="flex-start"
        >
          <Markdown children={md} />
        </Grid>
      </Grid>
    </>
  );
};

export default GrievanceRedressal;
