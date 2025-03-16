class Exercise {
    constructor(name, sets, reps, workoutData, gifUrl) {
        this.name = name;
        this.sets = sets;
        this.reps = reps;
        this.workoutData = workoutData || [];
        this.gifUrl = gifUrl || null;
    }

    addWorkoutData(date, sets = []) {
        this.workoutData.push({ date, sets });
    }

    toJSON() {
        return {
            name: this.name,
            sets: this.sets,
            reps: this.reps,
            workoutData: this.workoutData.map(w => ({
                date: w.date,
                sets: w.sets.map(s => ({
                    carga: s.carga,
                    reps: s.reps,
                    rir: s.rir
                }))
            })),
            gifUrl: this.gifUrl // Adicionando o gifUrl na conversão para JSON
        };
    }

    lastWorkoutData() {
        return this.workoutData[this.workoutData.length - 1];
    }
}


export default Exercise;