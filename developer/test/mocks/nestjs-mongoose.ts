export function InjectModel(): ParameterDecorator {
  return () => undefined;
}

export function Prop(): PropertyDecorator {
  return () => undefined;
}

export function Schema(): ClassDecorator {
  return () => undefined;
}

export const SchemaFactory = {
  createForClass: () => ({}),
};

export class MongooseModule {}
