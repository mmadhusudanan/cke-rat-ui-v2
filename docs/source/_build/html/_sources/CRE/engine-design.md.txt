# Rule Engine Design

## Design Considerations

- Ease of authoring.
    - The system should translate the author's intent into plannable spark query language. Here since Spark is the choice of technology, the system should be able to transpile business user's intent into spark sql.
    - The engine should be able to support both novice and advanced users in the authoring capabilites.
    - Should have good documentation capabilites.
    - The output of the Rule Engine should automatically accomodate for future use cases/scenarios.
- Peformance
    - Should be able to support realtime queries
    - The pipelines should be able to injest and run on incremental data. 
- Security
    - Protect all PII data
    - The app login can use platform's role based access.
- Auditability
    - How can the user traceback the rules's data lineage?
- Versioning.
    - What happens when a old rule has a bug in it? How will the historical alerts be reprocessed?
    - How are changes in output schema handled for both historical and future rule alerts?
    - How can rule authors be able to test future rollouts? Can we author rules for future rolling periods?
- Configurability
    - What are app admin configurations?
    - What controls need to be added like:
        - Access controls.
        - Rule Publishing controls.
- Testability
    - How can the Rules be easily tested?
    - Rule authors should be able to do quick dry runs.
    - How to implement Regression testing for any new code releases?

