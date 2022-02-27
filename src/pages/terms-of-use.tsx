import { Grid } from '@mui/material';
import { NextPage } from 'next';
import Head from '../components/core/Head';
import Markdown from '../components/core/Markdown';

const md = `# TERMS OF USE

**Last modification date: February 20, 2022**

Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern Lord Shani Dev's relationship with you in relation to this website. If you disagree with any part of these terms and conditions, please do not use our website.
The term 'Lord Shani Dev' or 'us' or 'we' refers to the owner of the website whose registered office is 38/18, East Patel Nagar, New Delhi Opp. Gopala Tower, Rajendra Place, New Delhi Delhi India 110008. The term 'you' refers to the user or viewer of our website.
The use of this website is subject to the following terms of use:

1. The content of the pages of this website is for your general information and use only. It is subject to change without notice.
2. This website uses cookies to monitor browsing preferences. If you do allow cookies to be used, the following personal information may be stored by us for use by third parties.
3. Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
4. Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.
5. This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
6. All trade marks reproduced in this website which are not the property of, or licensed to, the operator are acknowledged on the website.

Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.
`;
export const TermsOfUse: NextPage = () => {
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

export default TermsOfUse;
