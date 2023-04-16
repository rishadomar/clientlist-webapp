import React from 'react';
import { Recipe } from './application.types';

interface AddEditRecipeFormProps {
    onAddRecipe: (recipe: Recipe) => void;
}

const AddEditRecipeForm: React.FunctionComponent<AddEditRecipeFormProps> = ({ onAddRecipe }) => {
    const [name, setName] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [publishDate, setPublishDate] = React.useState(new Date().toISOString().split('T')[0]);
    const [directions, setDirections] = React.useState('');
    const [ingredients, setIngredients] = React.useState<string[]>([]);
    const [ingredientName, setIngredientName] = React.useState('');

    const addNewIngredient = () => {
        setIngredients([...ingredients, ingredientName]);
        setIngredientName('');
    };

    const handleAddIngredientViaButton = (event: React.MouseEvent<HTMLButtonElement | MouseEvent>) => {
        if (!ingredientName) {
            return;
        }
        addNewIngredient();
    };

    const handleAddIngredientViaKeypress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key && event.key !== 'Enter') {
            return;
        }
        event.preventDefault();
        if (!ingredientName) {
            return;
        }
        addNewIngredient();
    };

    return (
        <form className='add-edit-recipe-form-container'>
            <h2>Add a new Recipe</h2>
            <div className='top=form-section'>
                <div className='fields'>
                    <label className='recipe-label input-label'>
                        Recipe Name:
                        <input
                            className='input-text'
                            type='text'
                            required
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </label>

                    <label className='recipe-label input-label'>
                        Category:
                        <select
                            className='select'
                            required
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                        >
                            <option value=''>Select a category</option>
                            <option value='Breakfast'>Breakfast</option>
                            <option value='Lunch'>Lunch</option>
                            <option value='Dinner'>Dinner</option>
                            <option value='Dessert'>Dessert</option>
                        </select>
                    </label>

                    <label className='recipe-label input-label'>
                        Directions:
                        <textarea
                            className='input-text directions'
                            required
                            value={directions}
                            onChange={(event) => setDirections(event.target.value)}
                        />
                    </label>

                    <label className='recipe-label input-label'>
                        Publish Date:
                        <input
                            className='input-text'
                            type='date'
                            required
                            value={publishDate}
                            onChange={(event) => setPublishDate(event.target.value)}
                        />
                    </label>
                </div>
            </div>
            <div className='ingredients-list'>
                <h3 className='text-center'>Ingredients</h3>
                <table className='ingredients-table'>
                    <thead>
                        <tr>
                            <th className='table-header'>Ingredient</th>
                            <th className='table-header'>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {ingredients &&
                            ingredients.map((ingredient, index) => (
                                <tr key={index}>
                                    <td className='table-data text-center'>{ingredient}</td>
                                    <td className='ingredient-delete-box'>
                                        <button type='button' className='secondary-button ingredient-delete-button'>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                {ingredients && ingredients.length === 0 && <h3>No ingredients added yet</h3>}
                <div className='ingredient-form'>
                    <label className='ingredient-label'>
                        Ingredient:
                        <input
                            type='text'
                            className='input-text'
                            required
                            value={ingredientName}
                            placeholder='eg. 1 cup of sugar'
                            onChange={(event) => setIngredientName(event.target.value)}
                            onKeyDown={(e) => handleAddIngredientViaKeypress(e)}
                        />
                    </label>
                    <button
                        type='button'
                        className='primary-button add-ingredient-button'
                        onClick={(e) => handleAddIngredientViaButton(e)}
                    >
                        Add Ingredient
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddEditRecipeForm;
