import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/app/AuthContext';
import { createClient } from 'contentful-management';

const SPACE_ID = 'c2epmrmqiqap';
const ACCESS_TOKEN = 'CFPAT-4W6YBvnHoi1ct3BxnnCqiFbWUX1KoRysY5B2rNoOoNE';

const client = createClient({
  accessToken: ACCESS_TOKEN,
}) as any;

const SaveRecipe = ({ recipeEntryId }: { recipeEntryId: string }) => {
    const { isLoggedIn, username } = useAuth();
    const [isSaved, setIsSaved] = useState<boolean>(false); // Set initial value to false
  
    const handleSaveToggle = async () => {
      try {
        // Check if the recipe is already saved
        if (isSaved) {
          console.log('Recipe is already saved.');
          return;
        }
  
        const space = await client.getSpace(SPACE_ID);
        const environment = await space.getEnvironment('master');
  
        let entry: any = await environment.getEntry(username);
        const recipeEntry: any = await environment.getEntry(recipeEntryId);
  
        if (!entry.fields.savedRecipes) {
          entry.fields.savedRecipes = {
            'en-US': [],
          };
        }
  
        const currentSavedRecipes = entry.fields.savedRecipes['en-US'];
  
        // Check if the recipe is already in the saved recipes
        if (currentSavedRecipes.some((savedRecipe: { sys: { id: any; }; }) => savedRecipe.sys.id === recipeEntry.sys.id)) {
          console.log('Recipe is already saved.');
          return;
        }
  
        currentSavedRecipes.push({
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: recipeEntry.sys.id,
          },
        });
  
        entry.fields.savedRecipes['en-US'] = currentSavedRecipes;
  
        const latestVersion = entry.sys.version;
  
        entry = await entry.update();
  
        await entry.publish({ headers: { 'X-Contentful-Version': latestVersion } });
  
        console.log(`Entry ${entry.sys.id} updated with a link to ${recipeEntry.sys.id}.`);
  
        setIsSaved(true); // Update the state to indicate that the recipe is now saved
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <div className="saved-bookmark">
        {isLoggedIn && (
          <FontAwesomeIcon
            icon={faBookmark}
            className={`ml-1 mt-3 ${isSaved ? 'filled-icon text-green-700' : 'empty-icon text-700'}`}
            onClick={handleSaveToggle}
          />
        )}
      </div>
    );
  };
  
  export default SaveRecipe;