class Set {
    constructor(carga, reps, rir) {
        this.carga = carga;
        this.reps = reps;
        this.rir = rir;
    }

    toJSON() {
        return {
            carga: this.carga,
            reps: this.reps,
            rir: this.rir
        };
    }
}

export default Set;