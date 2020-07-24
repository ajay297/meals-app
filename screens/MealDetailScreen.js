import React, { useCallback, useEffect } from 'react'
import { ScrollView, Image, StyleSheet, Text, View, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import HeaderButton from '../components/HeaderButton'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import DefaultText from '../components/DefaultText';
import { toggleFavorite } from '../store/actions/meals'
const ListItem = props => {
    return (
        <View style={styles.lisItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    )
}
const MealDetailScreen = (props) => {
    const availableMeals = useSelector(state => state.meals.meals);
    const mealId = props.navigation.getParam('mealId');
    const currentMealIsFavorite = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId));

    const selectedMeal = availableMeals.find(meal => meal.id === mealId);
    const dispatch = useDispatch();
    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId])
    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
    }, [toggleFavoriteHandler])
    useEffect(() => {
        props.navigation.setParams({ isFav: currentMealIsFavorite })
    }, [currentMealIsFavorite])
    return (
        <ScrollView>
            <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {
                selectedMeal.ingredients.map(ingredient => <ListItem key={ingredient}>{ingredient}</ListItem>)
            }
            <Text style={styles.title}>Steps</Text>
            {
                selectedMeal.steps.map(step => <ListItem key={step}>{step}</ListItem>)
            }
        </ScrollView>
    )
}
MealDetailScreen.navigationOptions = (navigationData) => {
    // const mealId = navigationData.navigation.getParam('mealId');
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const targetFavorite = navigationData.navigation.getParam('toggleFav');
    const isFavorite = navigationData.navigation.getParam('isFav');
    // console.log('isFavorite', isFavorite);
    // const selectedMeal = MEALS.find(meal => meal.id === mealId);
    return {
        title: mealTitle,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='Favourite'
                iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
                onPress={targetFavorite} />
        </HeaderButtons>
    }
}
export default MealDetailScreen

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        textAlign: 'center'
    },
    lisItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    }
})
