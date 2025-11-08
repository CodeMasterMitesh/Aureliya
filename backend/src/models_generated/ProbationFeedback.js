import mongoose from 'mongoose'
const { Schema } = mongoose

const ProbationFeedbackSchema = new Schema({
  id: { type: Number }, // id int(11)
  employeeId: { type: Number }, // employee_id int(11)
  evaluatorName: { type: String }, // evaluator_name varchar(255)
  issueDate: { type: Date }, // issue_date date
  overallRating: { type: Number }, // overall_rating int(11)
  jobKnowledgeSkillsRating: { type: Number }, // job_knowledge_skills_rating int(11)
  jobKnowledgeSkillsComments: { type: String }, // job_knowledge_skills_comments text
  workQualityAccuracyRating: { type: Number }, // work_quality_accuracy_rating int(11)
  workQualityAccuracyComments: { type: String }, // work_quality_accuracy_comments text
  productivityEfficiencyRating: { type: Number }, // productivity_efficiency_rating int(11)
  productivityEfficiencyComments: { type: String }, // productivity_efficiency_comments text
  punctualityAttendanceRating: { type: Number }, // punctuality_attendance_rating int(11)
  punctualityAttendanceComments: { type: String }, // punctuality_attendance_comments text
  adaptabilityLearningRating: { type: Number }, // adaptability_learning_rating int(11)
  adaptabilityLearningComments: { type: String }, // adaptability_learning_comments text
  teamworkCollaborationRating: { type: Number }, // teamwork_collaboration_rating int(11)
  teamworkCollaborationComments: { type: String }, // teamwork_collaboration_comments text
  communicationSkillsRating: { type: Number }, // communication_skills_rating int(11)
  communicationSkillsComments: { type: String }, // communication_skills_comments text
  initiativeProblemSolvingRating: { type: Number }, // initiative_problem_solving_rating int(11)
  initiativeProblemSolvingComments: { type: String }, // initiative_problem_solving_comments text
  compliancePoliciesRating: { type: Number }, // compliance_policies_rating int(11)
  compliancePoliciesComments: { type: String }, // compliance_policies_comments text
  strengths: { type: String }, // strengths text
  improvementAreas: { type: String }, // improvement_areas text
  recommendation: { type: String }, // recommendation enum('Confirm
  active: { type: Boolean }, // active tinyint(1)
  deleteField: { type: Boolean }, // delete tinyint(1)
  enterby: { type: Number }, // enterby int(11)
  enterdatetime: { type: Date }, // enterdatetime datetime
  modifiedby: { type: Number }, // modifiedby int(11)
  modifieddatetime: { type: Date }, // modifieddatetime datetime
  company: { type: Number }, // company int(11)
}, { timestamps: false })

export default mongoose.model('ProbationFeedback', ProbationFeedbackSchema, 'probation_feedback')
