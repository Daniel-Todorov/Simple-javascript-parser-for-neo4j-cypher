# Simple-javascript-parser-for-neo4j-cypher
Simple javascript parser that can be used with nodejs to parse raw results from Cypher queries against neo4j database.
## Known issues
Due to the way cypher represents the number types, if you want a number result result to display properly on top level (for example you want to RETURN count(friend) AS numberOfFriends, you need to parse the result in the query itself -> RETURN toInt(count(friend)) AS numberOfFrirends
