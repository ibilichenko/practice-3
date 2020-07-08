
export default class EnhancedSet extends Set {
  union(s) {
    return new EnhancedSet([...this, ...s]);
  }

  intersection(s) {
    return new EnhancedSet([...this].filter(value => s.has(value)))
  }

  difference(s) {
    return new EnhancedSet([...this].filter(value => !s.has(value)))
  }

  symmetricDifference(s) {
    if ([...s].length === 0) {
      return this;
    }
    if ([...this].length === 0) {
      return s;
    }
    this.forEach(element => {
      if (s.has(element)) {
        this.delete(element)
        s.delete(element)
      }
    })

    return new EnhancedSet([...this, ...s])
  }

  isSuperset(s) {
    return [...s].every(value => this.has(value))
  }

  isSubset(s) {
    return [...this].every(value => s.has(value))
  }
}
