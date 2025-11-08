import mongoose from 'mongoose'
const { Schema } = mongoose

const LeadsSchema = new Schema({
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
  department: { type: String }, // department varchar(100)
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
  converted: { type: Boolean }, // converted tinyint(1)
  referedBy: { type: String }, // refered_by varchar(100)
  leadSource: { type: String }, // lead_source varchar(100)
  leadSourceDescription: { type: String }, // lead_source_description text
  status: { type: String }, // status varchar(100)
  statusDescription: { type: String }, // status_description text
  reportsToId: { type: String }, // reports_to_id char(36)
  accountName: { type: String }, // account_name varchar(255)
  accountDescription: { type: String }, // account_description text
  contactId: { type: String }, // contact_id char(36)
  accountId: { type: String }, // account_id char(36)
  opportunityId: { type: String }, // opportunity_id char(36)
  opportunityName: { type: String }, // opportunity_name varchar(255)
  opportunityAmount: { type: String }, // opportunity_amount varchar(50)
  campaignId: { type: String }, // campaign_id char(36)
  birthdate: { type: Date }, // birthdate date
  portalName: { type: String }, // portal_name varchar(255)
  portalApp: { type: String }, // portal_app varchar(255)
  website: { type: String }, // website varchar(255)
}, { timestamps: false })

export default mongoose.model('Leads', LeadsSchema, 'leads')
