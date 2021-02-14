export const calculateBmi = (height: number, weight: number) => {
    const healthyweight = weight/(Math.pow((height/100),2))
    if (healthyweight < 18.5) {
        return { weight: weight, height: height, bmi: `Underweight (${healthyweight})`}
    } else if (healthyweight >= 18.5 && healthyweight < 25) {
        return { weight: weight, height: height, bmi: `Normal (${healthyweight})`}
    } else if (healthyweight >= 25 && healthyweight < 30) {
        return { weight: weight, height: height, bmi: `Overweight (${healthyweight})`}
    } else if (healthyweight >= 30) {
        return { weight: weight, height: height, bmi: `Obese (${healthyweight})`}
    }
}