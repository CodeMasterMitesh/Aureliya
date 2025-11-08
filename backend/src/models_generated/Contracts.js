import mongoose from 'mongoose'
const { Schema } = mongoose

const ContractsSchema = new Schema({
  id: { type: Number }, // id int(11)
  dateEntered: { type: Date }, // date_entered datetime
  dateModified: { type: Date }, // date_modified datetime
  modifiedUserId: { type: String }, // modified_user_id char(36)
  createdBy: { type: String }, // created_by char(36)
  description: { type: String }, // description text
  deleted: { type: Boolean }, // deleted tinyint(1)
  assignedUserId: { type: String }, // assigned_user_id char(36)
  salutation: { type: String }, // salutation varchar(255)
  firstName: { type: String }, // first_name varchar(100)
  lastName: { type: String }, // last_name varchar(100)
  title: { type: String }, // title varchar(100)
  department: { type: String }, // department varchar(255)
  doNotCall: { type: Boolean }, // do_not_call tinyint(1)
  phoneHome: { type: String }, // phone_home varchar(100)
  phoneMobile: { type: String }, // phone_mobile varchar(100)
  phoneWork: { type: String }, // phone_work varchar(100)
  phoneOther: { type: String }, // phone_other varchar(100)
  phoneFax: { type: String }, // phone_fax varchar(100)
  primaryAddressStreet: { type: String }, // primary_address_street varchar(150)
  primaryAddressCity: { type: String }, // primary_address_city varchar(100)
  primaryAddressState: { type: String }, // primary_address_state varchar(100)
  primaryAddressPostalcode: { type: String }, // primary_address_postalcode varchar(20)
  primaryAddressCountry: { type: String }, // primary_address_country varchar(255)
  altAddressStreet: { type: String }, // alt_address_street varchar(150)
  altAddressCity: { type: String }, // alt_address_city varchar(100)
  altAddressState: { type: String }, // alt_address_state varchar(100)
  altAddressPostalcode: { type: String }, // alt_address_postalcode varchar(20)
  altAddressCountry: { type: String }, // alt_address_country varchar(255)
  assistant: { type: String }, // assistant varchar(75)
  assistantPhone: { type: String }, // assistant_phone varchar(100)
  leadSource: { type: String }, // lead_source varchar(255)
  reportsToId: { type: String }, // reports_to_id char(36)
  birthdate: { type: Date }, // birthdate date
  campaignId: { type: String }, // campaign_id char(36)
}, { timestamps: false })

export default mongoose.model('Contracts', ContractsSchema, 'contracts')
