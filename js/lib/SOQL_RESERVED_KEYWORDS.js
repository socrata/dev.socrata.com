define('/js/lib/SOQL_RESERVED_KEYWORDS.js', function() {
  // List grabbed from https://github.com/socrata-platform/soql-reference/blob/master/soql-standalone-parser/src/main/scala/com/socrata/soql/parsing/LexerReader.scala#L57
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
    "LIKE",
    
    // Literals
    "TRUE",
    "FALSE",
    "NULL"
  ]
});
