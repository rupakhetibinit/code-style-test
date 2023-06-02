# Code Style Questions Test

A simple express server with a single POST endpoint to 'http://localhost:3000/execute' which takes a request body with the type signature {code:string,testcode:string}.

The code is any vanilla javascript code and the testcode should be jest compatible.

This tests code execution using nodejs child processes running jest in a single process after creating a temporary file with the code and the testcode.

This is assuming that the test cases are sent along with the function definition from the client but testcases could be stored in db and specific test cases can be run depending on the question being sent.
