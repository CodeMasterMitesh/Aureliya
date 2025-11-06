import mongoose from 'mongoose'

const SubMenuSchema = new mongoose.Schema(
  {
    main_menu_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MainMenu', required: true, index: true },
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SubMenu', default: null, index: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, index: true },
    path: { type: String, trim: true },
    order: { type: Number, default: 0, index: true },
    meta: { type: Object, default: {} },
  },
  { timestamps: true }
)

SubMenuSchema.index({ main_menu_id: 1, parent_id: 1, order: 1 })

export default mongoose.model('SubMenu', SubMenuSchema)
