import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { firebaseApp } from './FirebaseConfig';
import FirebaseAuthService from './FirebaseAuthService';
import './App.css';
import { User } from 'firebase/auth';
import LoginForm from './LoginForm';
import AddEditRecipeForm from './AddEditRecipeForm';
import FirebaseFirestoreService from './FirebaseFirestoreService';
import { Recipe } from './application.types';

function App() {
    const [user, setUser] = React.useState<User | null>(null);

    FirebaseAuthService.subscribeToAuthChanges(setUser);

    async function handleAddRecipe(recipe: Recipe) {
        try {
            const response = await FirebaseFirestoreService.createDocument('recipes', recipe);
            console.log('Successfully created recipe: ', response);
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <div className='App'>
            <div className='title-row'>
                <h1 className='title'>Hello World!</h1>
                <LoginForm existingUser={user} />
            </div>
            <div className='main'>
                <AddEditRecipeForm onAddRecipe={handleAddRecipe} />
            </div>
        </div>
    );
}

export default App;
