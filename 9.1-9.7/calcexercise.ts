/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const calculateExercises = (exerciseData: Array<number>, target: number) => {
    console.log(exerciseData);
    console.log(target);
    const periodLength = exerciseData.length;
    const trainingDays = exerciseData.filter(e => e !== 0).length;
    const average = exerciseData.reduce((a, b) => a + b) / periodLength;
    const success = average >= target ? true : false;
    let rating, ratingDescription;
    if (average < (target/2)) {  rating = 1; ratingDescription = 'too bad';}
    if (average >= (target/2) && average < target) { rating = 2; ratingDescription = 'not too bad but could be better';}
    if (average >= target) { rating = 3; ratingDescription = 'well done';}
    return { 
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        average: average,
        target: target
    };
};