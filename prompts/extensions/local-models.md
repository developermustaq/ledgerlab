# Extension · Local models architecture discussion (15–20 min)

A discussion, not a demo. Skip any live local model unless the setup has been rehearsed.

## Questions for the room

1. What data would a local model keep on your network that a cloud model would not?
2. What new things would you now be responsible for? (Hardware, patching, model
   supply chain, monitoring, access control.)
3. How would you measure whether a local model is good enough for release triage?
4. Which controls from today still apply unchanged? (Permissions, least
   privilege, verification, untrusted tool output.)

## Points to land

- Data locality changes exposure. It does not by itself make a system secure.
- Security still depends on infrastructure, permissions, the model and runtime
  supply chain, and operational controls.
- Quality, cost and maintenance are trade-offs to measure, not assume.

Landing line: "Local is not automatically private. Cloud is not automatically used for training." Check your provider's actual data terms.
