# TxOrigin Attack
None of the requires in this project check for tx.origin as owner. It always requires the sender be the account checked for authorization. 

# Integer Over/Underflow
Most math in the smart contracts is handled by OpenZeppelin which implements safemath libraries. In the event I would handle balance transfer myself I would include Some sort of safemath library to mitigate these issues. 

# Reentrancy Attack 
I also had open zeppeling handle crowdsale buy functions and the core function to buy was a nonReentrant functions that cant be called by another
