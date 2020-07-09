
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
    const copy1 = new EnhancedSet([...this]);
    const copy2 = new EnhancedSet([...s]);
    copy1.forEach(element => {
      if (copy2.has(element)) {
        copy1.delete(element)
        copy2.delete(element)
      }
    })
  
    return new EnhancedSet([...copy1, ...copy2])
    // or
    // return this.difference(s).union(s.difference(this));
  }

  isSuperset(s) {
    return [...s].every(value => this.has(value))
  }

  isSubset(s) {
    return [...this].every(value => s.has(value));
  }
}
