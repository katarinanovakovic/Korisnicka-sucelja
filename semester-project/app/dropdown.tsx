'use client'
import React, {useState} from "react";
import Link from "next/link";
import RecipesList from "./recipesList/page";

const recipes = {
    Breakfast: "/recipes/breakfast",
    Lunch: "/recipes/lunch",
    Dinner: "/recipes/dinner",
    Dessert: "/recipes/dessert",
    Snack: "/recipes/snack",
    All: "/recipes",
  };

const r = {
    Breakfast: "breakfast",
    Lunch: "lunch",
    Dinner: "dinner",
    Dessert: "dessert",
    Snack: "snack",
};

interface DropdownProps {
    name: string;
}

const Dropdown:React.FC<DropdownProps> = ({name}) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleClick = () => {
        setIsDropdownVisible(!isDropdownVisible);
    }

    const handleoption = (path:string) => {
        setIsDropdownVisible(!isDropdownVisible);
        return (
            <RecipesList name = {path}/>
        );
    }

    return (
        <div>
            <button onClick={handleClick}>{name}</button>
                {isDropdownVisible && 
                    (<ul>
                        {Object.entries(recipes).map(([name,path]) => 
                        (<li onClick={handleClick}><Link href={path}>{name}</Link></li>))}
                    </ul>)}
        </div>
    );
};

export default Dropdown;