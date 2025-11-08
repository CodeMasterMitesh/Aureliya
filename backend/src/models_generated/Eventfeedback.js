import mongoose from 'mongoose'
const { Schema } = mongoose

const EventfeedbackSchema = new Schema({
  id: { type: Number }, // id int(11)
  employeeId: { type: Number }, // employee_id int(11)
  eventId: { type: Number }, // event_id int(11)
  eventdate: { type: Date }, // eventdate date
  overallRating: { type: Number }, // overall_rating int(11)
  overallEventExperienceRating: { type: Number }, // overall_event_experience_rating int(11)
  overallEventExperienceComments: { type: String }, // overall_event_experience_comments text
  qualityOfContentRating: { type: Number }, // quality_of_content_rating int(11)
  qualityOfContentComments: { type: String }, // quality_of_content_comments text
  speakerEffectivenessRating: { type: Number }, // speaker_effectiveness_rating int(11)
  speakerEffectivenessComments: { type: String }, // speaker_effectiveness_comments text
  eventOrganizationAndManagementRating: { type: Number }, // event_organization_and_management_rating int(11)
  eventOrganizationAndManagementComments: { type: String }, // event_organization_and_management_comments text
  venueAndFacilitiesRating: { type: Number }, // venue_and_facilities_rating int(11)
  venueAndFacilitiesComments: { type: String }, // venue_and_facilities_comments text
  timeManagementRating: { type: Number }, // time_management_rating int(11)
  timeManagementComments: { type: String }, // time_management_comments text
  networkingOpportunitiesRating: { type: Number }, // networking_opportunities_rating int(11)
  networkingOpportunitiesComments: { type: String }, // networking_opportunities_comments text
  event: { type: String }, // event text
  improvementAreas: { type: String }, // improvement_areas text
  additionalComments: { type: String }, // additional_comments enum('Confirm
  active: { type: Boolean }, // active tinyint(1)
  deleteField: { type: Boolean }, // delete tinyint(1)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  company: { type: Number }, // company int(11)
}, { timestamps: false })

export default mongoose.model('Eventfeedback', EventfeedbackSchema, 'eventfeedback')
