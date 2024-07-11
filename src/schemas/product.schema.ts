import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ versionKey: false })
export class Product {
  @Prop({ required: true, default: 100 })
  weight: number

  @Prop({ required: true })
  calories: number

  @Prop({ required: true })
  category: string

  @Prop({ required: true })
  title: string

  @Prop({ type: Object, required: true })
  groupBloodNotAllowed: Record<'1' | '2' | '3' | '4', boolean>
}

export const ProductSchema = SchemaFactory.createForClass(Product)
