---
layout: with-sidebar
sidebar: documentation
title: title_case
---

##### Function: `title_case`
```
  Make string title case with the exception of small words as defined by NYT Style Guide:
  "a","an","and","as","at","but","by","en","for","if","in","of","on","or","the","to","viz","vs","vs."

Examples:

  title_case('department of transportation')
  -- Result: "Department of Transportation"

  title_case('a very interesting story')
  -- Result: "A Very Interesting Story"

  title_case('First name, last name')
  -- Result: "First Name, Last Name"




```

###### Signatures
    text -> text

