/* eslint-disable @typescript-eslint/no-unsafe-member-access */
interface calcexerciseValues {
  exerciseData: Array<number>;
  target: number;
}

const parseexerciseArguments = (args: Array<string>): calcexerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      exerciseData: args.slice(3, args.length).map(e => Number(e)),
      target: Number(args[2])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateExercises = (exerciseData: Array<number>, target: number) => {
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

try {
  const { exerciseData, target } = parseexerciseArguments(process.argv);
  console.log(calculateExercises(exerciseData, target));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}