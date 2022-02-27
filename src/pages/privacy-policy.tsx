import { Grid } from '@mui/material';
import { NextPage } from 'next';
import Head from '../components/core/Head';
import Markdown from '../components/core/Markdown';

const md = `# Privacy Policy

**Last modification date: February 20, 2022**

Lord Shanidev (Sole Proprietorship) (hereinafter referred to as Backstory) operates the website at [https://backstory.today](https://backstory.today) (“Site”). We respect the privacy of each user (referred to as “you” or “a user”), of our services (Site, App, Newsletter) whether it's your first time, or if you’ve visited our Site previously. This Privacy Statement gives you specific information about how we protect your privacy, how we treat information we collect on the Site that identifies an individual user (“Personal Information”), and how we use aggregated information.

By registering for or using the site, you signify your acceptance of this privacy statement. If you do not agree to this privacy statement, you cannot use the site. We reserve the right to modify this Statement at any time by posting a notice on the Site’s home page. (If we consider it appropriate, we may also provide additional notice of significant changes.) Your use of the Site after the date of the last modification listed at the beginning of this Privacy Statement indicates to us that you agree to the changes.

## Information Collection and Use

For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to First Name, Last Name, Email. The information that we request will be retained by us and used as described in this privacy policy.

When you use the Website, Apps, Newsletters and interact with our Services, we may use technology such as that provided by Google Analytics, Mailchimp etc to collect information about your visit to our Website and/or Newsletters. In essence, these tools enable us to analyse how you and others interact with our Website, Apps and Newsletters. The information we collect may include:

* the type of browser you use to access our website/newsletter;
* the number of sessions per day;
* the type of device (e.g. iPhone) and operating system (e.g. iOS) you are using;
* if you opened our newsletters;
* user preferences; and
* which pages you visited.

## THIS IS WHAT WE DO WITH THE INFORMATION WE COLLECT ABOUT YOU

We use the information you provide to us to:

* enable us to provide the Services;
* ensure that content from our Website, Apps and Newsletters are presented in the most effective manner for you and for your device to achieve the most user-friendly navigation experience;
* notify you about changes to the Website, Apps and Newsletters and the Services;
* carry out our obligations arising out of the Terms of Use; and/or
* defend our servers against malicious attacks.

### Cookies

Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.

This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.

### Service Providers

We may employ third-party companies and individuals due to the following reasons:

* To facilitate our Service;
* To provide the Service on our behalf;
* To perform Service-related services; or
* To assist us in analyzing how our Service is used.

We want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.

Links to privacy policy of third party service providers used by the app and why we use them


1. [Google Analytics](https://marketingplatform.google.com/about/analytics/terms/us/) - To monitor our website performance and user experience
2. [Mailchimp](https://mailchimp.com/legal/privacy/) - To send our newsletters to you
3. __[OneSignal](https://onesignal.com/privacy_policy)__ - To send app notifications

### Security

We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.

### Links to Other Sites

This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.

### Changes to This Privacy Policy

We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.

## Contact Us

If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at support@backstory.today.
`;
export const PrivacyPolicy: NextPage = () => {
  return (
    <>
      <Head title="Privacy Policy | BackStory" />
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

export default PrivacyPolicy;
