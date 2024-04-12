import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/app/AuthContext';
import { createClient } from 'contentful-management';

const SPACE_ID = 'c2epmrmqiqap';
const ACCESS_TOKEN = 'CFPAT-0naRV8Kjvzy42tEx5kFc9QZSo0CjqlBB4yo3OqyYlwE';

const client = createClient({
  accessToken: ACCESS_TOKEN,
}) as any;

const SaveRecipe = ({ recipeEntryId }: { recipeEntryId: string }) => {
  const { isLoggedIn, username } = useAuth();
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const space = await client.getSpace(SPACE_ID);
        const environment = await space.getEnvironment('master');
        const entry: any = await environment.getEntry(username);
        const currentSavedRecipes = entry.fields.savedRecipes ? entry.fields.savedRecipes['en-US'] : [];
        const isRecipeSaved = currentSavedRecipes.some((savedRecipe: { sys: { id: any; }; }) => savedRecipe.sys.id === recipeEntryId);
        setIsSaved(isRecipeSaved);
      } catch (error: any) {
        console.error('Error:', error);
      }
    };

    if (isLoggedIn) {
      checkIfSaved();
    }
  }, [isLoggedIn, recipeEntryId, username]);

  const handleSaveToggle = async () => {
    try {
      const space = await client.getSpace(SPACE_ID);
      const environment = await space.getEnvironment('master');

      let entry: any = await environment.getEntry(username);
      const recipeEntry: any = await environment.getEntry(recipeEntryId);

      if (!entry.fields.savedRecipes) {
        entry.fields.savedRecipes = { 'en-US': [] };
      }

      const currentSavedRecipes = entry.fields.savedRecipes['en-US'];

      if (isSaved) {
        // Unsave the recipe
        const updatedRecipes = currentSavedRecipes.filter((savedRecipe: { sys: { id: any; }; }) => savedRecipe.sys.id !== recipeEntry.sys.id);
        entry.fields.savedRecipes['en-US'] = updatedRecipes;
        await updateEntryAndPublish(entry);
        console.log(`Recipe ${recipeEntryId} unsaved.`);
        setIsSaved(false);
      } else {
        // Save the recipe
        currentSavedRecipes.push({
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: recipeEntry.sys.id,
          },
        });
        entry.fields.savedRecipes['en-US'] = currentSavedRecipes;
        await updateEntryAndPublish(entry);
        console.log(`Recipe ${recipeEntryId} saved.`);
        setIsSaved(true);
      }
    } catch (error: any) {
      console.error('Error:', error);
    }
  };

  const updateEntryAndPublish = async (entry: any) => {
    try {
      const updatedEntry = await entry.update();
      const publishedEntry = await updatedEntry.publish();
      console.log(`Entry ${publishedEntry.sys.id} updated and published.`);
    } catch (error: any) {
      if (error.name === 'VersionMismatch') {
        // If version mismatch error, fetch the latest version and try again
        const latestEntry = await entry.reload();
        await updateEntryAndPublish(latestEntry);
      } else {
        throw error; // Rethrow other errors
      }
    }
  };

  return (
    <div>
      {isLoggedIn && (
        <FontAwesomeIcon
          icon={faBookmark}
          className={`m-2 text-2xl ${isSaved ? 'text-custom-main-color' : 'text-gray-400'}`}
          onClick={handleSaveToggle}
        />
      )}
    </div>
  );
};

export default SaveRecipe;
