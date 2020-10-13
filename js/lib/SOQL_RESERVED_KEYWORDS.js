define('/js/lib/SOQL_RESERVED_KEYWORDS.js', function() {
  // List grabbed from https://www.drupal.org/docs/develop/coding-standards/list-of-sql-reserved-words
  return [
    "SELECT",
    "DISTINCT",
    "EXCEPT",
    "AS",
    "WHERE",
    "GROUP",
    "HAVING",
    "ORDER",
    "LIMIT",
    "OFFSET",
    "SEARCH",
    "ASC",
    "DESC",

    // Presently unused keywords
    "FROM",
    "FULL",
    "IN",
    "INNER",
    "JOIN",
    "LEFT",
    "RIGHT",
    "ON",
    "OUTER",
    "INNER",

    // Boolean operators
    "AND",
    "OR",
    "NOT",

    // Weird boolean-valued functions with special syntax
    "IS",
    "BETWEEN",
    "LIKE"
  ]
});
