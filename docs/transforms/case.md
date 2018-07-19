---
layout: with-sidebar
sidebar: documentation
title: case
---

##### Function: `case`
```
  Evaluate a series of true/false expressions (predicates) and return the next consequent.

  The case takes on the following form.

  case(
    predicateA, consequentA,
    predicateB, consequentB
    ...
    predicateN, consequentN
  )

  If predicateA evaluates to true, the result of the case is consequentA.
  If predicateA evaluates to false, and predicateB evaluates to true, the result of the case is consequentB.
  If no predicates evaluate to true, a null is returned

  case can have any number of (predicate, consequent) pairs

  Examples

    case(1 == 2, 'This will never be returned', true, 'This will always be returned') -- 'This will always be returned'

    case(
      `incident_type` == 0 OR
      `incident_type` == 1 OR
      `incident_type` == 2,
      'incident_type was 0, 1 or 2',

      `incident_type` == 3,
      'incident_type was 3',

      true,
      error('incident_type was not 0, 1, 2 or 3, instead it was: ' || `incident_type`)
    )

```

###### Signatures
    checkbox, a -> a

