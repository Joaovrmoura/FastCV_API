import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema(
  {
    // Reference to the user who owns the curriculum (optional)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },

    template_selected: {
      type: String,
      enum: ['moderno', 'classico', 'clean', 'colorido', 'corporativo'],
      required: false
    },

    personal_data: {
      name: { type: String },
      location: { type: String },
      phone: { type: String },
      email: { type: String },
      github: { type: String },
      linkedin: { type: String }
    },

    objective: { type: String },

    education: [
      {
        course: { type: String },
        institution: { type: String },
        location: { type: String },
        start_data: { type: String },
        end_data: { type: String }
      }
    ],

    technical_skills: [
      {
        name: { type: String },
        skills: [String]
      }
    ],

    professional_experience: [
      {
        name: { type: String },
        period: [String],
        github: { type: String },
        description: { type: String },
        details: [String]
      }
    ],

    additional_courses: [
      {
        name: { type: String },
        platform: { type: String },
        duration: { type: String }
      }
    ],

    languages: [
      {
        name: { type: String },
        level: {
          type: String,
          enum: ['basico', 'intermediario', 'avancado']
        }
      }
    ]

  },
  {
    timestamps: true
  }
);


const Resume = mongoose.model('Resume', ResumeSchema);
export default Resume;
