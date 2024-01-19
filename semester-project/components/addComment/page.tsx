import { createClient, Entry } from 'contentful-management';
import { useState } from 'react';
import addLinkToCommentsField from '../addCommentToRecipe/page';

interface CommentFields {
  author: string;
  text: string;
}

// Extend Entry interface to include publish method
interface CustomComment extends Entry, CommentFields {}

const addComment = async (newEntryData: CommentFields, recipeId:string) => {
  try {
    const client = createClient({
      accessToken: 'CFPAT-4W6YBvnHoi1ct3BxnnCqiFbWUX1KoRysY5B2rNoOoNE',
    });
    
    const spaceId = 'c2epmrmqiqap';
    const environmentId = 'master';
    const contentTypeId = 'comment';

    // Create a new entry with provided data
    const createdComment = (await (await (await client
      .getSpace(spaceId))
      .getEnvironment(environmentId))
      .createEntry(contentTypeId, {
        fields: {
          author: { 'en-US': newEntryData.author },
          text: { 'en-US': newEntryData.text },
        },
      })) as unknown as CustomComment;

    // Publish the created entry
    await createdComment.publish();

    console.log('New entry created and published:', createdComment);
    addLinkToCommentsField(recipeId, createdComment.sys.id);
  } catch (error) {
    console.error('Error creating or publishing new entry:', error);
    throw error;
  }
};
type CommentFormProps = {
    recipeId: string;
  };
  
  // Use the updated type for CommentForm
const CommentForm: React.FC<CommentFormProps> = ({ recipeId }) => {
  const [author, setAuthor] = useState<string>('');
  const [text, setText] = useState<string>('');

  const handleSubmit = async () => {
    try {
      await addComment({ author, text }, recipeId);
      // Reset form fields after successful submission
      setAuthor('');
      setText('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <form>
      <label>
        Author:
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      </label>

      <br />

      <label>
        Comment:
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} required />
      </label>

      <br />

      <button type="button" onClick={handleSubmit}>
        Submit Comment
      </button>
    </form>
  );
};

export default CommentForm;