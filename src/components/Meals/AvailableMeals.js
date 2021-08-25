import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

import classes from "./AvailableMeals.module.css";


const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState();

  useEffect(() => {
    const fetchMeals = async () => { 

      const response = await fetch('https://react-food-app-30021-default-rtdb.europe-west1.firebasedatabase.app/meals.json');

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        })
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    }

  
      fetchMeals().catch(error => {
        setIsLoading(false);
        setErrorState(error.message);
      });


  }, [])

  if (isLoading) {
    return <section className={classes.MealsLoading}>
      <p>Loading.....</p>
    </section>
  }

  if (errorState) {
    return <section className={classes.MealsLoading}>
      <p>{errorState}</p>
    </section>
  }

  const mealList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
