---
layout: with-sidebar
sidebar: documentation
title: error
---

##### Function: `error`
Make an error. This is useful in conjunction with a case function,
  where you want to provide a specific message when it fails.

  Examples

    error('The value was incorrect!') -- Error('The value was incorrect!')

    case(
      `incident_type` == 1 OR `incident_type` == 2,
      `incident_type`,
      true,
      error('Expected incident_type to be 1 or 2, found that it was ' || `incident_type`)
    ) -- this will ensure incident_type is 1 or 2, and if it's not, will generate an error explaining why

###### Signatures
    text -> a

