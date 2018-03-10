---
layout: with-sidebar
sidebar: documentation
title: make_point
---

##### Function: `make_point`
function to make a point out of a Y (latitude) and X (longitude) coordinate.

  Examples:

    make_point(47.123124, -123.325232)

    make_point(to_number(`latitude`), to_number(`longitude`))

###### Signatures
    number, number -> point

