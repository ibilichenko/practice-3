// Non-optimized;
// Needs more sophisticated implementation for big sets and better performance
export default class EnhancedSet extends Set {
    union(s) {
        return new EnhancedSet(
            [...this, ...s]
        );
    }

    intersection(s) {
        return new EnhancedSet(
            [...this].filter(value => s.has(value))
        );

    }

    difference(s) {
        return new EnhancedSet(
            [...this].filter(value => !s.has(value))
        );
    }

    symmetricDifference(s) {
        return this.difference(s).union(s.difference(this));
    }

    isSuperset(s) {
        return [...s].every(value => this.has(value));
    }

    isSubset(s) {
        return s.isSuperset(this);
    }
}
