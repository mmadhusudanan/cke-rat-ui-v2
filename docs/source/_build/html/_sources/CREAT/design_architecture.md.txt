# Design and Architecture

## Objectives

**CREAT** will serve the following characteristics (at a very high level):
- **Intuitive:**
    - The user should be able to build and publish any Rule without requiring prior training to use it.
    - The Rule definition should closely mimic how rules are formulated in our natural world (i:e not a SQL as far as possible). 
    - It should be impossible for a user to define a rule in an incorrect way. The system should continously try to comprehend the intent of the user and provide guidance and appropriate course of action.
- **Progressively Ellaborative:**
    - The rule author can progressively build any rule
    **(i:e Build -> Test -> Repeat)**
    - Every rule could be imagined to be as a series of filters (conditions) that could be independently created and composable.
    - Every rule condition/filter should be easily and independently testable (with realtime data).
- **Resuable:**
    - The conditions/filters built should be reusable across all the rules, to increase the author's productivity and reduce repition.
- **Testable:**
    - The **CREAT** should have built in capabilities/options to be able to give the rule author enough confidence in its quality. (What makes the user confident in his/her rule?)
    - Not only the author of the rule but also the administrator of the rule (the person who is going to publish it) should also be able to verify/validate the quality of the rule in review
- **Versionable:**
    - Every rule should be have version tracking in built into it.
        - How is a bug in a rule patched?
        - What is considered as an upgrade to the existing rule?
        - How are conditions/filters versioned? What happens if a condtion/filter used by many rules needs to be updated?



