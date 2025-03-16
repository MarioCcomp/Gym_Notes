class WorkoutClass {
    constructor(id, title, exercises = []) {
        this.id = id;
        this.title = title;
        this.exercises = exercises;
    }

    addExercise(exercise) {
        this.exercises.push(exercise);
    }

    removeExercise(exercise) {
        this.exercises = this.exercises.filter(e => e !== exercise);
    }

    

    updateExercise(exerciseIndex, exercise) {
        this.exercises[exerciseIndex] = exercise;
    }
}

export default WorkoutClass;