import { createClient, Entry } from 'contentful-management';
import addLinkToCommentsField from '../addCommentToRecipe/page';
import { useAuth } from "@/app/AuthContext";
import { useState } from 'react';
import Button from '../button/page';

interface CommentFields {
  author: string;
  text: string;
}

interface CustomComment extends Entry, CommentFields {}

const addComment = async (newEntryData: CommentFields, recipeId: string) => {
  try {
    const client = createClient({
      accessToken: 'CFPAT-QXFBaRSWAPqGcusNzxri1ip36Am8ZUt8N7DPt188YFQ',
    });
    
    const spaceId = 'c2epmrmqiqap';
    const environmentId = 'master';
    const contentTypeId = 'comment';

    const createdComment = (await (await (await client
      .getSpace(spaceId))
      .getEnvironment(environmentId))
      .createEntry(contentTypeId, {
        fields: {
          author: { 'en-US': newEntryData.author },
          text: { 'en-US': newEntryData.text },
        },
      })) as unknown as CustomComment;

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

const CommentForm: React.FC<CommentFormProps> = ({ recipeId }) => {
  const { isLoggedIn, username } = useAuth();
  const [text, setText] = useState<string>('');

  const handleSubmit = async () => {
    if (!username) {
      console.error('No username found for the current user.');
      return;
    }

    try {
      await addComment({ author: username, text }, recipeId);
      setText('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className="form">
      {isLoggedIn && (
        <form>
          <label>
            Add Comment:
            <br></br>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={1}
              required
              className="bg-custom-main-color text-white rounded-lg p-2"
            />
          </label>
          <br />
          <div className='flex justify-center mt-2'>
          <Button  path={""} name='Submit' setClickedButton={handleSubmit}>Submit
          </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommentForm;