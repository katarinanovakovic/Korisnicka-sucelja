import { createClient } from 'contentful-management';

const SPACE_ID = 'c2epmrmqiqap';
const ACCESS_TOKEN = 'CFPAT-4W6YBvnHoi1ct3BxnnCqiFbWUX1KoRysY5B2rNoOoNE';

const client = createClient({
  accessToken: ACCESS_TOKEN,
}) as any;

const addLinkToCommentsField = async (entry1Id: string, entry2Id: string) => {
  try {
    // Get the current comments field value (array of references)
    // Fetch the main entry
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment('master');

    // Fetch the entry again to get the latest version
    let entry: any = await environment.getEntry(entry1Id);

    // Fetch the comment entry
    const commentEntry: any = await environment.getEntry(entry2Id);

    // Initialize the comments field if it's undefined
    if (!entry.fields.comments) {
      entry.fields.comments = {
        'en-US': [],
      };
    }

    // Get the current comments field value (array of references)
    const currentComments = entry.fields.comments['en-US'];

    // Add a reference to the comment entry to the comments field
    currentComments.push({
      sys: {
        type: 'Link',
        linkType: 'Entry',
        id: commentEntry.sys.id,
      },
    });

    // Update the comments field with the modified array
    entry.fields.comments['en-US'] = currentComments;

    // Include the X-Contentful-Version header with the latest version of the entry
    const latestVersion = entry.sys.version;

    // Update the entry first (fetch the latest version before updating)
    entry = await entry.update();

    // Now publish the changes to the entry using the latest version
    await entry.publish({ headers: { 'X-Contentful-Version': latestVersion } });

    console.log(`Entry ${entry.sys.id} updated with a link to ${commentEntry.sys.id}.`);
    window.location.reload();
  } catch (error) {
    console.error('Error:', error);
  }
}

export default addLinkToCommentsField;
