# Schema Audit Report
Total Models: 600
ERP-like Models: 146
LIMS-like Models: 63

## Duplicate/variant clusters (top)
- attlog: Attlog, Attlog1
- bookings: Bookings, Bookings1
- bookingtest: Bookingtest, Bookingtest1
- contacts: Contacts, Contacts1
- formulaitems: Formulaitems, Formulaitems1
- formulamaster: Formulamaster, Formulamaster1
- generic: Generic, Generic0612, Generic1
- generictests: Generictests, Generictests0612, Generictests1
- itemmaster: Itemmaster, ItemmasterCopy
- leavedetail: Leavedetail, Leavedetail1
- modules: Modules, ModulesCopy
- procedures: Procedures, Procedures1
- products: Products, Products1, Products300516
- stpitems: Stpitems, Stpitems1

## Suspicious fields (first 50 models with issues)
### Accountgroups
- typeField (reserved_renamed) // type varchar(25)
- deleteField (reserved_renamed) // delete int(11)

### Adverseevent
- deleteField (reserved_renamed) // delete int(11)

### Ajv
- typeField (reserved_renamed) // TYPE varchar(10)

### Alert
- typeField (reserved_renamed) // type int(11)
- deleteField (reserved_renamed) // delete int(11)

### Amc
- typeField (reserved_renamed) // type varchar(255)
- deleteField (reserved_renamed) // delete int(11)

### Analyticalsales
- typeField (reserved_renamed) // type varchar(25)
- deleteField (reserved_renamed) // delete int(11)

### Analyticalsalesitems
- typeField (reserved_renamed) // type varchar(11)

### Analyticalsalesreturn
- typeField (reserved_renamed) // type varchar(25)
- deleteField (reserved_renamed) // delete int(11)

### Analyticalsalesreturnitems
- typeField (reserved_renamed) // type varchar(11)

### Appnotification
- typeField (reserved_renamed) // type varchar(50)
- deleteField (reserved_renamed) // delete int(11)

### Approval
- typeField (reserved_renamed) // type varchar(25)
- deleteField (reserved_renamed) // delete int(11)

### Asalehd
- typeField (reserved_renamed) // TYPE varchar(2)

### Assayitems
- typeField (reserved_renamed) // type varchar(50)

### AssetIssue
- deleteField (reserved_renamed) // delete tinyint(1)

### AssetMaster
- deleteField (reserved_renamed) // delete tinyint(1)

### AssetReturn
- deleteField (reserved_renamed) // delete tinyint(1)

### Assignshift
- deleteField (reserved_renamed) // delete int(11)

### Attlog
- deleteField (reserved_renamed) // delete int(11)

### Attlog1
- deleteField (reserved_renamed) // delete int(11)

### Audittrial
- deleteField (reserved_renamed) // delete int(11)

### Bankmaster
- deleteField (reserved_renamed) // delete int(11)

### Batch
- typeField (reserved_renamed) // type varchar(25)
- deleteField (reserved_renamed) // delete int(11)

### Batchitems
- deleteField (reserved_renamed) // delete int(11)

### Bom
- deleteField (reserved_renamed) // delete int(11)

### Bomitems
- typeField (reserved_renamed) // type varchar(25)

### Bookings
- typeField (reserved_renamed) // type varchar(255)

### Bookings1
- typeField (reserved_renamed) // type varchar(255)

### Bookingsitem
- typeField (reserved_renamed) // TYPE varchar(2)

### Bookingtest
- desc1Limit1 (slash_in_sql_name) // desc1/limit1 varchar(50)
- desc2Limit2 (slash_in_sql_name) // desc2/limit2 varchar(50)

### Bookingtest1
- desc1Limit1 (slash_in_sql_name) // desc1/limit1 varchar(50)
- desc2Limit2 (slash_in_sql_name) // desc2/limit2 varchar(50)

### Branchmaster
- deleteField (reserved_renamed) // delete int(11)

### Budgetmaster
- typeField (reserved_renamed) // type varchar(255)
- deleteField (reserved_renamed) // delete int(11)

### Bufferpreparation
- deleteField (reserved_renamed) // delete int(11)
- typeField (reserved_renamed) // type varchar(100)

### Capa
- deleteField (reserved_renamed) // delete int(11)
- typeField (reserved_renamed) // type varchar(50)

### Capamanagement
- deleteField (reserved_renamed) // delete int(11)
- typeField (reserved_renamed) // type varchar(150)

### Casemanagement
- deleteField (reserved_renamed) // delete int(11)

### Categorymaster
- deleteField (reserved_renamed) // delete int(11)

### Chamberinventory
- deleteField (reserved_renamed) // delete int(11)

### Chambermaster
- deleteField (reserved_renamed) // delete int(11)

### Changecontrol
- typeField (reserved_renamed) // type varchar(255)
- deleteField (reserved_renamed) // delete int(11)

### Chemicalanalysiscondition
- deleteField (reserved_renamed) // delete int(11)
- typeField (reserved_renamed) // type varchar(100)

### Chemicalmaster
- typeField (reserved_renamed) // type varchar(25)
- deleteField (reserved_renamed) // delete int(11)

### Chequebook
- deleteField (reserved_renamed) // delete int(11)

### Chequereturn
- deleteField (reserved_renamed) // delete int(11)

### Chromatographycondition
- deleteField (reserved_renamed) // delete int(11)
- typeField (reserved_renamed) // type varchar(100)

### Clinicaltrialsmanagement
- deleteField (reserved_renamed) // delete int(11)

### Coatemplates
- deleteField (reserved_renamed) // delete int(11)
- typeField (reserved_renamed) // type varchar(50)

### Columnmaster
- deleteField (reserved_renamed) // delete int(11)

### CompanyBranch
- deleteField (reserved_renamed) // delete int(11)

### Companymaster
- deleteField (reserved_renamed) // delete int(11)
