import type {
	Context,
	Primitive,
	Serializable,
	VeOdm,
} from '#/model/Serializable';

import type {VeoPathTarget} from './veo';

export type Hash = Record<string, string>;

export type UrlString = `${'http' | 'https'}://${string}`;

export interface JsonObject {
	[k: string]: JsonValue | undefined;
}

export type JsonValue =
	| string
	| number
	| boolean
	| null
	| JsonValue[]
	| JsonObject
	| undefined;

export interface PrimitiveObject {
	[k: string]: PrimitiveValue | PrimitiveValue[];
}

export type PrimitiveValue =
	| JsonValue
	| Function  // eslint-disable-line @typescript-eslint/ban-types
	| PrimitiveObject
	| PrimitiveValue[];

export interface TypedObject<TypeValue extends string = string>
	extends Omit<JsonObject, 'type'> {
	type: TypeValue;
}

export interface TypedPrimitive<TypeValue extends string = string>
	extends Omit<PrimitiveObject, 'type'> {
	type: TypeValue;
}

export interface KeyedObject extends Omit<JsonObject, 'key'> {
	key: string;
}

export interface LabeledObject extends Omit<JsonObject, 'label'> {
	label: string;
}

export interface KeyedPrimitive extends Omit<PrimitiveObject, 'key'> {
	key: string;
}

export interface LabeledPrimitive extends Omit<PrimitiveObject, 'label'> {
	label: string;
}

export interface ValuedObject<ValueType=string> {
	value: ValueType;
}

export interface UuidedObject {
	uuid: string;
}

export type TypedKeyedObject<TypeValue extends string=string> = TypedObject<TypeValue> & KeyedObject;
export type TypedKeyedUuidedObject<TypeValue extends string=string> = TypedKeyedObject<TypeValue> & UuidedObject;
export type TypedLabeledObject<TypeValue extends string=string> = TypedObject<TypeValue> & LabeledObject;
export type KeyedLabeledObject = KeyedObject & LabeledObject;

export type ValuedLabeledObject<ValueType=string> = ValuedObject<ValueType> & (ValueType extends JsonValue? LabeledObject: {
	label: string;
});

export type TypedKeyedLabeledObject<TypeValue extends string=string> = TypedObject<TypeValue> & KeyedObject & LabeledObject;

export type TypedKeyedPrimitive<TypeValue extends string=string> = TypedPrimitive<TypeValue> & KeyedPrimitive;
export type TypedLabeledPrimitive<TypeValue extends string=string> = TypedPrimitive<TypeValue> & LabeledPrimitive;
export type TypedKeyedLabeledPrimitive<TypeValue extends string=string> = TypedKeyedPrimitive<TypeValue> & LabeledPrimitive;

export type SparqlString = string;

export type SparqlBinding =
	| {
		type: 'uri';
		value: string;
	}
	| {
		type: 'literal';
		value: string;
	}
	| {
		type: 'literal';
		value: string;
		'xml:lang': string;
	}
	| {
		type: 'literal';
		value: string;
		datatype: string;
	}
	| {
		type: 'bnode';
		value: string;
	};

export interface QueryResult {
	type: string;
	value: string;
	datatype?: string;
	'xml:lang'?: string;
}

export type QueryRow = Record<string, QueryResult>;

export interface SparqlBindingMap {
	[variable: string]: SparqlBinding;
}

export type SparqlBindings = Array<SparqlBindingMap>;

export interface Labeled {
	label: string;
}

export type CompareFunction<Type> = (w_a: Type, w_b: Type) => -1 | 0 | 1;

export type DotFragment = string;

export interface Instantiable<
	ValueType extends Serializable | Primitive,
	ClassType extends VeOdm<ValueType>,
> {
	new(sp: VeoPathTarget, gc: ValueType, g: Context): ClassType;
}

export type PathTarget<
	ValueType extends Serializable | Primitive,
	ClassType extends VeOdm<ValueType>,
> = PathOptions<ValueType, ClassType> | ValueType | ClassType;


export interface PathOptions<
	ValueType extends Serializable | Primitive,
	ClassType extends VeOdm<ValueType>,
> {
	[si_frag: string]: PathTarget<ValueType, ClassType>;
}
