export interface UnitVars {
  [name: string]: number;
}

/**
 * Represents a computational unit.
 */
export interface Unit {
  forward(vars: UnitVars): number;
  // TODO backward must get a variable name.
  backward(vars: UnitVars): number;
  toString(): string;
}

/**
 * Everything that might be used as a computational unit.
 * Unit for expressions and operations.
 * String for variable names.
 * Number for numbers :)
 */
export type UnitLike = Unit | string | number;
