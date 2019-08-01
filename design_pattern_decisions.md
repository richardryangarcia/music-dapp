# Fail early and fail loud
Throughout the 3 contracts I have implemented require statements that will allow function to check for necessary values to successfully run the rest of the function. By putting these requires early in the function it will catch and throw an exception early and not run any unnecessary code. 

# Restricting Access
Throughout my smart contracts I have add modifiers such as verifyOwner() that will check to make sure that only the owner can trigger the function. This is useful to prevent unauthorized users from triggering important functions without permission. I have also included the OpenZeppelin library for ERC20 Tokens which also requires users to have certain access rights to do things such as mint tokens. 

# Circuit Breaker
While I did not implement a circuit breaker pattern myself, I did include the OpenZeppelin contract to make the ERC20 contract pausible in case of emergencies. 
