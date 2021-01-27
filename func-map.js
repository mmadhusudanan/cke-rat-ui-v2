var func_map = {
    "stages": [
        { "id": "GBL-001", "level":0,"name": "MEMBER DATA",  "type": "SOURCE", "desc":"", "output":"" },
        { "id": "GBL-002", "level":0,"name": "COVERAGE DATA",  "type": "SOURCE", "desc":"", "output":""},
        { "id": "GBL-003", "level":0,"name": "MED CLAIMS",  "type": "SOURCE", "desc":"", "output":"" },
        { "id": "GBL-004", "level":0,"name": "LAB CLAIMS",  "type": "SOURCE", "desc":"", "output":"" },
        { "id": "GBL-005", "level":0,"name": "RX CLAIMS",  "type": "SOURCE", "desc":"", "output":"" },
        { "id": "GBL-006", "level":0,"name": "NDC XREF DATASET",  "type": "SOURCE", "desc":"", "output":"" },
                
        { "id": "1119-001", 
           "level":2,"name": 
           "CALC AGE",  
           "type": "DIMENSION", 
           "desc":"Calculate AGE of member as of anchor date", 
           "output":"MBRS_W_AGE",
           "func_def":"select *, CAST(floor(ABS(DATEDIFF(BIRTH_DATE,current_date())) / 365.25) AS INT) AS AGE from STAGE_INPUT_TBL1"
        },
        { "id": "1119-002", 
            "level":3,
            "name": "FILTER AGE 18 OR ABOVE",  
            "type": "FILTER", 
            "desc":"Filter all members above AGE 18 as of anchor date", 
            "output":"MBRS_W_AGE_FIL",
            "func_def":"select * from STAGE_INPUT_TBL1 where AGE >= 18"
        },
        { "id": "1119-003", "level":2,"name": "CALC CONTINUOUS ENROLLMENT",  "type": "DIMENSION", "desc":"Calculate CONT_ENROLL of member as of anchor date", "output":"MBRS_W_CONT_ENROLL" },
        { "id": "1119-004", "level":3,"name": "NOT CONT ENROLLED",  "type": "FILTER", "desc":"Filter out all members where CONT_ENROLL = FALSE as of anchor date", "output":"MBRS_W_CONT_ENROLL_FIL" },

        { "id": "1119-005", "level":4,"name": "FILTER MED CLAIMS",  "type": "FILTER", "desc":"FILTER OUT ALL MED CLAIMS THAT ARE NOT IN MEMBER LIST", "output":"MED_CLAIMS_FIL" },
        { "id": "1119-006", "level":4,"name": "FILTER LAB CLAIMS",  "type": "FILTER", "desc":"FILTER OUT ALL LAB CLAIMS THAT ARE NOT IN MEMBER LIST", "output":"LAB_CLAIMS_FIL" },
        { "id": "1119-007", "level":4,"name": "FILTER RX CLAIMS",  "type": "FILTER", "desc":"FILTER OUT ALL RX CLAIMS THAT ARE NOT IN MEMBER LIST", "output":"RX_CLAIMS_FIL" },

        { "id": "1119-008", "level":5,"name": "CALC HEDIS_ACUTE_INPATIENT",  "type": "DIMENSION", "desc":"Calculate HEDIS_ACUTE_INPATIENT of member as of anchor date", "output":"MBRS_W_HEDIS_ACUTE_INPATIENT" },
        { "id": "1119-009", "level":5,"name": "CALC HEDIS_NON_ACUTE_INPATIENT",  "type": "DIMENSION", "desc":"Calculate HEDIS_NON_ACUTE_INPATIENT of member as of anchor date", "output":"MBRS_W_NON_ACUTE_INPATIENT" },
        
        { "id": "1119-010", "level":5,"name": "CALC HAS_SERUM_POTASSIUM",  "type": "DIMENSION", "desc":"Calculate HAS_SERUM_POTASSIUM of member from lab claims as of anchor date", "output":"MBRS_W_SERU_POTASSIUM" },
        { "id": "1119-011", "level":5,"name": "CALC HAS_SERUM_CERATININE",  "type": "DIMENSION", "desc":"Calculate HAS_SERUM_CERATININE of member from lab claims as of anchor date", "output":"MBRS_W_SERU_CREATININE" },

        { 
            "id": "1119-012", "level":5,
            "name": "CALC PDC",  
            "type": "DIMENSION", 
            "desc":"Calculate PDC value of member from rx claims as of anchor date", 
            "output":"MBRS_W_PDC",
            "func_def":"@pandas_udf(\"double\")\r\ndef calculate_pdc_for_each_member(pid: pd.Series, svc_date: pd.Series, fill: pd.Series ) -> float:\r\n    \r\n    data_df = pd.concat([pid, svc_date, fill], axis=1)\r\n    num = calculate_nume()\r\n    den = calculate_den()\r\n    pdc = num \/ den * 100        \r\n    return pdc"

        },        

        { "id": "1119-013", "level":6,"name": "JOIN MBR DATA",  "type": "FILTER", "desc":"Join all tables", "output":"ELIG_MBRS_TBL" },

        { "id": "1119-014", 
            "level":2,"name": "MERGE NDC CODES",  
            "type": "DIMENSION", 
            "desc":"Lookup NDC codes from NDX xref table", 
            "output":"RX_CLAIMS_LINE_TABLE_W_NDC_INT",
            "func_def":"select * from STAGE_INPUT_TBL1 a left join STAGE_INPUT_TBL2 b where ndc_id_int = b.NDC"

          },

        { "id": "1119-OUT", "level":7,"name": "OUTPUT",  "type": "JOIN", "desc":"Join all tables", "output":"CKE_OUTPUT_TBL" }
        
    ],
    "links": [
        
        { "source": "GBL-001", "targets": ["1119-001"] },
        { "source": "GBL-002", "targets": ["1119-003"] },
        { "source": "GBL-003", "targets": ["1119-005"] },
        { "source": "GBL-004", "targets": ["1119-006"] },
        { "source": "GBL-005", "targets": ["1119-014"] },
        { "source": "GBL-006", "targets": ["1119-014"] },

        { "source": "1119-001-TT", "targets": ["1119-002"] },
        { "source": "1119-002-TT", "targets": ["1119-004"] },
        { "source": "1119-003-TT", "targets": ["1119-004"] },
        { "source": "1119-004-TT", "targets": ["1119-005","1119-006", "1119-007", "1119-013"] },
        { "source": "1119-014-TT", "targets": ["1119-007"] },
        { "source": "1119-005-TT", "targets": ["1119-008", "1119-009"] },
        { "source": "1119-006-TT", "targets": ["1119-010", "1119-011"] },
        { "source": "1119-007-TT", "targets": ["1119-012"] },
        { "source": "1119-008-TT", "targets": ["1119-013"] },
        { "source": "1119-009-TT", "targets": ["1119-013"] },
        { "source": "1119-010-TT", "targets": ["1119-013"] },
        { "source": "1119-011-TT", "targets": ["1119-013"] },
        { "source": "1119-012-TT", "targets": ["1119-013"] },
        { "source": "1119-013-TT", "targets": ["1119-OUT"] },
        
        { "source": "1119-OUT", "targets": [] }

        
    ]
}
