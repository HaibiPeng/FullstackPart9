interface calcbmiValues {
  height: number;
  weight: number;
}

const parsebmiArguments = (args: Array<string>): calcbmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, weight: number) => {
    const healthyweight = weight/(Math.pow((height/100),2))
    if (healthyweight < 18.5) {
        return `Underweight (${healthyweight})`
    } else if (healthyweight >= 18.5 && healthyweight < 25) {
        return `Normal (${healthyweight})`
    } else if (healthyweight >= 25 && healthyweight < 30) {
        return `Overweight (${healthyweight})`
    } else if (healthyweight >= 30) {
        return `Obese (${healthyweight})`
    }
}

try {
  const { height, weight } = parsebmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}

